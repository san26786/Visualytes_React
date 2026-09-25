"use client";

import { motion } from "framer-motion";
import Map from "./Map";
import HelpCards from "./ HelpCards";
import HexagonCrads from "./HexagonCrads";
import AboutIntro from "./AboutIntro";
import History from "./History";
import Milestone from "./Milestone";
import Details from "./Details";
import AboutForm from "./AboutForm";
import type { PublicForm } from "@/src/lib/forms/types";
import type { AboutContent } from "@/src/lib/page-content/types";
import {
  BrandPageBackdrop,
  sectionReveal,
} from "@/src/common/components/ui/brand/page-effects";

export default function AboutBrandSection({ content, form }: { content: AboutContent; form: PublicForm }) {
  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      {/* sections with scroll-entrance */}
      <div className="relative z-10">
        <AboutIntro content={content.intro} />

        <motion.div {...sectionReveal}>
          <Details content={content.details} />
        </motion.div>

        <motion.div {...sectionReveal}>
          <History content={content.history} />
        </motion.div>

        <motion.div {...sectionReveal}>
          <Milestone content={content.milestone} />
        </motion.div>

        <motion.div {...sectionReveal}>
          <HexagonCrads content={content.strengths} />
        </motion.div>

        <motion.div {...sectionReveal}>
          <HelpCards content={content.help} />
        </motion.div>

        <motion.div {...sectionReveal}>
          <Map content={content.maps} />
        </motion.div>

        <motion.div {...sectionReveal}>
          <AboutForm form={form} content={content.form} />
        </motion.div>
      </div>
    </main>
  );
}
