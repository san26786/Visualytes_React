"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import HomeSection from "@/src/app/(home)/_componts/shared/HomeSection";
import { audienceSegments } from "./data";
import {
  Building2,
  Layers,
  Briefcase,
  Rocket,
  Landmark,
} from "lucide-react";
import { popIn, staggerContainer } from "@/src/app/(home)/_componts/shared/motion";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

const iconMap = {
  Building2,
  Layers,
  Briefcase,
  Rocket,
  Landmark,
};

export default function PartnerSection() {
  return (
    <section className="relative overflow-hidden py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid items-center gap-16 lg:grid-cols-2"
        >
          <div>
            <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300 mb-6">
              Your Partner
            </span>
            <h2 className="text-[32px] font-bold leading-tight text-white sm:text-[40px] lg:text-[44px]">
              As your Digital Transformation partner, we will be with you every
              step of the way – from initial planning to delivery, and beyond.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Our multi-award winning 250+ team of expert software developers
              create bespoke software products, apps and operational systems for
              SMEs, enterprise, not-for-profit, government and funded start-ups
              using a choice of Microsoft and Javascript technologies across our
              UK and mainland European delivery centres.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4  " />
            <div className="relative overflow-hidden ">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/assets/png/unity-1.png"
                  alt="Digital transformation team"
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 " />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <HomeSection
        eyebrow="Who We Serve"
        title="Solutions Tailored for"
        highlight="Every Stage"
        subtitle="From enterprise digital transformation to funded start-ups — we build software that fits your organisation."
        className="pb-0"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {audienceSegments.map((segment, i) => {
            const Icon = iconMap[segment.icon as keyof typeof iconMap];
            return (
              <motion.article
                key={segment.title}
                custom={i}
                variants={popIn}
                className={`group relative overflow-hidden p-8 text-left ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${segment.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                />
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${segment.accent} shadow-lg`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold leading-snug text-white group-hover:text-cyan-300 transition-colors">
                  {segment.title}
                </h3>
              </motion.article>
            );
          })}
        </motion.div>
      </HomeSection>
    </section>
  );
}
