"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { heroSlides, latestPost, seoAuditCta } from "../lib/data";
import { Button } from "../ui/button";


function GrowthPulse() {
  // The signature element: a self-drawing line chart, echoing the source
  // site's own hero imagery (a wave / chart / geometric slide set) and the
  // "ignite your business" headline — growth made visible.
  const path =
    "M0 150 C 60 150, 90 60, 150 90 S 240 170, 300 110 S 380 20, 440 55 S 520 140, 600 40";

  return (
    <svg
      viewBox="0 0 600 200"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pulseLine" x1="0" y1="0" x2="600" y2="0">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
          <stop offset="60%" stopColor="hsl(var(--accent))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="pulseFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.18" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* grid */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="hsl(var(--border))" strokeWidth="1" />
      ))}

      <motion.path
        d={`${path} L600 200 L0 200 Z`}
        fill="url(#pulseFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      />
      <motion.path
        d={path}
        stroke="url(#pulseLine)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        r="6"
        fill="hsl(var(--accent))"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ offsetDistance: "100%", opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ offsetPath: `path('${path}')` }}
      />
    </svg>
  );
}

export function Hero() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[index];

  return (
    <section className="noise-overlay relative overflow-hidden border-b border-border bg-background">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(600px circle at 15% 10%, hsl(var(--accent)/0.10), transparent 60%), radial-gradient(500px circle at 90% 30%, hsl(var(--accent)/0.08), transparent 55%)",
        }}
      />

      <div className="container grid gap-16 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-28 lg:pt-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="eyebrow flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              London &amp; Southampton, UK
            </span>
          </motion.div>

          <div className="relative mt-8 min-h-[9rem] sm:min-h-[11rem] lg:min-h-[13rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="whitespace-pre-line text-balance font-display text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {slide.heading}
                </h1>
                <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
                  {slide.sub}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={seoAuditCta.href}>
                {seoAuditCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="subtle">
              <Link href="https://www.visualytes.com/portfolio/portfolio/">
                View our work
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex gap-1.5">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}`}
                className="group h-1.5 w-8 overflow-hidden rounded-full bg-border"
              >
                <span
                  className={`block h-full rounded-full bg-accent transition-transform duration-300 ${
                    i === index ? "translate-x-0" : "-translate-x-full"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-border bg-surface/80 p-6 shadow-soft backdrop-blur">
            <p className="eyebrow mb-4">Live growth signal</p>
            <div className="h-48">
              <GrowthPulse />
            </div>
          </div>

          <Link
            href={latestPost.href}
            className="group flex items-center justify-between rounded-2xl border border-border bg-surface/60 px-5 py-4 text-sm transition-colors hover:border-accent/40"
          >
            <span className="flex flex-col">
              <span className="eyebrow mb-1">{latestPost.category}</span>
              <span className="font-medium text-foreground">
                {latestPost.title} · {latestPost.date} · {latestPost.author}
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
          </Link>
        </div>
      </div>
    </section>
  );
}
