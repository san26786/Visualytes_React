"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import LiveSupport from "./LiveSupport";
import OfficeLocation from "./OfficeLocation";
import OfficeNames from "./OfficeNames";
import PageHeader from "./PageHeader";
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
