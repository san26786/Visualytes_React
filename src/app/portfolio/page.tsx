"use client";

import { useMemo, useState } from "react";
import PortfolioGrid from "../(home)/_componts/portfolio/PortfolioGrid";
import PortfolioHeader from "../(home)/_componts/portfolio/PortfolioHeader";
import {
  categories,
  portfolio,
  allOnlyPortfolio,
} from "../(home)/_componts/portfolio/data/portfoliodata";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BrandPageBackdrop,
  sectionReveal,
} from "@/src/common/components/ui/brand/page-effects";

export default function Page() {
  const [active, setActive] = useState("ALL");

  const filtered = useMemo(() => {
    const allItems = [...portfolio, ...allOnlyPortfolio];

    return active === "ALL"
      ? allItems
      : allItems.filter((item) => item.category === active);
  }, [active]);

  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      <div className="relative z-10">
        <section className="relative mt-[130px] overflow-hidden">
          <div className="relative flex min-h-[440px] flex-col items-center justify-center px-4 pb-36 pt-20 text-center">
            <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-fuchsia-500/25 blur-[100px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[80px]" />

            <ol className="relative z-10 mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]">
              <li>
                <Link href="/" className="text-cyan-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li className="text-white/30">●</li>
              <li className="text-white/60">Portfolio</li>
            </ol>

            <h1 className="relative z-10 max-w-3xl text-[52px] font-bold leading-[1.1] tracking-tight text-white sm:text-[64px] lg:text-[76px]">
              Our{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>

            <p className="relative z-10 mt-5 max-w-xl text-[17px] leading-relaxed text-slate-300">
              Explore our curated collection of projects that showcase creativity, innovation, and cutting-edge design.
            </p>

            <div className="relative z-10 mt-10 flex items-center gap-3">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300/80" />
            </div>
          </div>
        </section>

        <motion.div {...sectionReveal}>
          <section className="py-12 lg:py-20">
            <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
              <PortfolioHeader
                active={active}
                setActive={setActive}
                categories={categories}
              />
              <PortfolioGrid
                items={filtered}
                active={active}
                setActive={setActive}
                categories={categories}
              />
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}