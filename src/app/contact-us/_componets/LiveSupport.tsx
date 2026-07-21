"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type BezierDefinition, type Variants } from "framer-motion";

const EASE: BezierDefinition = [0.22, 1, 0.36, 1];

const floatVariant: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const fadeLeft = {
  initial: {
    opacity: 0,
    x: -50,
  },
  whileInView: {
    opacity: 1,
    x: 0,
  },
  viewport: {
    once: true,
  },
  transition: {
    duration: 0.7,
    ease: EASE,
  },
};

const fadeRight = {
  initial: {
    opacity: 0,
    x: 50,
  },
  whileInView: {
    opacity: 1,
    x: 0,
  },
  viewport: {
    once: true,
  },
  transition: {
    duration: 0.7,
    ease: EASE,
  },
};

export default function LiveSupport() {
  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">

          {/* ambient glows */}
          <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="grid min-h-[560px] grid-cols-1 lg:grid-cols-2">

            {/* ── Left: animated content ── */}
            <motion.div
              {...fadeLeft}
              className="relative z-10 flex flex-col justify-center bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 px-8 py-14 text-center lg:px-14 lg:py-20 lg:text-left"
            >
              {/* floating label badge */}
              <motion.div variants={floatVariant} animate="animate" className="mb-6 flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
                  Real‑Time Assistance
                </span>
              </motion.div>

              {/* floating headline */}
              <motion.h2
                variants={floatVariant}
                animate="animate"
                style={{ animationDelay: "0.3s" }}
                className="text-[42px] font-bold leading-tight text-white sm:text-[50px] lg:text-[58px]"
              >
                Live{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
                  Support
                </span>
              </motion.h2>

              {/* body */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="mx-auto mt-6 max-w-[460px] text-[16px] leading-[1.9] text-slate-300 lg:mx-0"
              >
                Do you need any urgent help from us regarding any of our
                services? Our dedicated support team is available for you.
              </motion.p>

              {/* phone row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mt-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:justify-start"
              >
                <span className="text-[18px] font-semibold text-white">Call Us Now:</span>
                <a
                  href="tel:02380970305"
                  className="text-[18px] font-light text-pink-300 transition-colors hover:text-pink-100"
                >
                  023 8097 0305
                </a>
                <span className="text-slate-400">or…</span>
              </motion.div>

              {/* WhatsApp CTA — floating */}
              <motion.div
                variants={floatVariant}
                animate="animate"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="mt-9 flex justify-center lg:justify-start"
              >
                <Link
                  href="https://api.whatsapp.com/send?phone=447913027482&text=Hi,."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-emerald-400/60 bg-emerald-500/15 px-8 py-4 text-[13px] font-bold uppercase tracking-[0.25em] text-emerald-100 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.858L.057 23.886a.5.5 0 0 0 .614.612l6.218-1.635A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 0 1-4.953-1.354l-.355-.211-3.683.968.984-3.595-.232-.37A9.716 9.716 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                  </svg>
                  Start WhatsApp Chat Now!
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55 }}
                className="mx-auto mt-7 max-w-[440px] text-[13px] leading-7 text-slate-400 lg:mx-0"
              >
                Requires WhatsApp Desktop to chat from a computer, or WhatsApp
                mobile app on your phone.
              </motion.p>
            </motion.div>

            {/* ── Right: image — true half-split with fade-in ── */}
            <motion.div
              {...fadeRight}
              className="relative hidden min-h-full border-l border-white/10 lg:block"
            >
              <Image
                src="/assets/jpg/bg_3.jpg"
                alt="Support team"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 0px"
              />
              {/* blend edge */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-slate-950/55 via-slate-950/10 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/15" />

              {/* floating stat chips on the image */}
              <motion.div
                variants={floatVariant}
                animate="animate"
                className="absolute bottom-12 right-8 rounded-2xl border border-white/15 bg-slate-900/80 px-5 py-3 backdrop-blur-md"
              >
                <p className="text-[11px] uppercase tracking-widest text-slate-400">Response Time</p>
                <p className="mt-0.5 text-[22px] font-bold text-white">&lt; 2 min</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute right-8 top-12 rounded-2xl border border-white/15 bg-slate-900/80 px-5 py-3 backdrop-blur-md"
              >
                <p className="text-[11px] uppercase tracking-widest text-slate-400">Available</p>
                <p className="mt-0.5 text-[18px] font-bold text-emerald-300">24 / 7</p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
