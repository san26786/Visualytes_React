"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { MediaItem } from "@/src/lib/blog/types";
import { Button } from "../UI/Button";
import { MediaBrowser } from "./MediaBrowser";

type Props = {
  open: boolean;
  title?: string;
  /** Ask for alt text (used for images inserted into an article). */
  askAlt?: boolean;
  confirmLabel?: string;
  onClose: () => void;
  onPick: (media: MediaItem, alt: string) => void;
};

export function MediaPickerDialog({
  open,
  title = "Choose an image",
  askAlt = false,
  confirmLabel = "Use image",
  onClose,
  onPick,
}: Props) {
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [alt, setAlt] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const choose = (media: MediaItem) => {
    setSelected(media);
    setAlt(media.alt ?? "");
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6">
          <MediaBrowser selectedId={selected?.id} onSelect={choose} className="min-h-0 flex-1" />
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center">
          {askAlt && (
            <input
              value={alt}
              disabled={!selected}
              onChange={(event) => setAlt(event.target.value)}
              placeholder="Alt text - describe the image for screen readers & SEO"
              maxLength={300}
              className="h-10 flex-1 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-3 focus:ring-cyan-500/15 disabled:bg-slate-50"
            />
          )}
          <div className="flex justify-end gap-2.5 sm:ml-auto">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="cyan" disabled={!selected} onClick={() => selected && onPick(selected, alt.trim())}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
