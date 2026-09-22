"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Copy, ImageIcon, Loader2, Plus, Trash2, UploadCloud } from "lucide-react";

import { normalizeData } from "@/src/lib/services/sections/normalize";
import type { FieldDef, SectionData } from "@/src/lib/services/sections/types";
import { useToast } from "../../components/UI/Toast";
import { uploadServiceFile } from "./api";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs outline-none transition hover:border-slate-300 focus:border-cyan-500 focus:ring-3 focus:ring-cyan-500/15";

const iconBtn =
  "flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-30";

function Label({ field }: { field: FieldDef }) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <label className="text-xs font-semibold text-slate-700">{field.label}</label>
      {field.help && <span className="text-right text-[11px] text-slate-400">{field.help}</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Image / video                                                       */
/* ------------------------------------------------------------------ */

function isVideoUrl(value: string) {
  return /\.(mp4|webm)$/i.test(value);
}

function MediaField({ field, value, onChange }: { field: FieldDef; value: string; onChange: (value: string) => void }) {
  const { showToast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const video = field.type === "video" || isVideoUrl(value);

  const upload = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadServiceFile(file));
      showToast("Uploaded to /uploads/services.", "success");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Upload failed.", "error");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div>
      <Label field={field} />
      <div className="flex gap-3">
        <div className="flex h-20 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {value ? (
            video ? (
              <video src={value} className="h-full w-full object-cover" muted />
            ) : (
              <img src={value} alt="" className="h-full w-full object-contain" />
            )
          ) : (
            <ImageIcon size={20} className="text-slate-300" />
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={video ? "/uploads/services/video.mp4" : "/uploads/services/image.png or /assets/…"}
            className={`${inputClass} h-10`}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              {busy ? <Loader2 size={13} className="animate-spin" /> : <UploadCloud size={13} />}
              {busy ? "Uploading…" : "Upload"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="cursor-pointer text-xs font-semibold text-slate-500 transition hover:text-rose-600"
              >
                Remove
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              hidden
              accept={video ? "video/mp4,video/webm" : "image/png,image/jpeg,image/webp,image/avif,image/gif"}
              onChange={(event) => upload(event.target.files?.[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* List of plain strings                                               */
/* ------------------------------------------------------------------ */

function StringsField({
  field,
  value,
  onChange,
}: {
  field: Extract<FieldDef, { type: "strings" }>;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const set = (index: number, next: string) => onChange(value.map((item, i) => (i === index ? next : item)));
  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div>
      <Label field={field} />
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="flex items-start gap-1.5">
            <span className="mt-2.5 w-5 shrink-0 text-center text-[11px] font-semibold text-slate-400">{index + 1}</span>
            {field.multiline ? (
              <textarea
                value={item}
                onChange={(event) => set(index, event.target.value)}
                rows={3}
                placeholder={field.itemLabel ?? "Item"}
                className={`${inputClass} py-2.5 leading-relaxed`}
              />
            ) : (
              <input
                value={item}
                onChange={(event) => set(index, event.target.value)}
                placeholder={field.itemLabel ?? "Item"}
                className={`${inputClass} h-10`}
              />
            )}
            <div className="flex shrink-0 pt-1">
              <button type="button" className={iconBtn} disabled={index === 0} onClick={() => move(index, -1)} aria-label="Move up">
                <ArrowUp size={14} />
              </button>
              <button type="button" className={iconBtn} disabled={index === value.length - 1} onClick={() => move(index, 1)} aria-label="Move down">
                <ArrowDown size={14} />
              </button>
              <button type="button" className={`${iconBtn} hover:text-rose-600`} onClick={() => onChange(value.filter((_, i) => i !== index))} aria-label="Remove">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...value, ""])}
        className="mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-cyan-400 hover:text-cyan-700"
      >
        <Plus size={13} /> Add {(field.itemLabel ?? "item").toLowerCase()}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* List of objects                                                     */
/* ------------------------------------------------------------------ */

function ListField({
  field,
  value,
  onChange,
}: {
  field: Extract<FieldDef, { type: "list" }>;
  value: SectionData[];
  onChange: (value: SectionData[]) => void;
}) {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const rowTitle = (item: SectionData, index: number) => {
    const raw = field.titleKey ? item[field.titleKey] : undefined;
    const text = typeof raw === "string" ? raw.trim() : "";
    return text || `${field.itemLabel} ${index + 1}`;
  };

  const setItem = (index: number, next: SectionData) => onChange(value.map((item, i) => (i === index ? next : item)));
  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
    setOpen({});
  };
  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
    setOpen({});
  };
  const duplicate = (index: number) => {
    const next = [...value];
    next.splice(index + 1, 0, JSON.parse(JSON.stringify(value[index])) as SectionData);
    onChange(next);
    setOpen({});
  };
  const add = () => {
    onChange([...value, normalizeData(field.fields, {})]);
    setOpen({ [value.length]: true });
  };

  return (
    <div>
      <Label field={field} />
      <div className="space-y-2">
        {value.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-200 px-4 py-3 text-xs text-slate-400">
            No {field.itemLabel.toLowerCase()}s yet.
          </p>
        )}
        {value.map((item, index) => {
          const isOpen = !!open[index];
          return (
            <div key={index} className="rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-1 px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => setOpen((current) => ({ ...current, [index]: !isOpen }))}
                  className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 text-left transition hover:bg-slate-50"
                >
                  {isOpen ? <ChevronDown size={15} className="shrink-0 text-slate-400" /> : <ChevronRight size={15} className="shrink-0 text-slate-400" />}
                  <span className="w-5 shrink-0 text-[11px] font-semibold text-slate-400">{index + 1}</span>
                  <span className="truncate text-sm font-medium text-slate-800">{rowTitle(item, index)}</span>
                </button>
                <button type="button" className={iconBtn} disabled={index === 0} onClick={() => move(index, -1)} aria-label="Move up">
                  <ArrowUp size={14} />
                </button>
                <button type="button" className={iconBtn} disabled={index === value.length - 1} onClick={() => move(index, 1)} aria-label="Move down">
                  <ArrowDown size={14} />
                </button>
                <button type="button" className={iconBtn} onClick={() => duplicate(index)} aria-label="Duplicate">
                  <Copy size={14} />
                </button>
                <button type="button" className={`${iconBtn} hover:text-rose-600`} onClick={() => remove(index)} aria-label="Remove">
                  <Trash2 size={14} />
                </button>
              </div>
              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-4">
                  <FieldsEditor fields={field.fields} value={item} onChange={(next) => setItem(index, next)} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-cyan-400 hover:text-cyan-700"
      >
        <Plus size={13} /> Add {field.itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Single field + field group                                          */
/* ------------------------------------------------------------------ */

function FieldEditor({ field, value, onChange }: { field: FieldDef; value: unknown; onChange: (value: unknown) => void }) {
  switch (field.type) {
    case "textarea":
      return (
        <div>
          <Label field={field} />
          <textarea
            value={typeof value === "string" ? value : ""}
            onChange={(event) => onChange(event.target.value)}
            rows={4}
            placeholder={field.placeholder}
            className={`${inputClass} py-2.5 leading-relaxed`}
          />
        </div>
      );
    case "number":
      return (
        <div>
          <Label field={field} />
          <input
            type="number"
            value={typeof value === "number" ? value : 0}
            onChange={(event) => onChange(event.target.value === "" ? 0 : Number(event.target.value))}
            className={`${inputClass} h-10`}
          />
        </div>
      );
    case "boolean":
      return (
        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-700">
          <input type="checkbox" checked={value === true} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-cyan-600" />
          {field.label}
        </label>
      );
    case "select":
      return (
        <div>
          <Label field={field} />
          <select
            value={typeof value === "string" ? value : ""}
            onChange={(event) => onChange(event.target.value)}
            className={`${inputClass} h-10 cursor-pointer`}
          >
            {!field.options.some((option) => option.value === value) && <option value={typeof value === "string" ? value : ""}>{typeof value === "string" && value ? value : "Choose…"}</option>}
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    case "image":
    case "video":
      return <MediaField field={field} value={typeof value === "string" ? value : ""} onChange={onChange} />;
    case "strings":
      return <StringsField field={field} value={Array.isArray(value) ? (value as string[]) : []} onChange={onChange} />;
    case "list":
      return <ListField field={field} value={Array.isArray(value) ? (value as SectionData[]) : []} onChange={onChange} />;
    default:
      return (
        <div>
          <Label field={field} />
          <input
            value={typeof value === "string" ? value : ""}
            onChange={(event) => onChange(event.target.value)}
            placeholder={field.placeholder}
            className={`${inputClass} h-10`}
          />
        </div>
      );
  }
}

/** Renders every field of a section (or list row) and reports the whole updated object. */
export function FieldsEditor({ fields, value, onChange }: { fields: FieldDef[]; value: SectionData; onChange: (value: SectionData) => void }) {
  if (fields.length === 0) {
    return <p className="text-sm text-slate-500">This block pulls live content from another admin tab, so it has no fields to edit here.</p>;
  }

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <FieldEditor key={field.key} field={field} value={value[field.key]} onChange={(next) => onChange({ ...value, [field.key]: next })} />
      ))}
    </div>
  );
}
