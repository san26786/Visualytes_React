"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND_HOVER,  } from "@/src/common/components/ui/brand/theme";

const services = [
  {
    title: "Website Designing",
    image: "/assets/png/services/Website-designing-600x600.png",
    href: "/archives/services/web-designing",
    description: "Our creative web designers can read between the colours. Let the website design talk to your customers directly, while they easily navigate through your sales funnel.",
  },
  {
    title: "Digital Marketing",
    image: "/assets/png/services/Digital-header-600x600.jpg",
    href: "/archives/services/digital-marketing",
    description: "Performance marketing services are led by a team of professional digital marketers.",
  },
  {
    title: "Mobile App Development",
    image: "/assets/png/services/mobile-app-development.jpg-min-600x600.png",
    href: "/archives/services/app-development",
    description: "Launch a beast of a business in the app store and turn all the spotlight on your mobile app.",
  },
  {
    title: "Corporate Branding",
    image: "/assets/png/services/corporate-branding-min-600x600.png",
    href: "/archives/services/corporate-branding",
    description: "The first impression is indeed the last one and branding can boost conversion.",
  },
  {
    title: "Bespoke Software",
    image: "/assets/png/services/Bespoke-Software-Development-600x600.png",
    href: "/archives/services/bespoke-software-branding",
    description: "Do you have a business model in mind? Let's get it into the market.",
  },
  {
    title: "Website Hosting Services",
    image: "/assets/png/services/website-hosting-services-min-600x600.png",
    href: "/archives/services/hosting-services",
    description: "Reliable hosting services with advanced features to drive high traffic.",
  },
  {
    title: "Quality Assurance",
    image: "/assets/png/services/Quality-Assurance-min-600x600.png",
    href: "/archives/services/quality-assurance",
    description: "Experienced QA team capable of detecting flaws at an early stage.",
  },
  {
    title: "Maintenance & Support",
    image: "/assets/png/services/maintenance-and-support-1170x780-min-600x600.png",
    href: "/archives/services/maintenance-and-support",
    description: "Support your app or website and take it to the level you desire.",
  },
];

export default function ServicesPage() {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300">
            What We Offer
          </span>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 shadow-[0_22px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl ${BRAND_HOVER.card}`}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  fill
                  src={service.image}
                  alt={service.title}
                  className={`object-cover ${BRAND_HOVER.image}`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              </div>

              <div className="p-8">
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {service.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-slate-300 line-clamp-3">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors group-hover:gap-3"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}