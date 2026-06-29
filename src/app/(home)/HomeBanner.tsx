"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
const SLIDES = [
  {
    id: "slide-1",
    topText: "Welcome To",
    mainTitle: "IT Agency",
    sublines: [
      { text: "Web", color: "text-[#8aba40]" },
      { text: "Mobile App", color: "text-[#4a90e2]" },
      { text: "Marketing", color: "text-[#a074c4]" },
      { text: "Branding", color: "text-[#e65100]" },
    ],
    videoSrc: "/assets/jpg/banner/dotdigital-cut-1.mp4",
    imageFallback: "/images/brand-bg.jpg",
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
      { text: "Portfolio", color: "text-[#8aba40]" },
      { text: "Corporate", color: "text-[#4a90e2]" },
      { text: "Blogger", color: "text-[#a074c4]" },
      { text: "Charity", color: "text-[#a074c4]" },
      { text: "Ecommerce", color: "text-[#a074c4]" },
    ],
    videoSrc: null,
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
      { text: "Android ", color: "text-[#8aba40]" },
      { text: "IOS", color: "text-[#4a90e2]" },
      { text: "Augmented Reality", color: "text-[#a074c4]" },
      { text: "Games", color: "text-[#e65100]" },
    ],
    videoSrc: null,
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
      { text: "SEO ", color: "text-[#8aba40]" },
      { text: "Social Media", color: "text-[#4a90e2]" },
      { text: "Email", color: "text-[#a074c4]" },
      { text: "Content Writing", color: "text-[#e65100]" },
    ],
    videoSrc: null,
    // Pulled straight from your data-src-rs-ref attribute
    imageFallback: "/assets/jpg/slider-6.jpg",
  },
  {
    id: "slide-5",
    // From data-idcheck / text child: "Get Famous with exclusive "
    topText: "Get Famous with exclusive",
    mainTitle: "Brand Building",
    sublines: [
      { text: "Guideline ", color: "text-[#8aba40]" },
      { text: "Designing", color: "text-[#4a90e2]" },
      { text: "Branding", color: "text-[#a074c4]" },
      { text: "Brand Video", color: "text-[#e65100]" },
    ],
    videoSrc: null,
    // Pulled straight from your data-src-rs-ref attribute
    imageFallback: "/assets/jpg/img_37.jpg",
  },
  // Add remaining 3 slide variants following this structural payload definition...
];

// Precise Revolution Slider Power4.easeOut mathematical simulation
const power4EaseOut = [0.25, 1, 0.5, 1];

const premiumTextVariants = {
  // Layer 1 & Layer 2 Zoom/Scale In Entry Logic (sX:1.5, sY:1.5)
  zoomEnter: (delay: number) => ({
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
    transition: { duration: 0.6, ease: "easeOut" },
  },

  exit: {
    opacity: 0,
    y: -25,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};
export default function PremiumHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideDuration = 6000; // 6-second interval rotation

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);
  const currentSlide = SLIDES[currentIndex];
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
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  return (
    <section className="relative w-full h-[117vh] min-h-[800px] bg-[#0c1017] text-white overflow-visible select-none">
      {/* Background Media Crossfader Engine */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* Center Banner Image */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <Image
            src="/assets/jpg/banner/centerHome.png"
            alt="Center Banner"
            width={700}
            height={700}
            priority
            className="w-auto h-auto max-w-[80%] md:max-w-[700px] opacity-100"
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
    className="w-full h-full object-cover"
    autoPlay
    muted
    playsInline
    src={currentSlide.videoSrc}
    onEnded={handleNext}
  />
) : (
  <div
    className="w-full h-full bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${currentSlide.imageFallback})`,
    }}
  />
)}

{/* Dark Overlay */}
<div
  className="absolute inset-0 z-[1]"
  style={{
    backgroundColor: "rgba(31,39,50,0.7)",
  }}
