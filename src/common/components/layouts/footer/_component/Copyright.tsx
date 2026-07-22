"use client";

import { motion } from "framer-motion";

const Copyright = () => {
  return (
    <section className="relative bg-[#075783] border-t border-white/5">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-slate-400">
            <span className="bg-gradient-to-r from-cyan-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              © Copyright 2026
            </span>{" "}
            All Rights Reserved by Visualytes Limited
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Copyright;
