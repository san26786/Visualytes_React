import type { PurchaseStatus } from "@/src/lib/packages/types";

export function formatMoney(amount: number, currency = "GBP") {
  try {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: Number.isInteger(amount) ? 0 : 2 }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function formatDate(iso: string | null, fallback = "—") {
  if (!iso) return fallback;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export const STATUS_STYLES: Record<PurchaseStatus, string> = {
  PAID: "border-emerald-200 bg-emerald-50 text-emerald-700",
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  EXPIRED: "border-slate-200 bg-slate-100 text-slate-600",
  CANCELLED: "border-rose-200 bg-rose-50 text-rose-700",
};
