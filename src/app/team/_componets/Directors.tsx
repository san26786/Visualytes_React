"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { directors } from "./data";
import { BRAND_SURFACE, BRAND_TEXT } from "@/src/common/components/ui/brand/theme";

export default function Directors() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-[1220px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className={BRAND_TEXT.sectionEyebrow}>Leadership</p>
          <h2 className={`mt-3 ${BRAND_TEXT.sectionTitle}`}>
            Meet the{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
              Directors
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {directors.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group max-w-sm overflow-hidden ${BRAND_SURFACE.glassCard} p-6 text-center transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="relative mx-auto h-[280px] w-[280px] overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.role}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/15" />
              </div>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-slate-200">
                {item.role}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
