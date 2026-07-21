"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, Minus, Plus, ArrowUpRight } from "lucide-react";
import { faqs } from "./data";
import {
  BRAND_MOTION,
  BRAND_SURFACE,
  BRAND_TEXT,
} from "@/src/common/components/ui/brand/theme";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section className="px-4 pb-16 pt-4">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqs.map((item, index) => {
              const active = open === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`overflow-hidden ${BRAND_SURFACE.mutedGlassCard} ${BRAND_MOTION.softTransition} ${
                    active ? "border-cyan-300/30" : "hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(active ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <HelpCircle
                        size={18}
                        className={`mt-0.5 shrink-0 ${active ? "text-cyan-300" : "text-fuchsia-300"}`}
                      />
                      <span className="text-sm font-semibold leading-snug text-white sm:text-base">
                        {item.question}
                      </span>
                    </div>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        active
                          ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-300"
                          : "border-white/15 bg-white/5 text-white/70"
                      }`}
                    >
                      {active ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-400 ease-in-out ${
                      active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-white/10 px-5 pb-6 pt-4 sm:px-7">
                        <p className={`whitespace-pre-line ${BRAND_TEXT.cardBody}`}>
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative mx-4 mb-24 overflow-hidden rounded-[2rem] border border-white/12 sm:mx-6 lg:mx-auto lg:max-w-5xl">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/jpg/bg_2.jpg')" }}
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
        <div className="pointer-events-none absolute -left-20 top-0 h-60 w-60 rounded-full bg-cyan-500/15 blur-[80px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-fuchsia-500/15 blur-[80px]" />

        <div className="relative px-6 py-16 text-center sm:px-10 sm:py-20">
          <p className={BRAND_TEXT.sectionEyebrow}>Still Have Questions?</p>
          <h2 className={`mt-4 ${BRAND_TEXT.sectionTitle}`}>
            Any Unanswered Questions?
          </h2>
          <p className={`mx-auto mt-4 max-w-xl ${BRAND_TEXT.sectionBody}`}>
            Our team is ready to help. Reach out and we&apos;ll get back to you
            with the answers you need.
          </p>
          <Link
            href="/contact-us"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-300 hover:text-slate-950"
          >
            Contact Us
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
