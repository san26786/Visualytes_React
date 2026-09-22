import { NextResponse } from "next/server";
import { z } from "zod";

import { jsonError, readJson, requireContentManager } from "@/src/lib/blog/api";
import { createAuthor } from "@/src/lib/blog/server";

const schema = z.object({
  name: z.string().trim().min(2, "Author name is too short.").max(80, "Author name must be 80 characters or fewer."),
});

/** Adds an author name (or returns the existing one with the same name). */
export async function POST(request: Request) {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  const parsed = schema.safeParse(await readJson(request));
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Invalid author.", 422);

  return NextResponse.json({ author: await createAuthor(parsed.data.name) }, { status: 201 });
}
