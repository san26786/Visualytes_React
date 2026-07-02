"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

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
  active,
  setActive,
  categories,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <div className="container mx-auto mt-16 px-5 pb-[10vw] max-w-6xl">
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5">
       {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`relative uppercase tracking-[3px] text-[13px] font-bold transition-all duration-300 ${
                active === item
                  ? "text-[#ff497c]"
                  : "text-[#1f2732] hover:text-[#ff497c]"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
              className="group relative overflow-hidden border border-gray-200 bg-white"
            >
              <div className="relative w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="h-auto w-full object-contain"
                />
              </div>
<div className="group">
              <div
 className="
 absolute inset-0 flex items-center justify-center bg-white/90
 opacity-0 transition duration-300
 group-hover:opacity-100
 hover:opacity-100
"
>
                <div className="px-5 text-center">
                  <Link
                    href={
                      categoryRoutes[item.category] ??
                      "/archives/portfolio"
                    }
                  >
                    <p className="text-[11px] uppercase tracking-[3px] text-[#ff497c] transition-colors duration-300 hover:text-black">
                      {item.category}
                    </p>
                  </Link>

                  <h3 className="mt-3 text-[24px] font-medium text-black transition-colors duration-300 hover:text-[#ff497c]">
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