import PortfolioGrid from "../../portfolio/_components/PortfolioGrid";
import PageBanner from "@/src/common/components/layouts/PageBanner";
import { getPortfolioItems } from "@/src/lib/portfolio";

export default async function Page() {
  // Every portfolio item from Admin > Portfolio Items.
  const items = await getPortfolioItems();

  return (
    <>
      <PageBanner title="portfolio" />

      <PortfolioGrid items={items} />
    </>
  );
}
