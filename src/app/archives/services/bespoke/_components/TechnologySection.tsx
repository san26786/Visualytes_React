"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Cloud, Code2, Smartphone } from "lucide-react";
import { technologyContent } from "./data";
import HomeBrandButton from "@/src/app/(home)/_componts/shared/HomeBrandButton";

const techStack = [
  { label: ".NET Core & Azure", icon: Cloud },
  { label: "MEAN / Node.js & AWS", icon: Code2 },
  { label: "React & Xamarin", icon: Smartphone },
];

export default function TechnologySection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="mx-auto max-w-7xl ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid items-center gap-16 lg:grid-cols-2"
        >
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/10 to-purple-500/20 blur-2xl" />
            <div className="relative overflow-hidden ">
              <div className="relative aspect-square">
                <Image
                  src={technologyContent.image}
                  alt="Bespoke software technology stack"
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 h-full bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {techStack.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                >
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block rounded-full border border-purple-300/30 bg-purple-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-purple-300 mb-6">
              Technology
            </span>
            <h2 className="text-[28px] font-bold leading-tight text-white sm:text-[36px] lg:text-[40px]">
              {technologyContent.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {technologyContent.description}
            </p>
            <div className="mt-8">
              <HomeBrandButton href="/contact-us">Discuss Your Stack</HomeBrandButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
