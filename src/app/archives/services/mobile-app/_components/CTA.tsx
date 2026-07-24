"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-700" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />

  <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
    <span className="mb-4 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium uppercase tracking-[0.2em] text-cyan-100 backdrop-blur">
      Let&apos;s Build Together
    </span>

    <h2 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
      Start working on your app right away!
    </h2>

    <p className="mt-6 max-w-3xl text-lg leading-8 text-cyan-50/90 md:text-xl">
      Receive your first working demo within{" "}
      <span className="font-semibold text-white">7 days</span> from the project
      kick-off.
    </p>

    <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row">
  <Link
  href="/estimate-project"
  className="rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-slate-900 transition-all duration-300 hover:scale-105 hover:bg-cyan-50"
>
  ESTIMATE PROJECT →
</Link>

      <a
        href="mailto:info@visualytes.com"
        className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/10"
      >
        or just write an email
      </a>
    </div>
  </div>
</section>
  );
}
