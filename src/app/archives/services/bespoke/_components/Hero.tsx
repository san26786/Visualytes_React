"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import HomeBrandButton from "@/src/app/(home)/_componts/shared/HomeBrandButton";

export default function Hero() {
  return (
    <section className="relative mt-[130px] overflow-hidden pb-16 pt-10">
      <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-fuchsia-500/25 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <div className="text-center lg:text-left">
            <ol className="mb-6 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] lg:justify-start">
              <li>
                <Link
                  href="/"
                  className="text-cyan-300 transition-colors duration-200 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li className="text-white/30">●</li>
              <li>
                <Link
                  href="/our-services"
                  className="text-cyan-300 transition-colors duration-200 hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li className="text-white/30">●</li>
              <li className="text-white/60">Bespoke Software</li>
            </ol>

            <h1 className="text-[36px] font-bold leading-[1.1] tracking-tight text-white sm:text-[48px] lg:text-[56px]">
              Bespoke Software Development and Digital Transformation from{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                Conception to Delivery
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
              By sharing our expertise and passion we empower and digitally
              transform organisations whilst continuously providing value
            </p>

            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300/80" />
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <HomeBrandButton href="/estimate-project">Estimate Project</HomeBrandButton>
              <HomeBrandButton href="/contact-us" variant="outline">
                Free Consultation
              </HomeBrandButton>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/10 to-purple-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/60 backdrop-blur-xl">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/assets/png/services/Bespoke-Software-Development.png"
                  alt="Bespoke Software Development"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
