import path from "path";

import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { saveUpload } from "@/src/lib/storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    const extension = path.extname(file.name) || `.${file.type.split("/")[1]}`;
    const safeName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();
    const fileName = `${safeName}-${Date.now()}${extension}`;

    const imageUrl = await saveUpload({
      folder: "testimonial",
      fileName,
      data: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
    });

    return NextResponse.json({ success: true, image: imageUrl }, { status: 201 });
  } catch (error) {
    console.error("Testimonial image upload error:", error);
    return NextResponse.json({ error: "Failed to upload testimonial image" }, { status: 500 });
  }
}
