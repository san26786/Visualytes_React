"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => {
          const typeConfig = {
            success: {
              icon: <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />,
              border: "border-emerald-200 bg-white/95 text-slate-800 shadow-emerald-500/10",
              badge: "bg-emerald-50 text-emerald-700",
            },
            error: {
              icon: <XCircle className="text-rose-500 shrink-0" size={18} />,
              border: "border-rose-200 bg-white/95 text-slate-800 shadow-rose-500/10",
              badge: "bg-rose-50 text-rose-700",
            },
            warning: {
              icon: <AlertTriangle className="text-amber-500 shrink-0" size={18} />,
              border: "border-amber-200 bg-white/95 text-slate-800 shadow-amber-500/10",
              badge: "bg-amber-50 text-amber-700",
            },
            info: {
              icon: <Info className="text-cyan-500 shrink-0" size={18} />,
              border: "border-cyan-200 bg-white/95 text-slate-800 shadow-cyan-500/10",
              badge: "bg-cyan-50 text-cyan-700",
            },
          }[t.type];

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${typeConfig.border}`}
            >
              <div className="flex items-center gap-3">
                {typeConfig.icon}
                <span className="text-xs sm:text-sm font-medium leading-tight">{t.message}</span>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}