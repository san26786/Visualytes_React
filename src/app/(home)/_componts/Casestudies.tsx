"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HomeSection from "./shared/HomeSection";
import { popIn, staggerContainer } from "./shared/motion";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";
import { ExternalLink } from "lucide-react";

const caseStudies = [
  {
    href: "https://www.visualytes.com/projects/studio-creatives-2/",
    image: "/assets/webp/scfullpagess.png.bv.webp",
    title: "Studio Creatives",
    tag: "Web Design",
  },
  {
    href: "https://www.visualytes.com/projects/thorney-park-golf-club/",
    image: "/assets/webp/tparksshome.png.bv.webp",
    title: "Thorney Park Golf Club",
    tag: "Branding & Web",
  },
];

export default function CaseStudy() {
  return (
    <section className="relative overflow-hidden py-10">
      <HomeSection
        eyebrow="Case Studies"
        title="Few Selected"
        highlight="Projects"
        subtitle="Visualytes is not just another IT agency — we work with a different approach to your requirement, 99/100 times exceeding client expectations."
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {caseStudies.map((study, i) => (
            <motion.a
              key={study.title}
              href={study.href}
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              variants={popIn}
              className={`group relative block h-[420px] overflow-hidden rounded-3xl ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
            >
              <Image
                src={study.image}
                alt={study.title}
                fill
                loading="lazy"
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover object-top transition-all duration-[20s] ease-linear group-hover:object-bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="mb-2 inline-flex w-fit rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  {study.tag}
                </span>
                <h3 className="text-2xl font-bold text-white transition-transform duration-300 group-hover:translate-x-1">
                  {study.title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span>View Project</span>
                  <ExternalLink size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:bg-fuchsia-500/30" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 space-y-4"
        >
          <h3 className="text-2xl font-semibold text-white">
            Wish to know us better?{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
              Watch the video
            </span>
          </h3>
          <p className="mx-auto max-w-3xl text-slate-300">
            We don&apos;t say we are different — we understand the individual
            needs of B2B and B2C businesses better. Leverage our expertise to
            strategize web development, brand messaging, and content marketing.
          </p>
        </motion.div>
      </HomeSection>
    </section>
  );
}
