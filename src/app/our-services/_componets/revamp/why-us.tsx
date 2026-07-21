"use client";

import { motion } from "framer-motion";

import { whyUs } from "../lib/data";
import { SectionHeading } from "../ui/section-heading";
import { Counter } from "./counter";

export function WhyUs() {
  return (
    <section className="border-b border-border bg-surface py-24 sm:py-32">
      <div className="container grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="Why us" title={whyUs.heading} />
          <div className="mt-6 space-y-4">
            {whyUs.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {whyUs.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-background p-6 text-center"
            >
              <p className="font-display text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
                <Counter value={stat.value} suffix="+" />
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
