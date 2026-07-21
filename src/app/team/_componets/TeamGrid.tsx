"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { team } from "./data";
import { BRAND_SURFACE, BRAND_TEXT } from "@/src/common/components/ui/brand/theme";

export default function TeamGrid() {
  return (
    <section className="px-4 pb-24 pt-6">
      <div className="mx-auto max-w-[1220px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className={BRAND_TEXT.sectionEyebrow}>Our People</p>
          <h2 className={`mt-3 ${BRAND_TEXT.sectionTitle}`}>
            The{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
              Team
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((item, index) => (
            <motion.article
              key={`${item.role}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.08 }}
              className={`group overflow-hidden ${BRAND_SURFACE.mutedGlassCard} transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300/30`}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.role}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
              <p className="px-4 py-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-200">
                {item.role}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
