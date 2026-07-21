"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";
import { BRAND_GRADIENT, BRAND_TEXT } from "@/src/common/components/ui/brand/theme";

type HomeSectionProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  centered?: boolean;
};

export default function HomeSection({
  eyebrow,
  title,
  highlight,
  subtitle,
  children,
  className = "",
  id,
  centered = true,
}: HomeSectionProps) {
  return (
    <motion.section
      {...sectionReveal}
      id={id}
      className={`relative px-4 py-20 sm:px-6 lg:px-10 ${className}`}
    >
      <div
        className={`mx-auto max-w-7xl ${centered ? "text-center" : ""}`}
      >
        {eyebrow && (
          <p className={`mb-4 ${BRAND_TEXT.sectionEyebrow}`}>{eyebrow}</p>
        )}

        <h2 className={BRAND_TEXT.sectionTitle}>
          {title}{" "}
          {highlight && (
            <span className={BRAND_GRADIENT.text}>{highlight}</span>
          )}
        </h2>

        {subtitle && (
          <p
            className={`mx-auto mt-5 max-w-2xl ${BRAND_TEXT.sectionBody} ${
              centered ? "" : "mx-0"
            }`}
          >
            {subtitle}
          </p>
        )}

        <div
          className={`mt-8 flex items-center gap-3 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300/80" />
        </div>

        <div className="mt-12">{children}</div>
      </div>
    </motion.section>
  );
}
