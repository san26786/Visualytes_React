"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Copy, ExternalLink, Eye, EyeOff, Pencil, Plus, Search, Trash2 } from "lucide-react";

import type { ServiceListItem } from "@/src/lib/services/server";
import { TEMPLATES, getTemplate } from "@/src/lib/services/sections/templates";
import type { ServiceTemplateKey } from "@/src/lib/services/sections/types";
import { Button } from "../../components/UI/Button";
import { Panel } from "../../components/UI/Panel";

type Props = {
  services: ServiceListItem[];
  onCreate: () => void;
  onEdit: (service: ServiceListItem) => void;
  onDuplicate: (service: ServiceListItem) => void;
  onDelete: (service: ServiceListItem) => void;
  onToggle: (service: ServiceListItem) => void;
  onMove: (service: ServiceListItem, delta: -1 | 1) => void;
};

const BADGE: Record<ServiceTemplateKey, string> = {
  STANDARD_ARTICLE: "border-slate-200 bg-slate-50 text-slate-700",
  WEB_DESIGN: "border-cyan-200 bg-cyan-50 text-cyan-700",
  DIGITAL_MARKETING: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
  MOBILE_APP: "border-indigo-200 bg-indigo-50 text-indigo-700",
  BESPOKE: "border-amber-200 bg-amber-50 text-amber-700",
  MODULAR_BUILDER: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const ICON_BTN =
  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30";

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

export function ServiceList({ services, onCreate, onEdit, onDuplicate, onDelete, onToggle, onMove }: Props) {
  const [search, setSearch] = useState("");
  const [template, setTemplate] = useState<ServiceTemplateKey | "ALL">("ALL");

  const filtered = search.trim() !== "" || template !== "ALL";

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return services.filter(
      (service) =>
        (template === "ALL" || service.template === template) &&
        (!query || `${service.name} ${service.slug} ${service.tagline}`.toLowerCase().includes(query)),
    );
  }, [services, search, template]);

  return (
    <Panel
      title="Services"
      description="Cards on /our-services and the page each “Read More” opens. Order here = order on the website."
      badge={<span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">{services.length} total</span>}
      headerAction={
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-52">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search services…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 text-xs outline-none transition focus:border-cyan-500 focus:bg-white"
            />
          </div>
          <Button size="sm" variant="cyan" icon={<Plus size={14} />} onClick={onCreate}>
            New service
          </Button>
        </div>
      }
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {[{ key: "ALL" as const, label: "All" }, ...TEMPLATES.map((item) => ({ key: item.key, label: item.label }))].map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTemplate(item.key)}
            className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition ${
              template === item.key ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center">
          <p className="text-sm font-semibold text-slate-700">{services.length === 0 ? "No services yet" : "No service matches your filters"}</p>
          {services.length === 0 && (
            <>
              <p className="mt-1 text-xs text-slate-500">Create the first one - you can pick a ready-made template or build your own.</p>
              <Button className="mt-4" size="sm" variant="cyan" icon={<Plus size={14} />} onClick={onCreate}>
                New service
              </Button>
            </>
          )}
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
          {visible.map((service) => {
            const index = services.findIndex((item) => item.id === service.id);
            return (
              <li key={service.id} className="flex flex-col gap-3 bg-white p-4 transition hover:bg-slate-50/60 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    <img src={service.cardImage} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-bold text-slate-900">{service.name}</p>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${BADGE[service.template]}`}>{getTemplate(service.template).label}</span>
                      {!service.isActive && <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600">Hidden</span>}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {service.href} · {service.sectionCount} section{service.sectionCount === 1 ? "" : "s"} · updated {formatDate(service.updatedAt)}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-0.5">
                  <button type="button" className={ICON_BTN} disabled={filtered || index === 0} onClick={() => onMove(service, -1)} aria-label="Move up" title={filtered ? "Clear filters to reorder" : "Move up"}>
                    <ArrowUp size={15} />
                  </button>
                  <button type="button" className={ICON_BTN} disabled={filtered || index === services.length - 1} onClick={() => onMove(service, 1)} aria-label="Move down" title={filtered ? "Clear filters to reorder" : "Move down"}>
                    <ArrowDown size={15} />
                  </button>
                  <button type="button" className={ICON_BTN} onClick={() => onToggle(service)} aria-label={service.isActive ? "Hide" : "Publish"} title={service.isActive ? "Hide from the website" : "Publish on the website"}>
                    {service.isActive ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                  <a href={service.href} target="_blank" rel="noreferrer" className={ICON_BTN} aria-label="View live" title="View live">
                    <ExternalLink size={15} />
                  </a>
                  <button type="button" className={ICON_BTN} onClick={() => onDuplicate(service)} aria-label="Duplicate" title="Duplicate">
                    <Copy size={15} />
                  </button>
                  <Button size="sm" variant="secondary" icon={<Pencil size={13} />} onClick={() => onEdit(service)} className="ml-1.5">
                    Edit
                  </Button>
                  <button type="button" className={`${ICON_BTN} hover:text-rose-600`} onClick={() => onDelete(service)} aria-label="Delete" title="Delete">
                    <Trash2 size={15} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}
