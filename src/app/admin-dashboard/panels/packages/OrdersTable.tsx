"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import type { AdminPackage, AdminPurchase, PurchaseStatus } from "@/src/lib/packages/types";
import { Panel } from "../../components/UI/Panel";
import { Table } from "../../components/UI/Table";
import { formatDate, formatMoney, STATUS_STYLES } from "./format";

type Props = {
  purchases: AdminPurchase[];
  packages: AdminPackage[];
  packageId: number | null;
  onPackageChange: (id: number | null) => void;
};

const STATUSES: PurchaseStatus[] = ["PAID", "PENDING", "EXPIRED", "CANCELLED"];
const SELECT = "h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs outline-none transition focus:border-cyan-500";

export function OrdersTable({ purchases, packages, packageId, onPackageChange }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PurchaseStatus | "">("");

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return purchases.filter(
      (row) =>
        (packageId === null || row.packageId === packageId) &&
        (!status || row.status === status) &&
        (!query || `${row.customerEmail ?? ""} ${row.customerName ?? ""} ${row.packageName}`.toLowerCase().includes(query)),
    );
  }, [purchases, packageId, status, search]);

  const paidTotal = rows.reduce((sum, row) => (row.status === "PAID" ? sum + row.amount : sum), 0);
  const filtered = packageId !== null || status !== "" || search.trim() !== "";

  return (
    <Panel
      title="Orders & Customers"
      description="Every checkout started from the website. Paid orders count as customers."
      badge={<span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{rows.length} shown</span>}
      headerAction={
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search customer..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 text-xs outline-none transition focus:border-cyan-500 focus:bg-white"
            />
          </div>
          <select aria-label="Filter by package" className={SELECT} value={packageId ?? ""} onChange={(event) => onPackageChange(event.target.value ? Number(event.target.value) : null)}>
            <option value="">All packages & plans</option>
            <optgroup label="Website Packages">
              {packages.filter((item) => item.kind === "PACKAGE").map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </optgroup>
            <optgroup label="Marketing Plans">
              {packages.filter((item) => item.kind === "PLAN").map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </optgroup>
          </select>
          <select aria-label="Filter by status" className={SELECT} value={status} onChange={(event) => setStatus(event.target.value as PurchaseStatus | "")}>
            <option value="">Any status</option>
            {STATUSES.map((value) => (
              <option key={value} value={value}>{value.charAt(0) + value.slice(1).toLowerCase()}</option>
            ))}
          </select>
          {filtered && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatus("");
                onPackageChange(null);
              }}
              className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-xl px-2.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <X size={13} /> Clear
            </button>
          )}
        </div>
      }
    >
      <Table
        headings={["Date", "Customer", "Package / Plan", "Amount", "Status", "Valid until"]}
        empty={rows.length === 0}
        emptyMessage={filtered ? "No orders match these filters." : "No orders yet. They appear here as soon as someone starts a checkout."}
        className="min-w-[820px]"
      >
        {rows.map((row) => (
          <tr key={row.id} className="transition-colors hover:bg-slate-50/80">
            <td className="px-4 py-3.5 text-xs text-slate-500 first:pl-5">{formatDate(row.createdAt)}</td>
            <td className="px-4 py-3.5">
              <p className="text-sm font-medium text-slate-900">{row.customerName || "—"}</p>
              <p className="font-mono text-[11px] text-slate-500">{row.customerEmail ?? "Awaiting payment"}</p>
            </td>
            <td className="px-4 py-3.5">
              <p className="text-sm font-semibold text-slate-900">{row.packageName}</p>
              <p className="text-[11px] text-slate-400">{row.packageKind === "PLAN" ? "Marketing plan" : "Website package"}</p>
            </td>
            <td className="px-4 py-3.5 font-bold text-slate-900">{formatMoney(row.amount, row.currency)}</td>
            <td className="px-4 py-3.5">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_STYLES[row.status]}`}>{row.status}</span>
            </td>
            <td className="px-4 py-3.5 text-xs text-slate-400 last:pr-5">{formatDate(row.expiresAt, "No expiry")}</td>
          </tr>
        ))}
      </Table>
      {rows.length > 0 && (
        <p className="mt-3 text-right text-xs text-slate-500">
          Paid in this view: <span className="font-bold text-slate-900">{formatMoney(paidTotal)}</span>
        </p>
      )}
    </Panel>
  );
}
