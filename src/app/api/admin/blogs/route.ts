import { NextResponse } from "next/server";

import { jsonError, readJson, requireContentManager, writeResponse } from "@/src/lib/blog/api";
import { createPost, listAdminPosts } from "@/src/lib/blog/server";
import { BLOG_STATUSES, type BlogStatus } from "@/src/lib/blog/types";

const SORTS = ["updated", "newest", "oldest", "title", "views"] as const;

export async function GET(request: Request) {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  const params = new URL(request.url).searchParams;
  const status = params.get("status") as BlogStatus | null;
  const sort = params.get("sort");

  try {
    const list = await listAdminPosts({
      search: params.get("search") ?? undefined,
      categoryId: params.get("category") || undefined,
      status: status && BLOG_STATUSES.includes(status) ? status : undefined,
      sort: SORTS.find((item) => item === sort),
      page: Number(params.get("page")) || 1,
      pageSize: Number(params.get("pageSize")) || 10,
    });
    return NextResponse.json(list);
  } catch (error) {
    console.error("GET /api/admin/blogs failed:", error);
    return jsonError("Failed to load blog posts.", 500);
  }
}

export async function POST(request: Request) {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  const body = await readJson(request);
  if (!body || typeof body !== "object") return jsonError("Invalid request body.", 400);

  try {
    return writeResponse(await createPost(body), 201);
  } catch (error) {
    console.error("POST /api/admin/blogs failed:", error);
    return jsonError("Failed to create blog post.", 500);
  }
}
