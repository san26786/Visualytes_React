"use client";

import Lenis from "lenis";
import { ReactNode, useEffect } from "react";
import { gsap, ScrollTrigger } from "./gsap";

interface Props {
  children: ReactNode;
}

export default function LenisProvider({ children }: Props) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,

      smoothWheel: true,

      wheelMultiplier: 1,

      touchMultiplier: 2,

      lerp: 0.9,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 2000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });

      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}