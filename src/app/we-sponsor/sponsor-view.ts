import type { SponsorItem } from "@/src/lib/page-content/types";
import type { Sponsorship } from "./sponsor-data";

// Full class names written out so Tailwind keeps them.
const COLOR_CLASSES: Record<string, string> = {
  violet: "bg-violet-50 text-violet-950 dark:bg-violet-950/40 dark:text-violet-50",
  teal: "bg-teal-50 text-teal-950 dark:bg-teal-950/40 dark:text-teal-50",
  orange: "bg-orange-50 text-orange-950 dark:bg-orange-950/40 dark:text-orange-50",
  pink: "bg-pink-50 text-pink-950 dark:bg-pink-950/40 dark:text-pink-50",
  amber: "bg-amber-50 text-amber-950 dark:bg-amber-950/40 dark:text-amber-50",
  cyan: "bg-cyan-50 text-cyan-950 dark:bg-cyan-950/40 dark:text-cyan-50",
  emerald: "bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-50",
  rose: "bg-rose-50 text-rose-950 dark:bg-rose-950/40 dark:text-rose-50",
  sky: "bg-sky-50 text-sky-950 dark:bg-sky-950/40 dark:text-sky-50",
  indigo: "bg-indigo-50 text-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-50",
};

/** Turns the editable sponsorship rows into the cards the page renders (numbered in the order saved). */
export function toSponsorships(items: SponsorItem[]): Sponsorship[] {
  return items.map((item, index) => ({
    id: item.id,
    postId: item.id,
    index: String(index + 1).padStart(2, "0"),
    title: item.title,
    dateLabel: item.dateLabel,
    sortDate: item.sortDate,
    detail: item.detail,
    image: item.image,
    featured: item.featured,
    colorClasses: COLOR_CLASSES[item.color] ?? COLOR_CLASSES.violet,
  }));
}
