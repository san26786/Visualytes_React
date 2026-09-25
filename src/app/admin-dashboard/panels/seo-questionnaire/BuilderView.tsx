"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Eye, EyeOff, ExternalLink, Layers, Plus, RotateCcw, Save, Settings2, Trash2, Undo2 } from "lucide-react";

import {
  ACCOUNT_ICONS,
  FIELD_TYPES,
  FIELD_TYPE_INFO,
  STEP_ICONS,
  SUB_FIELD_TYPES,
  isLayoutType,
  parseConfig,
  type FieldType,
  type QConfig,
  type QField,
  type QStep,
  type SubField,
} from "@/src/lib/seo-questionnaire/config";

import { Button } from "../../components/UI/Button";
import { ConfirmDialog } from "../../components/UI/ConfirmDialog";
import { Input, Textarea } from "../../components/UI/Input";
import { Panel } from "../../components/UI/Panel";
import { useToast } from "../../components/UI/Toast";
import { api } from "./api";

const selectClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-cyan-500 disabled:bg-slate-50 disabled:text-slate-400";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const slugKey = (label: string) => {
  const words = label.replace(/[^a-zA-Z0-9 ]/g, " ").trim().split(/\s+/).filter(Boolean).slice(0, 4);
  const camel = words.map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase())).join("");
  return /^[a-zA-Z]/.test(camel) ? camel.slice(0, 32) : "";
};

const allFields = (config: QConfig) => config.steps.flatMap((step) => step.fields.map((field) => ({ field, step })));

function uniqueKey(config: QConfig, base: string) {
  const taken = new Set(allFields(config).map(({ field }) => field.key));
  let key = base || "field";
  let n = 2;
  while (taken.has(key)) key = `${base || "field"}${n++}`;
  return key;
}

function newField(config: QConfig, type: FieldType): QField {
  const label = FIELD_TYPE_INFO[type].label;
  const base: QField = {
    key: uniqueKey(config, slugKey(label) || "field"),
    label: type === "heading" ? "New section" : type === "note" ? "Write your note here." : `New ${label.toLowerCase()}`,
    type,
    enabled: true,
    required: false,
    width: ["heading", "note", "plans", "repeater", "account", "tags", "textarea"].includes(type) ? "full" : "half",
  };
  if (type === "select") base.options = ["Option 1", "Option 2"];
  if (type === "tags") base.maxLength = 10;
  if (type === "textarea") base.rows = 4;
  if (type === "note") base.tone = "info";
  if (type === "account") base.icon = "generic";
  if (type === "repeater") {
    base.rows = 3;
    base.requiredRows = 1;
    base.itemLabel = "Item";
    base.subFields = [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "url", label: "Website", type: "url", required: false },
    ];
  }
  return base;
}

const Toggle = ({ checked, onChange, children, disabled }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode; disabled?: boolean }) => (
  <label className={`flex items-center gap-2 text-xs font-semibold text-slate-700 ${disabled ? "opacity-50" : "cursor-pointer"}`}>
    <input type="checkbox" className="h-4 w-4 accent-cyan-600" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
    {children}
  </label>
);

const Label = ({ children }: { children: React.ReactNode }) => <span className="mb-1.5 block text-xs font-semibold text-slate-700">{children}</span>;

/* ------------------------------------------------------------------ */
/* One field                                                           */
/* ------------------------------------------------------------------ */

