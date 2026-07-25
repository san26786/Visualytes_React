"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  BRAND_GRADIENT,
  BRAND_HOVER,
  BRAND_SURFACE,
  BRAND_TEXT,
} from "@/src/common/components/ui/brand/theme";
import { popIn, staggerContainer } from "@/src/app/(home)/_componts/shared/motion";
import { categories, categoryRoutes } from "./data/portfoliodata";

interface PortfolioItem {
  image: string;
  title: string;
  category: string;
}

interface Props {
  items: PortfolioItem[];
  category: string;
}

const categoryTaglines: Record<string, string> = {
  "WEB DESIGN":
    "Immersive interfaces, bold layouts, and pixel-perfect experiences crafted for the modern web.",
  SEO: "Search strategies that elevate visibility, drive organic growth, and turn clicks into customers.",
  "MOBILE APPS":
    "Native-feel mobile products built for performance, engagement, and seamless user journeys.",
  "ECOMMERCE WEBSITE":
    "Conversion-focused storefronts designed to showcase products and scale online revenue.",
  "CORPORATE BRANDING":
    "Identity systems that tell your story and leave a lasting impression across every touchpoint.",
};

const ITEMS_PER_PAGE = 12;

function getBentoClass(index: number, total: number) {
  if (index === 0 && total > 1) {
    return "sm:col-span-2 sm:row-span-2";
  }
  if (index === 3 && total > 4) {
    return "sm:col-span-2";
  }
  return "";
}

export default function PortfolioShowcase({ items, category }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const currentItems = useMemo(
    () => items.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE),
    [items, safePage]
  );

  const filterCategories = categories.filter((c) => c !== "ALL");

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <section className="pb-20 pt-4 lg:pb-28">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className={`rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300`}>
              {items.length} Projects
            </span>
            <span className={`rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-fuchsia-300`}>
              {category}
            </span>
          </div>

          <p className={`mt-6 max-w-2xl ${BRAND_TEXT.sectionBody}`}>
            {categoryTaglines[category] ??
              "Explore our curated collection of work that blends creativity with measurable results."}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/archives/portfolio"
              className="rounded-full border border-white/15 bg-slate-900/80 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-300 transition-all duration-300 hover:border-cyan-300/40 hover:text-cyan-300"
            >
              All Work
            </Link>
            {filterCategories.map((cat) => (
              <Link
                key={cat}
                href={categoryRoutes[cat] ?? "/archives/portfolio"}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  cat === category
                    ? "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30"
                    : "border border-white/15 bg-slate-900/80 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-300"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </motion.div>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative"
        >
          <motion.div
            className="pointer-events-none absolute z-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[80px]"
            style={{ left: springX, top: springY }}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="relative z-10 grid auto-rows-[200px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {currentItems.map((item, index) => {
                const isFeatured = index === 0 && currentItems.length > 1;
                const globalIndex = (safePage - 1) * ITEMS_PER_PAGE + index;

                return (
                  <motion.article
                    key={`${item.title}-${globalIndex}`}
                    layout
                    variants={popIn}
                    custom={index}
                    onHoverStart={() => setHoveredIndex(globalIndex)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    className={`group relative overflow-hidden ${getBentoClass(index, currentItems.length)} ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
                  >
                    {isFeatured && (
                      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/10 to-pink-500/20 opacity-60" />
                    )}

                    <div
                      className={`relative h-full min-h-[200px] overflow-hidden ${
                        isFeatured ? "min-h-[420px] sm:min-h-0" : ""
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes={
                          isFeatured
                            ? "(max-width: 640px) 100vw, 50vw"
                            : "(max-width: 640px) 100vw, 25vw"
                        }
                        className={`object-cover ${BRAND_HOVER.image}`}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        <motion.div
                          animate={{
                            y: hoveredIndex === globalIndex ? 0 : 8,
                            opacity: hoveredIndex === globalIndex ? 1 : 0.85,
                          }}
                          transition={{ duration: 0.35 }}
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-300">
                            {item.category}
                          </p>
                          <h3
                            className={`mt-2 font-bold text-white ${
                              isFeatured
                                ? "text-2xl sm:text-3xl lg:text-4xl"
                                : "text-lg sm:text-xl"
                            }`}
                          >
                            {item.title}
                          </h3>

                          {isFeatured && (
                            <p className={`mt-3 max-w-md text-sm ${BRAND_TEXT.cardBody}`}>
                              A standout piece from our {category.toLowerCase()} portfolio —
                              crafted with precision and creative vision.
                            </p>
                          )}

                          <div className="mt-4 flex items-center gap-2">
                            <span className={`h-px flex-1 max-w-[60px] bg-gradient-to-r from-cyan-400 to-transparent`} />
                            <span className={`text-xs font-semibold uppercase tracking-widest ${BRAND_GRADIENT.text}`}>
                              Featured
                            </span>
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-transparent"
                        animate={{
                          borderColor:
                            hoveredIndex === globalIndex
                              ? "rgba(34, 211, 238, 0.5)"
                              : "rgba(255, 255, 255, 0.08)",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {totalPages > 1 && (
          <nav className="relative z-10 mt-16 flex justify-center">
            <ul className="flex items-center gap-4">
              <li>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-2xl font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:border-cyan-300/40"
                >
                  ‹
                </motion.button>
              </li>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                return (
                  <li key={page}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold transition-all duration-300 ${
                        safePage === page
                          ? "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30"
                          : "border border-white/15 bg-slate-900/80 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-300"
                      }`}
                    >
                      {page}
                    </motion.button>
                  </li>
                );
              })}

              <li>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-2xl font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:border-cyan-300/40"
                >
                  ›
                </motion.button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
