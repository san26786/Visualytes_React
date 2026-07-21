"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type HomeBrandButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  children: ReactNode;
  className?: string;
  target?: string;
};

const variants = {
  primary:
    "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 text-white border-transparent shadow-[0_8px_30px_rgba(168,85,247,0.35)] hover:shadow-[0_12px_40px_rgba(34,211,238,0.4)] hover:scale-105",
  outline:
    "border-2 border-cyan-300/50 bg-transparent text-cyan-200 hover:bg-cyan-300/10 hover:border-cyan-300 hover:scale-105",
  ghost:
    "border-2 border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:border-fuchsia-300/50 hover:scale-105",
};

export default function HomeBrandButton({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  target,
}: HomeBrandButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300";

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.div whileTap={{ scale: 0.97 }}>
        <Link href={href} target={target} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
