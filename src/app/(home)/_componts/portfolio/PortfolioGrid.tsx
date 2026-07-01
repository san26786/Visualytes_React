"use client";

import Image from "next/image";
import { PortfolioHeaderProps } from "./PortfolioHeader";
import { AnimatePresence, motion } from "framer-motion";

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
  return (
    <div className="container mx-auto mt-16 px-5 pb-[10vw]">
      {/* Categories */}
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

      {/* Portfolio Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  <AnimatePresence mode="popLayout">
    {items.map((item, index) => (
      <motion.div
      layout="position"
    key={`${item.title}-${item.category}-${index}`}
        initial={{
          opacity: 0,
          scale: 0.85,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.85,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group relative overflow-hidden border border-gray-200 bg-white"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-white/80"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-[#1f2732]/80 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="px-5 text-center text-white">
            <p className="text-xs uppercase tracking-[3px] ">
              {item.category}
            </p>

            <h3 className="mt-3 text-xl font-semibold transition-colors duration-300 group-hover:text-[#ff497c]">
              {item.title}
            </h3>
          </div>
        </div>
      </motion.div>
    ))}
  </AnimatePresence>
</div>
    </div>
  );
}