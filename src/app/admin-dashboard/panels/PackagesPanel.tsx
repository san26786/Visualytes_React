"use client";

import { useState } from "react";
import { CreditCard, Loader2, Package as PackageIcon, Receipt, Sparkles, Users, Wallet } from "lucide-react";

import type { AdminPackage, PackageKind } from "@/src/lib/packages/types";
import { ConfirmDialog } from "../components/UI/ConfirmDialog";
import { MetricCard } from "../components/UI/MetricCard";
import { OrdersTable } from "./packages/OrdersTable";
import { PackageEditor } from "./packages/PackageEditor";
import { PackageList } from "./packages/PackageList";
import { formatMoney } from "./packages/format";
import { usePackagesAdmin } from "./packages/usePackagesAdmin";

type View = "PACKAGE" | "PLAN" | "ORDERS";
type Editing = { kind: PackageKind; item: AdminPackage | null } | null;

export function PackagesPanel() {
  const { data, loading, loadError, reload, create, update, remove } = usePackagesAdmin();
  const [view, setView] = useState<View>("PACKAGE");
  const [editing, setEditing] = useState<Editing>(null);
  const [deleting, setDeleting] = useState<AdminPackage | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [orderPackageId, setOrderPackageId] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm text-slate-500">
        {loadError ? (
          <>
            <p className="font-medium text-rose-600">{loadError}</p>
            <button type="button" onClick={reload} className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50">
              Try again
            </button>
          </>
        ) : (
          <>
            <Loader2 className="animate-spin text-cyan-600" size={22} />
            {loading && "Loading packages..."}
          </>
        )}
      </div>
    );
  }

  const { packages, purchases, summary } = data;
  const byKind = (kind: PackageKind) => packages.filter((item) => item.kind === kind);

  if (editing) {
    return (
      <PackageEditor
        // Remount for every package so the draft never leaks between edits.
        key={editing.item?.id ?? "new"}
        kind={editing.kind}
        item={editing.item}
        onCancel={() => setEditing(null)}
        onSave={(input) => (editing.item ? update(editing.item.id, input, "Changes saved.") : create(input))}
      />
    );
  }

  const tabs: { id: View; label: string; count: number; icon: React.ReactNode }[] = [
    { id: "PACKAGE", label: "Website Packages", count: byKind("PACKAGE").length, icon: <PackageIcon size={15} /> },
    { id: "PLAN", label: "Marketing Plans", count: byKind("PLAN").length, icon: <Sparkles size={15} /> },
    { id: "ORDERS", label: "Orders & Customers", count: purchases.length, icon: <Receipt size={15} /> },
  ];

  const listFor = (kind: PackageKind) => (
    <PackageList
      kind={kind}
      items={byKind(kind)}
      onCreate={() => setEditing({ kind, item: null })}
      onEdit={(item) => setEditing({ kind, item })}
      onDelete={setDeleting}
      onToggle={(item) => update(item.id, { isActive: !item.isActive }, item.isActive ? `${item.name} hidden from the website.` : `${item.name} is now live.`)}
      onViewOrders={(item) => {
        setOrderPackageId(item.id);
        setView("ORDERS");
      }}
    />
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Revenue" value={formatMoney(summary.revenue)} icon={<Wallet size={20} />} color="from-emerald-500/10 to-teal-500/10 text-emerald-600" description="From paid orders" />
        <MetricCard label="Customers" value={summary.customers} icon={<Users size={20} />} description="Unique buyers with a paid order" />
        <MetricCard label="Paid orders" value={summary.paidOrders} icon={<CreditCard size={20} />} color="from-indigo-500/10 to-violet-500/10 text-indigo-600" />
        <MetricCard label="Pending checkouts" value={summary.pendingOrders} icon={<Receipt size={20} />} color="from-amber-500/10 to-orange-500/10 text-amber-600" description="Started but not paid" />
      </div>

      <div role="tablist" aria-label="Packages and billing" className="flex flex-wrap gap-2 rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-xs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={view === tab.id}
            onClick={() => setView(tab.id)}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              view === tab.id ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {tab.icon}
            {tab.label}
            <span className={`rounded-full px-1.5 text-[11px] ${view === tab.id ? "bg-white/20" : "bg-slate-100 text-slate-600"}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {view === "PACKAGE" && listFor("PACKAGE")}
      {view === "PLAN" && listFor("PLAN")}
      {view === "ORDERS" && <OrdersTable purchases={purchases} packages={packages} packageId={orderPackageId} onPackageChange={setOrderPackageId} />}

      <ConfirmDialog
        open={deleting !== null}
        title={`Delete ${deleting?.kind === "PLAN" ? "plan" : "package"}?`}
        description={
          <>
            <strong>{deleting?.name}</strong> will be removed from the website and the database. This cannot be undone.
          </>
        }
        confirmLabel="Delete"
        loading={deleteBusy}
        onCancel={() => setDeleting(null)}
        onConfirm={async () => {
          if (!deleting) return;
          setDeleteBusy(true);
          await remove(deleting.id);
          setDeleteBusy(false);
          setDeleting(null);
        }}
      />
    </div>
  );
}
