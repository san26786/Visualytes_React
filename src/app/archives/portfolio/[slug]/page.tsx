// import { notFound } from "next/navigation";

// import ServicePageBanner from "@/src/common/components/layouts/ServicePageBanner";
// import PortfolioGrid from "@/src/app/(home)/_componts/portfolio/PortfolioGrid";

// import {
//   portfolio,
//   allOnlyPortfolio,
//   categories,
//   slugMap,
// } from "@/src/app/(home)/_componts/portfolio/data/portfoliodata";

// interface Props {
//   params: Promise<{
//     slug: string;
//   }>;
// }

// export default async function PortfolioCategoryPage({ params }: Props) {
//   const { slug } = await params;

//   const category = slugMap[slug];

//   if (!category) {
//     notFound();
//   }

//   const items = [...portfolio, ...allOnlyPortfolio].filter(
//     (item) => item.category === category
//   );

//   return (
//     <>
//       <ServicePageBanner
//         title={category}
//         breadcrumbs={[
//           {
//             label: "Portfolio",
//             href: "/archives/portfolio",
//           },
//           {
//             label: category,
//           },
//         ]}
//       />

//       <PortfolioGrid
//         items={items}
//         active={category}
//         categories={categories}
//       />
//     </>
//   );
// }

import { notFound } from "next/navigation";

import ServicePageBanner from "@/src/common/components/layouts/ServicePageBanner";
import PortfolioItems from "@/src/app/(home)/_componts/portfolio/PortfolioItems";

import {
  portfolio,
  allOnlyPortfolio,
  slugMap,
} from "@/src/app/(home)/_componts/portfolio/data/portfoliodata";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const category = slugMap[slug];

  if (!category) notFound();

  const items = [...portfolio, ...allOnlyPortfolio].filter(
    (item) => item.category === category
  );

  return (
    <>
      <ServicePageBanner
        title={category}
        breadcrumbs={[
          { label: "Portfolio", href: "/archives/portfolio" },
          { label: category },
        ]}
      />

      <div className="container mx-auto mt-16 px-5 max-w-6xl ">
        <PortfolioItems items={items} />
      </div>
    </>
  );
}