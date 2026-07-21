"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Dot = {
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
};

export default function FloatingShapes() {
  const [dots] = useState<Dot[]>(() =>
    Array.from({ length: 18 }, () => ({
      size: Math.random() * 6 + 3,
      left: Math.random() * 95,
      top: Math.random() * 95,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    }))
  );

  return (
    <>
      {dots.map((dot, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-white/60"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.left}%`,
            top: `${dot.top}%`,
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: dot.duration,
            delay: dot.delay,
          }}
        />
      ))}
    </>
  );
}