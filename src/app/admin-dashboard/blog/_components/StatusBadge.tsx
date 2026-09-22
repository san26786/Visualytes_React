import { isLive, type BlogStatus } from "@/src/lib/blog/types";

const STYLES: Record<BlogStatus | "SCHEDULED", string> = {
  PUBLISHED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  SCHEDULED: "border-sky-200 bg-sky-50 text-sky-700",
  DRAFT: "border-amber-200 bg-amber-50 text-amber-700",
  ARCHIVED: "border-slate-200 bg-slate-100 text-slate-600",
};

const LABELS: Record<BlogStatus | "SCHEDULED", string> = {
  PUBLISHED: "Published",
  SCHEDULED: "Scheduled",
  DRAFT: "Draft",
  ARCHIVED: "Archived",
};

/** A published post with a future publish date is shown as "Scheduled". */
export function effectiveStatus(status: BlogStatus, publishedAt: string | null): BlogStatus | "SCHEDULED" {
  return status === "PUBLISHED" && !isLive(status, publishedAt) ? "SCHEDULED" : status;
}

export function StatusBadge({ status, publishedAt }: { status: BlogStatus; publishedAt: string | null }) {
  const value = effectiveStatus(status, publishedAt);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${STYLES[value]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[value]}
    </span>
  );
}
