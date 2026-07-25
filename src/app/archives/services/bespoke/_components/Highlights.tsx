"use client";

import { motion } from "framer-motion";
import {
  Users,
  Globe,
  PoundSterling,
  Zap,
  Award,
  MonitorSmartphone,
} from "lucide-react";
import { heroHighlights } from "./data";
import { popIn, staggerContainer } from "@/src/app/(home)/_componts/shared/motion";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

const icons = [Users, Globe, PoundSterling, Zap, Award, MonitorSmartphone];
const accents = [
  "from-cyan-400 to-cyan-600",
  "from-fuchsia-400 to-pink-500",
  "from-violet-400 to-indigo-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-red-500",
];

export default function Highlights() {
  return (
    <section className="py-16 lg:py-20 bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {heroHighlights.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item}
                custom={i}
                variants={popIn}
                className={`group relative overflow-hidden p-6  ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
              >
               <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center">
  <div
    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accents[i]} shadow-lg`}
  >
    <Icon className="h-6 w-6 text-white" />
  </div>

  <p className="text-base font-semibold leading-snug text-white">
    {item}
  </p>
</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
