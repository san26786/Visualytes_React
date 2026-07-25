"use client";

import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import BestDesignSection from '../BestDesignSection';
import Hero from './Hero';
import Bigexperience from './Bigexperience';
import WhatWeDo from './WhatWeDo';
import PortfolioProjects from './PortfolioProjects';
import OurOffers from './OurOffers';
import Technologies from './Technologies';
import Clientcount from './Clientcount';
import ClientCertificates from './ClientCertificates';

const WebDesignWrapper = () => {

  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      <div className="relative z-10">
   
        <Hero />
        <Bigexperience />
        <PortfolioProjects />
        <WhatWeDo />
        <OurOffers />
         <Clientcount />
         <BestDesignSection />
        <Technologies />
        <ClientCertificates />


      </div>
    </main>
  );
};

export default WebDesignWrapper;
