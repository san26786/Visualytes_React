"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, KeyRound, MapPin, SearchCheck } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/src/common/utils/cn";
import type { AccountIcon, QField } from "@/src/lib/seo-questionnaire/config";
import type { AccountValue } from "@/src/lib/seo-questionnaire/schema";
import { PasswordField, TextField, YesNo, type StepProps } from "./fields";

const badge = (letter: string, className: string) => (
  <span className={cn("grid h-10 w-10 place-items-center rounded-xl text-sm font-extrabold text-white", className)}>{letter}</span>
);
const iconBox = (icon: ReactNode) => <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white">{icon}</span>;

const ICONS: Record<AccountIcon, ReactNode> = {
  generic: iconBox(<KeyRound size={20} />),
  map: iconBox(<MapPin size={20} />),
  chart: iconBox(<BarChart3 size={20} />),
  search: iconBox(<SearchCheck size={20} />),
  facebook: badge("f", "bg-[#1877F2]"),
  twitter: badge("X", "bg-slate-900"),
  linkedin: badge("in", "bg-[#0A66C2]"),
  instagram: badge("ig", "bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600"),
};

/** "Do you have one? Yes/No" then username + password. */
export default function AccountCard({ field, values, errors, set }: StepProps & { field: QField }) {
  const value = (values[field.key] as AccountValue | undefined) ?? { has: false, username: "", password: "" };
  const path = field.key;

  return (
    <section
      className={cn(
        "rounded-2xl border p-4 transition-[border-color,background-color,box-shadow] duration-300 sm:p-5",
        value.has ? "border-fuchsia-200 bg-white shadow-[0_12px_30px_-18px_rgba(217,70,239,0.45)]" : "border-slate-200 bg-slate-50/50"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {ICONS[field.icon ?? "generic"]}
          <div className="min-w-0">
            <h3 className="text-[15px] font-bold text-slate-900">{field.label} Account</h3>
            {field.hint && <p className="text-[13px] text-slate-500">{field.hint}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-medium text-slate-500">Do you have one?</span>
          <YesNo label={field.label} value={value.has} onChange={(has) => set(`${path}.has`, has)} />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {value.has && (
          <motion.div
            key="fields"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="grid gap-4 pt-5 sm:grid-cols-2">
              <TextField label={`${field.label} Username`} required placeholder="Username or email" value={value.username} error={errors[`${path}.username`]} onValue={(v) => set(`${path}.username`, v)} />
              <PasswordField label={`${field.label} Password`} value={value.password} error={errors[`${path}.password`]} onValue={(v) => set(`${path}.password`, v)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
