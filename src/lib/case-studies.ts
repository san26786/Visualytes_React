import "server-only";

import { prisma } from "@/src/lib/prisma";
import { slugify } from "@/src/lib/blog/slug";

/** Active case study whose title slug matches (the page lives at /case-study/<slug of title>). */
export async function getCaseStudyBySlug(slug: string) {
  try {
    const rows = await prisma.caseStudy.findMany({ where: { isActive: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
    return rows.find((row) => slugify(row.title) === slug) ?? null;
  } catch (error) {
    console.error("Unable to load the case study", error);
    return null;
  }
}
