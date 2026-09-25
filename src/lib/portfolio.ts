import "server-only";

import { unstable_cache } from "next/cache";

import { prisma } from "@/src/lib/prisma";

/** Cache tag the admin Portfolio save/delete handlers invalidate. */
export const PORTFOLIO_TAG = "portfolio";

export type PortfolioEntry = { id: string; title: string; category: string; image: string };

async function loadPortfolio(): Promise<PortfolioEntry[]> {
  const rows = await prisma.portfolio.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true, category: true, image: true } });
  // An entry without a picture cannot be shown in the gallery.
  return rows.filter((row) => row.image.trim() !== "");
}

const cachedPortfolio = unstable_cache(loadPortfolio, ["portfolio-items"], { tags: [PORTFOLIO_TAG], revalidate: 3600 });

/** Portfolio items straight from the database (Admin > Portfolio Items), newest first. */
export async function getPortfolioItems(): Promise<PortfolioEntry[]> {
  try {
    return await cachedPortfolio();
  } catch (error) {
    console.error("Unable to load the portfolio", error);
    return [];
  }
}
