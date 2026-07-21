"use client";

import { motion } from "framer-motion";
import {
  Rss,
  Building2,
  ShoppingCart,
  Briefcase,
  FileText,
  HeartHandshake,
  Newspaper,
  MessagesSquare,
  Clapperboard,
  LayoutGrid,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { whatWeDo } from "../lib/data";
import { SectionHeading } from "../ui/section-heading";

const icons = [
  Rss,
  Building2,
  ShoppingCart,
  Briefcase,
  FileText,
  HeartHandshake,
  Newspaper,
  MessagesSquare,
  Clapperboard,
  LayoutGrid,
  BookOpen,
  GraduationCap,
];

export function WhatWeDo() {
  return (
    <section className="border-b border-border bg-surface py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Capabilities"
          title={whatWeDo.heading}
          description={whatWeDo.sub}
          align="center"
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
                className="group rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
