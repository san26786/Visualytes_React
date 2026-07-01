"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "left" | "right" | "up";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: ScrollRevealProps) {
  const initial = {
    opacity: 0,
    x:
      direction === "left"
        ? -20
        : direction === "right"
        ? 20
        : 0,
    y: direction === "up" ? 20 : 0,
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}