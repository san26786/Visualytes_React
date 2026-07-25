"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BrandPageBackdrop, sectionReveal } from "./page-effects";
import { BRAND_GRADIENT, BRAND_TEXT } from "./theme";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BrandArchiveShellProps = {
  title: string;
  titleAccent?: string;
  eyebrow?: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
};

export default function BrandArchiveShell({
  title,
  titleAccent,
  eyebrow,
  subtitle,
  breadcrumbs,
  children,
}: BrandArchiveShellProps) {
  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      <div className="relative z-10">
        <section className="relative mt-[130px] overflow-hidden">
          <div className="relative flex min-h-[380px] flex-col items-center justify-center px-4 pb-28 pt-16 text-center sm:min-h-[440px] sm:pb-36 sm:pt-20">
            <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-fuchsia-500/25 blur-[100px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[80px]" />

            <ol className="relative z-10 mb-6 flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]">
              <li>
                <Link
                  href="/"
                  className="text-cyan-300 transition-colors duration-200 hover:text-white"
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-3">
                  <span className="text-white/30">●</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-cyan-300 transition-colors duration-200 hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/60">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>

            {eyebrow && (
              <p className={`relative z-10 ${BRAND_TEXT.sectionEyebrow}`}>
                {eyebrow}
              </p>
            )}

            <h1 className="relative z-10 max-w-4xl text-[42px] font-bold leading-[1.1] tracking-tight text-white sm:text-[56px] lg:text-[68px]">
              {title}{" "}
              {titleAccent && (
                <span className={BRAND_GRADIENT.text}>{titleAccent}</span>
              )}
            </h1>

            {subtitle && (
              <p
                className={`relative z-10 mt-5 max-w-2xl text-[17px] leading-relaxed ${BRAND_TEXT.sectionBody}`}
              >
                {subtitle}
              </p>
            )}

            <div className="relative z-10 mt-10 flex items-center gap-3">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300/80" />
            </div>
          </div>
        </section>

        <motion.div {...sectionReveal}>{children}</motion.div>
      </div>
    </main>
  );
}
