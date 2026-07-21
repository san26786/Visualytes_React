"use client";

import { motion } from "framer-motion";
import { PenTool, Code2 } from "lucide-react";
import { bestDesign, bestCodes } from "../lib/data";

const blocks = [
  { ...bestDesign, icon: PenTool },
  { ...bestCodes, icon: Code2 },
];

export function BestDesignCodes() {
  return (
    <section className="border-b border-border bg-background py-24 sm:py-32">
      <div className="container grid gap-6 lg:grid-cols-2">
        {blocks.map((block, i) => (
          <motion.div
            key={block.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-3xl border border-border bg-surface p-10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <block.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-medium tracking-tight">
              {block.heading}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {block.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
