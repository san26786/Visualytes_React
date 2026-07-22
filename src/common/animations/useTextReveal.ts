"use client";

import {
  type RefObject,
  useLayoutEffect,
} from "react";

import { gsap, registerGSAP } from "./gsap";

interface Options {
  trigger: RefObject<HTMLElement | null>;
}

export default function useTextReveal({
  trigger,
}: Options) {
  useLayoutEffect(() => {
    registerGSAP();

    const container = trigger.current;

    if (!container) return;

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>(
        "[data-word]"
      )
    );

    if (!elements.length) return;


    // Initial state
    gsap.set(elements, {
      opacity: 0.15,
      filter: "blur(5px)",
      x: 24,
      y: 4,
      scale: 0.96,
      force3D: true,
      willChange:
        "transform,filter,opacity",
    });


    // Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,

        start: "top 85%",

        end: "bottom 35%",

        scrub: true,

        invalidateOnRefresh: true,
      },
    });


    elements.forEach((word, index) => {
      tl.to(
        word,
        {
          opacity: 1,

          filter: "blur(0px)",

          x: 0,

          y: 0,

          scale: 1,

          ease: "none",
        },
        index * 0.03
      );
    });


    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [trigger]);
}