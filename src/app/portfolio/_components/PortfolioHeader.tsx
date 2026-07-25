"use client";

import { motion } from "framer-motion";
import { BRAND_GRADIENT } from "@/src/common/components/ui/brand/theme";

export interface PortfolioHeaderProps {
  active: string;
  setActive: (category: string) => void;
  categories: string[];
}

export default function PortfolioHeader({
  active,
  setActive,
  categories,
}: PortfolioHeaderProps) {
  return (
    <div className="mb-16 text-center">
      <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300">
        Our Work
      </span>

      <h2 className="mt-5 text-[38px] font-bold text-white sm:text-[46px]">
        Featured{" "}
        <span className={BRAND_GRADIENT.text}>
          Projects
        </span>
      </h2>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        {categories.map((item) => (
          <motion.button
            key={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActive?.(item)}
            className={`px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              active === item
                ? "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30"
                : "border border-white/15 bg-slate-900/80 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-300"
            }`}
          >
            {item}
          </motion.button>
        ))}
      </div>
    </div>
  );
}