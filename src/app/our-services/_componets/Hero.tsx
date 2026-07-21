'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Reveal } from '../_componets/motion';
import { heroImage, heroImageAlt } from './lib/content';

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="hero"
      className="bg-black relative overflow-hidden noise pt-20 pb-24 sm:pt-28 sm:pb-32"
    >
      <div className="absolute inset-0 -z-10 grid-bg mask-fade-b opacity-60" />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--primary)/0.22), transparent 65%)',
        }}
      />

      <div className="container-page">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-foreground-muted backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Full Service Digital Agency
              <span className="text-border-strong">·</span>
              Our Services
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Marketing Agency
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-foreground-muted text-pretty sm:text-xl">
              Visualytes is a digital marketing agency based in South of
              England. We offer an array of different digital marketing
              strategies, such as SEO, SMM, PPC, PR, Video, Content, Email,
              Text, and WhatsApp. Digital marketing has blossomed in the past
              few years into something big and beautiful; it&rsquo;s at the
              core of everything we do. By working with you, we can create an
              integrated digital marketing strategy that aligns with your
              business goals, and furthermore, puts your target audience at
              centre stage. Through discovery and research, we will create a
              campaign that spans across multiple channels that promise to add
              value to your brand and therefore, generate remarkable results.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#dm-footer"
                className="group inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                get started now!
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="inline-flex h-12 items-center gap-2 rounded-2xl border border-border bg-card/60 px-7 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-border-strong hover:bg-card"
              >
                Our Projects
              </a>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="surface-card overflow-hidden p-1.5">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
