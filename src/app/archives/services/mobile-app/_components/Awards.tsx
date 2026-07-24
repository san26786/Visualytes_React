"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";

const awards = [
  {
    title: "Top Europe Leaders",
    rank: "Rank #2",
  },
  {
    title: "Top Mobile Developers",
    rank: "Rank #4",
  },
  {
    title: "Top Flutter Developer",
    rank: "Rank #1",
  },
  {
    title: "Deloitte Technology Fast 50 2017 CE",
    rank: "",
  },
  {
    title: "Forbes Diamonds Poland 2017",
    rank: "",
  },
  {
    title: "Office Superstar 2018",
    rank: "",
  },
];

export default function Awards() {
  return (
    <section className="py-16 bg-slate-900/30">
      <div className="relative mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Proven experience and reviews</h2>
          <p className="text-xl text-slate-300">Visualytes is listed among world&apos;s top software development companies</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center hover:border-cyan-300/40 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyan-300">🏆</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
              {award.rank && (
                <p className="text-cyan-300 font-semibold text-lg">{award.rank}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
