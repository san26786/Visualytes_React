"use client";

import { useId, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, ImageIcon, Loader2, Plus, Trash2, UploadCloud, X } from "lucide-react";

import { emptyValue, type Node } from "@/src/lib/page-content/schema";

import { useToast } from "../../components/UI/Toast";
import { uploadServiceFile } from "../services/api";

const controlClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs outline-none transition hover:border-slate-300 focus:border-cyan-500 focus:ring-3 focus:ring-cyan-500/15";
const iconButton =
  "flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-30";

type Props = { node: Node; value: unknown; onChange: (value: unknown) => void; depth?: number };

const asString = (value: unknown) => (typeof value === "string" ? value : "");
const asArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);
const asObject = (value: unknown): Record<string, unknown> => (value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {});

function Field({ id, label, hint, children }: { id?: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-xs font-semibold text-slate-700">
          {label}
        </label>
        {hint && <span className="text-right text-[11px] text-slate-400">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Image                                                               */
/* ------------------------------------------------------------------ */

function ImageField({ node, value, onChange }: { node: Extract<Node, { kind: "image" }>; value: string; onChange: (value: string) => void }) {
  const id = useId();
  const { showToast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const upload = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadServiceFile(file));
      showToast("Image uploaded.");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Upload failed.", "error");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <Field id={id} label={node.label} hint={node.hint}>
      <div className="flex gap-3">
        <div className="flex h-20 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-contain" />
          ) : (
            <ImageIcon size={20} className="text-slate-300" />
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder="/uploads/… or /assets/… or https://…" className={`${controlClass} h-10`} />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
              className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              {busy ? <Loader2 size={13} className="animate-spin" /> : <UploadCloud size={13} />}
              Upload
            </button>
            {value && (
              <button type="button" onClick={() => onChange("")} className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg px-2.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100">
                <X size={13} /> Clear
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
          </div>
        </div>
      </div>
    </Field>
  );
}

/* ------------------------------------------------------------------ */
/* Editors                                                             */
/* ------------------------------------------------------------------ */

function StringsEditor({ node, value, onChange }: { node: Extract<Node, { kind: "strings" }>; value: string[]; onChange: (value: string[]) => void }) {
  const move = (index: number, dir: -1 | 1) => {
    const next = [...value];
    if (index + dir < 0 || index + dir >= next.length) return;
    [next[index], next[index + dir]] = [next[index + dir], next[index]];
    onChange(next);
  };

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-xs font-semibold text-slate-700">{node.label}</span>
        {node.hint && <span className="text-[11px] text-slate-400">{node.hint}</span>}
      </div>
      <div className="space-y-2">
        {value.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 px-3 py-4 text-center text-xs text-slate-400">Nothing here yet.</p>}
        {value.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="mt-2.5 w-5 shrink-0 text-right text-[11px] font-semibold text-slate-400">{index + 1}</span>
            {node.multiline ? (
              <textarea
                value={item}
                rows={Math.min(8, Math.max(2, Math.ceil(item.length / 90)))}
                onChange={(e) => onChange(value.map((v, i) => (i === index ? e.target.value : v)))}
                className={`${controlClass} min-h-11 py-2.5 leading-relaxed`}
                aria-label={`${node.itemLabel} ${index + 1}`}
              />
            ) : (
              <input value={item} onChange={(e) => onChange(value.map((v, i) => (i === index ? e.target.value : v)))} className={`${controlClass} h-11`} aria-label={`${node.itemLabel} ${index + 1}`} />
            )}
            <div className="flex shrink-0 flex-col">
              <button type="button" className={iconButton} disabled={index === 0} onClick={() => move(index, -1)} aria-label="Move up">
                <ArrowUp size={14} />
              </button>
              <button type="button" className={iconButton} disabled={index === value.length - 1} onClick={() => move(index, 1)} aria-label="Move down">
                <ArrowDown size={14} />
              </button>
            </div>
            <button type="button" className={`${iconButton} mt-2 hover:bg-rose-50 hover:text-rose-600`} onClick={() => onChange(value.filter((_, i) => i !== index))} aria-label={`Delete ${node.itemLabel.toLowerCase()}`}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, ""])}
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <Plus size={14} /> Add {node.itemLabel.toLowerCase()}
        </button>
      </div>
    </div>
  );
}

function ListEditor({ node, value, onChange }: { node: Extract<Node, { kind: "list" }>; value: Record<string, unknown>[]; onChange: (value: Record<string, unknown>[]) => void }) {
  const [open, setOpen] = useState<number | null>(null);

  const move = (index: number, dir: -1 | 1) => {
    const next = [...value];
    if (index + dir < 0 || index + dir >= next.length) return;
    [next[index], next[index + dir]] = [next[index + dir], next[index]];
    onChange(next);
    setOpen(index + dir);
  };

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {node.label} <span className="ml-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">{value.length}</span>
        </span>
        {node.hint && <span className="text-right text-[11px] text-slate-400">{node.hint}</span>}
      </div>
      <div className="space-y-2">
        {value.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-400">No {node.itemLabel.toLowerCase()}s yet - add the first one below.</p>}
        {value.map((item, index) => {
          const isOpen = open === index;
          const title = asString(item[node.titleField]).trim() || `${node.itemLabel} ${index + 1}`;
          return (
            <div key={index} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-1 p-2 pl-3">
                <button type="button" onClick={() => setOpen(isOpen ? null : index)} className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 text-left" aria-expanded={isOpen}>
                  {isOpen ? <ChevronDown size={16} className="shrink-0 text-slate-400" /> : <ChevronRight size={16} className="shrink-0 text-slate-400" />}
                  <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{index + 1}</span>
                  <span className="truncate text-sm font-semibold text-slate-900">{title.slice(0, 90)}</span>
                </button>
                <button type="button" className={iconButton} disabled={index === 0} onClick={() => move(index, -1)} aria-label="Move up">
                  <ArrowUp size={14} />
                </button>
                <button type="button" className={iconButton} disabled={index === value.length - 1} onClick={() => move(index, 1)} aria-label="Move down">
                  <ArrowDown size={14} />
                </button>
                <button
                  type="button"
                  className={`${iconButton} hover:bg-rose-50 hover:text-rose-600`}
                  aria-label={`Delete ${node.itemLabel.toLowerCase()}`}
                  onClick={() => {
                    if (confirm(`Delete “${title.slice(0, 60)}”?`)) {
                      onChange(value.filter((_, i) => i !== index));
                      setOpen(null);
                    }
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-4">
                  <FieldsGrid fields={node.fields} value={item} onChange={(next) => onChange(value.map((v, i) => (i === index ? next : v)))} />
                </div>
              )}
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => {
            onChange([...value, emptyValue({ kind: "group", label: "", fields: node.fields }) as Record<string, unknown>]);
            setOpen(value.length);
          }}
          className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <Plus size={14} /> Add {node.itemLabel.toLowerCase()}
        </button>
      </div>
    </div>
  );
}

/** Short single-line fields sit two to a row; long / structured ones take the full width. */
const isCompact = (node: Node) => node.kind === "text" && !node.multiline || node.kind === "link" || node.kind === "number" || node.kind === "select" || node.kind === "bool";

function FieldsGrid({ fields, value, onChange }: { fields: Record<string, Node>; value: Record<string, unknown>; onChange: (value: Record<string, unknown>) => void }) {
  return (
    <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
      {Object.entries(fields).map(([key, field]) => (
        <div key={key} className={isCompact(field) ? "" : "md:col-span-2"}>
          <NodeEditor node={field} value={value[key]} onChange={(next) => onChange({ ...value, [key]: next })} depth={1} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Entry point                                                         */
/* ------------------------------------------------------------------ */

export default function NodeEditor({ node, value, onChange, depth = 0 }: Props) {
  const id = useId();

  switch (node.kind) {
    case "text":
      return (
        <Field id={id} label={node.label} hint={node.hint}>
          {node.multiline ? (
            <textarea id={id} value={asString(value)} rows={node.rows ?? 3} placeholder={node.placeholder} onChange={(e) => onChange(e.target.value)} className={`${controlClass} py-2.5 leading-relaxed`} />
          ) : (
            <input id={id} value={asString(value)} placeholder={node.placeholder} onChange={(e) => onChange(e.target.value)} className={`${controlClass} h-11`} />
          )}
        </Field>
      );
    case "link":
      return (
        <Field id={id} label={node.label} hint={node.hint}>
          <input id={id} value={asString(value)} placeholder={node.placeholder ?? "/page or https://…"} onChange={(e) => onChange(e.target.value)} className={`${controlClass} h-11`} />
        </Field>
      );
    case "html":
      return (
        <Field id={id} label={node.label} hint={node.hint}>
          <textarea id={id} value={asString(value)} rows={12} spellCheck={false} onChange={(e) => onChange(e.target.value)} className={`${controlClass} py-2.5 font-mono text-[13px] leading-relaxed`} />
        </Field>
      );
    case "number":
      return (
        <Field id={id} label={node.label} hint={node.hint}>
          <input id={id} type="number" value={typeof value === "number" ? value : 0} onChange={(e) => onChange(Number(e.target.value) || 0)} className={`${controlClass} h-11`} />
        </Field>
      );
    case "bool":
      return (
        <label className="flex h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
          <input type="checkbox" className="h-4 w-4 accent-cyan-600" checked={value === true} onChange={(e) => onChange(e.target.checked)} />
          {node.label}
        </label>
      );
    case "select":
      return (
        <Field id={id} label={node.label} hint={node.hint}>
          <select id={id} value={asString(value)} onChange={(e) => onChange(e.target.value)} className={`${controlClass} h-11`}>
            {node.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      );
    case "image":
      return <ImageField node={node} value={asString(value)} onChange={onChange} />;
    case "strings":
      return <StringsEditor node={node} value={asArray(value).filter((v): v is string => typeof v === "string")} onChange={onChange} />;
    case "list":
      return <ListEditor node={node} value={asArray(value).map(asObject)} onChange={onChange} />;
    case "group": {
      const body = <FieldsGrid fields={node.fields} value={asObject(value)} onChange={onChange} />;
      if (depth > 0) {
        return (
          <fieldset className="rounded-xl border border-slate-200 bg-white p-4">
            <legend className="px-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">{node.label}</legend>
            {body}
          </fieldset>
        );
      }
      // Top level: each section of the page is a collapsible card.
      return (
        <div className="space-y-4">
          {Object.entries(node.fields).map(([key, field], index) => (
            <TopSection key={key} node={field} value={asObject(value)[key]} onChange={(next) => onChange({ ...asObject(value), [key]: next })} defaultOpen={index === 0} />
          ))}
        </div>
      );
    }
  }
}

function TopSection({ node, value, onChange, defaultOpen }: { node: Node; value: unknown; onChange: (value: unknown) => void; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-slate-50" aria-expanded={open}>
        <span className="text-sm font-bold tracking-tight text-slate-900">{node.label}</span>
        {open ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronRight size={18} className="text-slate-400" />}
      </button>
      {open && (
        <div className="border-t border-slate-100 p-5">
          {node.kind === "group" ? <FieldsGrid fields={node.fields} value={asObject(value)} onChange={onChange} /> : <NodeEditor node={node} value={value} onChange={onChange} depth={1} />}
        </div>
      )}
    </section>
  );
}
