"use client";

import { useEffect, useRef, useState } from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";

import type { SectionInstance } from "@/src/lib/services/sections/types";

const WIDTHS = [
  { id: "desktop", label: "Desktop", width: "100%", icon: Monitor },
  { id: "tablet", label: "Tablet", width: "768px", icon: Tablet },
  { id: "mobile", label: "Mobile", width: "390px", icon: Smartphone },
] as const;

type Props = {
  sections: SectionInstance[];
  mainClass: string;
  height?: string;
  className?: string;
};

/** The real public layout inside an iframe; the draft is pushed to it with postMessage. */
export function LivePreview({ sections, mainClass, height = "72vh", className = "" }: Props) {
  const frame = useRef<HTMLIFrameElement>(null);
  const latest = useRef({ sections, mainClass });
  const [device, setDevice] = useState<(typeof WIDTHS)[number]["id"]>("desktop");

  const send = () => {
    frame.current?.contentWindow?.postMessage(
      { type: "service-preview", ...latest.current },
      window.location.origin,
    );
  };

  useEffect(() => {
    latest.current = { sections, mainClass };
    const timer = setTimeout(send, 200);
    return () => clearTimeout(timer);
  }, [sections, mainClass]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.data?.type === "service-preview-ready") send();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const current = WIDTHS.find((item) => item.id === device) ?? WIDTHS[0];

  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-500">Live preview - updates as you type. Header and footer are hidden here.</p>
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-0.5">
          {WIDTHS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setDevice(id)}
              aria-label={label}
              title={label}
              className={`flex h-8 w-9 cursor-pointer items-center justify-center rounded-lg transition ${
                device === id ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-3">
        <iframe
          ref={frame}
          title="Service preview"
          src="/admin-dashboard/service-preview"
          onLoad={send}
          style={{ width: current.width, height, maxWidth: "100%" }}
          className="rounded-xl border border-slate-300 bg-slate-950 shadow-sm transition-[width] duration-300"
        />
      </div>
    </div>
  );
}
