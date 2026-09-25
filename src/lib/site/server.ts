import "server-only";

import { unstable_cache } from "next/cache";

import { Prisma } from "@/src/generated/prisma-admin";
import { getContactContent } from "@/src/lib/contact-page";
import { prisma } from "@/src/lib/prisma";

import { DEFAULT_SETTINGS, DEFAULT_SITE_DATA, SETTINGS_KEY, SITE_DATA_TAG, withDefaults, type SiteData, type SiteSettings } from "./types";

/** Stored settings merged over the defaults. Throws if the database is unreachable (callers decide the fallback). */
export async function readSettings(): Promise<SiteSettings> {
  const row = await prisma.siteSettings.findUnique({ where: { key: SETTINGS_KEY } });
  return row ? withDefaults(row.config) : DEFAULT_SETTINGS;
}

export async function saveSettings(settings: SiteSettings) {
  const json = settings as unknown as Prisma.InputJsonValue;
  return prisma.siteSettings.upsert({ where: { key: SETTINGS_KEY }, create: { key: SETTINGS_KEY, config: json }, update: { config: json } });
}

async function loadSiteData(): Promise<SiteData> {
  const [settings, socialLinks, contact] = await Promise.all([
    readSettings(),
    prisma.socialLink.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" }, select: { platform: true, url: true } }),
    getContactContent(),
  ]);
  return { settings, socialLinks, contact: contact.contactInfo };
}

// Cached across requests; every admin save calls revalidateTag(SITE_DATA_TAG) so changes show straight away.
const cachedSiteData = unstable_cache(loadSiteData, ["site-data"], { tags: [SITE_DATA_TAG], revalidate: 3600 });

/** Header / footer / shared-block data for the public layout. Never throws: falls back to the built-in defaults. */
export async function getSiteData(): Promise<SiteData> {
  try {
    return await cachedSiteData();
  } catch (error) {
    console.error("Unable to load the site settings, using the defaults", error);
    return DEFAULT_SITE_DATA;
  }
}
