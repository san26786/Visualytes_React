import path from "path";

import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { saveUpload } from "@/src/lib/storage";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];

/** Client logo upload. Nothing on the site calls this from a public page, so it is admin-only. */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "No image file provided." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ message: "Only PNG, JPG, JPEG, WEBP and SVG images are allowed." }, { status: 400 });
    }

    const extension = path.extname(file.name).toLowerCase();
    const baseName = path
      .basename(file.name, path.extname(file.name))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const fileName = `${baseName || "client"}-${Date.now()}${extension}`;

    const imageUrl = await saveUpload({
      folder: "clients",
      fileName,
      data: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
    });

    return NextResponse.json({ message: "Client image uploaded successfully.", image: imageUrl }, { status: 201 });
  } catch (error) {
    console.error("Client image upload error:", error);
    return NextResponse.json({ message: "Failed to upload client image." }, { status: 500 });
  }
}
