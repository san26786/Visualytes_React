import { jsonError, requireContentManager, writeResponse } from "@/src/lib/blog/api";
import { duplicatePost } from "@/src/lib/blog/server";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  try {
    return writeResponse(await duplicatePost((await params).id), 201);
  } catch (error) {
    console.error("POST /api/admin/blogs/[id]/duplicate failed:", error);
    return jsonError("Failed to duplicate blog post.", 500);
  }
}
