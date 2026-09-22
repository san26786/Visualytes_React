import { NextResponse } from "next/server";
import { z } from "zod";

import { jsonError, readJson, requireContentManager } from "@/src/lib/blog/api";
import { countMediaUsage, deleteMediaFile, toMediaItem } from "@/src/lib/blog/media";
import { prisma } from "@/src/lib/prisma";

type Context = { params: Promise<{ id: string }> };

const patchSchema = z.object({ alt: z.string().trim().max(300).nullable() });

export async function PATCH(request: Request, { params }: Context) {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  const parsed = patchSchema.safeParse(await readJson(request));
  if (!parsed.success) return jsonError("Alt text must be 300 characters or fewer.", 422);

  try {
    const asset = await prisma.mediaAsset.update({
      where: { id: (await params).id },
      data: { alt: parsed.data.alt || null },
    });
    return NextResponse.json({ media: toMediaItem(asset) });
  } catch {
    return jsonError("Image not found.", 404);
  }
}

/** Refuses to delete an image that a post still uses. */
export async function DELETE(_request: Request, { params }: Context) {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  const asset = await prisma.mediaAsset.findUnique({ where: { id: (await params).id } });
  if (!asset) return jsonError("Image not found.", 404);

  try {
    const usage = await countMediaUsage(asset);
    if (usage > 0) {
      return jsonError(`This image is used by ${usage} blog post${usage === 1 ? "" : "s"} and can't be deleted.`, 409);
    }
    await prisma.mediaAsset.delete({ where: { id: asset.id } });
    await deleteMediaFile(asset);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/media/[id] failed:", error);
    return jsonError("Failed to delete image.", 500);
  }
}
