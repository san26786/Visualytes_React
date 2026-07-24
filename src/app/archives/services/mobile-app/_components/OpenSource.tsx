"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";

export default function OpenSource() {
  return (
    <section className="py-16">
      <div className="relative mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Open Source</h2>
          <p className="text-2xl text-cyan-300 font-semibold mb-6">+30 000 apps use our Open Source Code to Improve Their Products</p>
        
        </motion.div>
      </div>
    </section>
  );
}
