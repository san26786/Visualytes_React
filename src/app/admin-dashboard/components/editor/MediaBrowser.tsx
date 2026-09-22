"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Check, ImageIcon, Loader2, Search, Trash2, UploadCloud } from "lucide-react";

import type { MediaItem } from "@/src/lib/blog/types";
import { ApiError, blogApi } from "../../blog/_lib/api";
import { ConfirmDialog } from "../UI/ConfirmDialog";
import { useToast } from "../UI/Toast";

type Props = {
  selectedId?: string | null;
  onSelect?: (media: MediaItem) => void;
  /** Shows a delete button on each tile. */
  manage?: boolean;
  className?: string;
};

const formatSize = (bytes: number) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export function MediaBrowser({ selectedId, onSelect, manage = false, className = "" }: Props) {
  const { showToast } = useToast();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [settledKey, setSettledKey] = useState("");
  const [reloadTick, setReloadTick] = useState(0);
  const [uploading, setUploading] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<MediaItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // "loading" is derived: the newest request key has not settled yet.
  const requestKey = [page, query, reloadTick].join("|");
  const loading = settledKey !== requestKey;
  const load = () => setReloadTick((tick) => tick + 1);

  useEffect(() => {
    let cancelled = false;
    blogApi
      .listMedia(page, query)
      .then((data) => {
        if (cancelled) return;
        setItems(data.items);
        setTotalPages(data.totalPages);
        setTotal(data.total);
        setError("");
        setSettledKey(requestKey);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : "Could not load images.");
        setSettledKey(requestKey);
      });
    return () => {
      cancelled = true;
    };
  }, [page, query, requestKey]);

  const upload = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (!list.length) {
      showToast("Choose image files (JPG, PNG, WEBP or GIF).", "warning");
      return;
    }
    setUploading((n) => n + list.length);
    for (const file of list) {
      try {
        const media = await blogApi.upload(file);
        setItems((prev) => [media, ...prev]);
        setTotal((n) => n + 1);
        onSelect?.(media);
      } catch (err) {
        showToast(`${file.name}: ${err instanceof ApiError ? err.message : "Upload failed."}`, "error");
      } finally {
        setUploading((n) => n - 1);
      }
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await blogApi.removeMedia(pendingDelete.id);
      setItems((prev) => prev.filter((item) => item.id !== pendingDelete.id));
      setTotal((n) => n - 1);
      showToast("Image deleted.");
      setPendingDelete(null);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not delete image.", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className={`flex min-h-0 flex-col gap-4 ${className}`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(event) => {
        if (event.currentTarget === event.target) setDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        if (event.dataTransfer.files.length) void upload(event.dataTransfer.files);
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by file name or alt text..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-3 focus:ring-cyan-500/15"
          />
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          hidden
          onChange={(event) => {
            if (event.target.files) void upload(event.target.files);
            event.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {uploading ? <Loader2 size={15} className="animate-spin" /> : <UploadCloud size={15} />}
          {uploading ? `Uploading ${uploading}…` : "Upload images"}
        </button>
      </div>

      <div
        className={`relative min-h-[240px] flex-1 overflow-y-auto rounded-2xl border-2 border-dashed p-3 transition ${
          dragging ? "border-cyan-400 bg-cyan-50/60" : "border-slate-200 bg-slate-50/50"
        }`}
      >
        {dragging && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-sm font-semibold text-cyan-700">
            Drop images to upload
          </div>
        )}

        {loading && !items.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="aspect-[4/3] animate-pulse rounded-xl bg-slate-200/70" />
            ))}
          </div>
        ) : error ? (
          <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 text-center">
            <AlertCircle className="text-rose-500" />
            <p className="text-sm text-slate-600">{error}</p>
            <button type="button" onClick={load} className="text-sm font-semibold text-cyan-700 hover:underline">
              Try again
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-xs">
              <ImageIcon size={22} />
            </span>
            <p className="text-sm font-semibold text-slate-700">{query ? "No images match your search" : "No images yet"}</p>
            <p className="text-xs text-slate-400">Drag images here or use Upload images.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => {
              const selected = selectedId === item.id;
              return (
                <li key={item.id} className="group relative">
                  <button
                    type="button"
                    disabled={!onSelect}
                    onClick={() => onSelect?.(item)}
                    className={`block w-full overflow-hidden rounded-xl border bg-white text-left shadow-xs transition ${
                      selected ? "border-cyan-500 ring-3 ring-cyan-500/25" : "border-slate-200 hover:border-slate-300"
                    } ${onSelect ? "cursor-pointer" : "cursor-default"}`}
                  >
                    { }
                    <img src={item.url} alt={item.alt ?? item.originalName} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                    <span className="block truncate px-2.5 pt-2 text-[11px] font-semibold text-slate-700">{item.originalName}</span>
                    <span className="block px-2.5 pb-2 text-[10px] text-slate-400">
                      {item.width && item.height ? `${item.width}×${item.height} · ` : ""}
                      {formatSize(item.size)}
                    </span>
                  </button>
                  {selected && (
                    <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-white shadow">
                      <Check size={14} />
                    </span>
                  )}
                  {manage && (
                    <button
                      type="button"
                      aria-label={`Delete ${item.originalName}`}
                      onClick={() => setPendingDelete(item)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-slate-600 opacity-0 shadow transition hover:bg-rose-600 hover:text-white group-hover:opacity-100 focus:opacity-100"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          {total} image{total === 1 ? "" : "s"}
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this image?"
        description={
          <>
            <strong className="text-slate-700">{pendingDelete?.originalName}</strong> will be removed from the media library and
            deleted from the server. Images used by a blog post can&apos;t be deleted.
          </>
        }
        confirmLabel="Delete image"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
