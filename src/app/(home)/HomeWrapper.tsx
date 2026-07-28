"use client";

import dynamic from "next/dynamic";
import AboveFooter from "@/src/common/components/layouts/AboveFooter";
import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import HomeBanner from "./_componts/HomeBanner";
import LazySection from "./_componts/shared/LazySection";

const DigitalMarketingIntro = dynamic(
  () => import("./_componts/DigitalMarketingIntro")
);

const ProcessSection = dynamic(
  () => import("./_componts/ProcessSection")
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
        <LazySection minHeight="760px" rootMargin="500px 0px">
          <DigitalMarketingIntro />
        </LazySection>

        <LazySection minHeight="900px" rootMargin="400px 0px">
          <ProcessSection />
        </LazySection>

        <LazySection minHeight="760px" rootMargin="350px 0px">
          <Portfolio />
        </LazySection>

        <LazySection minHeight="700px" rootMargin="350px 0px">
          <CaseStudy />
        </LazySection>

        <LazySection minHeight="620px" rootMargin="300px 0px">
          <VideoSection />
        </LazySection>

        <LazySection minHeight="720px" rootMargin="300px 0px">
          <BusinessCommunities />
        </LazySection>

        <LazySection minHeight="680px" rootMargin="300px 0px">
          <BooksSection />
        </LazySection>

        <LazySection minHeight="640px" rootMargin="250px 0px">
          <TestimonialsSection />
        </LazySection>

        <LazySection minHeight="520px" rootMargin="250px 0px">
          <AppointmentTalk />
        </LazySection>

        <LazySection minHeight="400px" rootMargin="200px 0px">
          <ClientSlider />
        </LazySection>


        <AboveFooter />

      </div>
    </main>
  );
}
