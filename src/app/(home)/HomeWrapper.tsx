"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import AboveFooter from "@/src/common/components/layouts/AboveFooter";
import { BrandPageBackdrop, sectionReveal } from "@/src/common/components/ui/brand/page-effects";
import HomeBanner from "./_componts/HomeBanner";
import LazySection from "./_componts/shared/LazySection";
import SectionPlaceholder from "./_componts/shared/SectionPlaceholder";

const DigitalMarketingIntro = dynamic(
  () => import("./_componts/DigitalMarketingIntro"),
  { loading: () => <SectionPlaceholder minHeight="480px" /> }
);

const ProcessSection = dynamic(
  () => import("./_componts/ProcessSection"),
  { loading: () => <SectionPlaceholder minHeight="520px" /> }
);

const Portfolio = dynamic(
  () => import("./_componts/Portfolio"),
  { loading: () => <SectionPlaceholder minHeight="640px" /> }
);

const CaseStudy = dynamic(
  () => import("./_componts/Casestudies"),
  { loading: () => <SectionPlaceholder minHeight="560px" /> }
);

const VideoSection = dynamic(
  () => import("./_componts/VideoSection"),
  { loading: () => <SectionPlaceholder minHeight="480px" /> }
);

const BusinessCommunities = dynamic(
  () => import("./_componts/BusinessCommunities"),
  { loading: () => <SectionPlaceholder minHeight="320px" /> }
);

const BooksSection = dynamic(
  () => import("./_componts/BooksSection"),
  { loading: () => <SectionPlaceholder minHeight="560px" /> }
);

const TestimonialsSection = dynamic(
  () => import("./_componts/TestimonialsSection"),
  { loading: () => <SectionPlaceholder minHeight="480px" /> }
);

const AppointmentTalk = dynamic(
  () => import("./_componts/AppointmentTalk"),
  { loading: () => <SectionPlaceholder minHeight="320px" /> }
);

const ClientSlider = dynamic(
  () => import("./_componts/ClientSlider"),
  { loading: () => <SectionPlaceholder minHeight="360px" /> }
);

export default function HomeWrapper() {
  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      <div className="relative z-10">
        <HomeBanner />

        <LazySection minHeight="480px" rootMargin="400px 0px">
          <motion.div {...sectionReveal}>
            <DigitalMarketingIntro />
          </motion.div>
        </LazySection>

        <LazySection minHeight="520px">
          <motion.div {...sectionReveal}>
            <ProcessSection />
          </motion.div>
        </LazySection>

        <LazySection minHeight="640px" id="portfolio">
          <motion.div {...sectionReveal}>
            <Portfolio />
          </motion.div>
        </LazySection>

        <LazySection minHeight="560px">
          <motion.div {...sectionReveal}>
            <CaseStudy />
          </motion.div>
        </LazySection>

        <LazySection minHeight="480px">
          <motion.div {...sectionReveal}>
            <VideoSection />
          </motion.div>
        </LazySection>

        <LazySection minHeight="320px">
          <motion.div {...sectionReveal}>
            <BusinessCommunities />
          </motion.div>
        </LazySection>

        <LazySection minHeight="560px">
          <motion.div {...sectionReveal}>
            <BooksSection />
          </motion.div>
        </LazySection>

        <LazySection minHeight="480px">
          <motion.div {...sectionReveal}>
            <TestimonialsSection />
          </motion.div>
        </LazySection>

        <LazySection minHeight="320px">
          <motion.div {...sectionReveal}>
            <AppointmentTalk />
          </motion.div>
        </LazySection>

        <LazySection minHeight="360px">
          <motion.div {...sectionReveal}>
            <ClientSlider />
          </motion.div>
        </LazySection>

        <AboveFooter />
      </div>
    </main>
  );
}
