import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { blobToken } from "@/src/lib/storage";

export const runtime = "nodejs";

const ALLOWED = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "video/mp4",
  "video/webm",
];

/**
 * Token endpoint for browser -> Vercel Blob uploads (used on Vercel, where a function cannot receive
 * bodies above ~4.5 MB). Only an admin can obtain a token; the "upload completed" callback that
 * Vercel sends afterwards carries a signature instead of a cookie and is verified by handleUpload.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as HandleUploadBody | null;
  if (!body) return NextResponse.json({ message: "Invalid request." }, { status: 400 });

  try {
    const result = await handleUpload({
      body,
      request,
      token: blobToken(),
      onBeforeGenerateToken: async () => {
        if (!(await isAdmin())) throw new Error("Unauthorized");
        return {
          allowedContentTypes: ALLOWED,
          maximumSizeInBytes: 80 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // Nothing to record: the editor saves the returned URL with the service.
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ message }, { status: message === "Unauthorized" ? 403 : 400 });
  }
}
