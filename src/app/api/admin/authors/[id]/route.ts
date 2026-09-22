import { NextResponse } from "next/server";

import { jsonError, requireContentManager } from "@/src/lib/blog/api";
import { deleteAuthor } from "@/src/lib/blog/server";

/** Removes an author; refused while any post still uses it. */
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  const result = await deleteAuthor((await params).id);
  return result.ok ? NextResponse.json({ success: true }) : jsonError(result.message, result.status);
}
