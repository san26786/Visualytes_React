"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND_SURFACE, BRAND_TEXT } from "@/src/common/components/ui/brand/theme";

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
  const ITEM_WIDTH = 220;
  const START_OFFSET = 500;

  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [progressLeft, setProgressLeft] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !dotRefs.current[0]) return;

    const container = containerRef.current.getBoundingClientRect();
    const firstDot = dotRefs.current[0]!.getBoundingClientRect();
    const start = firstDot.left - container.left + firstDot.width / 2;

    setProgressLeft(start);

    if (active === 0) {
      setProgressWidth(0);
      return;
    }

    const currentDot = dotRefs.current[active]!.getBoundingClientRect();
    const end = currentDot.left - container.left + currentDot.width / 2;
    setProgressWidth(end - start);
  }, [active]);

  const next = () => {
    if (active < timeline.length - 1) setActive((p) => p + 1);
  };

  const prev = () => {
    if (active > 0) setActive((p) => p - 1);
  };

  return (
    <section className="relative px-4 pb-24 pt-6">
      <div className="mx-auto max-w-7xl">
        <div className={`relative overflow-hidden ${BRAND_SURFACE.sectionWrap} px-6 py-12 sm:px-10 sm:py-16`}>
          <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-fuchsia-400/15 blur-3xl" />

          <div className="relative z-10">
            <p className={`text-center ${BRAND_TEXT.sectionEyebrow}`}>
              Milestones
            </p>
            <h2 className={`mt-3 text-center ${BRAND_TEXT.sectionTitle}`}>
              Our{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                Timeline
              </span>
            </h2>

            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                onClick={prev}
                disabled={active === 0}
                className="rounded-full border border-white/15 bg-slate-900/80 p-3 text-white transition hover:border-cyan-300/40 hover:bg-slate-800 disabled:opacity-30"
                aria-label="Previous milestone"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="min-h-[80px] w-full max-w-3xl text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.45 }}
                    className={BRAND_TEXT.sectionBody}
                  >
                    {timeline[active].text}
                  </motion.p>
                </AnimatePresence>
              </div>

              <button
                onClick={next}
                disabled={active === timeline.length - 1}
                className="rounded-full border border-white/15 bg-slate-900/80 p-3 text-white transition hover:border-cyan-300/40 hover:bg-slate-800 disabled:opacity-30"
                aria-label="Next milestone"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Timeline + OUR STORY watermark share one aligned track */}
            <div className="relative mt-16 overflow-hidden pt-8">
              <div
                ref={containerRef}
                className="relative h-[120px] sm:h-[180px]"
              >
                <motion.div
                  animate={{ x: START_OFFSET - active * ITEM_WIDTH }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center"
                >
                  <span className="pointer-events-none select-none whitespace-nowrap text-[120px] font-black uppercase leading-none text-cyan-300/5 sm:text-[180px]">
                    OUR STORY
                  </span>
                </motion.div>

                <div
                  className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/15"
                  style={{
                    marginLeft: progressLeft,
                    width: `calc(100% - ${progressLeft}px)`,
                  }}
                />
                <motion.div
                  className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-fuchsia-400"
                  animate={{ left: progressLeft, width: progressWidth }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />

                <motion.div
                  animate={{ x: START_OFFSET - active * ITEM_WIDTH }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center"
                >
                  <div className="flex w-max">
                    {timeline.map((item, index) => {
                      const activeItem = index <= active;
                      return (
                        <button
                          key={item.year}
                          type="button"
                          onClick={() => setActive(index)}
                          className="relative flex w-[220px] flex-shrink-0 cursor-pointer items-center justify-center bg-transparent"
                        >
                          <span
                            className={`absolute bottom-[calc(50%+14px)] text-sm font-semibold tracking-[3px] transition-all duration-300 ${
                              activeItem ? "text-white" : "text-slate-500"
                            }`}
                          >
                            {item.year}
                          </span>

                          <motion.div
                            ref={(el) => {
                              dotRefs.current[index] = el;
                            }}
                            animate={{ scale: active === index ? 1.3 : 1 }}
                            transition={{ duration: 0.3 }}
                            className={`relative z-10 h-4 w-4 rounded-full border-4 transition-all duration-500 ${
                              activeItem
                                ? "border-fuchsia-300 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                                : "border-slate-600 bg-slate-700"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
