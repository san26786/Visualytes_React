"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Variants } from "framer-motion";
import Image from "next/image";
const SLIDES = [
  {
    id: "slide-1",
    topText: "Welcome To",
    mainTitle: "IT Agency",
    sublines: [
      { text: "Web", color: "text-cyan-300" },
      { text: "Mobile App", color: "text-fuchsia-300" },
      { text: "Marketing", color: "text-pink-300" },
      { text: "Branding", color: "text-emerald-300" },
    ],
    videoSrc: "/assets/jpg/banner/dotdigital-cut-1.mp4",
    imageFallback: "/images/brand-bg.jpg",
    button: [{
      text: "Get Started",
      href: "#get-started",
      target: "_self",
    },{
      text: "Get your seo score",
      href: "#get-started",
      target: "_self",
    }
  ],
  },
  // {
  //   id: "slide-2", // Matches the exact parameters from your rs-slide payload
  //   topText: "Get the Most Trusted",
  //   mainTitle: "Development",
  //   ExtraTitle :"website solutions",

  //   sublines: [
  //     { text: "Portfolio", color: "text-[#8aba40]" },
  //     { text: "Corporate", color: "text-[#4a90e2]" },
  //     { text: "Blogger", color: "text-[#a074c4]" },
  //     { text: "Charity", color: "text-[#a074c4]" },
  //     { text: "Ecommerce", color: "text-[#a074c4]" },
  //   ],
  //   videoSrc: null,
  //   // Pulls directly from your data-src-rs-ref attribute:
  //   imageFallback: "/assets/jpg/slide_03.jpg" ,
  // },
  {
    id: "slide-2",
    topText: "Get the Most Trusted",
    mainTitle: "Development",
    ExtraTitle: "website solutions",
    sublines: [
      { text: "Portfolio", color: "text-cyan-300" },
      { text: "Corporate", color: "text-fuchsia-300" },
      { text: "Blogger", color: "text-pink-300" },
      { text: "Charity", color: "text-violet-300" },
      { text: "Ecommerce", color: "text-emerald-300" },
    ],
    videoSrc: null,
    button: [{
      text: "Get Started",
      href: "#get-started",
      target: "_self",
    },{
      text: "Get folio",
      href: "#portfolio ",
      target: "_self",
    }],
    imageFallback: "/assets/jpg/slide_03.jpg",
    // Injected Telemetry Keys
    isZoomVariant: true,
    timings: {
      topTextDelay: 0.75, // st:750
      mainTitleDelay: 1.0, // st:1000
      sublineStart: 1.48, // st:1480
    },
    
  },
  {
    id: "slide-3",
    // From data-idcheck / text child: "We expertise in User-friendly"
    topText: "We expertise in User-friendly",
    // From the main giant display fat layer text: "Mobile App"
    mainTitle: "Mobile App",
    ExtraTitle: "DEVELOPMENT",
    sublines: [
      { text: "Android ", color: "text-cyan-300" },
      { text: "IOS", color: "text-fuchsia-300" },
      { text: "Augmented Reality", color: "text-pink-300" },
      { text: "Games", color: "text-emerald-300" },
    ],
    videoSrc: null,
    button: [{
      text: "Get Started",
      href: "#get-started",
      target: "_self",
    }],
    // Pulled straight from your data-src-rs-ref attribute:
    imageFallback: "/assets/jpg/slide_02.jpg",
  },
  {
    id: "slide-4",
    // From data-idcheck / text child: "Get Famous with exclusive "
    topText: " WE ARE THE RENOWNED FOR",
    // From the main giant display fat layer text: "Brand Building "
    mainTitle: "ONLINE MARKETING",
    // Extracted from the split lines / characters array inside the "Sports-Subline" layer
    ExtraTitle: "SOLUTIONS",
    sublines: [
      { text: "SEO ", color: "text-cyan-300" },
      { text: "Social Media", color: "text-fuchsia-300" },
      { text: "Email", color: "text-pink-300" },
      { text: "Content Writing", color: "text-emerald-300" },
    ],
    videoSrc: null,
    button: [{
      text: "Get Started",
      href: "#get-started",
      target: "_self",
    }],
    // Pulled straight from your data-src-rs-ref attribute
    imageFallback: "/assets/jpg/slider-6.jpg",
  },
  {
    id: "slide-5",
    // From data-idcheck / text child: "Get Famous with exclusive "
    topText: "Get Famous with exclusive",
    mainTitle: "Brand Building",
    sublines: [
      { text: "Guideline ", color: "text-cyan-300" },
      { text: "Designing", color: "text-fuchsia-300" },
      { text: "Branding", color: "text-pink-300" },
      { text: "Brand Video", color: "text-emerald-300" },
    ],
    videoSrc: null,
    button: [{
      text: "Get Started",
      href: "#get-started",
      target: "_self",
    }],
    // Pulled straight from your data-src-rs-ref attribute
    imageFallback: "/assets/jpg/img_37.jpg",
  },
  // Add remaining 3 slide variants following this structural payload definition...
];

