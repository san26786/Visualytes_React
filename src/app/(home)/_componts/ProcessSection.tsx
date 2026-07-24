"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HomeSection from "./shared/HomeSection";
import { popIn, staggerContainer } from "./shared/motion";
import VerticalLineBig from "@/src/common/icons/VerticalLineBIg";

const steps = [
  {
    title: "Strategy",
    color: "#ff497c",
    image: "/assets/webp/strategy-01.jpg.bv.webp",
    text: "We define your competition and target audience, then design your website around what works in your industry.",
  },
  {
    title: "Design",
    color: "#9DEA4D",
    image: "/assets/webp/design-02.jpg.bv.webp",
    text: "Colour scheme, layout, sitemap, and style — we bring your brand to life with a one-of-a-kind masterpiece.",
  },
  {
    title: "Development",
    color: "#43D6F7",
    image: "/assets/webp/develop-03.jpg.bv.webp",
    text: "Watch your ideas become reality live via our project management platform on a development server.",
  },
  {
    title: "Support",
    color: "#F6B347",
    image: "/assets/webp/support-04.jpg.bv.webp",
    text: "Go live to the world. Marketing, maintenance, and enhancements — we're at your side for life.",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-10">
      <div className="pointer-events-none absolute inset-0" />

      <HomeSection
        eyebrow="How We Work"
        title="Our"
        highlight="Process"
        subtitle="A proven four-step journey from strategy to launch — and beyond."
        className="relative z-10"
      >
        <div
          className="relative overflow-hidden "
          style={{
            transform: "skewY(3deg)",
          }}
        >
          <VerticalLineBig
            variant="black"
            className="mx-auto justify-center h-[134px] w-[4px]"
          />

          <section
            className="relative overflow-hidden"
            style={{
              backgroundImage: "url('/assets/png/texture_2.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 relative"
              style={{ transform: "skewY(-3deg)" }}
            >
             

              {/* Mobile */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:hidden space-y-12 pb-10"
              >
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    variants={popIn}
                    custom={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="relative mb-4">
                      <span
                        className="text-[90px] md:text-[130px] font-bold leading-none"
                        style={{ color: step.color }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="absolute inset-0 flex items-center justify-center text-white text-3xl md:text-5xl font-light">
                        {step.title}
                      </h3>
                    </div>

                    <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border-[6px] border-[#4e5562]">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="(max-width:768px)180px,220px"
                        className="object-cover"
                      />
                    </div>

                    <p className="text-[#c2c7d0] text-[15px] md:text-[17px] leading-7 mt-5 max-w-lg">
                      {step.text}
                    </p>

                    {index !== steps.length - 1 && (
                      <Image
                        src={
                          index % 2 === 0
                            ? "/assets/png/right_arrow.png"
                            : "/assets/png/left_arrow.png"
                        }
                        alt=""
                        width={32}
                        height={32}
                        className="mt-8"
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Desktop */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="hidden lg:block"
              >
                <div className="space-y-8">
                  {steps.map((step, index) => {
                    const leftSide = index % 2 === 0;

                    return (
                      <motion.div
                        key={step.title}
                        variants={popIn}
                        custom={index}
                        className="relative grid grid-cols-[minmax(0,1fr)_260px_minmax(0,1fr)] gap-10 items-center min-h-[320px]"
                      >
                        {leftSide ? (
                          <>
                            {/* LEFT TITLE */}
                            <div className="flex justify-end">
                              {index === 0 ? (
                                <div className="relative w-full max-w-[420px] h-[220px]">
                                  <span
                                    className="absolute left-0 -top-5 text-[220px] font-bold leading-none"
                                    style={{ color: step.color }}
                                  >
                                    01
                                  </span>

                                  <h3 className="absolute right-[5px] top-1/2 -translate-y-1/2 text-white text-[58px] leading-none z-10">
                                    {step.title}
                                  </h3>
                                </div>
                              ) : (
                                <div className="relative w-[470px] h-[220px]">
                                  <span
                                    className="absolute right-[160px] -top-6 text-[220px] font-bold leading-none"
                                    style={{ color: step.color }}
                                  >
                                    03
                                  </span>

                                  <h3 className="absolute left-[60px] top-1/3 -translate-y-1/2 text-white text-[58px] leading-none z-10">
                                    {step.title}
                                  </h3>
                                </div>
                              )}
                            </div>

                            {/* IMAGE */}
                            <div className="relative flex justify-center z-20">
                              <div className="relative w-[220px] h-[220px] rounded-full overflow-hidden border-[8px] border-[#4e5562]">
                                <Image
                                  src={step.image}
                                  alt={step.title}
                                  fill
                                  sizes="220px"
                                  className="object-cover"
                                />
                              </div>

                              {index !== steps.length - 1 && (
                                <Image
                                  src="/assets/png/right_arrow.png"
                                  alt=""
                                  width={40}
                                  height={40}
                                  className="absolute top-[185px] left-1/2 -translate-x-1/2"
                                />
                              )}
                            </div>

                            {/* RIGHT TEXT */}
                            <div>
                              <p className="text-[#c2c7d0] text-[17px] leading-[34px] max-w-[380px]">
                                {step.text}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                                                      {/* LEFT TEXT */}
                                                      <div className="flex justify-end">
                              <p className="text-[#c2c7d0] text-[17px] leading-[34px] max-w-[380px] text-right">
                                {step.text}
                              </p>
                            </div>

                            {/* IMAGE */}
                            <div className="relative flex justify-center z-20">
                              <div className="relative w-[220px] h-[220px] rounded-full overflow-hidden border-[8px] border-[#4e5562]">
                                <Image
                                  src={step.image}
                                  alt={step.title}
                                  fill
                                  sizes="220px"
                                  className="object-cover"
                                />
                              </div>

                              {index !== steps.length - 1 && (
                                <Image
                                  src="/assets/png/left_arrow.png"
                                  alt=""
                                  width={40}
                                  height={40}
                                  className="absolute top-[185px] right-2/3 -translate-x-3/2"
                                />
                              )}
                            </div>

                            {/* RIGHT TITLE */}
                            <div>
                              {index === 1 ? (
                                <div className="relative w-[420px] h-[220px]">
                                  <h3 className="absolute left-[5px] top-1/2 -translate-y-1/2 text-white text-[72px] leading-none z-10">
                                    {step.title}
                                  </h3>

                                  <span
                                    className="absolute right-[3px] top-0 text-[220px] font-bold leading-none"
                                    style={{ color: step.color }}
                                  >
                                    02
                                  </span>
                                </div>
                              ) : (
                                <div className="relative w-[420px] h-[220px]">
                                  <h3 className="absolute left-[10px] top-1/2 -translate-y-1/2 text-white text-[72px] leading-none z-10">
                                    {step.title}
                                  </h3>

                                  <span
                                    className="absolute right-[20px] top-0 text-[220px] font-bold leading-none"
                                    style={{ color: step.color }}
                                  >
                                    04
                                  </span>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <div className="flex justify-center mt-10 mb-10">
                <VerticalLineBig
                  variant="black"
                  className="h-[134px] w-[4px]"
                />
              </div>
            </div>
          </section>
        </div>
      </HomeSection>
    </section>
  );
}