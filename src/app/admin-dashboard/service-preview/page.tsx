"use client";

import { useEffect, useState } from "react";

import { ServiceSections } from "@/src/app/archives/services/_sections/renderers";
import type { SectionInstance } from "@/src/lib/services/sections/types";

type PreviewMessage = { type: "service-preview"; sections: SectionInstance[]; mainClass: string };

/**
 * Renders whatever the admin editor posts to it, using the exact public section
 * components, so the preview is what visitors will see. It holds no data of its own.
 */
export default function ServicePreviewPage() {
  const [state, setState] = useState<{ sections: SectionInstance[]; mainClass: string } | null>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent<PreviewMessage>) => {
      if (event.origin !== window.location.origin || event.data?.type !== "service-preview") return;
      setState({ sections: event.data.sections, mainClass: event.data.mainClass });
    };
    window.addEventListener("message", onMessage);
    window.parent?.postMessage({ type: "service-preview-ready" }, window.location.origin);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!state) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-400">Loading preview…</div>;
  }

  if (state.sections.filter((section) => section.enabled).length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-sm text-slate-400">
        Nothing to preview yet. Add or enable a section.
      </div>
    );
  }

  return <ServiceSections sections={state.sections} mainClass={state.mainClass} />;
}
