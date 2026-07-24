"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";
import ReviewLogo from "./ReviewLogo";
import Image from "next/image";

const clients = [
  {
    name: "Compassion UK",
    description: "The Compassion UK App keeps you up to date with the latest news, stories and prayers from Compassion’s work with children in poverty. What’s more, it’s a new, easy way to connect with your sponsored child whilst on the go.",
    responsibilities: ["iOS App Development", "Android App Development", "UX/UI Design", "Backend Development"],
    image: "/assets/png/image_compassion.png",
  },
  {
    name: "Factory Fresh",
    description: "Factory Fresh provides you with a convenience of getting groceries delivered from your local ethnic stores to your doorstep in 2 hours",
    responsibilities: ["iOS and Android app development with Flutter", "Product Design Workshop", "UX/UI Design", "Web app development", "Backend Development"],
    image: "/assets/png/image_factory_fresh.png",
  },
  {
    name: "My VIP card",
    description: "My VIP Card is a multi-award winning discount scheme and employee benefit that helps you to #shoplocal and supports your high street whilst saving money and enjoying a better work-life Balance",
    responsibilities: ["iOS Flutter App", "Android Flutter App"],
    image: "/assets/png/image_myvipcards.png",
  },
  {
    name: "Find Us On Web",
    description: "We are an advertising and business growth management consultancy bringing one of the largest growing alternate digital marketplace for the benefit of local businesses connecting various countries, regions and territories.",
    responsibilities: ["Product Design Workshop", "App Design", "Android App", "iOS App", "App Maintenance"],
    image: "/assets/png/image_findus.png",
  },
  {
    name: "Sign it Online",
    description: "Sign Documents electronically faster & easier than ever before. Sign it online allows you to sign contracts, leases, orders, and different forms online anytime, anywhere, from any internet-connected device.",
    responsibilities: ["App Design", "Android App"],
    image: "/assets/png/image_signit_online.png",
  },
  {
    name: "Global HR App",
    description: "Punch Monitor helps HR department to see who is clocked in and at what time. You can be sure that you only pay your employees for the time they work.",
    responsibilities: ["Product Design Workshop", "App Design", "Android App", "iOS App", "App Maintenance"],
    image: "/assets/png/image_punchmoniter.png",
  },
  {
    name: "TOC Events",
    description: "TOC Events take place Worldwide in Asia, Europe, Americas, Africa and Middle East. Port and terminal technology exhibition, container supply chain conference & networking events.",
    responsibilities: ["App Design", "Android App"],
    image: "/assets/png/image-toc.png",
  },
];

export default function Clients() {
  return (
    <section className="py-20 bg-slate-900/30">
      <ReviewLogo />
      <div className="relative mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Clients</h2>
          <p className="text-xl text-slate-300">Work with groundbreakers who create top-notch mobile and web apps on time &amp; on budget</p>
        </motion.div>

       <div className="space-y-24">
  {clients.map((client, index) => (
    <motion.div
      key={client.name}
      {...sectionReveal}
      transition={{ delay: index * 0.08 }}
      className={`grid items-center gap-16 lg:grid-cols-2 ${
        index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Image */}
      <div className="relative">
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-3xl" />

        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 p-10">
        <Image
  src={client.image}
  alt={client.name}
  width={600}
  height={600}
  className="mx-auto h-[520px] w-auto object-contain transition duration-500 group-hover:scale-105"
/>
        </div>
      </div>

      {/* Content */}
      <div>
        <span className="mb-4 inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          Mobile Application
        </span>

        <h3 className="mb-6 text-5xl font-bold text-white">
          {client.name}
        </h3>

        <p className="mb-8 text-lg leading-8 text-slate-400">
          {client.description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {client.responsibilities.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span className="text-sm text-slate-200">{item}</span>
            </div>
          ))}
        </div>

       
      </div>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  );
}