function FieldEditor({
  field,
  config,
  onChange,
}: {
  field: QField;
  config: QConfig;
  onChange: (patch: Partial<QField>) => void;
}) {
  const type = field.type;
  const layout = isLayoutType(type);
  const others = allFields(config).filter(({ field: other }) => other.key !== field.key && !isLayoutType(other.type) && !["account", "tags", "repeater"].includes(other.type));
  const target = others.find(({ field: other }) => other.key === field.showIf?.field)?.field;

  const setSub = (index: number, patch: Partial<SubField>) => onChange({ subFields: (field.subFields ?? []).map((s, i) => (i === index ? { ...s, ...patch } : s)) });

  return (
    <div className="space-y-4 border-t border-slate-100 bg-slate-50/50 p-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="md:col-span-2">
          {type === "note" ? (
            <Textarea label="Note text" value={field.label} onChange={(e) => onChange({ label: e.target.value })} className="min-h-24" />
          ) : (
            <Input label={type === "heading" ? "Heading" : type === "checkbox" ? "Checkbox title" : "Label"} value={field.label} onChange={(e) => onChange({ label: e.target.value })} />
          )}
        </div>
        <Input label="Field key" hint="letters, numbers, _" value={field.key} onChange={(e) => onChange({ key: e.target.value.replace(/[^a-zA-Z0-9_]/g, "") })} />
        <div>
          <Label>Type</Label>
          <select
            className={selectClass}
            value={type}
            onChange={(e) => {
              const next = e.target.value as FieldType;
              const fresh = newField(config, next);
              onChange({
                type: next,
                options: fresh.options,
                maxLength: ["text", "textarea", "tags"].includes(next) ? field.maxLength ?? fresh.maxLength : undefined,
                rows: fresh.rows,
                tone: fresh.tone,
                icon: fresh.icon,
                subFields: fresh.subFields,
                itemLabel: fresh.itemLabel,
                requiredRows: fresh.requiredRows,
                required: isLayoutType(next) ? false : field.required,
              });
            }}
          >
            {FIELD_TYPES.map((t) => (
              <option key={t} value={t}>
                {FIELD_TYPE_INFO[t].label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-[11px] text-slate-400">{FIELD_TYPE_INFO[type].description}</p>
        </div>

        {!layout && (
          <div>
            <Label>Width</Label>
            <select className={selectClass} value={field.width} onChange={(e) => onChange({ width: e.target.value as QField["width"] })}>
              <option value="half">Half</option>
              <option value="full">Full</option>
            </select>
          </div>
        )}

        {["text", "email", "tel", "url", "textarea", "password", "select", "tags", "plans"].includes(type) && (
          <div className="md:col-span-2">
            <Input label="Placeholder" value={field.placeholder ?? ""} onChange={(e) => onChange({ placeholder: e.target.value })} />
          </div>
        )}
        {type !== "note" && (
          <div className="md:col-span-2">
            <Input label={type === "heading" ? "Sub-text" : "Helper text"} value={field.hint ?? ""} onChange={(e) => onChange({ hint: e.target.value })} />
          </div>
        )}

        {["text", "textarea"].includes(type) && (
          <Input label="Max characters" type="number" min={1} value={field.maxLength ?? ""} onChange={(e) => onChange({ maxLength: e.target.value ? Number(e.target.value) : undefined })} />
        )}
        {type === "tags" && <Input label="Max items" type="number" min={1} value={field.maxLength ?? 30} onChange={(e) => onChange({ maxLength: Number(e.target.value) || 1 })} />}
        {type === "textarea" && <Input label="Visible rows" type="number" min={1} max={20} value={field.rows ?? 4} onChange={(e) => onChange({ rows: Number(e.target.value) || 4 })} />}
        {type === "text" && <Input label="Starts with" hint="default value" value={field.defaultValue ?? ""} onChange={(e) => onChange({ defaultValue: e.target.value })} />}
        {(type === "text" || type === "email") && (
          <div>
            <Label>Pre-fill from sign-in</Label>
            <select className={selectClass} value={field.prefill ?? ""} onChange={(e) => onChange({ prefill: (e.target.value || undefined) as QField["prefill"] })}>
              <option value="">Nothing</option>
              <option value="name">The user&apos;s name</option>
              <option value="email">The user&apos;s email</option>
            </select>
          </div>
        )}
        {type === "note" && (
          <div>
            <Label>Style</Label>
            <select className={selectClass} value={field.tone ?? "info"} onChange={(e) => onChange({ tone: e.target.value as QField["tone"] })}>
              <option value="info">Information (blue)</option>
              <option value="secure">Security (green)</option>
            </select>
          </div>
        )}
        {type === "account" && (
          <div>
            <Label>Icon</Label>
            <select className={selectClass} value={field.icon ?? "generic"} onChange={(e) => onChange({ icon: e.target.value as QField["icon"] })}>
              {ACCOUNT_ICONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {type === "select" && (
        <div>
          <Textarea
            label="Options"
            hint="One per line"
            className="min-h-28"
            value={(field.options ?? []).join("\n")}
            onChange={(e) => onChange({ options: e.target.value.split("\n").map((o) => o.trim()).filter(Boolean) })}
          />
          <div className="mt-3 max-w-xs">
            <Label>Starts on</Label>
            <select className={selectClass} value={field.defaultValue ?? ""} onChange={(e) => onChange({ defaultValue: e.target.value || undefined })}>
              <option value="">Nothing selected</option>
              {(field.options ?? []).map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {type === "repeater" && (
        <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="grid gap-3 md:grid-cols-3">
            <Input label="Row name" hint="e.g. Competitor" value={field.itemLabel ?? ""} onChange={(e) => onChange({ itemLabel: e.target.value })} />
            <Input label="Number of rows" type="number" min={1} max={20} value={field.rows ?? 3} onChange={(e) => onChange({ rows: Math.min(Math.max(Number(e.target.value) || 1, 1), 20) })} />
            <Input label="Rows that must be filled" type="number" min={0} max={20} value={field.requiredRows ?? 0} onChange={(e) => onChange({ requiredRows: Math.max(Number(e.target.value) || 0, 0) })} />
          </div>
          <p className="text-xs font-semibold text-slate-700">Columns in each row</p>
          {(field.subFields ?? []).map((sub, index) => (
            <div key={index} className="grid items-end gap-2 md:grid-cols-[1.2fr_1fr_1fr_1.4fr_auto_auto]">
              <Input label={index === 0 ? "Label" : undefined} value={sub.label} onChange={(e) => setSub(index, { label: e.target.value })} />
              <Input label={index === 0 ? "Key" : undefined} value={sub.key} onChange={(e) => setSub(index, { key: e.target.value.replace(/[^a-zA-Z0-9_]/g, "") })} />
              <div>
                {index === 0 && <Label>Type</Label>}
                <select className={selectClass} value={sub.type} onChange={(e) => setSub(index, { type: e.target.value as SubField["type"] })}>
                  {SUB_FIELD_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <Input label={index === 0 ? "Placeholder" : undefined} value={sub.placeholder ?? ""} onChange={(e) => setSub(index, { placeholder: e.target.value })} />
              <div className="pb-3">
                <Toggle checked={sub.required} onChange={(v) => setSub(index, { required: v })}>
                  Required
                </Toggle>
              </div>
              <Button size="sm" variant="danger" aria-label="Remove column" disabled={(field.subFields?.length ?? 0) <= 1} onClick={() => onChange({ subFields: (field.subFields ?? []).filter((_, i) => i !== index) })} icon={<Trash2 size={14} />}>
                {""}
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            variant="outline"
            disabled={(field.subFields?.length ?? 0) >= 6}
            icon={<Plus size={14} />}
            onClick={() => onChange({ subFields: [...(field.subFields ?? []), { key: `col${(field.subFields?.length ?? 0) + 1}`, label: "New column", type: "text", required: false }] })}
          >
            Add column
          </Button>
        </div>
      )}

      {/* Conditional display */}
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-3">
        <Toggle
          checked={!!field.showIf}
          onChange={(v) => onChange({ showIf: v ? { field: others[0]?.field.key ?? "", equals: "true" } : undefined })}
          disabled={others.length === 0}
        >
          Only show this when another answer matches
        </Toggle>
        {field.showIf && (
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div>
              <Label>When this field…</Label>
              <select className={selectClass} value={field.showIf.field} onChange={(e) => onChange({ showIf: { field: e.target.value, equals: "true" } })}>
                {others.map(({ field: other, step }) => (
                  <option key={other.key} value={other.key}>
                    {other.label.slice(0, 50)} - {step.short || step.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>…equals</Label>
              {target && (target.type === "yesno" || target.type === "checkbox") ? (
                <select className={selectClass} value={field.showIf.equals} onChange={(e) => onChange({ showIf: { field: field.showIf!.field, equals: e.target.value } })}>
                  <option value="true">Yes / ticked</option>
                  <option value="false">No / not ticked</option>
                </select>
              ) : target?.type === "select" ? (
                <select className={selectClass} value={field.showIf.equals} onChange={(e) => onChange({ showIf: { field: field.showIf!.field, equals: e.target.value } })}>
                  <option value="">(choose)</option>
                  {(target.options ?? []).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input className={selectClass} value={field.showIf.equals} onChange={(e) => onChange({ showIf: { field: field.showIf!.field, equals: e.target.value } })} />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-5">
        {!layout && (
          <Toggle checked={field.required} onChange={(v) => onChange({ required: v })} disabled={type === "yesno" || type === "account" || type === "repeater"}>
            {type === "checkbox" ? "Must be ticked to continue" : "Required"}
          </Toggle>
        )}
        <Toggle checked={field.enabled} onChange={(v) => onChange({ enabled: v })}>
          Shown on the website
        </Toggle>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The builder                                                         */
/* ------------------------------------------------------------------ */

type Props = { initial: QConfig; customised: boolean; defaults: QConfig; onSaved: (config: QConfig, customised: boolean) => void };

export default function BuilderView({ initial, customised, defaults, onSaved }: Props) {
  const { showToast } = useToast();
  const [draft, setDraft] = useState<QConfig>(() => clone(initial));
  const [saved, setSaved] = useState<QConfig>(() => clone(initial));
  const [stepIndex, setStepIndex] = useState<number | "settings">(0);
  const [openField, setOpenField] = useState<string | null>(null);
  const [newType, setNewType] = useState<FieldType>("text");
  const [saving, setSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [isCustom, setIsCustom] = useState(customised);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved]);
  const step = typeof stepIndex === "number" ? draft.steps[stepIndex] : undefined;

  const patchStep = (index: number, patch: Partial<QStep>) => setDraft((d) => ({ ...d, steps: d.steps.map((s, i) => (i === index ? { ...s, ...patch } : s)) }));
  const patchField = (si: number, fi: number, patch: Partial<QField>) => {
    const before = draft.steps[si].fields[fi];
    let steps = draft.steps.map((s, i) => (i === si ? { ...s, fields: s.fields.map((f, j) => (j === fi ? { ...f, ...patch } : f)) } : s));
    let settings = draft.settings;
    // Keep pointers (settings, "show if") in step when a key is renamed.
    if (patch.key !== undefined && patch.key !== before.key) {
      const renamed = patch.key;
      settings = Object.fromEntries(Object.entries(draft.settings).map(([k, v]) => [k, v === before.key ? renamed : v])) as QConfig["settings"];
      steps = steps.map((s) => ({ ...s, fields: s.fields.map((f) => (f.showIf?.field === before.key ? { ...f, showIf: { ...f.showIf, field: renamed } } : f)) }));
      if (openField === before.key) setOpenField(renamed);
    }
    setDraft({ steps, settings });
  };

  const move = <T,>(list: T[], index: number, dir: -1 | 1) => {
    const next = [...list];
    if (index + dir < 0 || index + dir >= next.length) return next;
    [next[index], next[index + dir]] = [next[index + dir], next[index]];
    return next;
  };

  const addStep = () => {
    const id = `step${Date.now().toString(36)}`;
    setDraft((d) => ({ ...d, steps: [...d.steps, { id, title: "New step", short: "New", description: "", icon: "file", enabled: true, fields: [] }] }));
    setStepIndex(draft.steps.length);
  };

  const removeStep = (index: number) => {
    setDraft((d) => ({ ...d, steps: d.steps.filter((_, i) => i !== index) }));
    setStepIndex(Math.max(0, index - 1));
  };

  const addField = () => {
    if (typeof stepIndex !== "number") return;
    const field = newField(draft, newType);
    setDraft((d) => ({ ...d, steps: d.steps.map((s, i) => (i === stepIndex ? { ...s, fields: [...s.fields, field] } : s)) }));
    setOpenField(field.key);
  };

  const save = async () => {
    const parsed = parseConfig(draft);
    if (!parsed.ok) {
      showToast(parsed.message, "error");
      return;
    }
    try {
      setSaving(true);
      const result = await api<{ config: QConfig }>("/api/admin/seo-questionnaire/config", { method: "PUT", body: JSON.stringify(parsed.config) });
      setDraft(clone(result.config));
      setSaved(clone(result.config));
      setIsCustom(true);
      onSaved(result.config, true);
      showToast("Questionnaire saved. It is live on the website now.");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to save the questionnaire.", "error");
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    try {
      setResetting(true);
      const result = await api<{ config: QConfig }>("/api/admin/seo-questionnaire/config", { method: "DELETE" });
      setDraft(clone(result.config));
      setSaved(clone(result.config));
      setIsCustom(false);
      setStepIndex(0);
      setOpenField(null);
      onSaved(result.config, false);
      setConfirmReset(false);
      showToast("Restored the original 7-step questionnaire.");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to reset.", "error");
    } finally {
      setResetting(false);
    }
  };

  const actions = (
    <div className="flex flex-wrap items-center gap-3">
      {dirty && <span className="text-xs font-semibold text-amber-600">Unsaved changes</span>}
      <Button variant="outline" disabled={!dirty} icon={<Undo2 size={16} />} onClick={() => setDraft(clone(saved))}>
        Discard
      </Button>
      <Button onClick={save} isLoading={saving} disabled={!dirty} icon={<Save size={16} />}>
        Save &amp; publish
      </Button>
    </div>
  );

  const eligible = (types: FieldType[]) => draft.steps.flatMap((s) => s.fields.filter((f) => types.includes(f.type)));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/50 p-4 text-xs text-cyan-900">
        <p className="max-w-2xl leading-relaxed">
          Everything the client sees on <strong>/seo-questionnaire</strong> comes from here: steps, fields, options and rules. Changes go live the moment you save. Old responses keep the wording they were submitted with.
          {!isCustom && <span className="ml-1 font-semibold">Currently showing the built-in default.</span>}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a href="/seo-questionnaire" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-200 bg-white px-3 py-1.5 font-semibold text-cyan-800 hover:bg-cyan-50">
            Open the live form <ExternalLink size={12} />
          </a>
        </div>
      </div>
      <div className="flex justify-end">{actions}</div>

      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        {/* Steps */}
        <Panel title="Steps" description="Order = order the client sees them" icon={<Layers size={18} className="text-indigo-600" />} className="self-start">
          <div className="space-y-2">
            {draft.steps.map((s, index) => (
              <div key={s.id} className={`rounded-xl border p-3 transition ${stepIndex === index ? "border-2 border-cyan-500 bg-cyan-50/40" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                <button type="button" onClick={() => setStepIndex(index)} className="flex w-full cursor-pointer items-center gap-3 text-left">
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${s.enabled ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-500"}`}>{index + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-sm font-semibold ${s.enabled ? "text-slate-900" : "text-slate-400 line-through"}`}>{s.title}</span>
                    <span className="text-[11px] text-slate-400">{s.fields.filter((f) => !isLayoutType(f.type)).length === 1 ? "1 question" : `${s.fields.filter((f) => !isLayoutType(f.type)).length} questions`}</span>
                  </span>
                </button>
                {stepIndex === index && (
                  <div className="mt-2 flex items-center gap-1 border-t border-slate-100 pt-2">
                    <Button size="sm" variant="ghost" disabled={index === 0} aria-label="Move step up" icon={<ArrowUp size={14} />} onClick={() => { setDraft((d) => ({ ...d, steps: move(d.steps, index, -1) })); setStepIndex(index - 1); }}>{""}</Button>
                    <Button size="sm" variant="ghost" disabled={index === draft.steps.length - 1} aria-label="Move step down" icon={<ArrowDown size={14} />} onClick={() => { setDraft((d) => ({ ...d, steps: move(d.steps, index, 1) })); setStepIndex(index + 1); }}>{""}</Button>
                    <Button size="sm" variant="ghost" aria-label={s.enabled ? "Hide step" : "Show step"} icon={s.enabled ? <Eye size={14} /> : <EyeOff size={14} />} onClick={() => patchStep(index, { enabled: !s.enabled })}>{""}</Button>
                    <span className="flex-1" />
                    <Button size="sm" variant="danger" disabled={draft.steps.length <= 1} aria-label="Delete step" icon={<Trash2 size={14} />} onClick={() => { if (confirm(`Delete the step "${s.title}" and all its questions?`)) removeStep(index); }}>{""}</Button>
                  </div>
                )}
              </div>
            ))}
            <Button variant="outline" className="w-full" icon={<Plus size={16} />} onClick={addStep}>
              Add step
            </Button>
            <button
              type="button"
              onClick={() => setStepIndex("settings")}
              className={`mt-3 flex w-full cursor-pointer items-center gap-3 rounded-xl border p-3 text-left text-sm font-semibold transition ${stepIndex === "settings" ? "border-2 border-cyan-500 bg-cyan-50/40 text-slate-900" : "border-slate-200 text-slate-700 hover:border-slate-300"}`}
            >
              <Settings2 size={16} className="text-slate-500" />
              Settings &amp; emails
            </button>
          </div>
        </Panel>

        {/* Editor */}
        {step && typeof stepIndex === "number" && (
          <Panel title={step.title || "Untitled step"} description={`Step ${stepIndex + 1} of ${draft.steps.length}`} icon={<ChevronRight size={18} className="text-cyan-600" />}>
            <div className="space-y-6">
              <div className="grid gap-3 md:grid-cols-2">
                <Input label="Step title" value={step.title} onChange={(e) => patchStep(stepIndex, { title: e.target.value })} />
                <Input label="Short name" hint="shown on small screens" value={step.short} onChange={(e) => patchStep(stepIndex, { short: e.target.value })} />
                <div className="md:col-span-2">
                  <Input label="Description" value={step.description} onChange={(e) => patchStep(stepIndex, { description: e.target.value })} />
                </div>
                <div>
                  <Label>Stepper icon</Label>
                  <select className={selectClass} value={step.icon} onChange={(e) => patchStep(stepIndex, { icon: e.target.value as QStep["icon"] })}>
                    {STEP_ICONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end pb-3">
                  <Toggle checked={step.enabled} onChange={(v) => patchStep(stepIndex, { enabled: v })}>
                    Show this step to clients
                  </Toggle>
                </div>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-sm font-bold text-slate-900">Questions in this step</h3>
                {step.fields.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-400">No questions yet - add one below.</p>}
                {step.fields.map((field, fi) => {
                  const open = openField === field.key;
                  return (
                    <div key={fi} className={`overflow-hidden rounded-xl border ${field.enabled ? "border-slate-200 bg-white" : "border-dashed border-slate-300 bg-slate-50"}`}>
                      <div className="flex items-center gap-2 p-3">
                        <button type="button" onClick={() => setOpenField(open ? null : field.key)} className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left" aria-expanded={open}>
                          {open ? <ChevronDown size={16} className="shrink-0 text-slate-400" /> : <ChevronRight size={16} className="shrink-0 text-slate-400" />}
                          <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">{FIELD_TYPE_INFO[field.type].label}</span>
                          <span className={`truncate text-sm font-semibold ${field.enabled ? "text-slate-900" : "text-slate-400"}`}>{field.label.slice(0, 80) || "(no label)"}</span>
                          {field.required && <span className="shrink-0 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-600">Required</span>}
                          {field.showIf && <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Conditional</span>}
                          {!field.enabled && <span className="shrink-0 text-[10px] font-semibold text-slate-400">Hidden</span>}
                        </button>
                        <div className="flex shrink-0 items-center">
                          <Button size="sm" variant="ghost" disabled={fi === 0} aria-label="Move up" icon={<ArrowUp size={14} />} onClick={() => setDraft((d) => ({ ...d, steps: d.steps.map((s, i) => (i === stepIndex ? { ...s, fields: move(s.fields, fi, -1) } : s)) }))}>{""}</Button>
                          <Button size="sm" variant="ghost" disabled={fi === step.fields.length - 1} aria-label="Move down" icon={<ArrowDown size={14} />} onClick={() => setDraft((d) => ({ ...d, steps: d.steps.map((s, i) => (i === stepIndex ? { ...s, fields: move(s.fields, fi, 1) } : s)) }))}>{""}</Button>
                          <Button size="sm" variant="ghost" aria-label={field.enabled ? "Hide" : "Show"} icon={field.enabled ? <Eye size={14} /> : <EyeOff size={14} />} onClick={() => patchField(stepIndex, fi, { enabled: !field.enabled })}>{""}</Button>
                          <Button size="sm" variant="danger" aria-label="Delete question" icon={<Trash2 size={14} />} onClick={() => { if (confirm(`Delete "${field.label.slice(0, 60)}"?`)) setDraft((d) => ({ ...d, steps: d.steps.map((s, i) => (i === stepIndex ? { ...s, fields: s.fields.filter((_, j) => j !== fi) } : s)) })); }}>{""}</Button>
                        </div>
                      </div>
                      {open && <FieldEditor field={field} config={draft} onChange={(patch) => patchField(stepIndex, fi, patch)} />}
                    </div>
                  );
                })}

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <select className={`${selectClass} max-w-56`} value={newType} onChange={(e) => setNewType(e.target.value as FieldType)} aria-label="Type of question to add">
                    {FIELD_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {FIELD_TYPE_INFO[t].label}
                      </option>
                    ))}
                  </select>
                  <Button variant="outline" icon={<Plus size={16} />} onClick={addField}>
                    Add question
                  </Button>
                </div>
              </div>
            </div>
          </Panel>
        )}

        {stepIndex === "settings" && (
          <Panel title="Settings & emails" description="Which answers identify the client, and who is notified" icon={<Settings2 size={18} className="text-cyan-600" />}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Client&apos;s name is…</Label>
                <select className={selectClass} value={draft.settings.nameKey} onChange={(e) => setDraft((d) => ({ ...d, settings: { ...d.settings, nameKey: e.target.value } }))}>
                  {eligible(["text"]).map((f) => (
                    <option key={f.key} value={f.key}>
                      {f.label} ({f.key})
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-[11px] text-slate-400">Used in the greeting and the responses list. Short-text questions only.</p>
              </div>
              <div>
                <Label>Client&apos;s email is…</Label>
                <select className={selectClass} value={draft.settings.emailKey} onChange={(e) => setDraft((d) => ({ ...d, settings: { ...d.settings, emailKey: e.target.value } }))}>
                  {eligible(["email"]).map((f) => (
                    <option key={f.key} value={f.key}>
                      {f.label} ({f.key})
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-[11px] text-slate-400">A copy of the answers is emailed here. Must be a required Email question.</p>
              </div>
              <div>
                <Label>Business name is… (optional)</Label>
                <select className={selectClass} value={draft.settings.businessKey} onChange={(e) => setDraft((d) => ({ ...d, settings: { ...d.settings, businessKey: e.target.value } }))}>
                  <option value="">None</option>
                  {eligible(["text"]).map((f) => (
                    <option key={f.key} value={f.key}>
                      {f.label} ({f.key})
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-[11px] text-slate-400">Used in the email subject and the PDF heading.</p>
              </div>
              <div>
                <Input
                  label="Also notify this address (optional)"
                  type="email"
                  placeholder="seo-team@yourcompany.com"
                  value={draft.settings.teamEmail}
                  onChange={(e) => setDraft((d) => ({ ...d, settings: { ...d.settings, teamEmail: e.target.value } }))}
                />
                <p className="mt-1 text-[11px] text-slate-400">The team notification always goes to the site&apos;s main mail address too.</p>
              </div>
            </div>
          </Panel>
        )}
      </div>

      {/* Save bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
        <Button variant="ghost" icon={<RotateCcw size={16} />} onClick={() => setConfirmReset(true)} disabled={!isCustom && JSON.stringify(defaults) === JSON.stringify(draft)}>
          Restore original questionnaire
        </Button>
        {actions}
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Restore the original questionnaire?"
        description="Every step and question you customised is replaced by the original 7-step questionnaire on the live website. Past responses are not affected."
        confirmLabel="Restore"
        loading={resetting}
        onConfirm={reset}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}
