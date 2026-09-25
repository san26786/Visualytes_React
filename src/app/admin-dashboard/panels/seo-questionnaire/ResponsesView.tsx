"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Eye, FileDown, Mail, RefreshCw, Search, Trash2, X } from "lucide-react";

import type { ReportSection } from "@/src/lib/seo-questionnaire/report";

import { Button } from "../../components/UI/Button";
import { ConfirmDialog } from "../../components/UI/ConfirmDialog";
import { Panel } from "../../components/UI/Panel";
import { Table } from "../../components/UI/Table";
import { useToast } from "../../components/UI/Toast";
import { api } from "./api";

export type SeoSubmission = {
  id: number;
  reference: string;
  name: string | null;
  email: string | null;
  business: string;
  portalUser: string | null;
  createdAt: string;
  report: ReportSection[];
};

const PAGE_SIZE = 12;
const pdfUrl = (id: number) => `/api/admin/seo-questionnaire/submissions/${id}/pdf`;
const formatDate = (iso: string) => new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

function planOf(item: SeoSubmission) {
  for (const section of item.report) {
    const row = section.rows.find((r) => /plan/i.test(r.label));
    if (row?.value) return row.value;
  }
  return "";
}

/* ------------------------------------------------------------------ */
/* Side panel                                                          */
/* ------------------------------------------------------------------ */

