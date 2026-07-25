"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HomeSection from "@/src/app/(home)/_componts/shared/HomeSection";
import { caseStudies } from "./data";
import { popIn, staggerContainer } from "@/src/app/(home)/_componts/shared/motion";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

export default function CaseStudies() {
  return (
    <section className="relative overflow-hidden bg-slate-900/30 py-10">
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-cyan-500/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-fuchsia-500/8 blur-[90px]" />

      <HomeSection
        eyebrow="Case Studies"
        title="Real Projects,"
        highlight="Real Impact"
        subtitle="Explore how we've helped businesses across industries with bespoke software, web platforms, and digital transformation."
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {caseStudies.map((study, i) => (
            <motion.a
              key={study.title}
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              variants={popIn}
              className={`group relative flex flex-col overflow-hidden text-left ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
            >
              <div className="relative h-[220px] overflow-hidden bg-slate-950">
                <Image
                  src={study.image}
                  alt={study.subtitle}
                  fill
                  loading="lazy"
                  sizes="(max-width:768px) 200vw, 33vw"
                  className={`object-cover transition-transform duration-700 ${BRAND_HOVER.image}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="mb-2 inline-flex w-fit rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  {study.subtitle}
                </span>
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-300">
                  {study.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                  {study.description}
                </p>
               
              </div>
            </motion.a>
          ))}
        </motion.div>
      </HomeSection>
    </section>
  );
}
