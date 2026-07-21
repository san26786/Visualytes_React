"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { seoAuditCta, footer } from "../lib/data";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-foreground py-20 text-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(500px circle at 80% 0%, hsl(var(--accent)/0.35), transparent 60%)",
        }}
      />
      <div className="container relative flex flex-col items-center gap-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl text-balance font-display text-3xl font-medium tracking-tight sm:text-4xl"
        >
          {seoAuditCta.label}
        </motion.h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button>
            <Link href={seoAuditCta.href}>
              Get Report
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <a
            href={`tel:${footer.contact.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm text-background/70 hover:text-background"
          >
            <Phone className="h-4 w-4 text-accent" />
            {footer.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
