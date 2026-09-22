import { NextResponse } from "next/server";

import { jsonError, requireContentManager } from "@/src/lib/blog/api";
import { saveBlogImage } from "@/src/lib/blog/media";

export const runtime = "nodejs";

/**
 * Stores an image in public/uploads/blog and records it as a MediaAsset.
 * Used for featured images and images inserted into the Tiptap editor.
 */
export async function POST(request: Request) {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return jsonError("No image file was provided.", 400);

    const result = await saveBlogImage(file, auth.session.id);
    if (!result.ok) return jsonError(result.message, result.status);

    return NextResponse.json(
      // `image` / `url` kept for the existing upload helpers; `media` is the full record.
      { success: true, image: result.media.url, url: result.media.url, media: result.media },
      { status: 201 }
    );
  } catch (error) {
    console.error("Blog image upload failed:", error);
    return jsonError("Upload failed.", 500);
  }
}
