"use client";

import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/* animated counter */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) raw.set(to);
  }, [inView, raw, to]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const stats = [
  { value: 7,    suffix: "+",   label: "Countries",         color: "from-cyan-400 to-cyan-300"   },
  { value: 1000, suffix: "+",   label: "Projects Done",     color: "from-fuchsia-400 to-pink-300"},
  { value: 13,   suffix: "+",   label: "Years Experience",  color: "from-violet-400 to-indigo-300"},
  { value: 98,   suffix: "%",   label: "Client Satisfaction",color: "from-emerald-400 to-teal-300"},
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

export default function Milestone() {
  return (
    <section className="relative px-6 py-12">

      {/* ── Our Milestone ── */}
      <motion.div {...fadeUp(0)} className="mx-auto max-w-7xl">

        {/* section badge */}
        <div className="mb-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-8 py-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-400" />
            <h3 className="text-2xl font-semibold text-fuchsia-200 sm:text-4xl">
              Our Milestone
            </h3>
          </span>
        </div>

        {/* milestone image in a glowing frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-br from-fuchsia-400/25 via-cyan-300/10 to-cyan-400/25 blur-sm" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/25 bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <Image
              src="/assets/png/our_milestone.png"
              width={1600}
              height={1600}
              alt="our milestone"
              className="rounded-[1.3rem] object-contain"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* ── Why Choose Us: 4 visible cards ── */}
      <motion.div
        {...fadeUp(0.1)}
        className="mx-auto mt-16 max-w-7xl"
      >
        <div className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/15 px-8 py-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
            <h3 className="text-2xl font-semibold text-cyan-100 sm:text-4xl">
              Why Choose Us?
            </h3>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-3xl border border-white/20 bg-slate-900/90 p-6 text-center shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300/45"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.color} opacity-10`} />
              <p className={`relative z-10 text-5xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent sm:text-6xl`}>
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="relative z-10 mt-3 text-[13px] font-bold uppercase tracking-[0.2em] text-white/85">
                {s.label}
              </p>
              <div className={`relative z-10 mx-auto mt-4 h-0.5 w-14 rounded-full bg-gradient-to-r ${s.color} transition-all duration-300 group-hover:w-24`} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── What Separates Us ── */}
      <motion.div {...fadeUp(0.15)} className="mx-auto mt-16 max-w-7xl">
        <div className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-violet-300/10 px-8 py-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
            <h3 className="text-xl font-semibold text-violet-200 sm:text-3xl">
              What Separates Us From Our Competition?
            </h3>
          </span>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 px-8 py-8 text-[19px] leading-9 text-slate-200 backdrop-blur-md">
          <p>
            Visualytes brings perfection, high quality deliveries and premium
            level service to web‑apps, computer software and digital marketing
            while helping clients to fulfill all their IT needs under one roof.
          </p>
        </div>
      </motion.div>

      {/* ── Why Choose Us statement ── */}
      <motion.div {...fadeUp(0.2)} className="mx-auto mt-12 max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-900/40 via-slate-900/80 to-fuchsia-900/30 px-8 py-10 text-center backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <p className="relative z-10 text-[22px] font-semibold leading-relaxed text-white sm:text-[26px]">
            Visualytes Limited is the renowned IT company, which has marked its
            flagship in{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent font-bold">
              7 countries
            </span>{" "}
            with{" "}
            <span className="bg-gradient-to-r from-fuchsia-300 to-pink-400 bg-clip-text text-transparent font-bold">
              1000+ projects
            </span>{" "}
            successfully accomplished.
          </p>
        </div>
      </motion.div>

    </section>
  );
}
