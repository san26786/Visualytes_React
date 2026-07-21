"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";

import { offers } from "../lib/data";
import { SectionHeading } from "../ui/section-heading";
import { Button } from "../ui/button";

export function Offers() {
  return (
    <section className="border-b border-border bg-background py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="Pricing" title={offers.heading} align="center" />

        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          {offers.packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-7",
                pkg.featured
                  ? "border-accent bg-accent-soft/40 shadow-glow lg:-translate-y-3"
                  : "border-border bg-surface"
              )}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-accent-foreground">
                  Most chosen
                </span>
              )}
              <h3 className="font-display text-xl font-medium tracking-tight">
                {pkg.name}
              </h3>
              <p className="mt-3 font-display text-4xl font-semibold tracking-tight">
                {pkg.price}
              </p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {pkg.included.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
                {pkg.excluded.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 opacity-50">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground line-through">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={pkg.featured ? "default" : "subtle"}
                className="mt-8 w-full"
              >
                <Link href={pkg.purchaseHref}>Purchase</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={offers.viewMoreHref}
            className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
          >
            View More Packages
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
