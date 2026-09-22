import "server-only";

import { Prisma, ServiceTemplate as PrismaServiceTemplate } from "@/src/generated/prisma-admin";
import { prisma } from "@/src/lib/prisma";

import { sectionsFromLegacyArticle } from "./sections/legacy";
import { normalizeSections, SectionValidationError } from "./sections/normalize";
import { createTemplateContent, toTemplateKey } from "./sections/templates";
import type { SectionInstance, ServiceSeo, ServiceTemplateKey } from "./sections/types";

export { SectionValidationError };

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export const DEFAULT_CARD_IMAGE = "/assets/png/services/Website-designing-600x600.png";

/** Slugs that already own a hand-written route under /archives/services. */
const RESERVED_SLUGS = new Set(["app-development", "reorder"]);
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type ServiceRecord = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  cardImage: string;
  route: string | null;
  href: string;
  template: ServiceTemplateKey;
  sortOrder: number;
  isActive: boolean;
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  sections: SectionInstance[];
  createdAt: string;
  updatedAt: string;
};

export type ServiceListItem = Omit<ServiceRecord, "sections"> & { sectionCount: number };

export type ServiceInput = {
  name: string;
  slug: string;
  tagline?: string;
  cardImage?: string;
  route?: string | null;
  template: ServiceTemplateKey;
  sortOrder?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  /** Omit on create to start from the template's preset sections. */
  sections?: unknown;
};

type ServiceRow = Awaited<ReturnType<typeof prisma.service.findFirstOrThrow>>;

/* ------------------------------------------------------------------ */
/* Row -> record                                                       */
/* ------------------------------------------------------------------ */

function hrefFor(row: { slug: string; route: string | null }) {
  return row.route || `/archives/services/${row.slug}`;
}

function parseKeywords(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function contentSeo(content: unknown): ServiceSeo {
  const seo = (content as { seo?: ServiceSeo } | null)?.seo;
  return seo && typeof seo === "object" ? seo : {};
}

export function sectionsFromRow(row: ServiceRow): SectionInstance[] {
  const content = row.content as { sections?: unknown } | null;
  const template = toTemplateKey(row.template);

  if (content && Array.isArray(content.sections)) {
    try {
      return normalizeSections(content.sections);
    } catch {
      // fall through to the preset when stored data is unusable
    }
  }

  if (template === "STANDARD_ARTICLE") {
    const converted = sectionsFromLegacyArticle(content, row);
    if (converted) return converted;
  }

  return createTemplateContent(template).sections;
}

function toRecord(row: ServiceRow): ServiceRecord {
  const seo = contentSeo(row.content);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? "",
    cardImage: row.cardImage || DEFAULT_CARD_IMAGE,
    route: row.route,
    href: hrefFor(row),
    template: toTemplateKey(row.template),
    sortOrder: row.sortOrder,
    isActive: row.isActive,
    isFeatured: row.isFeatured,
    metaTitle: row.metaTitle ?? seo.title ?? "",
    metaDescription: row.metaDescription ?? seo.description ?? "",
    metaKeywords: parseKeywords(row.metaKeywords).length > 0 ? parseKeywords(row.metaKeywords) : seo.keywords ?? [],
    sections: sectionsFromRow(row),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function toListItem(row: ServiceRow): ServiceListItem {
  const { sections, ...rest } = toRecord(row);
  return { ...rest, sectionCount: sections.length };
}

/* ------------------------------------------------------------------ */
/* Public reads                                                        */
/* ------------------------------------------------------------------ */

export type PublicServiceCard = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  cardImage: string;
  href: string;
};

/** Cards for /our-services, in admin order. */
export async function getPublicServiceCards(): Promise<PublicServiceCard[]> {
  const rows = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true, slug: true, name: true, tagline: true, cardImage: true, route: true },
  });

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? "",
    cardImage: row.cardImage || DEFAULT_CARD_IMAGE,
    href: hrefFor(row),
  }));
}

/** One published service (inactive services are hidden from visitors). */
export async function getPublicService(slug: string): Promise<ServiceRecord | null> {
  const row = await prisma.service.findFirst({ where: { slug, isActive: true } });
  return row ? toRecord(row) : null;
}

/* ------------------------------------------------------------------ */
/* Admin CRUD                                                          */
/* ------------------------------------------------------------------ */

export async function listServices(): Promise<ServiceListItem[]> {
  const rows = await prisma.service.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  return rows.map(toListItem);
}

export async function getService(slug: string): Promise<ServiceRecord | null> {
  const row = await prisma.service.findUnique({ where: { slug } });
  return row ? toRecord(row) : null;
}

