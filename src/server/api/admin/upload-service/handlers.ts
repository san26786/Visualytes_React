import path from "path";

import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { saveUpload, uploadDriver } from "@/src/lib/storage";

export const runtime = "nodejs";

const SERVICE_IMAGE_TYPES: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/avif": [".avif"],
  "image/gif": [".gif"],
};
const SERVICE_VIDEO_TYPES: Record<string, string[]> = {
  "video/mp4": [".mp4"],
  "video/webm": [".webm"],
};
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_VIDEO_BYTES = 80 * 1024 * 1024;
/** Vercel rejects function request bodies above ~4.5 MB, so bigger files go straight to Blob. */
const MAX_SERVER_BYTES_ON_BLOB = 4 * 1024 * 1024;

function safeBaseName(name: string) {
  const base = path.parse(name).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return (base || "file").slice(0, 60);
}

/** Tells the editor how to upload: "local" (through this route) or "blob" (browser -> Blob directly). */
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }
  return NextResponse.json({ driver: uploadDriver() });
}

/** Stores a service image (or the About video) and returns its public URL. */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ message: "No file uploaded." }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase();
  const isImage = (SERVICE_IMAGE_TYPES[file.type] ?? []).includes(ext);
  const isVideo = (SERVICE_VIDEO_TYPES[file.type] ?? []).includes(ext);

  if (!isImage && !isVideo) {
    return NextResponse.json(
      { message: "Unsupported file. Use JPG, PNG, WebP, AVIF, GIF or MP4/WebM." },
      { status: 400 }
    );
  }

  const limit = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > limit) {
    return NextResponse.json({ message: `File is too large (max ${isVideo ? "80" : "8"} MB).` }, { status: 400 });
  }
  if (uploadDriver() === "blob" && file.size > MAX_SERVER_BYTES_ON_BLOB) {
    return NextResponse.json({ message: "Use the direct upload for files above 4 MB." }, { status: 413 });
  }

  const url = await saveUpload({
    folder: "services",
    fileName: `${Date.now()}-${safeBaseName(file.name)}${ext}`,
    data: Buffer.from(await file.arrayBuffer()),
    contentType: file.type,
  });

  return NextResponse.json({ success: true, image: url, url }, { status: 201 });
}
