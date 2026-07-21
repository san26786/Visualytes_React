"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HomeSection from "./shared/HomeSection";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

const clientGroups = [
  [
    "/assets/png/client_talk/Untitled-design-1.png",
    "/assets/png/client_talk/Untitled-design-2.png",
    "/assets/png/client_talk/Untitled-design-3.png",
  ],
  [
    "/assets/png/client_talk/Untitled-design-4.png",
    "/assets/png/client_talk/Untitled-design-5.png",
    "/assets/png/client_talk/Untitled-design-6.png",
  ],
];

export default function ClientSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    requestAnimationFrame(() => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative overflow-hidden pb-20 pt-10">
      <HomeSection
        eyebrow="Trusted By"
        title="Our Latest"
        highlight="Clients"
        subtitle="Brands and businesses that chose Visualytes for their digital journey."
        className="pb-0"
      >
        <div className="relative">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute -left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/90 text-white backdrop-blur-sm transition-all hover:scale-110 hover:border-cyan-300/50 hover:bg-cyan-500/20"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute -right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/90 text-white backdrop-blur-sm transition-all hover:scale-110 hover:border-fuchsia-300/50 hover:bg-fuchsia-500/20"
          >
            <ChevronRight size={20} />
          </button>

          <div className="overflow-hidden px-8" ref={emblaRef}>
            <div className="flex">
              {clientGroups.map((group, index) => (
                <div key={index} className="min-w-full flex-[0_0_100%]">
                  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
                    {group.map((item, i) => (
                      <div
                        key={i}
                        className={`group flex h-[180px] items-center justify-center rounded-2xl p-6 ${BRAND_SURFACE.mutedGlassCard} ${BRAND_HOVER.card}`}
                      >
                        <Image
                          src={item}
                          alt={`Client ${i + 1}`}
                          width={220}
                          height={140}
                          loading="lazy"
                          className="object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {clientGroups.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? "w-8 bg-gradient-to-r from-cyan-400 to-fuchsia-400"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </HomeSection>
    </section>
  );
}
