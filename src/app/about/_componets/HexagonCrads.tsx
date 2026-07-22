"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { features } from "./data";
import {
  BRAND_MOTION,
  BRAND_SURFACE,
  BRAND_TEXT,
} from "@/src/common/components/ui/brand/theme";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

const featureAccents = [
  {
    glow: "from-orange-400/20 to-amber-500/10",
    tag: "text-orange-300",
    border: "from-orange-400/40 to-amber-300/20",
    line: "from-orange-400 to-amber-400",
  },
  {
    glow: "from-lime-400/20 to-green-500/10",
    tag: "text-lime-300",
    border: "from-lime-400/40 to-green-300/20",
    line: "from-lime-400 to-green-400",
  },
  {
    glow: "from-sky-400/20 to-blue-500/10",
    tag: "text-sky-300",
    border: "from-sky-400/40 to-blue-300/20",
    line: "from-sky-400 to-blue-400",
  },
  {
    glow: "from-violet-400/20 to-purple-500/10",
    tag: "text-violet-300",
    border: "from-violet-400/40 to-purple-300/20",
    line: "from-violet-400 to-purple-400",
  },
];

const narrative = [
  "There are many website and IT companies out there, but Visualytes Ltd is in a unique position: a company that in a previous incarnation has been trusted by some of the largest banks, charities and retail businesses in the world, which is now focusing that experience solely on the needs and interests of SMEs.",
  "With extensive contacts throughout the world, we have backing which ensures the stability of our services. We're not going anywhere (except forwards), and you can rely on us to offer a stable, long-lasting service for as long as you need us.",
  "We offer all the services you'll require under one roof, and what we have now is just the start. Every day, we're searching, experimenting, innovating and learning in our quest to develop more and better solutions for SMEs.",
  "\"All innovation begins with creative ideas.\" We at Visualytes Ltd are brimming over with creative ideas, and we're dedicated to applying those ideas to providing ongoing services for SMEs at a reasonable cost — so you can concentrate on what you do best.",
];

export default function HexagonCrads() {
  return (
    <section className="relative px-4 py-16 lg:py-20">
      <div className="mx-auto max-w-[1220px]">
        <motion.div {...fadeUp(0)} className="mb-14 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-violet-300/10 px-6 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-violet-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
            Our Strengths
          </span>

          <h2 className={BRAND_TEXT.sectionTitle}>
            What Makes Us{" "}
            <span className="bg-gradient-to-r from-orange-300 via-lime-300 to-violet-300 bg-clip-text text-transparent">
              Different
            </span>
          </h2>

          <p className={`mx-auto mt-5 max-w-2xl ${BRAND_TEXT.sectionBody}`}>
            Four pillars that define how we partner with businesses and deliver
            lasting value.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-violet-300/70" />
            <span className="h-2 w-2 rounded-full bg-violet-300" />
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-orange-300/70" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const accent = featureAccents[index % featureAccents.length];
            return (
              <motion.article
                key={item.title}
                {...fadeUp(0.08 * index)}
                className={`group relative flex flex-col overflow-hidden ${BRAND_SURFACE.glassCard} ${BRAND_MOTION.softTransition} hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(0,0,0,0.5)]`}
              >
                <div
                  className={`pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br ${accent.border} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative h-[180px] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/40 to-slate-950/95" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

                  <span
                    className={`absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest backdrop-blur-sm ${accent.tag}`}
                  >
                    0{index + 1}
                  </span>
                </div>

                <div className="relative flex flex-1 flex-col px-6 pb-7 pt-5">
                  <div
                    className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${accent.glow} blur-2xl`}
                  />

                  <h3 className={`relative z-10 ${BRAND_TEXT.cardTitle}`}>
                    {item.title}
                  </h3>

                  <div
                    className={`relative z-10 mt-4 h-1 w-12 rounded-full bg-gradient-to-r ${accent.line} transition-all duration-300 group-hover:w-20`}
                  />

                  <p className={`relative z-10 mt-4 flex-1 ${BRAND_TEXT.cardBody}`}>
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          {...fadeUp(0.2)}
          className={`relative mt-16 overflow-hidden ${BRAND_SURFACE.sectionWrap} px-6 py-10 sm:px-10 sm:py-12`}
        >
          <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-violet-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-orange-400/15 blur-3xl" />

          <div className="relative z-10 space-y-6">
            {narrative.map((paragraph, i) => (
              <p
                key={i}
                className={`${BRAND_TEXT.sectionBody} ${i === narrative.length - 1 ? "border-l-2 border-violet-400/50 pl-5 italic text-slate-200" : ""}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
