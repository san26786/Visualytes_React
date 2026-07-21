"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";


const milestones = [
  {
    year: "2009",
    place: "United Kingdom",
    text: "Founded our first proprietary company, Geecon Global.",
  },
  {
    year: "2011",
    place: "India",
    text: "Opened our first delivery center with a team of six.",
  },
  {
    year: "2012",
    place: "Middle East",
    text: "Registered Geecon Global as a UK private company and launched our Middle East flagship.",
  },
  {
    year: "2013",
    place: "Global",
    text: "Team strength reached 100 across all offices.",
  },
  {
    year: "2015",
    place: "AU · CA · US",
    text: "Launched flagships in Australia, Canada, and the United States. Team reached 200.",
  },
  {
    year: "2016",
    place: "United Kingdom",
    text: "Registered Geeconsys Limited as our UK subsidiary.",
  },
  {
    year: "2017",
    place: "Ireland",
    text: "Launched our Ireland flagship.",
  },
  {
    year: "2018",
    place: "Global",
    text: "Rebranded as Visualytes Limited. Team strength reached 250.",
  },
  {
    year: "2019",
    place: "Global",
    text: "Acquired i-Wood Inc. Crossed 300 client accounts and 500 project deliveries.",
  },
];

// const CARD_WIDTH = 280;

export default function JourneyTimeline() {
  return (
    <section id="journey" className="bg-[#0B1220] px-6 py-24 sm:py-32">
      <div className="mt-20 hidden md:block">
  <Swiper
    modules={[Autoplay]}
    autoplay={{
      delay: 2200,
      disableOnInteraction: false,
    }}
    speed={900}
    loop
    centeredSlides
    slidesPerView={3}
    spaceBetween={0}
    breakpoints={{
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 4,
      },
    }}
  >
    {milestones.map((m, i) => (
      <SwiperSlide key={m.year}>
        {({ isActive }) => (
          <div className="relative px-6 pt-10">
            {/* line */}
            <div className="absolute left-0 right-0 top-[45px] h-[2px] bg-white/10">
              <div
                className={`h-full bg-[#C9A24B] transition-all duration-1000 ${
                  isActive ? "w-full" : "w-0"
                }`}
              />
            </div>

            {/* dot */}
            <div className="relative flex justify-center">
              <span
                className={`z-10 h-4 w-4 rounded-full border-2 transition-all duration-500 ${
                  isActive
                    ? "scale-125 border-[#C9A24B] bg-[#C9A24B]"
                    : "border-[#C9A24B] bg-[#0B1220]"
                }`}
              />
            </div>

            <div className={i % 2 === 0 ? "mt-10" : "mt-10"}>
              <p className="text-center font-mono text-sm text-[#C9A24B]">
                {m.year}
              </p>

              <p className="mt-1 text-center text-xs uppercase tracking-widest text-[#6FB8B3]">
                {m.place}
              </p>

              <p className="mt-3 text-center text-sm leading-7 text-[#9CA6B8]">
                {m.text}
              </p>
            </div>
          </div>
        )}
      </SwiperSlide>
    ))}
  </Swiper>
</div>
    </section>
  );
}