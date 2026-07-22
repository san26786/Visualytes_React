"use client";

import Link from "next/link";

import { BRAND_GRADIENT } from "@/src/common/components/ui/brand/theme";

export default function ServicesWrapper() {
  return (
    <section className="relative mt-[130px] overflow-hidden">
      <div className="relative flex min-h-[440px] flex-col items-center justify-center px-4 pb-36 pt-20 text-center">
        <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-fuchsia-500/25 blur-[100px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[80px]" />

        <ol className="relative z-10 mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]">
          <li>
            <Link href="/" className="text-cyan-300 hover:text-white transition-colors duration-200">
              Home
            </Link>
          </li>
          <li className="text-white/30">●</li>
          <li className="text-white/60">Services</li>
        </ol>

        <h1 className="relative z-10 max-w-3xl text-[52px] font-bold leading-[1.1] tracking-tight text-white sm:text-[64px] lg:text-[76px]">
          Our{" "}
          <span className={BRAND_GRADIENT.text}>
            Services
          </span>
        </h1>

        <p className="relative z-10 mt-5 max-w-xl text-[17px] leading-relaxed text-slate-300">
          Comprehensive digital solutions tailored to transform your business and drive growth.
        </p>

        <div className="relative z-10 mt-10 flex items-center gap-3">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300/80" />
        </div>
      </div>
    </section>
  );
}