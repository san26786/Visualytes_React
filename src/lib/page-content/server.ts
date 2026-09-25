import "server-only";

import { unstable_cache } from "next/cache";

import { Prisma } from "@/src/generated/prisma-admin";
import { prisma } from "@/src/lib/prisma";

import { PAGE_DEFS, resolveContent } from "./registry";
import type { PageContentMap, PageKey } from "./types";

export const pageContentTag = (key: PageKey) => `page-content-${key}`;

async function readStored(key: PageKey): Promise<{ content: unknown; customised: boolean }> {
  const row = await prisma.pageContent.findUnique({ where: { key } });
  return { content: row?.content ?? null, customised: !!row };
}

/** The saved content merged over the built-in defaults. Throws when the database is unreachable. */
export async function readPageContent<K extends PageKey>(key: K): Promise<{ content: PageContentMap[K]; customised: boolean }> {
  const stored = await readStored(key);
  return { content: resolveContent(key, stored.content), customised: stored.customised };
}

// Only the raw saved JSON is cached; it is merged with the defaults on every read, so a cached copy from
// before a field was added to a page can never leave that field missing.
async function loadStored(key: PageKey): Promise<unknown> {
  return (await readStored(key)).content;
}

const cached = (key: PageKey) => unstable_cache(() => loadStored(key), ["page-content-raw", key], { tags: [pageContentTag(key)], revalidate: 3600 });

/**
 * Content of an editable page for the public site (Admin > Page Content). Cached and refreshed on
 * every admin save. Never throws: falls back to the built-in content the site launched with.
 */
export async function getPageContent<K extends PageKey>(key: K): Promise<PageContentMap[K]> {
  try {
    return resolveContent(key, await cached(key)());
  } catch (error) {
    console.error(`Unable to load the "${key}" page content, using the defaults`, error);
    return PAGE_DEFS[key].defaults;
  }
}

export async function savePageContent(key: PageKey, content: unknown) {
  const json = content as Prisma.InputJsonValue;
  return prisma.pageContent.upsert({ where: { key }, create: { key, content: json }, update: { content: json } });
}

export async function resetPageContent(key: PageKey) {
  await prisma.pageContent.deleteMany({ where: { key } });
}
