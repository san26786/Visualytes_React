"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, SlidersHorizontal } from "lucide-react";
import HomeSection from "./shared/HomeSection";
import HomeBrandButton from "./shared/HomeBrandButton";
import {
  categories,
  portfolio,
  allOnlyPortfolio,
} from "./portfolio/data/portfoliodata";
import PortfolioSlider from "./portfolio/PortfolioSlider";
import PortfolioGrid from "./portfolio/PortfolioGrid";

type ViewMode = "slider" | "grid";

export default function Portfolio() {
  const [active, setActive] = useState("ALL");
  const [viewMode, setViewMode] = useState<ViewMode>("slider");

  const filtered = useMemo(() => {
    if (active === "ALL") {
      return [...portfolio, ...allOnlyPortfolio];
    }
    return portfolio.filter((item) => item.category === active);
  }, [active]);

  return (
    <section id="portfolio" className="relative overflow-hidden py-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-fuchsia-500/8 blur-[120px]" />

      <HomeSection
        eyebrow="Our Work"
        title="Featured"
        highlight="Portfolio"
        subtitle="Explore our latest projects — switch between cinematic slider and bento grid views."
      >
        <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`relative text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  active === item
                    ? "text-cyan-300"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item}
                {active === item && (
                  <span className="absolute -bottom-2 left-0 right-0 mx-auto h-0.5 w-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 rounded-full border border-white/15 bg-slate-900/80 p-1 backdrop-blur-sm">
            <button
              onClick={() => setViewMode("slider")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${
                viewMode === "slider"
                  ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <SlidersHorizontal size={14} />
              Slider
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid size={14} />
              Grid
            </button>
          </div>
        </div>

        {viewMode === "slider" ? (
          <PortfolioSlider items={filtered} />
        ) : (
          <PortfolioGrid
            items={filtered}
            active={active}
            setActive={setActive}
            categories={categories}
          />
        )}

        <div className="mt-10 flex justify-center">
          <HomeBrandButton href="/archives/portfolio" variant="outline">
            View Full Portfolio
          </HomeBrandButton>
        </div>
      </HomeSection>
    </section>
  );
}
