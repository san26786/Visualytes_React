"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  FileText,
  ImageIcon,
  Pencil,
  Plus,
  Search,
  Send,
  Trash2,
  Undo2,
} from "lucide-react";

import type { AdminBlogList, AdminBlogListItem, BlogMeta, BlogStatus } from "@/src/lib/blog/types";
import { ConfirmDialog } from "../components/UI/ConfirmDialog";
import { useToast } from "../components/UI/Toast";
import { ApiError, blogApi } from "../blog/_lib/api";
import { StatusBadge, effectiveStatus } from "../blog/_components/StatusBadge";

const PAGE_SIZE = 10;

const STATUS_TABS: { value: "" | BlogStatus; label: string; key: "all" | BlogStatus }[] = [
  { value: "", label: "All", key: "all" },
  { value: "PUBLISHED", label: "Published", key: "PUBLISHED" },
  { value: "DRAFT", label: "Drafts", key: "DRAFT" },
  { value: "ARCHIVED", label: "Archived", key: "ARCHIVED" },
];

const SORTS = [
  { value: "updated", label: "Recently updated" },
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Title A–Z" },
  { value: "views", label: "Most viewed" },
];

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "—";

const ICON_BUTTON =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition disabled:pointer-events-none disabled:opacity-40";

export default function BlogPanel() {
  const { showToast } = useToast();
  const [data, setData] = useState<AdminBlogList | null>(null);
  const [meta, setMeta] = useState<BlogMeta | null>(null);
  const [error, setError] = useState("");
  const [settledKey, setSettledKey] = useState("");
  const [reloadTick, setReloadTick] = useState(0);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"" | BlogStatus>("");
  const [sort, setSort] = useState("updated");
  const [page, setPage] = useState(1);

  const [busyId, setBusyId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<AdminBlogListItem | null>(null);
  const [pendingStatus, setPendingStatus] = useState<{ post: AdminBlogListItem; next: BlogStatus } | null>(null);
  const [acting, setActing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    blogApi.meta().then(setMeta).catch(() => setMeta(null));
  }, []);

  // "loading" is derived: the newest request key has not settled yet.
  const requestKey = [query, category, status, sort, page, reloadTick].join("|");
  const loading = settledKey !== requestKey;
  const load = async () => setReloadTick((tick) => tick + 1);

  useEffect(() => {
    let cancelled = false;
    blogApi
      .list({ search: query, category, status, sort, page, pageSize: PAGE_SIZE })
      .then((list) => {
        if (cancelled) return;
        setData(list);
        setError("");
        setSettledKey(requestKey);
        if (list.page !== page) setPage(list.page);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : "Could not load blog posts.");
        setSettledKey(requestKey);
      });
    return () => {
      cancelled = true;
    };
  }, [query, category, status, sort, page, requestKey]);

  const filtersActive = !!(query || category || status);
  const clearFilters = () => {
    setSearch("");
    setQuery("");
    setCategory("");
    setStatus("");
    setPage(1);
  };

  const changeStatus = async () => {
    if (!pendingStatus) return;
    const { post, next } = pendingStatus;
    setActing(true);
    try {
      await blogApi.update(post.id, { status: next });
      showToast(next === "PUBLISHED" ? `"${post.title}" is now published.` : `"${post.title}" moved back to drafts.`);
      setPendingStatus(null);
      await load();
    } catch (err) {
      if (err instanceof ApiError && err.errors) {
        showToast(`Can't publish yet: ${Object.values(err.errors).join(" ")}`, "error");
      } else {
        showToast(err instanceof ApiError ? err.message : "Could not update the post.", "error");
      }
      setPendingStatus(null);
    } finally {
      setActing(false);
    }
  };

  const duplicate = async (post: AdminBlogListItem) => {
    setBusyId(post.id);
    try {
      const copy = await blogApi.duplicate(post.id);
      showToast("Post duplicated as a draft.");
      window.location.assign(`/admin-dashboard/blog/${copy.id}`);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not duplicate the post.", "error");
      setBusyId(null);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setActing(true);
    try {
      await blogApi.remove(pendingDelete.id);
      showToast("Blog post deleted.");
      setPendingDelete(null);
      await load();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not delete the post.", "error");
    } finally {
      setActing(false);
    }
  };

  const counts = data?.counts;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <BookOpen size={20} />
          </span>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">Blog Posts</h2>
            <p className="text-xs text-slate-500">Write, publish and manage the articles shown on /blog.</p>
          </div>
        </div>
        <Link
          href="/admin-dashboard/blog/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-600 hover:shadow-md"
        >
          <Plus size={16} /> Create Blog Post
        </Link>
      </div>

      <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {/* Status tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-slate-100 px-4 pt-3 sm:px-5">
          {STATUS_TABS.map((tab) => {
            const active = status === tab.value;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setStatus(tab.value);
                  setPage(1);
                }}
                className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 pb-3 pt-1 text-sm font-semibold transition ${
                  active ? "border-cyan-500 text-cyan-700" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
                {counts && (
                  <span className={`rounded-full px-2 py-0.5 text-[11px] ${active ? "bg-cyan-50 text-cyan-700" : "bg-slate-100 text-slate-500"}`}>
                    {counts[tab.key]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[minmax(0,1fr)_200px_190px]">
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title, slug or excerpt…"
              aria-label="Search blog posts"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-3 focus:ring-cyan-500/15"
            />
          </div>
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
            aria-label="Filter by category"
            className="h-10 rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-3 focus:ring-cyan-500/15"
          >
            <option value="">All categories</option>
            {meta?.categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.postCount})
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
              setPage(1);
            }}
            aria-label="Sort posts"
            className="h-10 rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-3 focus:ring-cyan-500/15"
          >
            {SORTS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3">Post</th>
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Author</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Published</th>
                <th className="px-3 py-3">Updated</th>
                <th className="px-3 py-3 text-right">Views</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && !data
                ? Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td colSpan={8} className="px-5 py-4">
                        <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
                      </td>
                    </tr>
                  ))
                : data?.items.map((post) => {
                    const live = effectiveStatus(post.status, post.publishedAt) === "PUBLISHED";
                    return (
                      <tr key={post.id} className={`transition-colors hover:bg-slate-50/70 ${loading ? "opacity-60" : ""}`}>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3.5">
                            {post.featuredImage ? (
                               
                              <img src={post.featuredImage.url} alt="" className="h-12 w-20 shrink-0 rounded-lg border border-slate-200 object-cover" />
                            ) : (
                              <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-400">
                                <ImageIcon size={16} />
                              </div>
                            )}
                            <div className="min-w-0 max-w-xs">
                              <Link href={`/admin-dashboard/blog/${post.id}`} className="line-clamp-2 font-semibold leading-snug text-slate-900 hover:text-cyan-700">
                                {post.title}
                              </Link>
                              <p className="mt-0.5 truncate text-[11px] text-slate-400">/blog/{post.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3.5">
                          {post.category ? (
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">{post.category.name}</span>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                        <td className="px-3 py-3.5 text-slate-600">{post.author?.name ?? "—"}</td>
                        <td className="px-3 py-3.5">
                          <StatusBadge status={post.status} publishedAt={post.publishedAt} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-3.5 text-slate-500">{formatDate(post.publishedAt)}</td>
                        <td className="whitespace-nowrap px-3 py-3.5 text-slate-500">{formatDate(post.updatedAt)}</td>
                        <td className="px-3 py-3.5 text-right font-medium tabular-nums text-slate-600">{post.views.toLocaleString()}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link href={`/admin-dashboard/blog/${post.id}`} title="Edit" aria-label={`Edit ${post.title}`} className={`${ICON_BUTTON} hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700`}>
                              <Pencil size={14} />
                            </Link>
                            <Link href={`/admin-dashboard/blog/${post.id}/preview`} target="_blank" title="Preview" aria-label={`Preview ${post.title}`} className={`${ICON_BUTTON} hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800`}>
                              <Eye size={14} />
                            </Link>
                            {live && (
                              <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" title="View live" aria-label={`View ${post.title} live`} className={`${ICON_BUTTON} hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800`}>
                                <ExternalLink size={14} />
                              </a>
                            )}
                            <button type="button" title="Duplicate" aria-label={`Duplicate ${post.title}`} disabled={busyId === post.id} onClick={() => void duplicate(post)} className={`${ICON_BUTTON} cursor-pointer hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800`}>
                              <Copy size={14} />
                            </button>
                            {post.status === "PUBLISHED" ? (
                              <button type="button" title="Unpublish" aria-label={`Unpublish ${post.title}`} onClick={() => setPendingStatus({ post, next: "DRAFT" })} className={`${ICON_BUTTON} cursor-pointer hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700`}>
                                <Undo2 size={14} />
                              </button>
                            ) : (
                              <button type="button" title="Publish" aria-label={`Publish ${post.title}`} onClick={() => setPendingStatus({ post, next: "PUBLISHED" })} className={`${ICON_BUTTON} cursor-pointer hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700`}>
                                <Send size={14} />
                              </button>
                            )}
                            <button type="button" title="Delete" aria-label={`Delete ${post.title}`} onClick={() => setPendingDelete(post)} className={`${ICON_BUTTON} cursor-pointer hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700`}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>

          {error && (
            <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                <AlertCircle size={22} />
              </span>
              <p className="text-sm font-semibold text-slate-800">Couldn&apos;t load blog posts</p>
              <p className="text-xs text-slate-500">{error}</p>
              <button type="button" onClick={() => void load()} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Try again
              </button>
            </div>
          )}

          {!error && data && data.items.length === 0 && (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                {filtersActive ? <EyeOff size={22} /> : <FileText size={22} />}
              </span>
              <p className="text-sm font-semibold text-slate-800">{filtersActive ? "No posts match your filters" : "No blog posts yet"}</p>
              <p className="max-w-sm text-xs text-slate-500">
                {filtersActive ? "Try a different search or clear the filters." : "Create your first article - it will appear on the public blog once published."}
              </p>
              {filtersActive ? (
                <button type="button" onClick={clearFilters} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  Clear filters
                </button>
              ) : (
                <Link href="/admin-dashboard/blog/new" className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600">
                  <Plus size={15} /> Create Blog Post
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {data && data.total > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:flex-row">
            <span>
              Showing {(data.page - 1) * data.pageSize + 1}–{Math.min(data.page * data.pageSize, data.total)} of {data.total}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={data.page <= 1 || loading}
                onClick={() => setPage(data.page - 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="px-1">
                Page {data.page} of {data.totalPages}
              </span>
              <button
                type="button"
                disabled={data.page >= data.totalPages || loading}
                onClick={() => setPage(data.page + 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this blog post?"
        description={
          <>
            <strong className="text-slate-700">{pendingDelete?.title}</strong> will be permanently deleted and removed from the public site. This can&apos;t be undone.
          </>
        }
        confirmLabel="Delete post"
        loading={acting}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setPendingDelete(null)}
      />
      <ConfirmDialog
        open={!!pendingStatus}
        tone="primary"
        title={pendingStatus?.next === "PUBLISHED" ? "Publish this post?" : "Unpublish this post?"}
        description={
          pendingStatus?.next === "PUBLISHED" ? (
            <>
              <strong className="text-slate-700">{pendingStatus.post.title}</strong> will go live on the public blog. Required fields (excerpt, category, featured image…) are checked first.
            </>
          ) : (
            <>
              <strong className="text-slate-700">{pendingStatus?.post.title}</strong> will be hidden from the public site and moved back to drafts.
            </>
          )
        }
        confirmLabel={pendingStatus?.next === "PUBLISHED" ? "Publish" : "Unpublish"}
        loading={acting}
        onConfirm={() => void changeStatus()}
        onCancel={() => setPendingStatus(null)}
      />
    </div>
  );
}
