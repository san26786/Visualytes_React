"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import { useRef, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import type { NavigationOptions } from "swiper/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BRAND_HOVER } from "@/src/common/components/ui/brand/theme";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
}

interface PortfolioSliderProps {
  items: PortfolioItem[];
}

export default function PortfolioSlider({ items }: PortfolioSliderProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !prevRef.current || !nextRef.current) return;

    swiper.params.navigation = {
      ...(swiper.params.navigation as NavigationOptions),
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    };

    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  return (
    <div className="relative">
      <button
        ref={prevRef}
        aria-label="Previous Slide"
        className="absolute left-0 top-1/2 z-30 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/90 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-cyan-300/50 hover:bg-cyan-500/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        ref={nextRef}
        aria-label="Next Slide"
        className="absolute right-0 top-1/2 z-30 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/90 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-fuchsia-300/50 hover:bg-fuchsia-500/20 hover:shadow-[0_0_30px_rgba(244,114,182,0.3)]"
      >
        <ChevronRight size={22} />
      </button>

      <Swiper
        className="w-full !px-12 !py-8"
        modules={[Navigation, Autoplay, EffectCoverflow]}
        effect="coverflow"
        coverflowEffect={{
          rotate: 8,
          stretch: 0,
          depth: 120,
          modifier: 1.5,
          slideShadows: false,
        }}
        loop={items.length <= 24}
        rewind={items.length > 24}
        centeredSlides
        spaceBetween={24}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        watchSlidesProgress
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation = {
            ...(swiper.params.navigation as NavigationOptions),
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          };
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={`${item.category}-${item.title}-${index}`}>
            <div
              className={`group relative h-[340px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-xl ${BRAND_HOVER.card}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                loading="lazy"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                  {item.category}
                </span>
                <h3 className="text-center text-xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 transition-transform duration-300 group-hover:-translate-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300/70">
                  {item.category}
                </p>
                <p className="mt-1 truncate text-sm font-medium text-white">
                  {item.title}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
