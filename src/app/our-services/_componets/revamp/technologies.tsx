"use client";

import Link from "next/link";
import { Boxes } from "lucide-react";

import { technologies } from "../lib/data";
import { SectionHeading } from "../ui/section-heading";

export function Technologies() {
  const tiles = Array.from({ length: technologies.count });

  return (
    <section className="border-b border-border bg-surface py-24 sm:py-28">
      <div className="container">
        <SectionHeading eyebrow="Stack" title={technologies.heading} align="center" />
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />
        <div className="flex w-max animate-marquee gap-4">
          {[...tiles, ...tiles].map((_, i) => (
            <div
              key={i}
              className="flex h-16 w-32 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground"
            >
              <Boxes className="h-6 w-6" />
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-8 flex justify-center">
        <Link
          href={technologies.moreHref}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          And Many More
        </Link>
      </div>
    </section>
  );
}
