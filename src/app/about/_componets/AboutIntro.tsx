import Link from "next/link";
import type { AboutContent } from "@/src/lib/page-content/types";

export default function AboutIntro({ content }: { content: AboutContent["intro"] }) {
  return (
    <section className="relative mt-[130px] overflow-hidden px-6 pb-8 pt-16 lg:px-10 lg:pt-20">
      <div className="pointer-events-none absolute left-8 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <ol className="mb-6 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]">
          <li>
            <Link href="/" className="text-cyan-300 transition-colors hover:text-white">
              Home
            </Link>
          </li>
          <li className="text-white/30">●</li>
          <li className="text-white/60">About Us</li>
        </ol>

        <div className="text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
            {content.eyebrow}
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-6xl">
            {content.titleNormal}{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
              {content.titleHighlight}
            </span>
          </h1>
          <div className="mx-auto mt-6 max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-white sm:text-4xl">
              {content.statementTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-200 sm:text-2xl">
              {content.statement}
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-8 py-3">
              <h3 className="text-2xl font-semibold text-cyan-200 sm:text-4xl">
                {content.welcomeTitle}
              </h3>
            </div>
          </div>

          <div className="space-y-5 text-[18px] leading-9 text-slate-300">
            {content.welcomeParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <div className="pt-4">
              <p className="text-slate-400">{content.signOff}</p>
              <p className="mt-5 text-xl font-bold text-white">{content.signName}</p>
              <p className="text-slate-300">{content.signRole}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}