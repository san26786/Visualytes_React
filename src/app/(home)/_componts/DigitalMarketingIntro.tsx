"use client";

import { motion } from "framer-motion";
import HomeSection from "./shared/HomeSection";
import HomeBrandButton from "./shared/HomeBrandButton";
import ServicesGrid from "./ServicesGrid";
import { popIn, staggerContainer } from "./shared/motion";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

const highlights = [
  {
    title: "Strategy First",
    body: "Conversion-based web design coupled with a lead-generating marketing plan.",
    accent: "from-cyan-400 to-cyan-600",
  },
  {
    title: "Full-Stack Partner",
    body: "Website development, mobile apps, design, branding, and marketing under one roof.",
    accent: "from-fuchsia-400 to-pink-500",
  },
  {
    title: "Ready to Disrupt",
    body: "Strategy, planning, and hands-on experience to make a mark in your niche.",
    accent: "from-violet-400 to-indigo-500",
  },
];

const DigitalMarketingIntro = () => {
  return (
    <section className="relative overflow-hidden py-10">
      <div className="pointer-events-none absolute left-0 top-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[90px]" />

      <HomeSection
        eyebrow="Digital Partners"
        title="We are the most effective Web Designing &"
        highlight="Digital Marketing Company"
        subtitle="Getting online is easy. Succeeding online takes strategy, stunning design, and marketing that converts. We help you stand out and grow."
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {highlights.map((item, i) => (
            <motion.article
              key={item.title}
              custom={i}
              variants={popIn}
              className={`group relative overflow-hidden p-8 text-left ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
              />
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-lg font-bold text-white shadow-lg`}
              >
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 space-y-6"
        >
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-300">
            Trillions of websites exist — and yet there is enough room for
            disruption in your niche. Get on board with our team of professional
            web-wizards to accelerate the pace of your business.
          </p>
          <div className="flex justify-center">
            <HomeBrandButton href="/contact-us">Get Started</HomeBrandButton>
          </div>
        </motion.div>
      </HomeSection>

      <ServicesGrid />
    </section>
  );
};

export default DigitalMarketingIntro;
