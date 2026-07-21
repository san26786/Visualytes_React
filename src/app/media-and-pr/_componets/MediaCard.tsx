"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { MediaNews } from "./mediaData";
import {
  BRAND_MOTION,
  BRAND_SURFACE,
  BRAND_TEXT,
} from "@/src/common/components/ui/brand/theme";

interface Props {
  item: MediaNews;
  index?: number;
}

export default function MediaCard({ item, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.1 }}
      className={`overflow-hidden ${BRAND_SURFACE.glassCard} ${BRAND_MOTION.softTransition} hover:border-cyan-300/25`}
    >
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={item.image}
            alt={item.title}
            width={700}
            height={900}
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105 sm:aspect-[3/4]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
        </div>

        <div>
          <div className="mb-6 flex items-start gap-4">
            <span className="mt-1 h-10 w-1 shrink-0 rounded-full bg-gradient-to-b from-cyan-300 to-fuchsia-300" />
            <h2 className={`${BRAND_TEXT.cardTitle} text-xl leading-snug sm:text-2xl`}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-2 transition-colors hover:text-cyan-300"
              >
                {item.title}
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </h2>
          </div>

          <div className="space-y-4">
            {item.content.slice(0, 4).map((text, i) => (
              <p key={i} className={BRAND_TEXT.cardBody}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>

      <blockquote className="mx-6 mb-6 border-l-2 border-cyan-300/50 pl-6 sm:mx-8 sm:mb-8">
        {item.quote.map((q, i) => (
          <p key={i} className={`${BRAND_TEXT.cardBody} italic text-slate-300`}>
            {q}
          </p>
        ))}
      </blockquote>

      <div className="flex flex-col gap-1 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-slate-400">
          Published by{" "}
          <span className="font-medium text-cyan-300">{item.publisher}</span>
        </p>
        <p className="text-sm text-slate-500">{item.publishDate}</p>
      </div>
    </motion.article>
  );
}
