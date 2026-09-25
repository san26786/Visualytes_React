"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, FileText, Loader2, RotateCcw, Save, Undo2 } from "lucide-react";

import { PAGE_DEFS, PAGE_KEYS } from "@/src/lib/page-content/registry";
import type { PageKey } from "@/src/lib/page-content/types";

import { Button } from "../components/UI/Button";
import { ConfirmDialog } from "../components/UI/ConfirmDialog";
import { Panel } from "../components/UI/Panel";
import { useToast } from "../components/UI/Toast";
import NodeEditor from "./page-content/NodeEditor";
import { api } from "./seo-questionnaire/api";

type Loaded = { content: unknown; customised: boolean };

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export default function PageContentPanel() {
  const { showToast } = useToast();
  const [pageKey, setPageKey] = useState<PageKey>(PAGE_KEYS[0]);
  const [saved, setSaved] = useState<unknown>(null);
  const [draft, setDraft] = useState<unknown>(null);
  const [customised, setCustomised] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [editorVersion, setEditorVersion] = useState(0);

  const def = PAGE_DEFS[pageKey];
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved]);

  useEffect(() => {
    let cancelled = false;
    api<Loaded>(`/api/admin/page-content/${pageKey}`)
      .then((data) => {
        if (cancelled) return;
        setSaved(data.content);
        setDraft(clone(data.content));
        setCustomised(data.customised);
        setError("");
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Unable to load this page.");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pageKey]);

  const choose = (key: PageKey) => {
    if (key === pageKey) return;
    if (dirty && !confirm("You have unsaved changes on this page. Leave without saving?")) return;
    setLoading(true);
    setDraft(null);
    setPageKey(key);
  };

  const save = async () => {
    try {
      setSaving(true);
      const result = await api<Loaded>(`/api/admin/page-content/${pageKey}`, { method: "PUT", body: JSON.stringify(draft) });
      setSaved(result.content);
      setDraft(clone(result.content));
      setCustomised(true);
      showToast(`${def.title} saved. The website is updated.`);
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Unable to save.", "error");
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    try {
      setResetting(true);
      const result = await api<Loaded>(`/api/admin/page-content/${pageKey}`, { method: "DELETE" });
      setSaved(result.content);
      setDraft(clone(result.content));
      setCustomised(false);
      setEditorVersion((v) => v + 1);
      setConfirmReset(false);
      showToast("Restored the original content.");
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Unable to reset.", "error");
    } finally {
      setResetting(false);
    }
  };

  const actions = (
    <div className="flex flex-wrap items-center gap-3">
      {dirty && <span className="text-xs font-semibold text-amber-600">Unsaved changes</span>}
      <Button variant="outline" disabled={!dirty} icon={<Undo2 size={16} />} onClick={() => { setDraft(clone(saved)); setEditorVersion((v) => v + 1); }}>
        Discard
      </Button>
      <Button onClick={save} isLoading={saving} disabled={!dirty} icon={<Save size={16} />}>
        Save &amp; publish
      </Button>
    </div>
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
      <Panel title="Pages" description="Choose a page to edit its text, images and lists" icon={<FileText size={18} className="text-cyan-600" />} className="self-start">
        <div className="space-y-2">
          {PAGE_KEYS.map((key) => {
            const item = PAGE_DEFS[key];
            const active = key === pageKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => choose(key)}
                className={`w-full cursor-pointer rounded-xl p-3.5 text-left transition ${active ? "border-2 border-cyan-500 bg-cyan-50/40" : "border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"}`}
              >
                <span className="block text-sm font-bold text-slate-900">{item.title}</span>
                <span className="mt-0.5 block text-xs leading-snug text-slate-500">{item.description}</span>
                <span className="mt-1.5 inline-block rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">{item.path}</span>
              </button>
            );
          })}
        </div>
      </Panel>

      <div className="min-w-0 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/50 p-4 text-xs text-cyan-900">
          <p className="max-w-2xl leading-relaxed">
            <strong>{def.title}</strong> - changes go live on <span className="font-mono">{def.path}</span> as soon as you save.
            {!customised && !loading && <span className="ml-1 font-semibold">Currently showing the original content.</span>}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {!def.path.includes("…") && (
              <a href={def.path} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-200 bg-white px-3 py-1.5 font-semibold text-cyan-800 hover:bg-cyan-50">
                View page <ExternalLink size={12} />
              </a>
            )}
            {actions}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-12 text-sm text-slate-400">
            <Loader2 size={16} className="animate-spin" /> Loading…
          </div>
        ) : error ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">{error}</p>
        ) : (
          <NodeEditor key={`${pageKey}-${editorVersion}`} node={def.schema} value={draft} onChange={setDraft} />
        )}

        {!loading && !error && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
            <Button variant="ghost" icon={<RotateCcw size={16} />} onClick={() => setConfirmReset(true)} disabled={!customised}>
              Restore original content
            </Button>
            {actions}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Restore the original content?"
        description={`Everything you changed on “${def.title}” is replaced by the content the website launched with.`}
        confirmLabel="Restore"
        loading={resetting}
        onConfirm={reset}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}
