import { createSection } from "./templates.ts";
import type { SectionInstance } from "./types.ts";

type LegacyRow = {
  name: string;
  tagline?: string | null;
  cardImage?: string | null;
  heroTitle?: string | null;
  heroTitleAccent?: string | null;
  heroSubtitle?: string | null;
};

const asObject = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
const asString = (value: unknown): string => (typeof value === "string" ? value : "");
const asStrings = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

/**
 * Old "Standard Article" rows stored { shell, section } (and a few alternative keys).
 * Convert them into the section model without losing anything an editor typed.
 * Returns null for anything that is not a legacy standard article.
 */
export function sectionsFromLegacyArticle(content: unknown, row: LegacyRow): SectionInstance[] | null {
  const root = asObject(content);
  if (!root.shell && !root.section && !root.paragraphs && !root.intro) return null;

  const shell = asObject(root.shell);
  const section = asObject(root.section);

  const featureBlocks = Array.isArray(root.featureBlocks)
    ? (root.featureBlocks as { title?: string; body?: string }[]).map((b) => `${b.title ?? ""}: ${b.body ?? ""}`)
    : [];

  const pick = <T extends string[]>(primary: T, fallback: T): T => (primary.length > 0 ? primary : fallback);

  return [
    createSection(
      "hero.archive",
      {
        eyebrow: asString(shell.eyebrow) || "Services",
        title: row.heroTitle || asString(shell.title) || row.name,
        titleAccent: row.heroTitleAccent || asString(shell.titleAccent),
        subtitle:
          row.heroSubtitle ||
          asString(shell.subtitle) ||
          row.tagline ||
          "Enterprise-grade digital solutions tailored to accelerate your growth.",
        breadcrumbLabel: asString(shell.breadcrumbLabel) || row.name,
      },
      "hero-archive-1"
    ),
    createSection(
      "article.standard",
      {
        title: asString(section.title) || row.heroTitle || row.name,
        intro: asString(section.intro) || asString(root.intro),
        description: pick(asStrings(section.description), asStrings(root.paragraphs)),
        image:
          asString(section.image) ||
          asString(root.mainImage) ||
          row.cardImage ||
          "/assets/png/services/Website-designing-600x600.png",
        topDescription: pick(asStrings(section.topDescription), featureBlocks),
        bullets: pick(asStrings(section.bullets), asStrings(root.bulletPoints)),
        bottomDescription: asString(section.bottomDescription) || asString(root.bottomSummary),
      },
      "article-standard-2"
    ),
  ];
}
