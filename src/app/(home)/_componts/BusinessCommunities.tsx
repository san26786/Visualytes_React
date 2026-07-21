"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HomeSection from "./shared/HomeSection";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

const members = [
  "/assets/png/members/Untitled-design-5.png",
  "/assets/png/members/Untitled-design-1.png",
  "/assets/png/members/Untitled-design-3.png",
  "/assets/png/members/Untitled-design-4.png",
  "/assets/png/members/Untitled-design-6.png",
  "/assets/png/members/Institute-of-Directors-Logo.jpg",
  "/assets/png/members/B2b-Growth-hub.jpg",
  "/assets/png/members/Entrepreneurs-Circle.webp",
];

export default function BusinessCommunities() {
  const doubled = [...members, ...members];

  return (
    <section className="relative overflow-hidden py-10">
      <HomeSection
        eyebrow="Community"
        title="Proud Member of"
        highlight="Business Communities"
        subtitle="Trusted by industry networks and entrepreneurial circles across the UK."
      >
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-slate-950 to-transparent" />

          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {doubled.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className={`group flex h-[160px] w-[240px] shrink-0 items-center justify-center rounded-2xl p-6 ${BRAND_SURFACE.mutedGlassCard} ${BRAND_HOVER.card}`}
              >
                <Image
                  src={logo}
                  alt={`Member ${(index % members.length) + 1}`}
                  width={200}
                  height={120}
                  loading="lazy"
                  className="h-[100px] w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </HomeSection>
    </section>
  );
}
