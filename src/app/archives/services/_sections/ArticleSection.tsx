"use client";

import { motion } from "framer-motion";

import BrandServiceSection from "@/src/app/our-services/_componets/BrandServiceSection";
import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";

export type ArticleData = {
  pillLabel: string;
  title: string;
  intro: string;
  description: string[];
  image: string;
  topDescription: string[];
  bottomTitle: string;
  bullets: string[];
  bottomDescription: string;
};

export function ArticleSection({ data }: { data: ArticleData }) {
  return (
    <motion.div {...sectionReveal}>
      <BrandServiceSection
        pillLabel={data.pillLabel || undefined}
        title={data.title}
        intro={data.intro}
        description={data.description}
        image={data.image || "/assets/png/no-image.png"}
        topDescription={data.topDescription}
        bullets={data.bullets}
        bottomTitle={data.bottomTitle || undefined}
        bottomDescription={data.bottomDescription}
      />
    </motion.div>
  );
}
