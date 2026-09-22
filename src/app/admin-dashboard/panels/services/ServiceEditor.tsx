"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
} from "lucide-react";

import type { ServiceInput, ServiceRecord } from "@/src/lib/services/server";
import { getSectionDef } from "@/src/lib/services/sections/defs";
import { createSection, getTemplate } from "@/src/lib/services/sections/templates";
import type { FieldDef, SectionInstance, ServiceTemplateKey } from "@/src/lib/services/sections/types";
import { Button } from "../../components/UI/Button";
import { Input, Textarea } from "../../components/UI/Input";
import { useToast } from "../../components/UI/Toast";
import { FieldsEditor } from "./FieldEditor";
import { LivePreview } from "./LivePreview";
import { SectionLibraryDialog } from "./SectionLibraryDialog";
import { SectionWire } from "./SectionWire";

const CARD_IMAGE_FIELD: FieldDef = { key: "cardImage", label: "Card image", type: "image", help: "Shown on the /our-services grid and when the page is shared" };

export type ServiceSeed = {
  template: ServiceTemplateKey;
  name?: string;
  slug?: string;
  tagline?: string;
  cardImage?: string;
  route?: string | null;
  isActive?: boolean;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  sections?: SectionInstance[];
};

type Draft = {
  name: string;
  slug: string;
  tagline: string;
  cardImage: string;
  route: string;
  template: ServiceTemplateKey;
  isActive: boolean;
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  sections: SectionInstance[];
};

type Tab = "general" | "sections" | "preview" | "seo";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toDraft(record: ServiceRecord | null, seed: ServiceSeed | null): Draft {
  if (record) {
    return {
      name: record.name,
      slug: record.slug,
      tagline: record.tagline,
      cardImage: record.cardImage,
      route: record.route ?? "",
      template: record.template,
      isActive: record.isActive,
      isFeatured: record.isFeatured,
      metaTitle: record.metaTitle,
      metaDescription: record.metaDescription,
      metaKeywords: record.metaKeywords.join(", "),
      sections: record.sections,
    };
  }
  const template = seed?.template ?? "STANDARD_ARTICLE";
  return {
    name: seed?.name ?? "",
    slug: seed?.slug ?? "",
    tagline: seed?.tagline ?? "",
    cardImage: seed?.cardImage ?? "/assets/png/services/Website-designing-600x600.png",
    route: seed?.route ?? "",
    template,
    isActive: seed?.isActive ?? true,
    isFeatured: seed?.isFeatured ?? false,
    metaTitle: seed?.metaTitle ?? "",
    metaDescription: seed?.metaDescription ?? "",
    metaKeywords: (seed?.metaKeywords ?? []).join(", "),
    sections: seed?.sections ?? [],
  };
}

function toInput(draft: Draft): ServiceInput {
  return {
    name: draft.name.trim(),
    slug: draft.slug.trim(),
    tagline: draft.tagline.trim(),
    cardImage: draft.cardImage.trim(),
    route: draft.route.trim() || null,
    template: draft.template,
    isActive: draft.isActive,
    isFeatured: draft.isFeatured,
    metaTitle: draft.metaTitle.trim(),
    metaDescription: draft.metaDescription.trim(),
    metaKeywords: draft.metaKeywords.split(",").map((item) => item.trim()).filter(Boolean),
    sections: draft.sections,
  };
}

