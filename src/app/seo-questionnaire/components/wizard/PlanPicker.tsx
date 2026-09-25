"use client";

import { motion } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";

import { cn } from "@/src/common/utils/cn";

export type PlanOption = {
  id?: number;
  name: string;
  price: number;
  highlights: string[];
};

export const planLabel = (plan: PlanOption) => `${plan.name} - £${plan.price}`;

type Props = { plans: PlanOption[]; value: string; onChange: (value: string) => void; error?: string };

/** Cards for the plans created in the admin Packages tab. */
export default function PlanPicker({ plans, value, onChange, error }: Props) {
  return (
    <div>
      <div role="radiogroup" aria-label="SEO plan" className="grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => {
          const label = planLabel(plan);
          const selected = value === label;
          return (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(label)}
              className={cn(
                "group relative isolate cursor-pointer rounded-2xl border-2 p-5 text-left transition-all duration-300",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500",
                selected
                  ? "border-transparent bg-white shadow-[0_18px_40px_-16px_rgba(217,70,239,0.55)]"
                  : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              )}
            >
              {selected && (
                <motion.span
                  layoutId="plan-ring"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="pointer-events-none absolute -inset-0.5 -z-10 rounded-[1.05rem] bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-pink-500"
                />
              )}
              <span className="absolute inset-0 -z-10 rounded-2xl bg-white" />

              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">{plan.name}</p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">£{plan.price}</p>
                </div>
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-all duration-300",
                    selected ? "border-transparent bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white" : "border-slate-300 text-transparent"
                  )}
                >
                  <Check size={15} strokeWidth={3} />
                </span>
              </div>

              {plan.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px] text-slate-600">
                      <Check size={14} className="shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </button>
          );
        })}
      </div>

      {error && (
        <p role="alert" className="mt-3 flex items-center gap-1.5 text-[13px] font-medium text-rose-600">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
}
