"use client";

import VerticalLineBig from "@/src/common/icons/VerticalLineBIg";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ApiStep {
  id: string;
  processId: string;
  title: string;
  text: string;
  image: string;
  color: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProcessApiResponse {
  id: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  steps: ApiStep[];
}

export default function ProcessSection() {
  const sectionRef = useRef(null);

const [processData, setProcessData] =
  useState<ProcessApiResponse | null>(null);

const [apiSteps, setApiSteps] = useState<ApiStep[]>([]);

  const isInView = useInView(sectionRef, {
    once: false,
    margin: "-150px",
  });

 useEffect(() => {
  const fetchProcessSteps = async () => {
    try {
      const response = await fetch("/api/admin/process", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch process. Status: ${response.status}`
        );
      }

      const data: ProcessApiResponse = await response.json();

      console.log("PROCESS API RESPONSE:", data);

      const activeSteps = (data.steps ?? [])
        .filter((step) => step.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder);

      console.log("ACTIVE PROCESS STEPS:", activeSteps);

      setProcessData(data);
      setApiSteps(activeSteps);
    } catch (error) {
      console.error("PROCESS FETCH ERROR:", error);

      setProcessData(null);
      setApiSteps([]);
    }
  };

  fetchProcessSteps();
}, []);

  /*
   * Keep all existing UI data exactly the same.
   *
   * ONLY:
   * title -> API
   * text  -> API
   *
   * color -> hardcoded
   * image -> hardcoded
   */
 const steps = apiSteps;

if (processData && !processData.isActive) {
  return null;
}

  return (
    <div
      className="relative overflow-hidden "
      style={{
        backgroundPosition: "center",
        transform: "skewY(3deg)",
      }}
    >
      <VerticalLineBig
        variant="black"
        className="mx-auto justify-center h-[134px] w-[4px]"
      />

      <motion.section
  ref={sectionRef}
  initial={{
    opacity: 0,
    scale: 0.92,
    filter: "blur(20px)",
  }}
  animate={
    isInView
      ? {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }
      : {}
  }
  transition={{
    duration: 1.2,
    ease: [0.16, 1, 0.3, 1],
  }}
  className="relative overflow-hidden"
 
>
        <div
          className="
            mx-auto
            max-w-7xl
            px-5
            sm:px-6
            lg:px-10
            relative
          "
          style={{ transform: "skewY(-3deg)" }}
        >
        

          {/* =========================
              MOBILE
          ========================= */}
       <div className="lg:hidden space-y-12 pb-10">
  {steps.map((step, index) => {
    const stepNumber = String(index + 1).padStart(2, "0");

    return (
      <div
        key={step.id}
        className="flex flex-col items-center text-center"
      >
        <div className="relative mb-4 h-[130px] w-full">
          <span
            className="absolute left-0 top-[-20px] text-[90px] md:text-[130px] font-bold leading-none"
            style={{
              color: step.color,
            }}
          >
            {stepNumber}
          </span>

          <h3 className="absolute inset-0 flex items-center justify-center text-white text-3xl md:text-5xl font-light">
            {step.title}
          </h3>
        </div>

        <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border-[6px] border-[#4e5562]">
          {step.image ? (
            <Image
              src={step.image}
              alt={step.title}
              fill
              sizes="(max-width: 768px) 180px, 220px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-700 text-sm text-slate-400">
              No Image
            </div>
          )}
        </div>

        <p className="text-[#c2c7d0] text-[15px] md:text-[17px] leading-7 mt-2 max-w-lg">
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
      </div>
    );
  })}
</div>

          {/* =========================
              DESKTOP
          ========================= */}
         <div className="hidden lg:block">
  <div className="space-y-8">
    {steps.map((step, index) => {
      const leftSide = index % 2 === 0;
      const stepNumber = String(index + 1).padStart(2, "0");

      return (
        <motion.div
          key={step.id}
          initial={{
            opacity: 0,
            y: 120,
            scale: 0.85,
            filter: "blur(15px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          viewport={{
            once: false,
            amount: 0.25,
          }}
          transition={{
            duration: 1,
            delay: index * 0.15,
            type: "spring",
            stiffness: 80,
            damping: 15,
          }}
          className="relative grid grid-cols-[minmax(0,1fr)_260px_minmax(0,1fr)] gap-10 items-center min-h-[320px]"
        >
          {leftSide ? (
            <>
              {/* LEFT TITLE */}

              <motion.div
                initial={{
                  x: -80,
                  opacity: 0,
                }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                }}
                viewport={{
                  once: false,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="flex justify-end"
              >
                <div className="relative w-full max-w-[470px] h-[220px]">
                  <span
                    className="absolute left-0 top-[-26px] text-[220px] font-bold leading-none"
                    style={{
                      color: step.color,
                    }}
                  >
                    {stepNumber}
                  </span>

                  <h3 className="absolute right-[20px] top-1/2 -translate-y-1/2 text-white text-[58px] leading-none z-10">
                    {step.title}
                  </h3>
                </div>
              </motion.div>

              {/* IMAGE */}

              <motion.div
                initial={{
                  scale: 0,
                  rotate: -180,
                }}
                whileInView={{
                  scale: 1,
                  rotate: 0,
                }}
                viewport={{
                  once: false,
                  amount: 0.5,
                }}
                transition={{
                  duration: 0.9,
                  type: "spring",
                  bounce: 0.5,
                }}
                className="relative flex justify-center z-20"
              >
                <div className="relative w-[220px] h-[220px] rounded-full overflow-hidden border-[8px] border-[#4e5562]">
                  {step.image ? (
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="220px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-700 text-sm text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                {index !== steps.length - 1 && (
                  <Image
                    src={
                      "/assets/png/right_arrow.png"
                    }
                    alt=""
                    width={40}
                    height={40}
                    className="absolute top-[185px] left-2/2 -translate-x-1/2 hidden lg:block"
                  />
                )}
              </motion.div>

              {/* RIGHT TEXT */}

              <motion.div
                initial={{
                  x: 80,
                  opacity: 0,
                }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                }}
                viewport={{
                  once: false,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <p className="text-[#c2c7d0] text-[17px] leading-[34px] max-w-[380px]">
                  {step.text}
                </p>
              </motion.div>
            </>
          ) : (
            <>
              {/* LEFT TEXT */}

              <motion.div
                initial={{
                  x: -80,
                  opacity: 0,
                }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                }}
                viewport={{
                  once: false,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="flex justify-end"
              >
                <p className="text-[#c2c7d0] text-[17px] leading-[34px] max-w-[380px] text-right">
                  {step.text}
                </p>
              </motion.div>

              {/* IMAGE */}

              <motion.div
                initial={{
                  scale: 0,
                  rotate: 180,
                }}
                whileInView={{
                  scale: 1,
                  rotate: 0,
                }}
                viewport={{
                  once: false,
                  amount: 0.5,
                }}
                transition={{
                  duration: 0.9,
                  type: "spring",
                  bounce: 0.5,
                }}
                className="relative flex justify-center z-20"
              >
                <div className="relative w-[220px] h-[220px] rounded-full overflow-hidden border-[8px] border-[#4e5562]">
                  {step.image ? (
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="220px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-700 text-sm text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                {index !== steps.length - 1 && (
                  <Image
                    src="/assets/png/left_arrow.png"
                    alt=""
                    width={40}
                    height={40}
                    className="absolute top-[185px] right-2/3 -translate-x-3/2 hidden lg:block"
                  />
                )}
              </motion.div>

              {/* RIGHT TITLE */}

              <motion.div
                initial={{
                  x: 80,
                  opacity: 0,
                }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                }}
                viewport={{
                  once: false,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <div className="relative w-[420px] h-[220px]">
                  <h3 className="absolute left-[5px] top-1/2 -translate-y-1/2 text-white text-[58px] leading-none z-10">
                    {step.title}
                  </h3>

                  <span
                    className="absolute right-[20px] top-0 text-[220px] font-bold leading-none"
                    style={{
                      color: step.color,
                    }}
                  >
                    {stepNumber}
                  </span>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      );
    })}
  </div>
</div>

          <div className="flex justify-center mt-10 mb-10">
            <div className="w-[4px] h-24 bg-white" />
          </div>
        </div>
      </motion.section>
    </div>
  );
}