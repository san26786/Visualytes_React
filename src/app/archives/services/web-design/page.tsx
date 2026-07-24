"use client";

import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import BestDesignSection from './BestDesignSection';
import Hero from './_componets/Hero';
import Bigexperience from './_componets/Bigexperience';
import WhatWeDo from './_componets/WhatWeDo';
import PortfolioProjects from './_componets/PortfolioProjects';
import OurOffers from './_componets/OurOffers';
import Technologies from './_componets/Technologies';
import Clientcount from './_componets/Clientcount';
import ClientCertificates from './_componets/ClientCertificates';

const Page = () => {

  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      <div className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Big Experience Section */}
        <Bigexperience />
 {/* Our Portfolio And Latest Projects Section */}
        <PortfolioProjects />
        {/* What We Do Section */}
        <WhatWeDo />
       

        {/* Our Offers Section - Enhanced Pricing Cards */}
        <OurOffers />
                <Clientcount />
                        <BestDesignSection />



        {/* Technologies We Work On Section */}
        <Technologies />

        {/* Why Us Section with Animated Numbers */}


        <ClientCertificates />


      </div>
    </main>
  );
};

export default Page;
