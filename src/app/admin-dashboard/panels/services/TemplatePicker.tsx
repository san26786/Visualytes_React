"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Check, Eye, Layers, LayoutTemplate, Sparkles } from "lucide-react";

import { SECTION_DEFS, getSectionDef } from "@/src/lib/services/sections/defs";
import { TEMPLATES, createTemplateContent } from "@/src/lib/services/sections/templates";
import type { ServiceTemplateKey } from "@/src/lib/services/sections/types";
import { Button } from "../../components/UI/Button";
import { LivePreview } from "./LivePreview";
import { SectionWire } from "./SectionWire";

type Props = {
  onCancel: () => void;
  onPick: (template: ServiceTemplateKey) => void;
};

export function TemplatePicker({ onCancel, onPick }: Props) {
  const [selected, setSelected] = useState<ServiceTemplateKey>("STANDARD_ARTICLE");
  const [showPreview, setShowPreview] = useState(false);

  const template = TEMPLATES.find((item) => item.key === selected) ?? TEMPLATES[0];
  const sections = useMemo(() => createTemplateContent(selected).sections, [selected]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} /> Back to services
        </button>
        <Button variant="cyan" onClick={() => onPick(selected)} icon={<Check size={16} />}>
          Use {template.label}
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900">Choose a template</h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Pick a layout to see everything it includes. You can change every word and image afterwards - or choose{" "}
          <strong className="font-semibold text-slate-700">Custom</strong> to build a page from any of the {SECTION_DEFS.length} sections.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div className="space-y-3">
          {TEMPLATES.map((item) => {
            const active = item.key === selected;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setSelected(item.key);
                  setShowPreview(false);
                }}
                className={`w-full cursor-pointer rounded-2xl border p-4 text-left transition ${
                  active ? "border-cyan-500 bg-cyan-50/60 ring-3 ring-cyan-500/15" : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${active ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {item.customizable ? <Sparkles size={16} /> : <LayoutTemplate size={16} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900">{item.label}</p>
                    <p className="text-[11px] font-medium text-slate-500">{item.customizable ? "Any section, any order" : `${item.sections.length} sections`}</p>
                  </div>
                  {active && <Check size={16} className="shrink-0 text-cyan-600" />}
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-600">{item.description}</p>
              </button>
            );
          })}
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">{template.label}</h3>
              <p className="text-xs text-slate-500">{template.customizable ? "Starts empty - you add the sections." : "What this template includes, top to bottom."}</p>
            </div>
            {!template.customizable && (
              <Button size="sm" variant={showPreview ? "primary" : "outline"} icon={<Eye size={14} />} onClick={() => setShowPreview((current) => !current)}>
                {showPreview ? "Show section list" : "Preview full layout"}
              </Button>
            )}
          </div>

          {template.customizable ? (
            <div className="space-y-5">
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
                <div className="mb-2 flex items-center gap-2 font-semibold text-slate-800">
                  <Layers size={16} /> Build your own page
                </div>
                After creating the service you can add, remove, reorder and hide sections, and every field of every section is editable. Available sections:
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {SECTION_DEFS.map((def) => (
                  <div key={def.type} className="rounded-xl border border-slate-200 p-3">
                    <SectionWire kind={def.wire} />
                    <p className="mt-2 text-xs font-bold text-slate-800">{def.label}</p>
                    <p className="text-[11px] leading-snug text-slate-500">{def.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : showPreview ? (
            <LivePreview sections={sections} mainClass={template.mainClass} height="66vh" />
          ) : (
            <ol className="space-y-3">
              {sections.map((section, index) => {
                const def = getSectionDef(section.type);
                if (!def) return null;
                return (
                  <li key={section.id} className="grid gap-3 rounded-xl border border-slate-200 p-3 sm:grid-cols-[11rem_minmax(0,1fr)]">
                    <SectionWire kind={def.wire} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900">
                        <span className="mr-2 text-xs font-semibold text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                        {def.label}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{def.description}</p>
                      <p className="mt-1.5 text-[11px] text-slate-400">
                        {def.fields.length === 0 ? "Live block - managed in another admin tab" : `${def.fields.length} editable field${def.fields.length === 1 ? "" : "s"}`}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
