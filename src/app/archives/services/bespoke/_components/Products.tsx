"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HomeSection from "@/src/app/(home)/_componts/shared/HomeSection";
import { products } from "./data";
import { popIn, staggerContainer } from "@/src/app/(home)/_componts/shared/motion";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

export default function Products() {
  return (
    <section className="relative overflow-hidden py-10">
      <HomeSection
        eyebrow="Our Products"
        title="Built by Visualytes,"
        highlight="Ready to Scale"
        subtitle="In-house products and platforms we've developed — from HR tools to document signing and beyond."
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product, i) => (
            <motion.article
              key={product.title}
              custom={i}
              variants={popIn}
              className={`group relative overflow-hidden text-left ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
            >
              <div className="relative h-[200px] overflow-hidden border-b border-white/10 bg-slate-950/80">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  loading="lazy"
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-300">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {product.description}
                </p>
              </div>

              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:bg-fuchsia-500/30" />
            </motion.article>
          ))}
        </motion.div>
      </HomeSection>
    </section>
  );
}
