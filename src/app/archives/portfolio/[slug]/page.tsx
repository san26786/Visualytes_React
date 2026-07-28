import { notFound } from "next/navigation";
import PortfolioShowcase from "../../../portfolio/_components/PortfolioShowcase";
import BrandArchiveShell from "@/src/common/components/ui/brand/BrandArchiveShell";
import {
  portfolio,
  allOnlyPortfolio,
  slugMap,
} from "../../../portfolio/_components/data/portfoliodata";

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

  const titleParts = category.split(" ");
  const titleMain = titleParts.slice(0, -1).join(" ") || category;
  const titleAccent = titleParts.length > 1 ? titleParts.at(-1) : undefined;

  return (
    <BrandArchiveShell
      title={titleMain}
      titleAccent={titleAccent}
      eyebrow=""
      subtitle="A curated gallery of our finest work — where creativity meets craft."
      breadcrumbs={[
        { label: "Portfolio", href: "/portfolio" },
        { label: category },
      ]}
    >
      <PortfolioShowcase items={items} category={category} />
    </BrandArchiveShell>
  );
}
