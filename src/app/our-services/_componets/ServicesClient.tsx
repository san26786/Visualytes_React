"use client";

import { motion } from "framer-motion";

import ServiceWrapper from "./ServicesWrapper";
import ServicesPage from "./Services";

import {
  BrandPageBackdrop,
  sectionReveal,
} from "@/src/common/components/ui/brand/page-effects";


export default function ServicesClient() {
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
}