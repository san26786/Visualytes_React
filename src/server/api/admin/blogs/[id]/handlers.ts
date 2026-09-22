import { NextResponse } from "next/server";

import { jsonError, readJson, requireContentManager, writeResponse } from "@/src/lib/blog/api";
import { deletePost, getAdminPost, updatePost } from "@/src/lib/blog/server";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  const post = await getAdminPost((await params).id);
  return post ? NextResponse.json({ post }) : jsonError("Blog post not found.", 404);
}

export async function PATCH(request: Request, { params }: Context) {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  const body = await readJson(request);
  if (!body || typeof body !== "object") return jsonError("Invalid request body.", 400);

  try {
    return writeResponse(await updatePost((await params).id, body));
  } catch (error) {
    console.error("PATCH /api/admin/blogs/[id] failed:", error);
    return jsonError("Failed to update blog post.", 500);
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  try {
    const deleted = await deletePost((await params).id);
    return deleted ? NextResponse.json({ success: true }) : jsonError("Blog post not found.", 404);
  } catch (error) {
    console.error("DELETE /api/admin/blogs/[id] failed:", error);
    return jsonError("Failed to delete blog post.", 500);
  }
}
