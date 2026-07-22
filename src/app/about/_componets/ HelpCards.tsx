"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cards } from "./data";
import {
  BRAND_MOTION,
  BRAND_SURFACE,
  BRAND_TEXT,
} from "@/src/common/components/ui/brand/theme";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

/* accent colours cycling through cards */
const accents = [
  { border: "from-cyan-400/40 to-cyan-300/20",  glow: "bg-cyan-400/10",   tag: "text-cyan-300",   dot: "bg-cyan-400"   },
  { border: "from-fuchsia-400/40 to-pink-300/20", glow: "bg-fuchsia-400/10", tag: "text-fuchsia-300", dot: "bg-fuchsia-400" },
  { border: "from-violet-400/40 to-indigo-300/20",glow: "bg-violet-400/10",  tag: "text-violet-300", dot: "bg-violet-400"  },
  { border: "from-emerald-400/40 to-teal-300/20", glow: "bg-emerald-400/10", tag: "text-emerald-300", dot: "bg-emerald-400" },
  { border: "from-pink-400/40 to-rose-300/20",   glow: "bg-pink-400/10",    tag: "text-pink-300",   dot: "bg-pink-400"   },
  { border: "from-orange-400/40 to-amber-300/20", glow: "bg-orange-400/10",  tag: "text-orange-300", dot: "bg-orange-400" },
];

export default function HelpCards() {
  return (
    <section className="relative px-4 pb-24 pt-10">
      <div className="mx-auto max-w-[1220px]">

        {/* ── Section heading ── */}
        <motion.div {...fadeUp(0)} className="mb-16 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-6 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-lime-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" />
            Our Services
          </span>

          <h2 className={`mt-5 ${BRAND_TEXT.sectionTitle} lg:text-6xl`}>
            How Can We{" "}
            <span className="bg-gradient-to-r from-lime-300 via-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
              Help You?
            </span>
          </h2>

          <p className={`mx-auto mt-5 max-w-2xl ${BRAND_TEXT.sectionBody}`}>
            From websites to bespoke software, hardware and marketing — we cover
            every aspect of your digital journey under one roof.
          </p>

          {/* decorative divider */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-300/70" />
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-fuchsia-300/70" />
          </div>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const accent = accents[index % accents.length];
            return (
              <motion.div
                key={card.title}
                {...fadeUp(0.07 * index)}
                className={`group relative flex flex-col overflow-hidden ${BRAND_SURFACE.glassCard} ${BRAND_MOTION.softTransition} hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(0,0,0,0.5)]`}
              >
                {/* gradient border glow on hover */}
                <div className={`pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-br ${accent.border} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100`} />

                {/* image */}
                <div className="relative h-[220px] w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* dark gradient over image */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/30 to-slate-950/90" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

                  {/* numbered badge */}
                  <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 backdrop-blur-sm">
                    <span className={`text-xs font-bold ${accent.tag}`}>
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* content */}
                <div className="relative z-10 flex flex-1 flex-col gap-4 p-7">
                  {/* ambient glow spot */}
                  <div className={`pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full ${accent.glow} blur-2xl`} />

                  <h3 className={`leading-snug ${BRAND_TEXT.cardTitle}`}>
                    {card.title}
                  </h3>

                  {/* accent rule */}
                  <div className={`h-0.5 w-10 rounded-full bg-gradient-to-r ${accent.border} transition-all duration-300 group-hover:w-20`} />

                  <p className={`flex-1 ${BRAND_TEXT.cardBody}`}>
                    {card.description}
                  </p>

                  <Link
                    href={card.link}
                    className={`inline-flex items-center gap-2 text-[14px] font-semibold ${accent.tag} ${BRAND_MOTION.fastTransition} hover:gap-4`}
                  >
                    Explore More
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current opacity-60 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={13} />
                    </span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom highlight strip ── */}
        <motion.div
          {...fadeUp(0.3)}
          className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/90 to-fuchsia-950/40 p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-12"
        >
          <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-fuchsia-400/15 blur-3xl" />

          <p className="relative z-10 mb-3 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
            One Roof. Every Need.
          </p>
          <h3 className="relative z-10 text-3xl font-bold text-white sm:text-4xl">
            Ready to{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
              build something great
            </span>{" "}
            together?
          </h3>
          <p className="relative z-10 mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-slate-300">
            Visualytes brings perfection, high quality deliveries and premium
            level service to web‑apps, software and digital marketing — all
            under one roof.
          </p>
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-8 py-4 font-bold text-white shadow-lg shadow-fuchsia-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-fuchsia-500/40"
            >
              Get In Touch <ArrowRight size={16} />
            </Link>
            <Link
              href="/our-services"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              View All Services
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
