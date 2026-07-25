"use client";

import { motion } from "framer-motion";
import HomeSection from "@/src/app/(home)/_componts/shared/HomeSection";
import { bespokeTestimonials } from "./data";
import { popIn, staggerContainer } from "@/src/app/(home)/_componts/shared/motion";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-slate-900/30 py-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />

      <HomeSection
        eyebrow="Client Stories"
        title="Trusted by"
        highlight="Leaders"
        subtitle="Partners who've experienced our technical excellence, flexibility, and end-to-end delivery."
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 md:grid-cols-3"
        >
          {bespokeTestimonials.map((item, i) => (
            <motion.blockquote
              key={item.name}
              custom={i}
              variants={popIn}
              className={`relative flex flex-col p-8 text-left ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
            >
              <span className="absolute -right-2 -top-2 text-5xl text-fuchsia-400/40">
                &rdquo;
              </span>
              <p className="flex-1 text-sm italic leading-7 text-slate-300">
                {item.quote}
              </p>
              <footer className="mt-6 border-t border-white/10 pt-6">
                <cite className="not-italic">
                  <p className="text-lg font-semibold text-white">{item.name}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                    {item.role}
                  </p>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </HomeSection>
    </section>
  );
}
