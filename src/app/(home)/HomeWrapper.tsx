"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import AboveFooter from "@/src/common/components/layouts/AboveFooter";
import { BrandPageBackdrop, sectionReveal } from "@/src/common/components/ui/brand/page-effects";
import HomeBanner from "./_componts/HomeBanner";
import LazySection from "./_componts/shared/LazySection";

const DigitalMarketingIntro = dynamic(
  () => import("./_componts/DigitalMarketingIntro")
);

const ProcessSection = dynamic(
  () => import("./_componts/ProcessSection")
);

const Portfolio = dynamic(
  () => import("./_componts/Portfolio")
);

const CaseStudy = dynamic(
  () => import("./_componts/Casestudies")
);

const VideoSection = dynamic(
  () => import("./_componts/VideoSection")
);

const BusinessCommunities = dynamic(
  () => import("./_componts/BusinessCommunities")
);

const BooksSection = dynamic(
  () => import("./_componts/BooksSection")
);

const TestimonialsSection = dynamic(
  () => import("./_componts/TestimonialsSection")
);

const AppointmentTalk = dynamic(
  () => import("./_componts/AppointmentTalk")
);

const ClientSlider = dynamic(
  () => import("./_componts/ClientSlider")
);

export default function HomeWrapper() {
  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      <div className="relative z-10">

        {/* Always loaded */}
        <HomeBanner />


        {/* Single Lazy Load Wrapper */}
        <LazySection 
          minHeight="480px" 
          rootMargin="400px 0px"
        >
          <motion.div {...sectionReveal}>

            <DigitalMarketingIntro />

            <ProcessSection />

            <Portfolio />

            <CaseStudy />

            <VideoSection />

            <BusinessCommunities />

            <BooksSection />

            <TestimonialsSection />

            <AppointmentTalk />

            <ClientSlider />

          </motion.div>
        </LazySection>


        <AboveFooter />

      </div>
    </main>
  );
}