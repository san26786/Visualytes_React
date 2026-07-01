"use client";

import { useMemo, useState } from "react";
import PortfolioHeader from "../(home)/_componts/portfolio/PortfolioHeader";
import PortfolioGrid from "../(home)/_componts/portfolio/PortfolioGrid";
import {
  categories,
  portfolio,
  allOnlyPortfolio,
} from "../(home)/_componts/portfolio/data/portfoliodata";
import PageBanner from '@/src/common/components/layouts/PageBanner'
import React from 'react'

export default function page() {
    const [active, setActive] = useState("ALL");
  
    const filtered = useMemo(() => {
      if (active === "ALL") {
        return [...portfolio, ...allOnlyPortfolio];
      }
  
      return [...portfolio, ...allOnlyPortfolio].filter(
        (item) => item.category === active
      );
    }, [active]);
  
    return (
    <>
<PageBanner title="portfolio" />
<section className="bg-white ">

{/* <PortfolioHeader
        active={active}
        setActive={setActive}
        categories={categories}
      /> */}

<PortfolioGrid
  items={filtered}
  active={active}
  setActive={setActive}
  categories={categories}
/>    </section>
    </> 
  );
}


