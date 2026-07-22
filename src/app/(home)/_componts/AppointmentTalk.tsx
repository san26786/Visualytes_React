"use client";

import { motion } from "framer-motion";
import HomeBrandButton from "./shared/HomeBrandButton";

const AppointmentTalk = () => {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="pointer-events-none absolute inset-0 " />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-4xl px-6 text-center"
      >
        <div className="rounded-[2rem] border border-white/15 bg-slate-950/80 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Ready to Start?
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Let&apos;s Get Started{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
              Your Project
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-slate-300">
            We&apos;ll help achieve your goals and grow your business. Book a
            free consultation with our team today.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <HomeBrandButton href="/contact-us">
              Book Appointment & Talk
            </HomeBrandButton>
            <HomeBrandButton href="/testimonials" variant="outline">
              See Testimonials
            </HomeBrandButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AppointmentTalk;
