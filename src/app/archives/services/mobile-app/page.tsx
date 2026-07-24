"use client";

import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import Hero from './_components/Hero';
import About from './_components/About';
import Services from './_components/Services';
import Clients from './_components/Clients';
import Awards from './_components/Awards';
import OpenSource from './_components/OpenSource';
import CTA from './_components/CTA';
import FAQ from './_components/FAQ';

const Page = () => {
  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      <div className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Clients />
        <Awards />
        <OpenSource />
        <CTA />
        <FAQ />
      </div>
    </main>
  );
};

export default Page;
