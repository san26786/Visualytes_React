"use client";

import { useMemo, useState } from "react";
import { Eye, EyeOff, Pencil, Plus, Receipt, Search, Trash2 } from "lucide-react";

import type { AdminPackage, PackageKind } from "@/src/lib/packages/types";
import { Button } from "../../components/UI/Button";
import { Panel } from "../../components/UI/Panel";
import { Table } from "../../components/UI/Table";
import { formatDate, formatMoney } from "./format";

type Props = {
  kind: PackageKind;
  items: AdminPackage[];
  onCreate: () => void;
  onEdit: (item: AdminPackage) => void;
  onDelete: (item: AdminPackage) => void;
  onToggle: (item: AdminPackage) => void;
  onViewOrders: (item: AdminPackage) => void;
};

const COPY = {
  PACKAGE: {
    title: "Website Packages",
    description: "Cards shown on /packages",
    noun: "package",
    empty: "No website packages yet. Create the first one.",
  },
  PLAN: {
    title: "Marketing Plans",
    description: "Cards shown on /end-to-end-digital-marketing-plans",
    noun: "plan",
    empty: "No marketing plans yet. Create the first one.",
  },
} as const;

export function PackageList({ kind, items, onCreate, onEdit, onDelete, onToggle, onViewOrders }: Props) {
  const copy = COPY[kind];
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? items.filter((item) => `${item.name} ${item.category} ${item.description ?? ""}`.toLowerCase().includes(query)) : items;
  }, [items, search]);

  return (
    <Panel
      title={copy.title}
      description={copy.description}
      badge={<span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">{items.length} total</span>}
      headerAction={
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-52">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder={`Search ${copy.noun}s...`}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 text-xs outline-none transition focus:border-cyan-500 focus:bg-white"
            />
          </div>
          <Button size="sm" variant="cyan" icon={<Plus size={14} />} onClick={onCreate}>
            New {copy.noun}
          </Button>
        </div>
      }
    >
      <Table
        headings={["Name", "Price", "Customers", "Orders", "Revenue", "Status", "Actions"]}
        empty={visible.length === 0}
        emptyMessage={items.length === 0 ? copy.empty : `No ${copy.noun}s match your search.`}
        className="min-w-[860px]"
      >
        {visible.map((item) => (
          <tr key={item.id} className="transition-colors hover:bg-slate-50/80">
            <td className="px-4 py-3.5 first:pl-5">
              <p className="font-semibold leading-tight text-slate-900">{item.name}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                {item.category}
                {kind === "PACKAGE" ? ` · ${item.features.filter((feature) => !feature.disabled).length}/${item.features.length} features` : ` · ${item.groups.length} groups`}
              </p>
            </td>
            <td className="px-4 py-3.5 font-bold text-slate-900">
              {item.contactOnly ? <span className="text-xs font-semibold text-slate-500">Contact Us</span> : formatMoney(item.price, item.currency)}
              {!item.contactOnly && <span className="block text-[11px] font-normal capitalize text-slate-400">{item.billingPeriod}</span>}
            </td>
            <td className="px-4 py-3.5 font-semibold text-slate-900">{item.stats.customers}</td>
            <td className="px-4 py-3.5 text-xs text-slate-600">
              {item.stats.paidOrders} paid
              {item.stats.pendingOrders > 0 && <span className="block text-[11px] text-amber-600">{item.stats.pendingOrders} pending</span>}
              {item.stats.lastPurchaseAt && <span className="block text-[11px] text-slate-400">Last {formatDate(item.stats.lastPurchaseAt)}</span>}
            </td>
            <td className="px-4 py-3.5 font-semibold text-slate-900">{formatMoney(item.stats.revenue, item.currency)}</td>
            <td className="px-4 py-3.5">
              <button
                type="button"
                onClick={() => onToggle(item)}
                title={item.isActive ? "Visible on the website. Click to hide." : "Hidden from the website. Click to show."}
                className={`inline-flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition ${
                  item.isActive ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item.isActive ? <Eye size={11} /> : <EyeOff size={11} />}
                {item.isActive ? "Live" : "Hidden"}
              </button>
            </td>
            <td className="px-4 py-3.5 last:pr-5">
              <div className="flex items-center gap-1.5">
                <IconButton label="View orders" onClick={() => onViewOrders(item)} tone="cyan">
                  <Receipt size={14} />
                </IconButton>
                <IconButton label={`Edit ${copy.noun}`} onClick={() => onEdit(item)} tone="cyan">
                  <Pencil size={14} />
                </IconButton>
                <IconButton
                  label={item.stats.orders > 0 ? "Has orders. Hide it instead of deleting." : `Delete ${copy.noun}`}
                  onClick={() => onDelete(item)}
                  disabled={item.stats.orders > 0}
                  tone="rose"
                >
                  <Trash2 size={14} />
                </IconButton>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </Panel>
  );
}

function IconButton({ label, tone, disabled, onClick, children }: { label: string; tone: "cyan" | "rose"; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  const hover = tone === "cyan" ? "hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700" : "hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700";
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-transparent disabled:hover:text-slate-500 ${hover}`}
    >
      {children}
    </button>
  );
}
