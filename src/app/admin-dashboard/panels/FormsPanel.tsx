"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ClipboardList,
  Download,
  Eye,
  EyeOff,
  FileText,
  Plus,
  Save,
  Search,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { FormDefinition, Submission } from "../types/dashboard";
import { Panel } from "../components/UI/Panel";
import { Button } from "../components/UI/Button";
import { Table } from "../components/UI/Table";
import { Input, Textarea } from "../components/UI/Input";
import { ConfirmDialog } from "../components/UI/ConfirmDialog";
import { EMAIL_REQUIRED_FORMS } from "@/src/lib/forms/defaults";
import { FIELD_TYPES, humanize, type FormField } from "@/src/lib/forms/types";

interface FormsPanelProps {
  forms: FormDefinition[];
  submissions: Submission[];
  request: (url: string, options?: RequestInit) => Promise<any>;
  reload: () => void;
  notify: (msg: string) => void;
}

const PAGE_SIZE = 15;
const selectClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-cyan-500 disabled:bg-slate-50 disabled:text-slate-400";

type Draft = { title: string; isActive: boolean; fields: FormField[] };

const toDraft = (form: FormDefinition): Draft => ({
  title: form.title,
  isActive: form.isActive,
  fields: form.fields.map((f) => ({ ...f })),
});

function formatValue(value: unknown) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

