import { NextResponse } from "next/server";

import { jsonError, requireContentManager } from "@/src/lib/blog/api";
import { getBlogMeta } from "@/src/lib/blog/server";

/** Categories, tags and authors used by the blog listing filters and editor. */
export async function GET() {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  try {
    return NextResponse.json(await getBlogMeta());
  } catch (error) {
    console.error("GET /api/admin/blog-meta failed:", error);
    return jsonError("Failed to load blog options.", 500);
  }
}
