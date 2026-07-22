"use client";

import React from 'react';
import ServiceWrapper from './_componets/ServicesWrapper';
import ServicesPage from './_componets/Services';
import { motion } from "framer-motion";
import { BrandPageBackdrop, sectionReveal } from "@/src/common/components/ui/brand/page-effects";

const Page = () => {
  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />
      <div className="relative z-10">
        <ServiceWrapper />
        <motion.div {...sectionReveal}>
          <ServicesPage />
        </motion.div>
      </div>
    </main>
  );
};

export default Page;