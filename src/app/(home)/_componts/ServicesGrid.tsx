"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HomeSection from "./shared/HomeSection";
import HomeBrandButton from "./shared/HomeBrandButton";
import { popIn, staggerContainer } from "./shared/motion";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

const services = [
  {
    title: "Website Designing",
    icon: "/assets/webp/service_icon_1.png.bv.webp",
    description:
      "Our creative web designers can read between the colours. Let the website design talk to your customers directly.",
    glow: "group-hover:shadow-cyan-500/30",
  },
  {
    title: "Digital Marketing",
    icon: "/assets/webp/service_icon_1.png.bv.webp",
    description:
      "Performance marketing services led by a team of professional digital marketers.",
    glow: "group-hover:shadow-fuchsia-500/30",
  },
  {
    title: "Mobile App Development",
    icon: "/assets/webp/service_icon_1.png.bv.webp",
    description:
      "Launch a beast of a business in the app store and turn all the spotlight on your mobile app.",
    glow: "group-hover:shadow-pink-500/30",
  },
  {
    title: "Corporate Branding",
    icon: "/assets/webp/service_icon_1.png.bv.webp",
    description:
      "The first impression is the last one — your logo and branding strategy set the tone.",
    glow: "group-hover:shadow-violet-500/30",
  },
  {
    title: "Bespoke Software",
    icon: "/assets/webp/service_icon_3-1.png.bv_resized_mobile.png.bv.webp",
    description:
      "Have a business model in mind? Let's get it to market with the best possible development.",
    glow: "group-hover:shadow-emerald-500/30",
  },
  {
    title: "Website Hosting Services",
    icon: "/assets/webp/service_icon_3-1.png.bv_resized_mobile.png.bv.webp",
    description:
      "Reliable hosting with advanced features to drive high traffic.",
    glow: "group-hover:shadow-cyan-500/30",
  },
];

const ServicesGrid = () => {
  return (
    <HomeSection
      eyebrow="What We Do"
      title="Services"
      highlight="We Offer"
      subtitle="End-to-end digital solutions crafted to elevate your brand and accelerate growth."
      className="pb-10 pt-0"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            custom={i}
            variants={popIn}
            className={`group relative flex flex-col items-center p-8 text-center ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
          >
            <div
              className={`relative mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 shadow-lg transition-all duration-300 group-hover:scale-110 ${service.glow}`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 to-fuchsia-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <Image
                src={service.icon}
                alt={service.title}
                width={80}
                height={80}
                loading="lazy"
                className="relative z-10 transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h3 className="text-lg font-semibold text-white">{service.title}</h3>
            <p className="mt-3 max-w-xs text-sm leading-7 text-slate-300">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 flex justify-center">
        <HomeBrandButton href="/our-services" variant="outline">
          Other Services
        </HomeBrandButton>
      </div>
    </HomeSection>
  );
};

export default ServicesGrid;
