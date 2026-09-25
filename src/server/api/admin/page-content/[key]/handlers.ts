import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { isPageKey, PAGE_DEFS, resolveContent } from "@/src/lib/page-content/registry";
import { pageContentTag, readPageContent, resetPageContent, savePageContent } from "@/src/lib/page-content/server";

type Context = { params: Promise<{ key: string }> };

async function resolveKey(context: Context) {
  const key = (await context.params).key;
  return isPageKey(key) ? key : null;
}

/** GET /api/admin/page-content/:key - the content currently on the site. */
export async function GET(_request: Request, context: Context) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const key = await resolveKey(context);
  if (!key) return NextResponse.json({ message: "Unknown page." }, { status: 404 });
  const { content, customised } = await readPageContent(key);
  return NextResponse.json({ content, customised });
}

/** PUT /api/admin/page-content/:key  body: the page content - cleaned to the page's schema, saved, live at once. */
export async function PUT(request: Request, context: Context) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const key = await resolveKey(context);
  if (!key) return NextResponse.json({ message: "Unknown page." }, { status: 404 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ message: "Invalid content." }, { status: 400 });

  const content = resolveContent(key, body);
  const problem = checkPage(key, content);
  if (problem) return NextResponse.json({ message: problem }, { status: 400 });

  await savePageContent(key, content);
  revalidateTag(pageContentTag(key), { expire: 0 });
  return NextResponse.json({ content, customised: true });
}

/** DELETE /api/admin/page-content/:key - back to the built-in content. */
export async function DELETE(_request: Request, context: Context) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const key = await resolveKey(context);
  if (!key) return NextResponse.json({ message: "Unknown page." }, { status: 404 });
  await resetPageContent(key);
  revalidateTag(pageContentTag(key), { expire: 0 });
  return NextResponse.json({ content: PAGE_DEFS[key].defaults, customised: false });
}

/** Rules that keep the public pages working. */
function checkPage(key: string, content: unknown): string | null {
  const slugOk = (slug: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  const check = (items: { slug?: string; id?: string }[], label: string) => {
    const seen = new Set<string>();
    for (const item of items) {
      const slug = (item.slug ?? item.id ?? "").trim();
      if (!slugOk(slug)) return `Every ${label} needs an address ending made of lowercase letters, numbers and dashes (e.g. my-page).`;
      if (seen.has(slug)) return `Two ${label}s share the address "${slug}". Each must be different.`;
      seen.add(slug);
    }
    return null;
  };
  if (key === "about-pages") return check((content as { pages: { slug: string }[] }).pages, "page");
  if (key === "sponsors") return check((content as { items: { id: string }[] }).items, "sponsorship");
  return null;
}