function DetailDrawer({ item, onClose, onDelete }: { item: SeoSubmission; onClose: () => void; onDelete: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs" onClick={onClose} aria-hidden="true" />
      <aside role="dialog" aria-modal="true" aria-label={`Response ${item.reference}`} className="relative flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-slate-950 px-6 py-5 text-white">
          <div className="min-w-0">
            <p className="font-mono text-xs font-semibold tracking-wider text-cyan-300">{item.reference}</p>
            <h2 className="mt-1 truncate text-lg font-bold">{item.business || item.name || "SEO questionnaire"}</h2>
            <p className="mt-0.5 truncate text-xs text-slate-400">
              {[item.name, item.email].filter(Boolean).join("  ·  ")} · {formatDate(item.createdAt)}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white">
            <X size={18} />
          </button>
        </header>

        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 bg-slate-50 px-6 py-3">
          <a
            href={pdfUrl(item.id)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md active:scale-[0.98]"
          >
            <FileDown size={16} />
            Download PDF
          </a>
          {item.email && (
            <a href={`mailto:${item.email}?subject=${encodeURIComponent(`Your SEO questionnaire ${item.reference}`)}`} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              <Mail size={16} />
              Email client
            </a>
          )}
          <span className="flex-1" />
          <Button size="sm" variant="danger" icon={<Trash2 size={14} />} onClick={onDelete}>
            Delete
          </Button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          {item.report.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400">This response has no stored answers.</p>}
          {item.report.map((section) => (
            <section key={section.title}>
              <h3 className="mb-2.5 flex items-center gap-2 text-sm font-bold text-slate-900">
                <span className="h-4 w-1 rounded-full bg-fuchsia-500" />
                {section.title}
              </h3>
              <dl className="overflow-hidden rounded-xl border border-slate-200 text-sm">
                {section.rows.map((row, index) => (
                  <div key={`${row.label}-${index}`} className="grid grid-cols-[38%_1fr] border-b border-slate-100 last:border-b-0">
                    <dt className="bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-600">{row.label}</dt>
                    <dd className="break-words whitespace-pre-line px-3.5 py-2.5 text-slate-900">
                      {row.tags ? (
                        row.tags.length ? (
                          <span className="flex flex-wrap gap-1.5">
                            {row.tags.map((tag) => (
                              <span key={tag} className="rounded-full border border-fuchsia-200 bg-fuchsia-50 px-2.5 py-0.5 text-xs font-medium text-fuchsia-800">
                                {tag}
                              </span>
                            ))}
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )
                      ) : row.value ? (
                        row.value
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
          <p className="text-[11px] leading-relaxed text-slate-400">Passwords are never stored on the website. They were emailed to the team at submission time.</p>
        </div>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* List                                                                */
/* ------------------------------------------------------------------ */

export default function ResponsesView() {
  const { showToast } = useToast();
  const [items, setItems] = useState<SeoSubmission[] | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<SeoSubmission | null>(null);
  const [toDelete, setToDelete] = useState<SeoSubmission | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    try {
      setRefreshing(true);
      setError("");
      const data = await api<{ submissions: SeoSubmission[] }>("/api/admin/seo-questionnaire/submissions");
      setItems(data.submissions);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load responses.");
      setItems((current) => current ?? []);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    api<{ submissions: SeoSubmission[] }>("/api/admin/seo-questionnaire/submissions")
      .then((data) => !cancelled && setItems(data.submissions))
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Unable to load responses.");
        setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return (items ?? []).filter(
      (s) => !q || [s.reference, s.name, s.email, s.business, planOf(s)].some((v) => v?.toLowerCase().includes(q)) || JSON.stringify(s.report).toLowerCase().includes(q),
    );
  }, [items, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      setDeleting(true);
      await api(`/api/admin/seo-questionnaire/submissions/${toDelete.id}`, { method: "DELETE" });
      setItems((current) => (current ?? []).filter((s) => s.id !== toDelete.id));
      if (detail?.id === toDelete.id) setDetail(null);
      setToDelete(null);
      showToast("Response deleted.");
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Unable to delete the response.", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Panel
      title="Client responses"
      description="Every submitted SEO questionnaire, newest first"
      icon={<Download size={18} className="text-cyan-600" />}
      badge={<span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{items?.length ?? 0}</span>}
      headerAction={
        <Button size="sm" variant="outline" isLoading={refreshing} icon={<RefreshCw size={14} />} onClick={load}>
          Refresh
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search name, business, plan, answers…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 text-xs outline-none transition focus:border-cyan-500 focus:bg-white"
          />
        </div>

        {error && <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">{error}</p>}

        <Table
          headings={["Reference", "Client", "Plan", "Received", ""]}
          empty={items !== null && pageRows.length === 0}
          emptyMessage={search ? "No responses match your search." : "No questionnaires submitted yet."}
        >
          {items === null ? (
            <tr>
              <td colSpan={5} className="py-10 text-center text-xs text-slate-400">
                Loading…
              </td>
            </tr>
          ) : (
            pageRows.map((item) => (
              <tr key={item.id} className="cursor-pointer align-middle transition-colors hover:bg-slate-50/80" onClick={() => setDetail(item)}>
                <td className="px-4 py-3.5 first:pl-5">
                  <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-semibold text-slate-700">{item.reference}</span>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-xs font-semibold text-slate-900">{item.business || item.name || "—"}</p>
                  <p className="text-[11px] text-slate-500">{[item.business ? item.name : "", item.email].filter(Boolean).join(" · ")}</p>
                </td>
                <td className="px-4 py-3.5 text-xs text-slate-600">{planOf(item) || "—"}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-500">{formatDate(item.createdAt)}</td>
                <td className="px-4 py-3.5 last:pr-5" onClick={(event) => event.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1.5">
                    <Button size="sm" variant="outline" icon={<Eye size={14} />} onClick={() => setDetail(item)}>
                      View
                    </Button>
                    <a
                      href={pdfUrl(item.id)}
                      aria-label={`Download PDF for ${item.reference}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
                    >
                      <FileDown size={14} />
                      PDF
                    </a>
                    <Button size="sm" variant="danger" aria-label="Delete response" icon={<Trash2 size={14} />} onClick={() => setToDelete(item)}>
                      {""}
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </Table>

        {pageCount > 1 && (
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Page {page} of {pageCount}
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                Previous
              </Button>
              <Button size="sm" variant="outline" disabled={page === pageCount} onClick={() => setPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {detail && <DetailDrawer item={detail} onClose={() => setDetail(null)} onDelete={() => setToDelete(detail)} />}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this response?"
        description={toDelete ? `${toDelete.reference} from ${toDelete.business || toDelete.name || "this client"} will be permanently removed.` : ""}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </Panel>
  );
}
