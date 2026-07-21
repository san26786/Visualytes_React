"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import {
  BRAND_MOTION,
  BRAND_SURFACE,
  BRAND_TEXT,
} from "@/src/common/components/ui/brand/theme";

const accents = [
  "border-cyan-300/30 hover:border-cyan-300/50",
  "border-fuchsia-300/30 hover:border-fuchsia-300/50",
  "border-violet-300/30 hover:border-violet-300/50",
  "border-emerald-300/30 hover:border-emerald-300/50",
];

interface TestimonialProps {
  image: string;
  name: string;
  designation: string;
  company?: string;
  content: string;
  index?: number;
}

export default function TestimonialCard({
  image,
  name,
  designation,
  company,
  content,
  index = 0,
}: TestimonialProps) {
  const accent = accents[index % accents.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      className={`group relative flex flex-col items-center px-6 py-10 text-center ${BRAND_SURFACE.glassCard} ${accent} ${BRAND_MOTION.softTransition} hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(34,211,238,0.12)]`}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-400/5 blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />

      <div className="relative mb-6">
        <div className="h-[88px] w-[88px] overflow-hidden rounded-full border-2 border-white/20 bg-slate-800 shadow-[0_0_24px_rgba(34,211,238,0.15)] sm:h-[96px] sm:w-[96px]">
          <Image
            src={image}
            alt={name}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
        <Quote
          fill="#22d3ee"
          className="absolute -bottom-2 -right-2 h-8 w-8 rotate-180 text-cyan-300"
        />
      </div>

      <h3 className={`${BRAND_TEXT.cardTitle} text-lg sm:text-xl`}>{name}</h3>

      {(designation || company) && (
        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
          {designation}
          {company && `, ${company}`}
        </p>
      )}

      <p className={`mt-5 max-w-md italic ${BRAND_TEXT.cardBody} text-slate-300`}>
        &ldquo;{content}&rdquo;
      </p>
    </motion.article>
  );
}
