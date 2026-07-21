"use client";

import { motion } from "framer-motion";
import Map from "./_componets/Map";
import HelpCards from "./_componets/ HelpCards";
import HexagonCrads from "./_componets/HexagonCrads";
import AboutIntro from "./_componets/AboutIntro";
import History from "./_componets/History";
import Milestone from "./_componets/Milestone";
import Details from "./_componets/Details";
import {
  BrandPageBackdrop,
  sectionReveal,
} from "@/src/common/components/ui/brand/page-effects";

export default function AboutBrandSection() {
  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      {/* sections with scroll-entrance */}
      <div className="relative z-10">
        <AboutIntro />

        <motion.div {...sectionReveal}>
          <Details />
        </motion.div>

        <motion.div {...sectionReveal}>
          <History />
        </motion.div>

        <motion.div {...sectionReveal}>
          <Milestone />
        </motion.div>

        <motion.div {...sectionReveal}>
          <HexagonCrads />
        </motion.div>

        <motion.div {...sectionReveal}>
          <HelpCards />
        </motion.div>

        <motion.div {...sectionReveal}>
          <Map />
        </motion.div>
      </div>
    </main>
  );
}
