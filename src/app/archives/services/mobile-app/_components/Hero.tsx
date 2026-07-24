"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logos from "./Logos";
import HomeBrandButton from "../../../../(home)/_componts/shared/HomeBrandButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-fuchsia-500/25 blur-[100px]" />
      
      <div className="relative mx-auto max-w-[1320px] px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <ol className="relative z-10 mb-6 mt-8 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]">
            <li>
              <Link href="/" className="text-cyan-300 hover:text-white transition-colors duration-200">
                Home
              </Link>
            </li>
            <li className="text-white/30">●</li>
            <li className="text-white/60">Development</li>
          </ol>

          <h1 className="relative z-10 max-w-5xl mx-auto text-[48px] sm:text-[56px] lg:text-[64px] font-bold leading-[1.1] tracking-tight text-white mb-6">
            iOS &amp; Android Mobile App Development <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">Company Based in London</span>
          </h1>
          
          <p className="relative z-10 max-w-3xl mx-auto text-xl text-slate-300 mb-10">
            Choose a Long-Term Partner Who Takes The Whole Mobile App Development Process off your shoulders
          </p>

          <div className="relative z-10 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300/80" />
          </div>

          <div className="relative z-10 mt-12">
            <p className="text-2xl font-bold text-cyan-300">
              More than 130 Startups, Brands &amp; Enterprise Companies around the Globe Chose Visualytes
            </p>
          </div>
          <Logos/>
        </motion.div>
         <div className="mt-12 flex justify-center">
                      <HomeBrandButton href="/estimate-project/" variant="outline">
                        Estimate Project
                      </HomeBrandButton>
                    </div>
      </div>
    </section>
  );
}
