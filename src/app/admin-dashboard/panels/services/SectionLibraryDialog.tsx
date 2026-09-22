"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";

import { SECTION_DEFS } from "@/src/lib/services/sections/defs";
import type { SectionGroup } from "@/src/lib/services/sections/types";
import { SectionWire } from "./SectionWire";

const GROUP_ORDER: SectionGroup[] = ["Hero", "Content", "Cards & Lists", "Logos & Proof", "Conversion", "Live data"];

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (type: string) => void;
};

/** Every available section, grouped and searchable; adding one appends it with its default content. */
export function SectionLibraryDialog({ open, onClose, onAdd }: Props) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const groups = useMemo(() => {
    const query = search.trim().toLowerCase();
    const matches = SECTION_DEFS.filter((def) => !query || `${def.label} ${def.description} ${def.group}`.toLowerCase().includes(query));
    return GROUP_ORDER.map((group) => ({ group, defs: matches.filter((def) => def.group === group) })).filter((entry) => entry.defs.length > 0);
  }, [search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-label="Add a section" className="relative flex max-h-[90vh] w-full max-w-5xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Add a section</h2>
            <p className="text-xs text-slate-500">Each section arrives with sample content that you can edit.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-slate-100 px-6 py-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              autoFocus
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search sections…"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-6">
          {groups.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No section matches “{search}”.</p>}
          {groups.map(({ group, defs }) => (
            <div key={group}>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{group}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {defs.map((def) => (
                  <button
                    key={def.type}
                    type="button"
                    onClick={() => {
                      onAdd(def.type);
                      onClose();
                    }}
                    className="group cursor-pointer rounded-xl border border-slate-200 p-3 text-left transition hover:border-cyan-400 hover:shadow-sm"
                  >
                    <SectionWire kind={def.wire} />
                    <div className="mt-2.5 flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-slate-900">{def.label}</p>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500 transition group-hover:bg-cyan-500 group-hover:text-white">
                        <Plus size={14} />
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] leading-snug text-slate-500">{def.description}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
