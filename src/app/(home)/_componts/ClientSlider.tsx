"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
      }),
    ]
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
    <section className="w-full bg-white py-10">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="mb-[35px] text-center text-[46px] leading-[56px] font-medium text-[#1f2732]">
          Our Latest Client
        </h2>

        <div className="relative ">
          {/* Previous */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-[#7f7f7f] transition hover:text-black"
          >
            <ChevronLeft size={20} strokeWidth={3} />
          </button>

          {/* Next */}
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 text-[#7f7f7f] transition hover:text-black"
          >
            <ChevronRight size={20} strokeWidth={3} />
          </button>

          {/* Slider */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {clientGroups.map((group, index) => (
                <div
                  key={index}
                  className="min-w-full flex-[0_0_100%]"
                >
                  <div className="mx-auto grid max-w-7xl grid-cols-3 gap-14">
                    {group.map((item, i) => (
                      <div
                        key={i}
                        className="flex h-[212px] items-center justify-center"
                      >
                        <Image
                          src={item}
                          alt={`Client ${i + 1}`}
                          width={270}
                          height={180}
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center gap-3">
            {clientGroups.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  selectedIndex === index
                    ? "bg-[#ff497c]"
                    : "bg-[#d1d5db]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}