export function FormsPanel({ forms, submissions, request, reload, notify }: FormsPanelProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(forms[0]?.key ?? null);
  const [draft, setDraft] = useState<Draft | null>(forms[0] ? toDraft(forms[0]) : null);
  const [view, setView] = useState<"fields" | "responses">("fields");
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<Submission | null>(null);
  const [toDelete, setToDelete] = useState<Submission | null>(null);
  const [deleting, setDeleting] = useState(false);

  const selected = forms.find((f) => f.key === selectedKey) ?? null;

  // Forms arrive asynchronously and are re-fetched after every save: re-sync the draft when they change.
  const [syncedForms, setSyncedForms] = useState(forms);
  if (forms !== syncedForms) {
    setSyncedForms(forms);
    const current = forms.find((f) => f.key === selectedKey) ?? forms[0];
    if (current) {
      setSelectedKey(current.key);
      setDraft(toDraft(current));
    }
  }

  const selectForm = (form: FormDefinition) => {
    setSelectedKey(form.key);
    setDraft(toDraft(form));
    setPage(1);
  };

  const updateField = (index: number, patch: Partial<FormField>) =>
    setDraft((d) => d && { ...d, fields: d.fields.map((f, i) => (i === index ? { ...f, ...patch } : f)) });

  const moveField = (index: number, dir: -1 | 1) =>
    setDraft((d) => {
      if (!d || index + dir < 0 || index + dir >= d.fields.length) return d;
      const fields = [...d.fields];
      [fields[index], fields[index + dir]] = [fields[index + dir], fields[index]];
      return { ...d, fields };
    });

  const removeField = (index: number) =>
    setDraft((d) => d && { ...d, fields: d.fields.filter((_, i) => i !== index) });

  const addField = () =>
    setDraft((d) => {
      if (!d) return d;
      let n = d.fields.length + 1;
      while (d.fields.some((f) => f.name === `field${n}`)) n++;
      return {
        ...d,
        fields: [...d.fields, { name: `field${n}`, label: "New field", type: "text", required: false, enabled: true, width: "half" }],
      };
    });

  const dirty = useMemo(
    () => !!selected && !!draft && JSON.stringify(toDraft(selected)) !== JSON.stringify(draft),
    [selected, draft],
  );

  const handleSave = async () => {
    if (!selected || !draft) return;
    try {
      setSaving(true);
      await request("/api/admin/forms", {
        method: "PATCH",
        body: JSON.stringify({
          key: selected.key,
          title: draft.title,
          isActive: draft.isActive,
          fields: draft.fields.map((f) => ({
            ...f,
            placeholder: f.placeholder || undefined,
            options: f.type === "select" ? f.options : undefined,
            minLength: f.type === "select" || f.type === "checkbox" ? undefined : f.minLength,
            maxLength: f.type === "select" || f.type === "checkbox" ? undefined : f.maxLength,
          })),
        }),
      });
      notify("Form saved. Changes are live on the website.");
      reload();
    } catch (error) {
      notify(error instanceof Error ? error.message : "Unable to save the form.");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      setDeleting(true);
      await request(`/api/admin/forms/submissions/${toDelete.id}`, { method: "DELETE" });
      notify("Response deleted.");
      setToDelete(null);
      if (detail?.id === toDelete.id) setDetail(null);
      reload();
    } catch (error) {
      notify(error instanceof Error ? error.message : "Unable to delete the response.");
    } finally {
      setDeleting(false);
    }
  };

  // ---- responses (scoped to the selected form) ----
  const labelFor = (formKey: string, name: string) =>
    forms.find((f) => f.key === formKey)?.fields.find((f) => f.name === name)?.label ?? humanize(name);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return submissions.filter(
      (s) =>
        s.formKey === selectedKey &&
        (!q ||
          s.name?.toLowerCase().includes(q) ||
          s.email?.toLowerCase().includes(q) ||
          JSON.stringify(s.data).toLowerCase().includes(q)),
    );
  }, [submissions, selectedKey, search]);

  const totalFor = (key: string) => submissions.filter((s) => s.formKey === key).length;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const exportCsv = () => {
    if (!selectedKey || filtered.length === 0) return;
    const keys = Array.from(new Set(filtered.flatMap((s) => Object.keys(s.data ?? {}))));
    const cell = (v: unknown) => `"${formatValue(v).replace(/"/g, '""')}"`;
    const rows = [
      ["Received", ...keys.map((k) => labelFor(selectedKey, k))].map(cell).join(","),
      ...filtered.map((s) => [new Date(s.createdAt).toLocaleString(), ...keys.map((k) => s.data?.[k])].map(cell).join(",")),
    ];
    const url = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedKey}-responses.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      {/* Forms list */}
      <Panel
        title="Website Forms"
        description="Pick a form to edit its fields or read its responses"
        icon={<FileText size={18} className="text-cyan-600" />}
        className="self-start"
      >
        <div className="space-y-2.5">
          {forms.map((form) => {
            const isSelected = selectedKey === form.key;
            return (
              <button
                key={form.id}
                type="button"
                onClick={() => selectForm(form)}
                className={`flex w-full items-center justify-between rounded-xl p-4 text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-2 border-cyan-500 bg-cyan-50/40 shadow-xs"
                    : "border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                <div className="space-y-1">
                  <strong className="block text-sm font-bold text-slate-900">{form.title}</strong>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600">{form.key}</span>
                    <span className="text-xs text-slate-400">
                      {form.fields.length} fields · {totalFor(form.key)} responses
                    </span>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    form.isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  {form.isActive ? (
                    <>
                      <CheckCircle2 size={11} /> Active
                    </>
                  ) : (
                    <>
                      <EyeOff size={11} /> Hidden
                    </>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </Panel>

      {/* Editor / responses */}
      {selected && draft && (
        <Panel
          title={selected.title}
          description={`Form key: ${selected.key}`}
          icon={view === "fields" ? <SlidersHorizontal size={18} className="text-indigo-600" /> : <ClipboardList size={18} className="text-cyan-600" />}
          headerAction={
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs font-semibold">
              {(["fields", "responses"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`rounded-lg px-3 py-1.5 capitalize cursor-pointer ${view === v ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
                >
                  {v === "responses" ? `Responses (${totalFor(selected.key)})` : "Fields"}
                </button>
              ))}
            </div>
          }
        >
          {view === "fields" ? (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                <Input label="Form title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                <label className="flex h-11 items-center gap-2.5 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={draft.isActive}
                    onChange={(e) => setDraft({ ...draft, isActive: e.target.checked })}
                    className="h-4 w-4 accent-cyan-600"
                  />
                  Accepting submissions
                </label>
              </div>

              <div className="space-y-3">
                {draft.fields.map((field, index) => {
                  const pinned = EMAIL_REQUIRED_FORMS.includes(selected.key) && field.name === "email";
                  return (
                    <div key={index} className={`rounded-xl border p-4 ${field.enabled ? "border-slate-200 bg-white" : "border-dashed border-slate-300 bg-slate-50"}`}>
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-slate-500">
                          #{index + 1} · {field.name}
                          {field.locked && <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">core</span>}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" disabled={index === 0} onClick={() => moveField(index, -1)} aria-label="Move up" icon={<ArrowUp size={14} />}>
                            Up
                          </Button>
                          <Button size="sm" variant="ghost" disabled={index === draft.fields.length - 1} onClick={() => moveField(index, 1)} aria-label="Move down" icon={<ArrowDown size={14} />}>
                            Down
                          </Button>
                          <Button size="sm" variant="danger" disabled={field.locked} title={field.locked ? "Core fields can be hidden but not deleted" : "Delete field"} onClick={() => removeField(index)} icon={<Trash2 size={14} />}>
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        <Input label="Label" value={field.label} onChange={(e) => updateField(index, { label: e.target.value })} />
                        <Input
                          label="Field name"
                          value={field.name}
                          disabled={field.locked}
                          hint={field.locked ? "locked" : "letters, numbers, _"}
                          onChange={(e) => updateField(index, { name: e.target.value.replace(/[^a-zA-Z0-9_]/g, "") })}
                        />
                        <div className="space-y-1.5">
                          <span className="block text-xs font-semibold text-slate-700">Type</span>
                          <select
                            className={selectClass}
                            value={field.type}
                            disabled={field.locked}
                            onChange={(e) => {
                              const type = e.target.value as FormField["type"];
                              updateField(index, { type, options: type === "select" ? field.options ?? ["Option 1"] : undefined });
                            }}
                          >
                            {FIELD_TYPES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <span className="block text-xs font-semibold text-slate-700">Width</span>
                          <select className={selectClass} value={field.width} onChange={(e) => updateField(index, { width: e.target.value as FormField["width"] })}>
                            <option value="half">Half</option>
                            <option value="full">Full</option>
                          </select>
                        </div>
                        {field.type !== "checkbox" && (
                          <div className="md:col-span-2">
                            <Input label="Placeholder" value={field.placeholder ?? ""} onChange={(e) => updateField(index, { placeholder: e.target.value })} />
                          </div>
                        )}
                        {field.type !== "checkbox" && field.type !== "select" && (
                          <>
                            <Input label="Min length" type="number" min={0} value={field.minLength ?? ""} onChange={(e) => updateField(index, { minLength: e.target.value ? Number(e.target.value) : undefined })} />
                            <Input label="Max length" type="number" min={1} value={field.maxLength ?? ""} onChange={(e) => updateField(index, { maxLength: e.target.value ? Number(e.target.value) : undefined })} />
                          </>
                        )}
                        {field.type === "select" && (
                          <div className="md:col-span-2 xl:col-span-4">
                            <Textarea
                              label="Options"
                              hint="One per line"
                              className="min-h-24"
                              value={(field.options ?? []).join("\n")}
                              onChange={(e) => updateField(index, { options: e.target.value.split("\n").map((o) => o.trim()).filter(Boolean) })}
                            />
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-5 text-xs font-semibold text-slate-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="h-4 w-4 accent-cyan-600" checked={field.required} disabled={pinned} onChange={(e) => updateField(index, { required: e.target.checked })} />
                          Required
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="h-4 w-4 accent-cyan-600" checked={field.enabled} disabled={pinned} onChange={(e) => updateField(index, { enabled: e.target.checked })} />
                          Shown on the website
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button variant="outline" icon={<Plus size={16} />} onClick={addField}>
                  Add field
                </Button>
                <div className="flex items-center gap-3">
                  {dirty && <span className="text-xs font-semibold text-amber-600">Unsaved changes</span>}
                  <Button onClick={handleSave} isLoading={saving} disabled={!dirty} icon={<Save size={16} />}>
                    Save form
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search responses..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 text-xs outline-none focus:border-cyan-500 focus:bg-white transition"
                  />
                </div>
                <Button size="sm" variant="outline" icon={<Download size={14} />} disabled={filtered.length === 0} onClick={exportCsv}>
                  Export CSV
                </Button>
              </div>

              <Table headings={["Contact", "Response", "Received", ""]} empty={pageRows.length === 0} emptyMessage="No responses recorded for this form yet.">
                {pageRows.map((item) => (
                  <tr key={item.id} className="align-top transition-colors hover:bg-slate-50/80">
                    <td className="px-4 py-3.5 first:pl-5">
                      <p className="text-xs font-semibold text-slate-900">{item.name || "—"}</p>
                      <p className="font-mono text-[11px] text-slate-400">{item.email || "—"}</p>
                    </td>
                    <td className="max-w-sm px-4 py-3.5">
                      <div className="space-y-0.5 text-xs text-slate-600">
                        {Object.entries(item.data ?? {})
                          .filter(([k]) => k !== "email" && k !== "name")
                          .slice(0, 3)
                          .map(([k, v]) => (
                            <p key={k} className="truncate">
                              <span className="font-semibold text-slate-400">{labelFor(item.formKey, k)}:</span> {formatValue(v)}
                            </p>
                          ))}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-400">
                      {new Date(item.createdAt).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="px-4 py-3.5 last:pr-5">
                      <div className="flex justify-end gap-1.5">
                        <Button size="sm" variant="outline" icon={<Eye size={14} />} onClick={() => setDetail(item)}>
                          View
                        </Button>
                        <Button size="sm" variant="danger" icon={<Trash2 size={14} />} onClick={() => setToDelete(item)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </Table>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  {filtered.length} response{filtered.length === 1 ? "" : "s"}
                </span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                    Prev
                  </Button>
                  <span>
                    Page {Math.min(page, pageCount)} / {pageCount}
                  </span>
                  <Button size="sm" variant="outline" disabled={page >= pageCount} onClick={() => setPage(page + 1)}>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Panel>
      )}

      {/* Response detail */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onClick={() => setDetail(null)}>
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Response #{detail.id}</h3>
                <p className="text-xs text-slate-400">{new Date(detail.createdAt).toLocaleString()}</p>
              </div>
              <Button size="sm" variant="ghost" icon={<X size={14} />} onClick={() => setDetail(null)}>
                Close
              </Button>
            </div>
            <dl className="space-y-3">
              {Object.entries(detail.data ?? {}).map(([k, v]) => (
                <div key={k} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{labelFor(detail.formKey, k)}</dt>
                  <dd className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-800">{formatValue(v)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this response?"
        description="The stored response will be permanently removed. This cannot be undone."
        confirmLabel="Delete response"
        loading={deleting}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
