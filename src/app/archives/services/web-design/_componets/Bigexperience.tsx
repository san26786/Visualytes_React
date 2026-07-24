import { motion } from "framer-motion";
import Image from "next/image";
import {  sectionReveal } from "@/src/common/components/ui/brand/page-effects";
import { BRAND_HOVER } from "@/src/common/components/ui/brand/theme";

export default function Bigexperience() {
  return (
  <>
   <section className="py-16">
            <div className="mx-auto max-w-[1320px] px-6">
              
              <div className="grid gap-8 lg:grid-cols-3">
                {[
                  {
                    title: "Big Experience",
                    subtitle: "Team that you can trust",
                    description: "Engaging and interesting strategy that is considered an epitome of success for any website design.",
                    icon: "/assets/png/bigexperience.png"
                  },
                  {
                    title: "Strong Team",
                    subtitle: "Leading in the industry specialists",
                    description: "Our team is a collective of diverse talents from around the world, all sharing the same enthusiasm for solving problems in an ever-changing world.",
                    icon: "/assets/png/strongteam.png"
                  },
                  {
                    title: "Personal Solutions",
                    subtitle: "Take into the specifics of your business",
                    description: "We conceptualize, analyze and excute business plans for your Personal Websites.",
                    icon: "/assets/png/solution.png"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    {...sectionReveal}
                    transition={{ delay: index * 0.1 }}
                    className={`group relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 p-8 shadow-[0_22px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl ${BRAND_HOVER.card}`}
                  >
                   <div className="relative h-64 w-full">
                  <Image
                    fill
                    src={item.icon}
                    alt={item.title}
                    className="object-cover pb-4"
                  />
                </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 text-center mt-4">{item.title}</h3>
                    <p className="text-cyan-300 font-semibold text-sm mb-4 text-center">{item.subtitle}</p>
                    <p className="text-slate-300 text-center">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
        )
}