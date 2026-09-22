import crypto from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { saveUpload } from "@/src/lib/storage";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No image file was provided." }, { status: 400 });
    }
    if (!file.size) {
      return NextResponse.json({ error: "The uploaded file is empty." }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Image size must be less than 10MB." }, { status: 400 });
    }
    if (!MIME_EXTENSIONS[file.type]) {
      return NextResponse.json({ error: "Only JPG, PNG, WEBP and GIF images are allowed." }, { status: 400 });
    }

    const safeName =
      file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .toLowerCase() || "case-study";
    const uniqueId = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    const fileName = `${safeName}-${uniqueId}${MIME_EXTENSIONS[file.type]}`;

    const imageUrl = await saveUpload({
      folder: "case-study",
      fileName,
      data: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
    });

    return NextResponse.json(
      {
        success: true,
        image: imageUrl,
        url: imageUrl,
        fileName,
        originalName: file.name,
        size: file.size,
        type: file.type,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Case study image upload error:", error);
    return NextResponse.json({ error: "Failed to upload case study image." }, { status: 500 });
  }
}
