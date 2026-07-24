"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";
import Image from "next/image";

const services = [
  {
    title: "iOS Native App Development",
    description: "Bring your ideas to life using fast and reliable Swift language developed by Apple",
    image: "/assets/jpng/iOS Native App Development.jpeg",
  },
  {
    title: "Android Native App Development",
    description: "Delight customers with a secure, yet user-friendly app built in Kotlin - Google's preferred language",
    image: "/assets/jpng/Android-App-Development-Company.avif",
  },
  {
    title: "Hybrid App Development",
    description: "Hybrid app development is the creation of a single app that can run on Windows, Android and iOS.",
    image: "/assets/jpng/Hybrid App Development.jpg",
  },
  {
    title: "Game Development",
    description: "Game Development is the art of creating games and describes the design, development and release of a game",
    image: "/assets/jpng/Game Development.jpeg",
  },
  {
    title: "Augmented Reality Development",
    description: "Visualytes is UK leading Augmented Reality Development company with innovative ideas",
    image: "/assets/jpng/Augmented Reality Development.png",
  },
  {
    title: "E-Commerce Mobile App Development",
    description: "150+ Apps delivered to a global clientele. We convert ideas into a functional application.",
    image: "/assets/jpng/E-Commerce Mobile App Development.jpeg",
  },
];

export default function Services() {
  return (
    <section className="py-20">
      <div className="relative mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Services</h2>
          <p className="text-xl text-slate-300">Everything your Custom App needs in one place</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group"
            >
             <div className="relative h-80 w-60 overflow-hidden mx-auto">
  <Image
    src={service.image}
    alt={service.title}
    fill
    className="object-contain transition-transform duration-500 group-hover:scale-105"
  />
</div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-300">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
