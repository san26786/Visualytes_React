import { NextResponse } from "next/server";

import { listPublishedPosts } from "@/src/lib/blog/server";

/** Public list of published posts: ?category=<slug>&page=<n>&pageSize=<n> */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  try {
    const list = await listPublishedPosts({
      categorySlug: params.get("category") || undefined,
      page: Number(params.get("page")) || 1,
      pageSize: Number(params.get("pageSize")) || 6,
    });
    return NextResponse.json(list);
  } catch (error) {
    console.error("GET /api/blog failed:", error);
    return NextResponse.json({ message: "Failed to load blog posts." }, { status: 500 });
  }
}