function toPrismaTemplate(template: ServiceTemplateKey): PrismaServiceTemplate {
  return template as PrismaServiceTemplate;
}

function assertSlug(slug: string) {
  if (!SLUG_PATTERN.test(slug)) {
    throw new SectionValidationError("Slug may only contain lowercase letters, numbers and single dashes.");
  }
  if (RESERVED_SLUGS.has(slug)) {
    throw new SectionValidationError(`"${slug}" is reserved by an existing page. Choose another slug.`);
  }
}

function cleanRoute(route: string | null | undefined): string | null {
  const value = (route ?? "").trim();
  if (!value) return null;
  if (!value.startsWith("/")) throw new SectionValidationError("Custom link must start with /.");
  return value;
}

function jsonContent(sections: SectionInstance[]): Prisma.InputJsonValue {
  return { sections } as unknown as Prisma.InputJsonValue;
}

export async function createService(input: ServiceInput): Promise<ServiceRecord> {
  assertSlug(input.slug);

  if (await prisma.service.findUnique({ where: { slug: input.slug } })) {
    throw new SectionValidationError("A service with this slug already exists.");
  }

  const sections =
    input.sections === undefined ? createTemplateContent(input.template).sections : normalizeSections(input.sections);

  let sortOrder = input.sortOrder;
  if (sortOrder === undefined) {
    const last = await prisma.service.aggregate({ _max: { sortOrder: true } });
    sortOrder = (last._max.sortOrder ?? 0) + 1;
  }

  const row = await prisma.service.create({
    data: {
      slug: input.slug,
      name: input.name.trim(),
      tagline: input.tagline ?? "",
      cardImage: input.cardImage || DEFAULT_CARD_IMAGE,
      route: cleanRoute(input.route),
      template: toPrismaTemplate(input.template),
      content: jsonContent(sections),
      sortOrder,
      isActive: input.isActive ?? true,
      isFeatured: input.isFeatured ?? false,
      metaTitle: input.metaTitle || null,
      metaDescription: input.metaDescription || null,
      metaKeywords: input.metaKeywords && input.metaKeywords.length > 0 ? input.metaKeywords : Prisma.DbNull,
    },
  });

  return toRecord(row);
}

export async function updateService(slug: string, input: Partial<ServiceInput>): Promise<ServiceRecord> {
  const existing = await prisma.service.findUnique({ where: { slug } });
  if (!existing) throw new SectionValidationError("Service not found.");

  const nextSlug = input.slug ?? slug;
  if (nextSlug !== slug) {
    assertSlug(nextSlug);
    if (await prisma.service.findUnique({ where: { slug: nextSlug } })) {
      throw new SectionValidationError("A service with this slug already exists.");
    }
  }

  const data: Prisma.ServiceUpdateInput = {};
  if (input.slug !== undefined) data.slug = nextSlug;
  if (input.name !== undefined) data.name = input.name.trim();
  if (input.tagline !== undefined) data.tagline = input.tagline;
  if (input.cardImage !== undefined) data.cardImage = input.cardImage || DEFAULT_CARD_IMAGE;
  if (input.route !== undefined) data.route = cleanRoute(input.route);
  if (input.template !== undefined) data.template = toPrismaTemplate(input.template);
  if (input.sortOrder !== undefined) data.sortOrder = input.sortOrder;
  if (input.isActive !== undefined) data.isActive = input.isActive;
  if (input.isFeatured !== undefined) data.isFeatured = input.isFeatured;
  if (input.metaTitle !== undefined) data.metaTitle = input.metaTitle || null;
  if (input.metaDescription !== undefined) data.metaDescription = input.metaDescription || null;
  if (input.metaKeywords !== undefined) {
    data.metaKeywords = input.metaKeywords.length > 0 ? input.metaKeywords : Prisma.DbNull;
  }
  if (input.sections !== undefined) data.content = jsonContent(normalizeSections(input.sections));

  const row = await prisma.service.update({ where: { slug }, data });
  return toRecord(row);
}

export async function deleteService(slug: string): Promise<void> {
  const existing = await prisma.service.findUnique({ where: { slug }, select: { id: true } });
  if (!existing) throw new SectionValidationError("Service not found.");
  await prisma.service.delete({ where: { slug } });
}

/** Persist a new card order: slugs[0] shows first on /our-services. */
export async function reorderServices(slugs: string[]): Promise<void> {
  await prisma.$transaction(
    slugs.map((slug, index) => prisma.service.update({ where: { slug }, data: { sortOrder: index + 1 } }))
  );
}