// Precise Revolution Slider Power4.easeOut mathematical simulation
const power4EaseOut = [0.25, 1, 0.5, 1] as const;
const premiumTextVariants: Variants = {
  // Layer 1 & Layer 2 Zoom/Scale In Entry Logic (sX:1.5, sY:1.5)
  zoomEnter: () => ({
    scale: 1.5,
    opacity: 0,
    transition: { duration: 0 },
  }),
  zoomCenter: (delay: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: delay,
      duration: 2.0, // sp:2000
      ease: power4EaseOut,
    },
  }),

  // Subline Slide and Fade Sequence (st:1480 -> st:1500)
  sublineEnter: {
    y: 25,
    opacity: 0,
  },
  sublineCenter: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: delay,
      duration: 1.5, // sp:1550 / sp:1500
      ease: power4EaseOut,
    },
  }),

  // Standard sliding fallback logic for other standard slides
  defaultEnter: {
    opacity: 0,
    y: 30,
  },
  defaultCenter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },

  exit: {
    opacity: 0,
    y: -25,
    transition: {
      duration: 0.4,
      ease: "easeIn" as const,
    },
  },
};
export default function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // const slideDuration = 6000; // 6-second interval rotation

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);
  const currentSlide = SLIDES[currentIndex];

  // Preload the next slide image so transitions stay smooth without loading everything upfront
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % SLIDES.length;
    const nextSlide = SLIDES[nextIndex];
    if (!nextSlide.imageFallback) return;

    const preload = new window.Image();
    preload.src = nextSlide.imageFallback;
  }, [currentIndex]);

  // Interval hook management
  useEffect(() => {
    // If current slide has a video, don't use timer
    if (currentSlide.videoSrc) return;

    const timer = setTimeout(() => {
      handleNext();
    }, 6000);

    return () => clearTimeout(timer);
  }, [currentSlide, handleNext]);

  // Slide sliding animation variants matching Revolution Slider velocity matrix
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),

    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: {
          type: "spring" as const,
          stiffness: 300,
          damping: 30,
        },
        opacity: {
          duration: 0.5,
        },
      },
    },

    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: {
          type: "spring" as const,
          stiffness: 300,
          damping: 30,
        },
        opacity: {
          duration: 0.5,
        },
      },
    }),
  };

  return (
    <section className="relative min-h-[650px] h-[100vh] w-full overflow-hidden  text-white sm:h-screen lg:min-h-[800px] lg:h-[115vh]">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -left-32 top-20 z-[5] h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-32 z-[5] h-[350px] w-[350px] rounded-full bg-fuchsia-500/15 blur-[100px]" />

      <div className="absolute inset-0 z-0 h-full w-full">
        {/* Center Banner Image */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
  <Image
    src="/assets/jpg/banner/centerHome.png"
    alt="Center Banner"
    width={2200}
    height={2200}
    priority
    className="
      w-[85vw]
      sm:w-[75vw]
      md:w-[65vw]
      lg:w-[50vw]
      xl:w-[42vw]
      2xl:w-[36vw]
      h-auto
      object-contain
    "
  />
</div>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {currentSlide.videoSrc ? (
              <video
                className="h-full w-full object-cover object-[center_20%]"
                autoPlay
                muted
                playsInline
                preload="metadata"
                src={currentSlide.videoSrc}
                onEnded={handleNext}
              />
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={currentSlide.imageFallback}
                  alt=""
                  fill
                  priority={currentIndex === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-950/60 via-slate-950/60 to-slate-950/40" />

            {/* Texture Overlay */}
            <div
              className="absolute inset-0 z-[2] pointer-events-none bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('/assets/jpg/banner/transparent-100x50.png')",
                mixBlendMode: "screen",
                opacity: 0.8,
              }}
            />{" "}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Interactive Arrow Triggers */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="
    absolute top-1/2 -translate-y-1/2
    left-[-40px] hover:left-0
    z-30
    w-[80px] h-[80px]
    rounded-r-full
    border border-white/10 bg-white/5 backdrop-blur-sm
    hover:bg-gradient-to-r hover:from-cyan-500 hover:to-fuchsia-500
    hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]
    transition-all duration-300
    flex items-center justify-end
    pr-[14px] hover:pr-[40px]
    text-white hover:scale-105
  "
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="
    absolute top-1/2 -translate-y-1/2
    right-[-40px] hover:right-0
    z-30
    w-[80px] h-[80px]
    rounded-l-full
    border border-white/10 bg-white/5 backdrop-blur-sm
    hover:bg-gradient-to-l hover:from-fuchsia-500 hover:to-pink-500
    hover:shadow-[0_0_30px_rgba(244,114,182,0.4)]
    transition-all duration-300
    flex items-center justify-start
    pl-[14px] hover:pl-[40px]
    text-white hover:scale-105
  "
      >
        <ChevronRight size={22} />
      </button>

      <div className="
relative
z-20
container
mx-auto
h-full
flex
flex-col
justify-center
items-center
text-center
px-5
md:px-6
pt-32
sm:pt-36
md:pt-20
lg:pt-10
">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            className="
      flex
      flex-col
      items-center
      max-w-5xl
      w-full
      px-4
      "    >
            {/* Top Minimal Callout Description */}
            <motion.span
              variants={premiumTextVariants}
              initial={currentSlide.isZoomVariant ? "zoomEnter" : "defaultEnter"}
              animate={currentSlide.isZoomVariant ? "zoomCenter" : "defaultCenter"}
              exit="exit"
              custom={currentSlide.timings?.topTextDelay || 0}
              className="pt-6
md:pt-0
text-xs
sm:text-sm
md:text-base
font-bold
tracking-[6px]
md:tracking-[10px]
uppercase
text-cyan-300/90
mb-6"
            >
              {currentSlide.topText}
            </motion.span>

            {/* Giant Bold Core Heading */}
            <motion.h1
              variants={premiumTextVariants}
              initial={currentSlide.isZoomVariant ? "zoomEnter" : "defaultEnter"}
              animate={currentSlide.isZoomVariant ? "zoomCenter" : "defaultCenter"}
              exit="exit"
              custom={currentSlide.timings?.mainTitleDelay || 0.2}
              className="text-[38px]
sm:text-[55px]
md:text-[72px]
lg:text-[90px]
xl:text-[110px]
leading-[1]
md:leading-[0.95]
font-extrabold uppercase tracking-wide leading-none mb-5 md:mb-6 drop-shadow-md select-none font-sans
bg-gradient-to-b from-white via-white to-slate-300 bg-clip-text text-transparent"
            >
              {currentSlide.mainTitle}
            </motion.h1>

            {/* Extra Title Component Row (Layers 4 & 12 Hybrid) */}
            {currentSlide.ExtraTitle && (
              <motion.h2
                variants={premiumTextVariants}
                initial="sublineEnter"
                animate="sublineCenter"
                exit="exit"
                custom={(currentSlide.timings?.sublineStart || 1.4) + 0.02}
                className="
          text-lg
          sm:text-2xl
          md:text-4xl
          lg:text-5xl
          font-bold
          uppercase
          tracking-[4px]
          md:tracking-widest
          text-white/90
          mb-6
          "        >
                {currentSlide.ExtraTitle}
              </motion.h2>
            )}

            {/* Subline Segment Group containing colored string text blocks */}
            <div
              className="
  flex
  flex-wrap
  justify-center
  items-center
gap-x-3
gap-y-4
  text-center
  mb-10
  px-4
"
            >        {currentSlide.sublines.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center shrink-0"
                variants={premiumTextVariants}
                initial="sublineEnter"
                // Applies micro-staggers sequentially using the true telemetry start parameters
                animate="sublineCenter"
                exit="exit"
                custom={(currentSlide.timings?.sublineStart || 1.4) + (idx * 0.04)}
              >
                <span className={`
${item.color}
font-medium
text-sm
sm:text-lg
md:text-2xl
lg:text-[34px]
xl:text-[42px]
`}>
                  {item.text}
                </span>

                {idx < currentSlide.sublines.length - 1 && (
                  <span className="mx-3 md:mx-4 w-[8px] h-[8px] md:w-[10px] md:h-[10px] rounded-full bg-white inline-block shrink-0" />
                )}
              </motion.div>
            ))}
            </div>

            {/* CTA Interaction Layer */}
            <div className="flex flex-wrap justify-center gap-4">
  {currentSlide.button?.map((btn, index) => (
    <motion.a
      key={index}
      href={btn.href}
      target={btn.target}
      variants={premiumTextVariants}
      initial="sublineEnter"
      animate="sublineCenter"
      exit="exit"
      custom={(currentSlide.timings?.sublineStart || 1.4) + 0.4 + index * 0.1}
      className={`relative inline-flex items-center justify-center
        px-6 py-4 sm:px-10 sm:py-5
        rounded-full
        text-[10px] sm:text-xs
        font-bold
        uppercase
        tracking-[3px]
        transition-all
        duration-300
        hover:scale-105
        ${
          index === 0
            ? "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 text-white border-transparent  hover:shadow-[0_12px_40px_rgba(34,211,238,0.5)]"
            : "bg-transparent text-white border-2 border-cyan-300/50 hover:bg-cyan-300/10 hover:border-cyan-300"
        }`}
    >
      {btn.text}
    </motion.a>
  ))}
</div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center md:bottom-24">
        <div className="relative h-[60px] w-[40px] rounded-full border-2 border-cyan-300/50">
          <motion.div
            animate={{ y: [8, 28, 8] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-[10px] h-[10px] w-[4px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-300 to-fuchsia-400"
          />
        </div>
      </div>

      {/* Bottom fade into page */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[15] h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
