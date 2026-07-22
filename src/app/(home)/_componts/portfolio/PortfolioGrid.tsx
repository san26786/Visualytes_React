"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND_HOVER } from "@/src/common/components/ui/brand/theme";

import { PortfolioHeaderProps } from "./PortfolioHeader";
import { categoryRoutes } from "./data/portfoliodata";
import { useState } from "react";

interface PortfolioItem {
  image: string;
  title: string;
  category: string;
}

interface Props extends PortfolioHeaderProps {
  items: PortfolioItem[];
}

export default function PortfolioGrid({
  items,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={`${item.title}-${item.category}-${index}`}
              layout="position"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className={`group relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 shadow-[0_22px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl ${BRAND_HOVER.card}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={600}
                  className={`h-full w-full object-cover ${BRAND_HOVER.image}`}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="px-6 text-center">
                    <Link
                      href={
                        categoryRoutes[item.category] ??
                        "/archives/portfolio"
                      }
                    >
                      <p className="text-[11px] uppercase tracking-[3px] text-cyan-300 transition-colors duration-300">
                        {item.category}
                      </p>
                    </Link>

                    <h3 className="mt-3 text-[22px] font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}