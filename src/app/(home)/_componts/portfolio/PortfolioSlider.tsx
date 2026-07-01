"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
}

interface PortfolioSliderProps {
  items: PortfolioItem[];
}

export default function PortfolioSlider({
  items,
}: PortfolioSliderProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <div className="relative mt-16 flex items-center">
        {/* Previous */}
        <button
          ref={prevRef}
          aria-label="Previous Slide"
          className="
            absolute top-1/2 -translate-y-1/2
            left-[-40px] hover:left-0
            z-30
            w-[80px] h-[80px]
            rounded-r-full
            bg-[#ff497c] hover:bg-white
            transition-all duration-300
            flex items-center justify-end
            pr-[14px] hover:pr-[40px]
            text-white hover:text-black
          "
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next */}
        <button
          ref={nextRef}
          aria-label="Next Slide"
          className="
            absolute top-1/2 -translate-y-1/2
            right-[-40px] hover:right-0
            z-30
            w-[80px] h-[80px]
            rounded-l-full
            bg-[#ff497c] hover:bg-white
            transition-all duration-300
            flex items-center justify-start
            pl-[14px] hover:pl-[40px]
            text-white hover:text-black
          "
        >
          <ChevronRight size={22} />
        </button>

        <Swiper
  modules={[Navigation, Autoplay]}
  navigation
  autoplay={{
    delay: 2000,
    disableOnInteraction: false,
  }}
  loop
  centeredSlides
  spaceBetween={12}
  onBeforeInit={(swiper: SwiperType) => {
    if (
      swiper.params.navigation &&
      typeof swiper.params.navigation !== "boolean"
    ) {
      const navigation = swiper.params.navigation;
      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;
    }
  }}
  onSwiper={(swiper) => {
    requestAnimationFrame(() => {
      if (
        swiper.params.navigation &&
        typeof swiper.params.navigation !== "boolean"
      ) {
        const navigation = swiper.params.navigation;

        navigation.prevEl = prevRef.current;
        navigation.nextEl = nextRef.current;

        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }
    });
  }}
  breakpoints={{
    320: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 5,
    },
  }}
>
          {items.map((item,index) => (
            <SwiperSlide
            key={`${item.category}-${item.title}-${index}`}
            >
              <div className="group relative h-[370px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 20vw"
                  className="
                    object-cover
                    border-[0.2px]
                    border-black
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div
                  className="
                    absolute inset-0
                    flex flex-col
                    items-center
                    justify-center
                    bg-white/80
                    opacity-0
                    transition
                    duration-500
                    group-hover:opacity-100
                  "
                >
                  <span
                    className="
                      mb-3
                      text-[12px]
                      font-semibold
                      uppercase
                      tracking-[3px]
                      text-[#ff497c]
                    "
                  >
                    {item.category}
                  </span>

                  <h3
                    className="
                      px-6
                      text-center
                      text-[36px]
                      font-semibold
                      leading-tight
                      text-[#1f2732]
                    "
                  >
                    {item.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 flex justify-center">
        <button
          className="
            flex
            h-[82px]
            min-w-[255px]
            items-center
            justify-center
            rounded-full
            border-2
            border-[#ff497c]
            bg-[#ff497c]
            px-14
            text-[13px]
            font-bold
            uppercase
            tracking-[3px]
            text-white
            transition-all
            duration-300
            hover:bg-white
            hover:text-black
            hover:border-[#ff497c]
          "
        >
          View Full Portfolio
        </button>
      </div>
    </>
  );
}