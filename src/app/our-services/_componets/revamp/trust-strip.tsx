"use client";

import { motion } from "framer-motion";
import { Users, Globe2, Target } from "lucide-react";
import { trustStrip } from "../lib/data";

const icons = [Users, Globe2, Target];

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container grid gap-px overflow-hidden rounded-3xl border border-border bg-border py-0 sm:grid-cols-3 my-16">
        {trustStrip.map((item, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-surface p-8 transition-colors hover:bg-accent-soft/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <p className="eyebrow mt-6">{item.eyebrow}</p>
              <h3 className="mt-2 font-display text-xl font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
