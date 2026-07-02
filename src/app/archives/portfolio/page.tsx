// "use server";

// import { useMemo, useState } from "react";
// import PageBanner from "@/src/common/components/layouts/PageBanner";

// import PortfolioGrid from "@/src/app/(home)/_componts/portfolio/PortfolioGrid";

// import {
//   portfolio,
//   allOnlyPortfolio,
//   categories,
// } from "@/src/app/(home)/_componts/portfolio/data/portfoliodata";

// export default function Page() {
//   const [active, setActive] = useState("ALL");

//   const filtered = useMemo(() => {
//     const allItems = [...portfolio, ...allOnlyPortfolio];

//     return active === "ALL"
//       ? allItems
//       : allItems.filter((item) => item.category === active);
//   }, [active]);

//   return (
//     <>
//       <PageBanner title="Portfolio" />

//       <section className="bg-white">
//         <PortfolioGrid
//           items={filtered}
//           active={active}
//           setActive={setActive}
//           categories={categories}
//         />
//       </section>
//     </>
//   );
// }
"use client";

import { useMemo, useState } from "react";
import PortfolioGrid from "@/src/app/(home)/_componts/portfolio/PortfolioGrid";
import {
  categories,
  portfolio,
  allOnlyPortfolio,
} from "@/src/app/(home)/_componts/portfolio/data/portfoliodata";
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

      <PortfolioGrid
        items={filtered}
        active={active}
        setActive={setActive}
        categories={categories}
      />
    </>
  );
}