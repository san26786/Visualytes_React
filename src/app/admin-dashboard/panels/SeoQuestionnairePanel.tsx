"use client";

import { useEffect, useState } from "react";
import { ClipboardCheck, ClipboardList, Loader2, SlidersHorizontal } from "lucide-react";

import type { QConfig } from "@/src/lib/seo-questionnaire/config";

import { api } from "./seo-questionnaire/api";
import BuilderView from "./seo-questionnaire/BuilderView";
import ResponsesView from "./seo-questionnaire/ResponsesView";

type Loaded = { config: QConfig; customised: boolean; defaults: QConfig };

const TABS = [
  { id: "responses", label: "Responses", icon: ClipboardList },
  { id: "builder", label: "Form builder", icon: SlidersHorizontal },
] as const;

export default function SeoQuestionnairePanel() {
  const [view, setView] = useState<(typeof TABS)[number]["id"]>("responses");
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api<Loaded>("/api/admin/seo-questionnaire/config")
      .then((data) => !cancelled && setLoaded(data))
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : "Unable to load the questionnaire."));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white">
            <ClipboardCheck size={20} />
          </span>
          <div>
            <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">SEO Questionnaire</h2>
            <p className="text-xs text-slate-500">Client onboarding form: read responses, download them as PDF, and change any step or question.</p>
          </div>
        </div>
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs font-semibold">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3.5 py-2 transition ${view === id ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === "responses" && <ResponsesView />}

      {view === "builder" &&
        (loaded ? (
          <BuilderView initial={loaded.config} customised={loaded.customised} defaults={loaded.defaults} onSaved={(config, customised) => setLoaded((current) => (current ? { ...current, config, customised } : current))} />
        ) : error ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">{error}</p>
        ) : (
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-12 text-sm text-slate-400">
            <Loader2 size={16} className="animate-spin" /> Loading the questionnaire…
          </div>
        ))}
    </div>
  );
}
