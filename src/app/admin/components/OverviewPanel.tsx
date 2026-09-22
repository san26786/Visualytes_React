"use client";

import React from "react";
import { Panel } from "../../admin-dashboard/components/UI/Panel";
import { Table } from "../../admin-dashboard/components/UI/Table";
import { Submission, Purchase } from "../../admin-dashboard/types/dashboard";
import { MetricCard } from "./UI/MetricCard";
import {
  Users,
  ClipboardList,
  Package,
  CreditCard,
  Sparkles,
} from "lucide-react";

interface Metric {
  label: string;
  value: number;
  change: string;
}

export function OverviewPanel({
  metrics,
  submissions,
  purchases,
}: {
  metrics: Metric[];
  submissions: Submission[];
  purchases: Purchase[];
}) {
  const metricConfigs = [
    {
      icon: <Users size={20} />,
      color: "from-indigo-500/15 to-blue-500/10 text-indigo-600",
    },
    {
      icon: <ClipboardList size={20} />,
      color: "from-cyan-500/15 to-sky-500/10 text-cyan-600",
    },
    {
      icon: <Package size={20} />,
      color: "from-amber-500/15 to-orange-500/10 text-amber-600",
    },
    {
      icon: <CreditCard size={20} />,
      color: "from-emerald-500/15 to-teal-500/10 text-emerald-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 backdrop-blur-md">
            <Sparkles size={13} />
            <span>Visualytes Administration Control Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back to the Command Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time management for customer submissions, service packages, content, SEO, portfolio, and marketing assets.
          </p>
        </div>
        <div className="absolute right-0 top-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item, index) => {
          const config = metricConfigs[index % metricConfigs.length];
          return (
            <MetricCard
              key={item.label}
              label={item.label}
              value={item.value}
              change={item.change}
              icon={config.icon}
              color={config.color}
            />
          );
        })}
      </div>

      {/* Main Grid Tables */}
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel
          title="Recent Form Submissions"
          description="Latest inquiries received through public contact and questionnaire forms"
          icon={<ClipboardList size={18} className="text-cyan-600" />}
          badge={
            <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold text-cyan-700 border border-cyan-200">
              {submissions.length} Total
            </span>
          }
        >
          <Table
            headings={["Form Key", "Contact Name", "Email Address", "Date"]}
            empty={submissions.length === 0}
            emptyMessage="No form submissions recorded yet."
          >
            {submissions.slice(0, 6).map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-slate-50/80"
              >
                <td className="px-4 py-3.5 first:pl-5">
                  <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800">
                    {item.formKey}
                  </span>
                </td>
                <td className="px-4 py-3.5 font-medium text-slate-900">
                  {item.name || "—"}
                </td>
                <td className="px-4 py-3.5 text-xs text-slate-500">
                  {item.email || "—"}
                </td>
                <td className="px-4 py-3.5 last:pr-5 text-xs text-slate-400">
                  {new Date(item.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </Table>
        </Panel>

        <Panel
          title="Recent Package Purchases"
          description="Direct package orders and subscription activities"
          icon={<CreditCard size={18} className="text-emerald-600" />}
          badge={
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
              {purchases.length} Total
            </span>
          }
        >
          <Table
            headings={["Package", "Customer Email", "Status", "Expiry Date"]}
            empty={purchases.length === 0}
            emptyMessage="No purchases recorded yet."
          >
            {purchases.slice(0, 6).map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-slate-50/80"
              >
                <td className="px-4 py-3.5 first:pl-5 font-semibold text-slate-900">
                  {item.packageName}
                </td>
                <td className="px-4 py-3.5 text-xs text-slate-500 truncate max-w-[140px]">
                  {item.customerEmail ?? "Awaiting payment"}
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      item.status.toLowerCase() === "active" ||
                      item.status.toLowerCase() === "completed" ||
                      item.status.toLowerCase() === "paid"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 last:pr-5 text-xs text-slate-400">
                  {item.expiresAt
                    ? new Date(item.expiresAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "No Expiry"}
                </td>
              </tr>
            ))}
          </Table>
        </Panel>
      </div>
    </div>
  );
}