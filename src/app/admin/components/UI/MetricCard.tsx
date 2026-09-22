import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  color?: string;
  description?: string;
}

export function MetricCard({
  label,
  value,
  change,
  icon,
  trend,
  color = "from-cyan-500/10 to-blue-500/10 text-cyan-600",
  description,
}: MetricCardProps) {
  const isPositive =
    trend === "up" || (change && change.startsWith("+") && !change.includes("-"));
  const isNegative =
    trend === "down" || (change && change.startsWith("-"));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {value}
            </span>
          </div>
        </div>
        {icon && (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-xs`}
          >
            {icon}
          </div>
        )}
      </div>

      {(change || description) && (
        <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          {change && (
            <span
              className={`inline-flex items-center gap-1 font-semibold rounded-full px-2 py-0.5 text-[11px] ${
                isPositive
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  : isNegative
                  ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {isPositive ? (
                <TrendingUp size={12} />
              ) : isNegative ? (
                <TrendingDown size={12} />
              ) : (
                <Minus size={12} />
              )}
              {change}
            </span>
          )}
          {description && (
            <span className="text-slate-400 truncate">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