/>

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
    bg-white/10 hover:bg-[#ff497c]
    transition-all duration-300
    flex items-center justify-end
    pr-[14px] hover:pr-[40px]
    text-white
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
    bg-white/10 hover:bg-[#ff497c]
    transition-all duration-300
    flex items-center justify-start
    pl-[14px] hover:pl-[40px]
    text-white
  "
      >
        <ChevronRight size={22} />
      </button>

<div className="relative z-20 container mx-auto h-full px-6 flex flex-col justify-center items-center text-center">
  <AnimatePresence mode="wait">
    <motion.div
      key={currentSlide.id}
      className="flex flex-col items-center max-w-6xl w-full"
    >
      {/* Top Minimal Callout Description */}
      <motion.span
        variants={premiumTextVariants}
        initial={currentSlide.isZoomVariant ? "zoomEnter" : "defaultEnter"}
        animate={currentSlide.isZoomVariant ? "zoomCenter" : "defaultCenter"}
        exit="exit"
        custom={currentSlide.timings?.topTextDelay || 0}
        className="text-xs sm:text-sm md:text-base font-bold tracking-[6px] md:tracking-[10px] uppercase text-white/80 mb-6 block"
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
        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[110px] font-extrabold uppercase tracking-wide leading-none mb-4 drop-shadow-md select-none font-sans"
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
          custom={(currentSlide.timings?.sublineStart || 1.4) + 0.05}
          className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-widest text-white/90 mb-8"
        >
          {currentSlide.ExtraTitle}
        </motion.h2>
      )}

      {/* Subline Segment Group containing colored string text blocks */}
      <div className="flex items-center justify-center text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-wide mb-12 whitespace-nowrap overflow-visible">
        {currentSlide.sublines.map((item, idx) => (
          <motion.div 
            key={idx} 
            className="flex items-center shrink-0"
            variants={premiumTextVariants}
            initial="sublineEnter"
            // Applies micro-staggers sequentially using the true telemetry start parameters
            animate="sublineCenter"
            exit="exit"
            custom={(currentSlide.timings?.sublineStart || 1.4) + (idx * 0.08)}
          >
            <span className={`${item.color} font-medium text-xl md:text-3xl lg:text-[45px] tracking-[1px]`}>
              {item.text}
            </span>

            {idx < currentSlide.sublines.length - 1 && (
              <span className="mx-3 md:mx-4 w-[8px] h-[8px] md:w-[10px] md:h-[10px] rounded-full bg-white inline-block shrink-0" />
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA Interaction Layer */}
      <motion.a
        href="#get-started"
        variants={premiumTextVariants}
        initial="sublineEnter"
        animate="sublineCenter"
        exit="exit"
        custom={(currentSlide.timings?.sublineStart || 1.4) + 0.4}
        className="relative inline-flex items-center justify-center bg-[#ff497c] text-white text-[10px] sm:text-xs font-bold uppercase tracking-[3px] rounded-full px-8 py-4 sm:px-10 sm:py-5 overflow-hidden transition-all duration-300 border-2 border-transparent hover:border-[#ff497c] hover:bg-transparent shadow-lg hover:shadow-none"
      >
        Get Started
      </motion.a>
    </motion.div>
  </AnimatePresence>
</div>
      <div className="absolute bottom-[140px] left-1/2 -translate-x-1/2 z-[9999] flex items-center justify-center">
        <div className="relative w-[40px] h-[60px] border-2 border-white rounded-full">
          <motion.div
            animate={{ y: [8, 28, 8] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-[10px] -translate-x-1/2 w-[4px] h-[10px] bg-white rounded-full"
          />
        </div>
      </div>

      {/* Bottom Structural Angle Vector Curve Mask Layer */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full pointer-events-none h-[40px] md:h-[120px]">
        {" "}
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-full fill-white"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,60 L1440,60 L1440,20 L720,55 L0,20 Z" />
        </svg>
      </div>
    </section>
  );
}
