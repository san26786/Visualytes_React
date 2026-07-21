"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HomeSection from "./shared/HomeSection";
import { popIn, staggerContainer } from "./shared/motion";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

const steps = [
  {
    title: "Strategy",
    color: "from-pink-500 to-rose-500",
    numColor: "text-pink-400",
    image: "/assets/webp/strategy-01.jpg.bv.webp",
    text: "We define your competition and target audience, then design your website around what works in your industry.",
  },
  {
    title: "Design",
    color: "from-lime-400 to-green-500",
    numColor: "text-lime-400",
    image: "/assets/webp/design-02.jpg.bv.webp",
    text: "Colour scheme, layout, sitemap, and style — we bring your brand to life with a one-of-a-kind masterpiece.",
  },
  {
    title: "Development",
    color: "from-cyan-400 to-teal-500",
    numColor: "text-cyan-400",
    image: "/assets/webp/develop-03.jpg.bv.webp",
    text: "Watch your ideas become reality live via our project management platform on a development server.",
  },
  {
    title: "Support",
    color: "from-amber-400 to-orange-500",
    numColor: "text-amber-400",
    image: "/assets/webp/support-04.jpg.bv.webp",
    text: "Go live to the world. Marketing, maintenance, and enhancements — we're at your side for life.",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

      <HomeSection
        eyebrow="How We Work"
        title="Our"
        highlight="Process"
        subtitle="A proven four-step journey from strategy to launch — and beyond."
        className="relative z-10"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              custom={index}
              variants={popIn}
              className={`group relative flex flex-col items-center p-6 text-center ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
            >
              <span
                className={`absolute -top-3 right-6 text-6xl font-black opacity-20 ${step.numColor}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative mb-6">
                <div
                  className={`absolute -inset-1 rounded-full bg-gradient-to-br ${step.color} opacity-40 blur-md transition-opacity group-hover:opacity-70`}
                />
                <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full border-4 border-white/15">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    loading="lazy"
                    sizes="160px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
              <div
                className={`mx-auto mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r ${step.color} transition-all duration-300 group-hover:w-20`}
              />
              <p className="mt-4 text-sm leading-7 text-slate-300">{step.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </HomeSection>
    </section>
  );
}
