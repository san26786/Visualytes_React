"use client";

import { motion } from "framer-motion";
import ContactForm from "./_componets/ContactForm";
import LiveSupport from "./_componets/LiveSupport";
import OfficeLocation from "./_componets/OfficeLocation";
import OfficeNames from "./_componets/OfficeNames";
import PageHeader from "./_componets/PageHeader";
import {
  BrandPageBackdrop,
  sectionReveal,
} from "@/src/common/components/ui/brand/page-effects";

export default function Page() {
  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      {/* ── page sections with scroll entrance ── */}
      <div className="relative z-10">
        <PageHeader />

        <motion.div {...sectionReveal}>
          <LiveSupport />
        </motion.div>

        <motion.div {...sectionReveal}>
          <ContactForm />
        </motion.div>

        <motion.div {...sectionReveal}>
          <OfficeLocation />
        </motion.div>

        <motion.div {...sectionReveal}>
          <OfficeNames />
        </motion.div>
      </div>
    </main>
  );
}