function move<T>(list: T[], index: number, delta: -1 | 1) {
  const target = index + delta;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

const ICON_BTN =
  "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30";

type Props = {
  record: ServiceRecord | null;
  seed: ServiceSeed | null;
  onCancel: () => void;
  /** Resolves the saved record, or null when the save failed (the hook already toasted). */
  onSave: (input: ServiceInput, currentSlug: string | null) => Promise<ServiceRecord | null>;
};

export function ServiceEditor({ record, seed, onCancel, onSave }: Props) {
  const { showToast } = useToast();
  const [draft, setDraft] = useState(() => toDraft(record, seed));
  const [baseline, setBaseline] = useState(() => JSON.stringify(draft));
  const [savedSlug, setSavedSlug] = useState<string | null>(record?.slug ?? null);
  const [slugTouched, setSlugTouched] = useState(!!record);
  const [tab, setTab] = useState<Tab>(record ? "sections" : "general");
  const [saving, setSaving] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const template = getTemplate(draft.template);
  const dirty = JSON.stringify(draft) !== baseline;
  const isNew = savedSlug === null;

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const setSections = (updater: (sections: SectionInstance[]) => SectionInstance[]) =>
    setDraft((current) => ({ ...current, sections: updater(current.sections) }));

  const updateSection = (id: string, patch: Partial<SectionInstance>) =>
    setSections((sections) => sections.map((section) => (section.id === id ? { ...section, ...patch } : section)));

  const errors = useMemo(() => {
    const found: Partial<Record<"name" | "slug" | "route", string>> = {};
    if (draft.name.trim().length < 2) found.name = "Enter a name (at least 2 characters).";
    if (!SLUG_PATTERN.test(draft.slug.trim())) found.slug = "Use lowercase letters, numbers and single dashes, e.g. web-design.";
    if (draft.route.trim() && !draft.route.trim().startsWith("/")) found.route = "Must start with /";
    return found;
  }, [draft.name, draft.slug, draft.route]);

  async function save(closeAfter: boolean) {
    if (Object.keys(errors).length > 0) {
      setTab("general");
      showToast(Object.values(errors)[0] as string, "error");
      return;
    }
    setSaving(true);
    const saved = await onSave(toInput(draft), savedSlug);
    setSaving(false);
    if (!saved) return;

    setSavedSlug(saved.slug);
    setBaseline(JSON.stringify({ ...draft, slug: saved.slug }));
    setDraft((current) => ({ ...current, slug: saved.slug }));
    if (closeAfter) onCancel();
  }

  function leave() {
    if (dirty && !window.confirm("You have unsaved changes. Leave without saving?")) return;
    onCancel();
  }

  const addSection = (type: string) => {
    const section = createSection(type);
    setSections((sections) => [...sections, section]);
    setOpenIds((current) => ({ ...current, [section.id]: true }));
    setTab("sections");
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "general", label: "General" },
    { id: "sections", label: `Sections (${draft.sections.length})` },
    { id: "preview", label: "Live preview" },
    { id: "seo", label: "SEO" },
  ];

  const liveHref = draft.route.trim() || `/archives/services/${draft.slug.trim()}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={leave} className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
          <ArrowLeft size={16} /> Back to services
        </button>
        <div className="flex flex-wrap items-center gap-2.5">
          {dirty && <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">Unsaved changes</span>}
          {!isNew && draft.slug && (
            <a href={liveHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
              <ExternalLink size={14} /> View live
            </a>
          )}
          <Button variant="secondary" onClick={() => save(false)} isLoading={saving} disabled={!dirty && !isNew}>
            Save
          </Button>
          <Button variant="primary" onClick={() => save(true)} isLoading={saving}>
            {isNew ? "Create service" : "Save & close"}
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 pt-4 sm:px-6">
          <div className="pb-3">
            <h2 className="text-lg font-bold tracking-tight text-slate-900">{draft.name.trim() || "New service"}</h2>
            <p className="text-xs text-slate-500">
              Template: <strong className="font-semibold text-slate-700">{template.label}</strong>
              {!template.customizable && !isNew && <span> · presets keep their structure - hide, reorder and edit sections freely</span>}
            </p>
          </div>
          <div className="-mb-px flex gap-1 overflow-x-auto">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`cursor-pointer whitespace-nowrap border-b-2 px-3.5 py-2.5 text-sm font-semibold transition ${
                  tab === item.id ? "border-cyan-500 text-cyan-700" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* ---------------------------- GENERAL ---------------------------- */}
          {tab === "general" && (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <div className="space-y-5">
                <Input
                  label="Service name"
                  required
                  value={draft.name}
                  placeholder="e.g. Website Designing"
                  error={draft.name && errors.name ? errors.name : undefined}
                  onChangeValue={(value) => {
                    set("name", value);
                    if (!slugTouched) set("slug", slugify(value));
                  }}
                />
                <div>
                  <Input
                    label="Page address (slug)"
                    required
                    value={draft.slug}
                    placeholder="website-designing"
                    error={draft.slug && errors.slug ? errors.slug : undefined}
                    hint={`/archives/services/${draft.slug || "…"}`}
                    onChangeValue={(value) => {
                      setSlugTouched(true);
                      set("slug", value.toLowerCase().replace(/[^a-z0-9-]+/g, "-"));
                    }}
                  />
                  {!isNew && draft.slug !== savedSlug && <p className="mt-1.5 text-xs text-amber-600">Changing the slug changes the page URL - old links will stop working.</p>}
                </div>
                <Textarea
                  label="Card description"
                  hint="Shown on the /our-services card"
                  rows={3}
                  value={draft.tagline}
                  onChange={(event) => set("tagline", event.target.value)}
                />
                <FieldsEditor fields={[CARD_IMAGE_FIELD]} value={{ cardImage: draft.cardImage }} onChange={(value) => set("cardImage", String(value.cardImage ?? ""))} />
                <Input
                  label="Custom link (optional)"
                  hint="Where “Read More” points instead of the default page"
                  value={draft.route}
                  placeholder={`/archives/services/${draft.slug || "slug"}`}
                  error={errors.route}
                  onChangeValue={(value) => set("route", value)}
                />
                <div className="flex flex-wrap gap-6 pt-1">
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-700">
                    <input type="checkbox" checked={draft.isActive} onChange={(event) => set("isActive", event.target.checked)} className="h-4 w-4 accent-cyan-600" />
                    Published (visible on the website)
                  </label>
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-700">
                    <input type="checkbox" checked={draft.isFeatured} onChange={(event) => set("isFeatured", event.target.checked)} className="h-4 w-4 accent-cyan-600" />
                    Featured
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-slate-700">Card preview</p>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
                  <div className="relative h-40 bg-slate-800">
                    {draft.cardImage && (
                      <img src={draft.cardImage} alt="" className="h-full w-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white">{draft.name || "Service name"}</h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-300">{draft.tagline || "Card description appears here."}</p>
                    <p className="mt-4 text-xs font-semibold text-cyan-300">Read More →</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------- SECTIONS --------------------------- */}
          {tab === "sections" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs leading-relaxed text-slate-600">
                  {template.customizable
                    ? "This is a Custom page: add any section, remove it, reorder it, or hide it."
                    : "Open a section to edit its text, images and lists. Use the eye to hide a section, the arrows to reorder."}
                </p>
                <div className="flex gap-2">
                  {!template.customizable && (
                    <Button
                      size="sm"
                      variant="outline"
                      icon={<Sparkles size={14} />}
                      onClick={() => {
                        if (window.confirm("Convert to a Custom page? You'll be able to add and remove sections. Your content is kept.")) set("template", "MODULAR_BUILDER");
                      }}
                    >
                      Convert to Custom
                    </Button>
                  )}
                  {template.customizable && (
                    <Button size="sm" variant="cyan" icon={<Plus size={14} />} onClick={() => setLibraryOpen(true)}>
                      Add section
                    </Button>
                  )}
                </div>
              </div>

              {draft.sections.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center">
                  <p className="text-sm font-semibold text-slate-700">No sections yet</p>
                  <p className="mt-1 text-xs text-slate-500">Add your first section to start building the page.</p>
                  <Button className="mt-4" size="sm" variant="cyan" icon={<Plus size={14} />} onClick={() => setLibraryOpen(true)}>
                    Add section
                  </Button>
                </div>
              )}

              <div className="space-y-2.5">
                {draft.sections.map((section, index) => {
                  const def = getSectionDef(section.type);
                  if (!def) return null;
                  const open = !!openIds[section.id];
                  const editable = def.fields.length > 0;
                  return (
                    <div key={section.id} className={`rounded-xl border bg-white ${section.enabled ? "border-slate-200" : "border-dashed border-slate-300 bg-slate-50/70"}`}>
                      <div className="flex items-center gap-1 px-2.5 py-2">
                        <button
                          type="button"
                          onClick={() => setOpenIds((current) => ({ ...current, [section.id]: !open }))}
                          className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-lg px-1.5 py-1 text-left transition hover:bg-slate-50"
                        >
                          {open ? <ChevronDown size={16} className="shrink-0 text-slate-400" /> : <ChevronRight size={16} className="shrink-0 text-slate-400" />}
                          <span className="hidden w-24 shrink-0 sm:block">
                            <SectionWire kind={def.wire} />
                          </span>
                          <span className="min-w-0">
                            <span className={`block truncate text-sm font-bold ${section.enabled ? "text-slate-900" : "text-slate-400"}`}>
                              <span className="mr-2 text-xs font-semibold text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                              {def.label}
                              {!section.enabled && <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-600">Hidden</span>}
                            </span>
                            <span className="block truncate text-xs text-slate-500">{def.description}</span>
                          </span>
                        </button>
                        <button
                          type="button"
                          className={ICON_BTN}
                          onClick={() => updateSection(section.id, { enabled: !section.enabled })}
                          aria-label={section.enabled ? "Hide section" : "Show section"}
                          title={section.enabled ? "Hide on the website" : "Show on the website"}
                        >
                          {section.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button type="button" className={ICON_BTN} disabled={index === 0} onClick={() => setSections((list) => move(list, index, -1))} aria-label="Move up">
                          <ArrowUp size={15} />
                        </button>
                        <button type="button" className={ICON_BTN} disabled={index === draft.sections.length - 1} onClick={() => setSections((list) => move(list, index, 1))} aria-label="Move down">
                          <ArrowDown size={15} />
                        </button>
                        {template.customizable && (
                          <>
                            <button
                              type="button"
                              className={ICON_BTN}
                              aria-label="Duplicate"
                              title="Duplicate"
                              onClick={() =>
                                setSections((list) => {
                                  const copy = { ...createSection(section.type), data: JSON.parse(JSON.stringify(section.data)) };
                                  const next = [...list];
                                  next.splice(index + 1, 0, copy);
                                  return next;
                                })
                              }
                            >
                              <Copy size={15} />
                            </button>
                            <button
                              type="button"
                              className={`${ICON_BTN} hover:text-rose-600`}
                              aria-label="Remove"
                              title="Remove"
                              onClick={() => {
                                if (window.confirm(`Remove “${def.label}” from this page?`)) setSections((list) => list.filter((item) => item.id !== section.id));
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </>
                        )}
                      </div>

                      {open && (
                        <div className="space-y-5 border-t border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                          <FieldsEditor fields={def.fields} value={section.data} onChange={(data) => updateSection(section.id, { data })} />
                          {editable && (
                            <div className="border-t border-slate-200 pt-4">
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm("Replace this section's content with the original sample content?")) updateSection(section.id, { data: createSection(section.type).data });
                                }}
                                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
                              >
                                <RotateCcw size={13} /> Reset to sample content
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {template.customizable && draft.sections.length > 0 && (
                <Button variant="outline" icon={<Plus size={15} />} onClick={() => setLibraryOpen(true)}>
                  Add section
                </Button>
              )}
            </div>
          )}

          {/* ----------------------------- PREVIEW --------------------------- */}
          {tab === "preview" && <LivePreview sections={draft.sections} mainClass={template.mainClass} />}

          {/* ------------------------------- SEO ----------------------------- */}
          {tab === "seo" && (
            <div className="max-w-3xl space-y-5">
              <Input label="Meta title" value={draft.metaTitle} hint={`${draft.metaTitle.length}/60`} placeholder={`${draft.name || "Service"} | Visualytes`} onChangeValue={(value) => set("metaTitle", value)} />
              <Textarea label="Meta description" rows={3} value={draft.metaDescription} hint={`${draft.metaDescription.length}/160`} onChange={(event) => set("metaDescription", event.target.value)} />
              <Input label="Keywords" hint="Separate with commas" value={draft.metaKeywords} onChangeValue={(value) => set("metaKeywords", value)} />
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Search result preview</p>
                <p className="mt-2 truncate text-base font-medium text-blue-700">{draft.metaTitle || `${draft.name || "Service"} | Visualytes`}</p>
                <p className="truncate text-xs text-emerald-700">visualytes.com{liveHref}</p>
                <p className="mt-0.5 line-clamp-2 text-sm text-slate-600">{draft.metaDescription || draft.tagline || "Add a meta description to control this text."}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <SectionLibraryDialog open={libraryOpen} onClose={() => setLibraryOpen(false)} onAdd={addSection} />
    </div>
  );
}
