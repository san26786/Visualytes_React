"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { ConfirmProvider } from "./Confirm";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

/** How long each toast stays on screen before it dismisses itself. */
const DURATION: Record<ToastType, number> = { success: 3000, info: 3000, warning: 4000, error: 5000 };

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now() + Math.random();
    const duration = DURATION[type];
    // Keep at most 3 on screen so a burst of actions doesn't pile up.
    setToasts((prev) => [...prev.slice(-2), { id, message, type, duration }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ConfirmProvider>{children}</ConfirmProvider>
      {/* One fixed spot for every panel: top-centre, above the header, sidebar and dialogs.
          On phones it spans the screen with a 16px gutter so it is never cut off. */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 top-4 z-[200] flex flex-col items-center gap-2.5 sm:inset-x-0 sm:top-5 sm:px-4"
      >
        {[...toasts].reverse().map((t) => {
          const typeConfig = {
            success: {
              title: "Success",
              icon: <CheckCircle2 size={20} />,
              tone: "bg-emerald-600 text-white ring-emerald-700/40 shadow-emerald-900/30",
              iconWrap: "bg-white/20 text-white",
              close: "text-white/80 hover:bg-white/15 hover:text-white",
              bar: "bg-white/60",
            },
            error: {
              title: "Error",
              icon: <XCircle size={20} />,
              tone: "bg-rose-600 text-white ring-rose-700/40 shadow-rose-900/30",
              iconWrap: "bg-white/20 text-white",
              close: "text-white/80 hover:bg-white/15 hover:text-white",
              bar: "bg-white/60",
            },
            warning: {
              title: "Warning",
              icon: <AlertTriangle size={20} />,
              tone: "bg-amber-400 text-slate-950 ring-amber-600/40 shadow-amber-900/25",
              iconWrap: "bg-slate-950/10 text-slate-950",
              close: "text-slate-900/70 hover:bg-slate-950/10 hover:text-slate-950",
              bar: "bg-slate-950/40",
            },
            info: {
              title: "Info",
              icon: <Info size={20} />,
              tone: "bg-slate-900 text-white ring-cyan-400/40 shadow-slate-900/40",
              iconWrap: "bg-cyan-400/20 text-cyan-300",
              close: "text-white/70 hover:bg-white/10 hover:text-white",
              bar: "bg-cyan-400",
            },
          }[t.type];

          return (
            <div
              key={t.id}
              role={t.type === "error" ? "alert" : "status"}
              className={`toast-enter pointer-events-auto relative flex w-full items-center gap-3 overflow-hidden rounded-2xl p-3.5 pr-2.5 shadow-2xl ring-1 sm:max-w-md ${typeConfig.tone}`}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${typeConfig.iconWrap}`}>
                {typeConfig.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wider opacity-80">{typeConfig.title}</p>
                <p className="break-words text-sm font-semibold leading-snug">{t.message}</p>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                aria-label="Dismiss notification"
                className={`shrink-0 cursor-pointer rounded-lg p-1.5 transition ${typeConfig.close}`}
              >
                <X size={16} />
              </button>
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-0 h-1 w-full origin-left ${typeConfig.bar}`}
                style={{ animation: `toast-timer ${t.duration}ms linear forwards` }}
              />
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes toast-timer { from { transform: scaleX(1); } to { transform: scaleX(0); } }
        @keyframes toast-enter { from { opacity: 0; transform: translateY(-16px) scale(0.96); } to { opacity: 1; transform: none; } }
        .toast-enter { animation: toast-enter 260ms cubic-bezier(0.21, 1.02, 0.73, 1) both; }
        @media (prefers-reduced-motion: reduce) { .toast-enter { animation: none; } }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}