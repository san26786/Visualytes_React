import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { saveUpload } from "@/src/lib/storage";

export const runtime = "nodejs";

const TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

/** Portfolio image upload. */
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ message: "No file." }, { status: 400 });
  }
  if (!TYPES[file.type]) {
    return NextResponse.json({ message: "Only JPG, PNG, WebP, AVIF and GIF images are allowed." }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ message: "Image must be 10 MB or smaller." }, { status: 400 });
  }

  const base = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  const fileName = `${Date.now()}-${base || "image"}${TYPES[file.type]}`;

  const image = await saveUpload({
    folder: "portfolio",
    fileName,
    data: Buffer.from(await file.arrayBuffer()),
    contentType: file.type,
  });

  return NextResponse.json({ image });
}
