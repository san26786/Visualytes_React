"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BrandPageBackdrop, sectionReveal } from "./page-effects";
import { BRAND_TEXT } from "./theme";

type BrandSubPageShellProps = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  children: ReactNode;
};

export default function BrandSubPageShell({
  title,
  eyebrow,
  subtitle,
  children,
}: BrandSubPageShellProps) {
  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      <div className="relative z-10">
        <section className="relative mt-[130px] overflow-hidden px-4 pb-12 pt-16 text-center">
          <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[120px]" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-fuchsia-500/15 blur-[100px]" />

          <ol className="relative z-10 mb-6 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-widest">
            <li>
              <Link
                href="/"
                className="text-cyan-300 transition-colors duration-200 hover:text-white"
              >
                Home
              </Link>
            </li>
            <li className="text-white/30">●</li>
            <li>
              <Link
                href="/about"
                className="text-cyan-300 transition-colors duration-200 hover:text-white"
              >
                About Us
              </Link>
            </li>
            <li className="text-white/30">●</li>
            <li className="text-white/60">{title}</li>
          </ol>

          {eyebrow && (
            <p className={`relative z-10 ${BRAND_TEXT.sectionEyebrow}`}>
              {eyebrow}
            </p>
          )}

          <h1 className="relative z-10 mt-4 text-[42px] font-bold leading-tight tracking-tight text-white sm:text-[56px] lg:text-[64px]">
            {title}
          </h1>

          {subtitle && (
            <p
              className={`relative z-10 mx-auto mt-5 max-w-2xl ${BRAND_TEXT.sectionBody}`}
            >
              {subtitle}
            </p>
          )}

          <div className="relative z-10 mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300/80" />
          </div>
        </section>

        <motion.div {...sectionReveal}>{children}</motion.div>
      </div>
    </main>
  );
}
