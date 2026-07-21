"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, ShieldCheck, ArrowUpRight } from "lucide-react";
import { clients, certifications } from "../lib/data";
import SectionHeading from "@/src/app/about/_componets/SectionHeading";

export function ClientsAndCertifications() {
  return (
    <section className="border-b border-border bg-background py-24 sm:py-32">
      <div className="container grid gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Trusted by" title={clients.heading} />
          <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-5">
            {Array.from({ length: clients.count }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex aspect-square items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground"
              >
                <Building2 className="h-5 w-5" />
              </motion.div>
            ))}
          </div>
          <Link
            href={clients.viewAllHref}
            className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            View Our Clients
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div>
          <SectionHeading eyebrow="Accredited" title={certifications.heading} />
          <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-6">
            {Array.from({ length: certifications.count }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex aspect-square items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground"
              >
                <ShieldCheck className="h-5 w-5" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
