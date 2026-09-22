"use client";

import { motion } from "framer-motion";

import ServiceWrapper from "./ServicesWrapper";
import ServicesPage, { type ServiceCardItem } from "./Services";

import {
  BrandPageBackdrop,
  sectionReveal,
} from "@/src/common/components/ui/brand/page-effects";


export default function ServicesClient({ services }: { services: ServiceCardItem[] }) {
  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      <div className="relative z-10">
        <ServiceWrapper />

        <motion.div {...sectionReveal}>
          <ServicesPage services={services} />
        </motion.div>
      </div>
    </main>
  );
}