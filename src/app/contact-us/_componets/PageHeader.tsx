"use client";

import Link from "next/link";
import { items } from "@/src/common/components/layouts/AboveFooter";

export default function PageHeader() {
  return (
    <section className="relative mt-[130px] overflow-hidden">
      {/* ── Hero band ── */}
      <div className="relative flex min-h-[440px] flex-col items-center justify-center px-4 pb-36 pt-20 text-center">
        {/* blobs */}
        <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-fuchsia-500/25 blur-[100px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[80px]" />

        {/* breadcrumb */}
        <ol className="relative z-10 mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest">
          <li>
            <Link href="/" className="text-cyan-300 hover:text-white transition-colors duration-200">
              Home
            </Link>
          </li>
          <li className="text-white/30">●</li>
          <li className="text-white/60">Contact Us</li>
        </ol>

        {/* headline */}
        <h1 className="relative z-10 max-w-3xl text-[52px] font-bold leading-[1.1] tracking-tight text-white sm:text-[64px] lg:text-[76px]">
          Let&apos;s{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
            Talk
          </span>
        </h1>

        <p className="relative z-10 mt-5 max-w-xl text-[17px] leading-relaxed text-slate-300">
          We&apos;re always happy to hear from you — whether it&apos;s a new
          project, a quick question, or just a hello.
        </p>

        {/* decorative line */}
        <div className="relative z-10 mt-10 flex items-center gap-3">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300/80" />
        </div>
      </div>

      {/* ── Contact cards (overlapping hero bottom) ── */}
      <div className="relative z-20 mx-auto -mt-24 max-w-[1220px] px-4 pb-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-cyan-500/10"
            >
              {/* icon */}
              <div className="relative mx-auto mb-7 flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 blur-sm transition-all duration-300 group-hover:from-cyan-400/40 group-hover:to-fuchsia-500/40" />
                <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/15 bg-slate-950">
                  <i
                    className={item.icon}
                    style={{
                      fontSize: "32px",
                      color: item.color,
                      lineHeight: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </div>
              </div>

              {/* title */}
              <h3 className="mb-3 text-[22px] font-bold text-white">
                {item.title}
              </h3>

              {/* accent rule */}
              <div className="mx-auto mb-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-400 transition-all duration-300 group-hover:w-20" />

              {/* content */}
              <div className="text-[14px] leading-8 text-slate-300">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
