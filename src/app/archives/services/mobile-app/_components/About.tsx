"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";

export default function About() {
  return (
    <section className="py-20">
      <div className="relative mx-auto max-w-8xl px-18">
        <motion.div {...sectionReveal} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              About Mobile &amp; Web App Development with Visualytes
            </h2>
            <h3 className="text-2xl font-semibold text-cyan-300 mb-6">
              Don’t spend time building your own team. Start working on your app right away
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Visualytes is an iOS and Android mobile &amp; web app development company based in London. The company has been established in 2011. The company offer full-stack mobile, web, and backend development services. Being a 100% office-based team of 60+ talented professionals, we serve clients throughout the world, mostly in the US, UK, and European Union. Visualytes has worked on over 130 digital products and apps. The company cooperate with start-ups and enterprise companies. Over 30 000 apps like Facebook or WhatsApp use our open source libraries in their famous products.
            </p>
          </div>
         <div className="relative">
  <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 blur-xl" />

  <video
    className="relative h-[700px] w-full rounded-2xl border border-slate-800 object-cover shadow-2xl"
    src="/assets/mp4/high.mp4"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
  />
</div>
        </motion.div>
      </div>
    </section>
  );
}
