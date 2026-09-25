import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { readSettings, saveSettings } from "@/src/lib/site/server";
import { DEFAULT_SETTINGS, SITE_DATA_TAG, settingsSchema } from "@/src/lib/site/types";

/** GET /api/admin/site-settings */
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  return NextResponse.json({ settings: await readSettings().catch(() => DEFAULT_SETTINGS), defaults: DEFAULT_SETTINGS });
}

/** PUT /api/admin/site-settings  body: SiteSettings - validates, saves, and refreshes the live site. */
export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const parsed = settingsSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid settings." }, { status: 400 });
  await saveSettings(parsed.data);
  revalidateTag(SITE_DATA_TAG, { expire: 0 });
  return NextResponse.json({ settings: parsed.data });
}
