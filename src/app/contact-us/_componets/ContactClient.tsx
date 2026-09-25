"use client";

import { motion } from "framer-motion";
import type { ContactContent } from "@/src/lib/contact-page";
import type { PublicForm } from "@/src/lib/forms/types";
import ContactForm from "./ContactForm";
import LiveSupport from "./LiveSupport";
import OfficeLocation from "./OfficeLocation";
import OfficeNames from "./OfficeNames";
import PageHeader from "./PageHeader";
import {
  BrandPageBackdrop,
  sectionReveal,
} from "@/src/common/components/ui/brand/page-effects";

export default function Page({ form, content }: { form: PublicForm; content: ContactContent }) {
  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      {/* ── page sections with scroll entrance ── */}
      <div className="relative z-10">
        <PageHeader hero={content.hero} contactInfo={content.contactInfo} />

        <motion.div {...sectionReveal}>
          <LiveSupport content={content.liveSupport} />
        </motion.div>

        <motion.div {...sectionReveal}>
          <ContactForm form={form} content={content.contactForm} />
        </motion.div>

        <motion.div {...sectionReveal}>
          <OfficeLocation content={content.officeMap} />
        </motion.div>

        <motion.div {...sectionReveal}>
          <OfficeNames content={content.offices} />
        </motion.div>
      </div>
    </main>
  );
}
