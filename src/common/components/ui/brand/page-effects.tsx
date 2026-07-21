"use client";

import { motion } from "framer-motion";

type ParticleConfig = {
  x: string;
  y: string;
  size: number;
  color: string;
  delay: number;
  duration: number;
};

function Particle({ x, y, size, color, delay, duration }: ParticleConfig) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full opacity-0"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      animate={{
        opacity: [0, 0.7, 0],
        y: [0, -120, -240],
        x: [0, 30, -20],
        scale: [1, 1.4, 0.6],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export const sharedParticles: ParticleConfig[] = [
  { x: "8%", y: "15%", size: 6, color: "#22d3ee", delay: 0, duration: 7 },
  { x: "20%", y: "55%", size: 4, color: "#a78bfa", delay: 1.2, duration: 9 },
  { x: "38%", y: "25%", size: 8, color: "#f0abfc", delay: 0.5, duration: 8 },
  { x: "55%", y: "70%", size: 5, color: "#22d3ee", delay: 2, duration: 6 },
  { x: "67%", y: "18%", size: 7, color: "#f472b6", delay: 0.8, duration: 10 },
  { x: "80%", y: "50%", size: 4, color: "#34d399", delay: 1.6, duration: 8 },
  { x: "90%", y: "38%", size: 6, color: "#818cf8", delay: 0.3, duration: 7 },
  { x: "93%", y: "78%", size: 5, color: "#f0abfc", delay: 2.4, duration: 9 },
  { x: "28%", y: "82%", size: 4, color: "#22d3ee", delay: 1, duration: 11 },
  { x: "48%", y: "8%", size: 9, color: "#a78bfa", delay: 3, duration: 7 },
  { x: "74%", y: "88%", size: 5, color: "#f472b6", delay: 1.8, duration: 8 },
  { x: "4%", y: "88%", size: 7, color: "#34d399", delay: 0.7, duration: 12 },
];

export const sectionReveal = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: "easeOut" as const },
};

export function BrandPageBackdrop() {
  return (
    <>
      <div className="pointer-events-none fixed -top-48 left-0 h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[160px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-fuchsia-500/10 blur-[140px]" />
      <div className="pointer-events-none fixed left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/8 blur-[120px]" />

      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {sharedParticles.map((particle, index) => (
          <Particle key={index} {...particle} />
        ))}
      </div>
    </>
  );
}
