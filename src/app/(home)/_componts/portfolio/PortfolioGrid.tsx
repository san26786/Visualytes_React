"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";
import { categoryRoutes } from "./data/portfoliodata";

interface PortfolioItem {
  image: string;
  title: string;
  category: string;
}

interface PortfolioGridProps {
  items: PortfolioItem[];
  active: string;
  setActive: (category: string) => void;
  categories: string[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {items.slice(0, 12).map((item, index) => (
            <motion.article
              key={`${item.title}-${item.category}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className={`group relative cursor-pointer overflow-hidden rounded-2xl ${BRAND_SURFACE.mutedGlassCard} ${BRAND_HOVER.card}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="lazy"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                <Link
                  href={categoryRoutes[item.category] ?? "/archives/portfolio"}
                  className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300 transition-colors hover:text-white"
                >
                  {item.category}
                </Link>
                <h3 className="mt-3 max-w-[90%] px-4 text-center text-lg font-semibold text-white">
                  {item.title}
                </h3>
              </div>

              <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                <p className="truncate text-sm font-medium text-white">
                  {item.title}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-cyan-300/80">
                  {item.category}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
