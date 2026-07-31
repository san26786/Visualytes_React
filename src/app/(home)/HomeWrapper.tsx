"use client";

import dynamic from "next/dynamic";
import AboveFooter from "@/src/common/components/layouts/AboveFooter";
import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import HomeBanner from "./_componts/HomeBanner";
import LazySection from "./_componts/shared/LazySection";
import { motion } from "framer-motion";

const DigitalMarketingIntro = dynamic(
  () => import("./_componts/DigitalMarketingIntro")
);

const ProcessSection = dynamic(
  () => import("../our-process/_components/ProcessSection")
);

const Portfolio = dynamic(
  () => import("../portfolio/_components/Portfolio")
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
    <>
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      <div className="relative z-10">

        {/* Always loaded */}
        <HomeBanner />


        {/*
          Each section owns its loading boundary. This prevents a single
          below-the-fold intersection from mounting every heavy section and
          downloading all of their client-side code at once.
        */}
          <DigitalMarketingIntro />
          <h2 className="text-center text-white text-5xl md:text-6xl font-light mb-10">
            Our Process
          </h2>

          <ProcessSection />

          <Portfolio />

          <CaseStudy />

          <VideoSection />

          <BusinessCommunities />

          <BooksSection />

          <TestimonialsSection />

          <AppointmentTalk />

          <ClientSlider />


        <AboveFooter />

      </div>
    </main>
    </>
  );
}
