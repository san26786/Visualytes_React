"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HomeSection from "./shared/HomeSection";
import { popIn, staggerContainer } from "./shared/motion";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

const certificates = [
  "/assets/jpg/0001-scaled.jpg",
  "/assets/jpg/0002-scaled.jpg",
];

const items = [
  {
    image: "/assets/png/corportae-profile.png",
    alt: "Corporate Profile",
    label: "Corporate Profile",
    href: "https://www.visualytes.com/#downloadcorporateprofie",
    cta: "Download Profile",
  },
  {
    image: null,
    alt: "Certificates",
    label: "Our Certificates",
    href: "https://www.visualytes.com/#Enquiry",
    cta: "Our Certificate",
    isSlider: true,
  },
  {
    image: "/assets/png/broucehr-profile.png",
    alt: "Brochure",
    label: "Company Brochure",
    href: "https://www.visualytes.com/#downloadbroucher",
    cta: "Download Brochure",
  },
];

export default function BooksSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    const cleanup = autoplay();
    return cleanup;
  }, [autoplay]);

  return (
    <section className="relative overflow-hidden py-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[80px]" />

      <HomeSection
        eyebrow="Resources"
        title="Profiles &"
        highlight="Certifications"
        subtitle="Download our corporate profile, browse certifications, and explore our company brochure."
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={popIn}
              className="flex flex-col items-center"
            >
              <div
                className={`group relative overflow-hidden rounded-2xl ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {item.isSlider ? (
                  <div className="relative h-[420px] w-[280px] overflow-hidden" ref={emblaRef}>
                    <div className="flex h-full">
                      {certificates.map((img, ci) => (
                        <div key={ci} className="min-w-full flex-[0_0_100%]">
                          <Image
                            src={img}
                            alt={`Certificate ${ci + 1}`}
                            width={280}
                            height={420}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="relative h-[420px] w-[280px] overflow-hidden">
                    <Image
                      src={item.image!}
                      alt={item.alt}
                      width={280}
                      height={420}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>

              <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-cyan-300/80">
                {item.label}
              </p>

              <Link
                href={item.href}
                target="_blank"
                className="mt-4 inline-flex items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/5 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200 transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:bg-cyan-300/15"
              >
                {item.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </HomeSection>
    </section>
  );
}
