"use client";

import Link from "next/link";
import { ArrowRight, UserRound } from "lucide-react";

import { cn } from "@/src/common/utils/cn";

type Props = {
  href?: string;
  label?: string;
  /** Stretch to the full width (used in the mobile menu). */
  fullWidth?: boolean;
  className?: string;
  onNavigate?: () => void;
};

/**
 * Header call-to-action.
 * - A gradient ring around a dark glass pill; on hover the pill fades to transparent so the
 *   gradient floods in (one smooth 500ms colour transition, no layered overlays).
 * - Icon badge inverts to white, a soft light sweep crosses the button, the arrow nudges forward.
 * - The whole button only eases a few pixels to the right on hover (it never follows the cursor).
 * - Everything is switched off for visitors who prefer reduced motion.
 *
 * Note: Tailwind v4 animates `translate` and `scale` as their own CSS properties, so they are
 * listed explicitly in each `transition-[...]` below.
 */
export default function ClientLoginButton({
  href = "/seo-questionnaire",
  label = "Client Login",
  fullWidth = false,
  className,
  onNavigate,
}: Props) {
  return (
    <div className={cn(fullWidth ? "w-full" : "inline-block", className)}>
      <Link
        href={href}
        onClick={onNavigate}
        className={cn(
          "group relative isolate rounded-full p-[1.5px]",
          "bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500",
          "shadow-[0_6px_24px_-8px_rgba(217,70,239,0.35)] transition-[translate,scale,box-shadow] duration-500 ease-out",
          "hover:translate-x-1 hover:shadow-[0_12px_34px_-8px_rgba(34,211,238,0.55)] active:scale-[0.97]",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300",
          "motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:active:scale-100",
          fullWidth ? "flex w-full hover:translate-x-0" : "inline-flex"
        )}
      >
        <span
          className={cn(
            "relative flex items-center overflow-hidden rounded-full bg-slate-950 py-1.5 pl-1.5 pr-5",
            "transition-colors duration-500 ease-out group-hover:bg-slate-950/0",
            "motion-reduce:transition-none",
            fullWidth ? "w-full justify-between" : "gap-3"
          )}
        >
          <span className="flex items-center gap-3">
            <span
              className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-cyan-300 ring-1 ring-white/15",
                "transition-[background-color,color,scale] duration-500 ease-out",
                "group-hover:scale-105 group-hover:bg-white group-hover:text-fuchsia-600",
                "motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              )}
            >
              <UserRound size={17} strokeWidth={2.2} />
            </span>

            <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white">{label}</span>
          </span>

          <ArrowRight
            size={15}
            className={cn(
              "relative z-10 text-white/70 transition-[translate,color] duration-500 ease-out",
              "group-hover:translate-x-1 group-hover:text-white",
              "motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            )}
          />

          {/* Light sweep */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 blur-md",
              "transition-[translate] duration-700 ease-out group-hover:translate-x-[520%]",
              "motion-reduce:hidden"
            )}
          />
        </span>
      </Link>
    </div>
  );
}
