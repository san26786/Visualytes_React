"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Building2, Check, FileText, Globe, Mail, Package, Search, Share2, ShieldCheck, Star, Target, UserRound, type LucideIcon } from "lucide-react";

import { cn } from "@/src/common/utils/cn";
import type { QStep, StepIcon } from "@/src/lib/seo-questionnaire/config";

const ICONS: Record<StepIcon, LucideIcon> = {
  building: Building2,
  briefcase: Briefcase,
  package: Package,
  target: Target,
  globe: Globe,
  search: Search,
  share: Share2,
  user: UserRound,
  file: FileText,
  star: Star,
  shield: ShieldCheck,
  mail: Mail,
};

type Props = {
  steps: QStep[];
  current: number;
  /** Furthest step the user has reached; steps up to here can be revisited. */
  maxReached: number;
  onSelect: (index: number) => void;
};

/** Desktop: vertical stepper for the dark sidebar. */
export function VerticalStepper({ steps, current, maxReached, onSelect }: Props) {
  const reduce = useReducedMotion();

  return (
    <ol aria-label="Questionnaire progress" className="relative">
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;
        const reachable = index <= maxReached;
        const Icon = ICONS[step.icon] ?? Building2;

        return (
          <li key={step.id} className="relative">
            {index < steps.length - 1 && (
              <span aria-hidden="true" className="absolute left-[29px] top-[56px] h-[24px] w-0.5 overflow-hidden rounded-full bg-white/10">
                <motion.span
                  className="block h-full w-full origin-top bg-gradient-to-b from-emerald-300 to-cyan-300"
                  initial={false}
                  animate={{ scaleY: done ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: "easeInOut" }}
                />
              </span>
            )}

            <button
              type="button"
              disabled={!reachable}
              onClick={() => onSelect(index)}
              aria-current={active ? "step" : undefined}
              className={cn(
                "group flex w-full items-center gap-4 rounded-2xl px-2 py-3 text-left transition-colors duration-300",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300",
                reachable ? "cursor-pointer hover:bg-white/5" : "cursor-not-allowed",
                active && "bg-white/[0.07]"
              )}
            >
              <span className="relative grid h-11 w-11 shrink-0 place-items-center">
                {active && !reduce && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-fuchsia-400/50"
                    animate={{ scale: [1, 1.5], opacity: [0.55, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span
                  className={cn(
                    "relative grid h-11 w-11 place-items-center rounded-full transition-all duration-500",
                    done && "bg-emerald-400 text-slate-950 shadow-[0_8px_20px_-6px_rgba(52,211,153,0.7)]",
                    active && "bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-pink-500 text-white shadow-[0_0_0_5px_rgba(217,70,239,0.18),0_10px_28px_-6px_rgba(34,211,238,0.65)]",
                    !done && !active && "bg-white/[0.06] text-slate-400 ring-1 ring-white/10",
                    !done && !active && reachable && "group-hover:bg-white/10 group-hover:text-white"
                  )}
                >
                  {done ? (
                    <motion.span key="done" initial={reduce ? false : { scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 500, damping: 22 }}>
                      <Check size={20} strokeWidth={3} />
                    </motion.span>
                  ) : (
                    <Icon size={19} />
                  )}
                </span>
              </span>

              <span className="min-w-0">
                <span
                  className={cn(
                    "block text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-300",
                    done ? "text-emerald-300" : active ? "text-cyan-300" : "text-slate-500"
                  )}
                >
                  {done ? "Completed" : active ? "In progress" : `Step ${index + 1}`}
                </span>
                <span className={cn("block truncate text-sm font-semibold transition-colors duration-300", active || done ? "text-white" : "text-slate-400 group-hover:text-slate-200")}>
                  {step.title}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/** Mobile / tablet: compact connected dots. */
export function CompactStepper({ steps, current, maxReached, onSelect }: Props) {
  const reduce = useReducedMotion();

  return (
    <ol aria-label="Questionnaire progress" className="flex items-center">
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;
        const reachable = index <= maxReached;
        const Icon = ICONS[step.icon] ?? Building2;

        return (
          <Fragment key={step.id}>
            <li>
              <button
                type="button"
                disabled={!reachable}
                onClick={() => onSelect(index)}
                aria-current={active ? "step" : undefined}
                aria-label={`Step ${index + 1}: ${step.title}${done ? " (completed)" : ""}`}
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-500",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300",
                  reachable ? "cursor-pointer" : "cursor-not-allowed",
                  done && "bg-emerald-400 text-slate-950",
                  active && "bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-pink-500 text-white shadow-[0_0_0_4px_rgba(217,70,239,0.2)]",
                  !done && !active && "bg-white/10 text-slate-400 ring-1 ring-white/10"
                )}
              >
                {done ? <Check size={15} strokeWidth={3} /> : active ? <Icon size={15} /> : index + 1}
              </button>
            </li>
            {index < steps.length - 1 && (
              <li aria-hidden="true" className="mx-1 h-0.5 flex-1 overflow-hidden rounded-full bg-white/15">
                <motion.span
                  className="block h-full origin-left bg-gradient-to-r from-emerald-300 to-cyan-300"
                  initial={false}
                  animate={{ scaleX: done ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: "easeInOut" }}
                />
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
