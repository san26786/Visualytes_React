"use client";

import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import Hero from "./_components/Hero";
import Highlights from "./_components/Highlights";
import PartnerSection from "./_components/PartnerSection";
import CaseStudies from "./_components/CaseStudies";
import Products from "./_components/Products";
import Testimonials from "./_components/Testimonials";
import TechnologySection from "./_components/TechnologySection";
import LatestBlogPosts from "./_components/LatestBlogPosts";

export default function BespokePage() {
  return (
    <main className="relative overflow-hidden bg-slate-950 min-h-screen">
      <BrandPageBackdrop />

      <div className="relative z-10">
        <Hero />
        <Highlights />
        <PartnerSection />
        <CaseStudies />
        <Products />
        <Testimonials />
        <TechnologySection />
        <LatestBlogPosts />
      </div>
    </main>
  );
}
