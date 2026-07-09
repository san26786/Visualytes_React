"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const timeline = [
  {
    year: "2009",
    text: "Founded our first proprietary company Geecon Global in UK",
  },
  {
    year: "2011",
    text: "Registered Geecon Systems as a Private Limited Company in India as a first Delivery Center with Team Size of 6",
  },
  {
    year: "2012",
    text: "Registered Geecon Global as a Private Limited Company in UK and launched our flagship in the Middle East.",
  },
  {
    year: "2013",
    text: "Global Team Strength reached 100.",
  },
  {
    year: "2015",
    text: "Launched our flagship in Australia, Canada and the United States. Team Strength reached 200.",
  },
  {
    year: "2016",
    text: "Registered Geeconsys Limited as the UK subsidiary of Geecon Systems.",
  },
  {
    year: "2017",
    text: "Launched our flagship in Ireland.",
  },
  {
    year: "2018",
    text: "Rebranded Geeconsys Limited as Visualytes Limited. Team Strength reached 250.",
  },
  {
    year: "2019",
    text: "Acquired i-Wood Inc Limited and crossed 300 clients with over 500 successful projects.",
  },
];

export default function Timeline() {
  const [active, setActive] = useState(0);

  const next = () => {
    if (active < timeline.length - 1) {
      setActive(active + 1);
    }
  };

  const prev = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };

  const ITEM_WIDTH = 420;
  const START_OFFSET = 500;
  
  const progressWidth = active * ITEM_WIDTH + 10;
  return (
    <section
      className="relative overflow-hidden bg-[#232b37] py-32 text-white"
      style={{
        backgroundImage: "url('/assets/timeline_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Moving Text */}

      <motion.div
  animate={{
    x: START_OFFSET - active * ITEM_WIDTH,
  }}
  transition={{
    duration: 0.7,
    ease: "easeInOut",
  }}
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap select-none text-[180px] md:text-[260px] font-black uppercase text-pink-400/5"
      >
        OUR STORY
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <h2 className="text-center text-5xl font-light">
          Our Timeline
        </h2>

        <div className="mt-12 flex items-center justify-center gap-8">

          <button
            onClick={prev}
            disabled={active === 0}
            className="rounded-full p-3 transition hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronLeft size={30} />
          </button>

          <div className="w-full max-w-3xl text-center">
            <AnimatePresence mode="wait">
            <motion.p
  key={active}
  initial={{
    opacity: 0,
    x: 80,
  }}
  animate={{
    opacity: 1,
    x: 0,
  }}
  exit={{
    opacity: 0,
    x: -80,
  }}
  transition={{
    duration: 0.5,
  }}
  className="text-lg text-gray-300"
>
                {timeline[active].text}
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            disabled={active === timeline.length - 1}
            className="rounded-full p-3 transition hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronRight size={30} />
          </button>

        </div>

        <div className="relative mt-24 overflow-hidden">
                      <div className="relative">

            {/* Base Line */}
            <div className="absolute top-[42px] left-0 w-full h-[2px] bg-white/20" />

            {/* Progress Line */}
            <motion.div
  className="absolute top-[42px] left-0 h-[2px] bg-white"
  animate={{
    width: progressWidth,
  }}
  transition={{
    duration: .6,
  }}
/>

            {/* Timeline Items */}
            <motion.div
  animate={{
    x: START_OFFSET - active * ITEM_WIDTH,
  }}
  transition={{
    duration: 0.7,
    ease: "easeInOut",
  }}
  className="flex w-max"
>
              {timeline.map((item, index) => {

                const activeItem = index <= active;

                return (
                    <div
                    key={item.year}
                    onClick={() => setActive(index)}
                    className="w-[220px] flex-shrink-0 flex cursor-pointer flex-col items-center"
                  >

                    {/* Year */}
                    <span
                      className={`mb-6 text-sm font-semibold tracking-[3px] transition-all duration-300 ${
                        activeItem
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    >
                      {item.year}
                    </span>

                    {/* Dot */}
                    <motion.div
                      animate={{
                        scale: active === index ? 1.3 : 1,
                      }}
                      transition={{
                        duration: .3,
                      }}
                      className={`z-10 h-4 w-4 rounded-full border-4 transition-all duration-500 ${
                        activeItem
                          ? "bg-[#ff4d73] border-[#ff9cb7] shadow-[0_0_10px_#ff4d73]"
                          : "bg-[#ff4d73] border-[#374151]"
                      }`}
                    />

                  </div>
                );
              })}
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);
}