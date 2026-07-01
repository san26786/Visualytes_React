"use client";

import { useMemo, useState } from "react";
import PortfolioGrid from "../(home)/_componts/portfolio/PortfolioGrid";
import {
  categories,
  portfolio,
  allOnlyPortfolio,
} from "../(home)/_componts/portfolio/data/portfoliodata";
import PageBanner from "@/src/common/components/layouts/PageBanner";

export default function Page() {
  const [active, setActive] = useState("ALL");

  const filtered = useMemo(() => {
    const allItems = [...portfolio, ...allOnlyPortfolio];

    return active === "ALL"
      ? allItems
      : allItems.filter((item) => item.category === active);
  }, [active]);

  return (
    <>
      <PageBanner title="portfolio" />

      <section className="bg-white">
        <PortfolioGrid
          items={filtered}
          active={active}
          setActive={setActive}
          categories={categories}
        />
      </section>
    </>
  );
}