import crypto from "crypto";
import path from "path";

import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { saveUpload } from "@/src/lib/storage";

export const runtime = "nodejs";

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
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ message: "Only image files are allowed." }, { status: 400 });
    }

    const extension = path.extname(file.name).toLowerCase() || `.${file.type.split("/")[1] || "jpg"}`;
    const safeName = path
      .basename(file.name, extension)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();
    const fileName = `${safeName}-${crypto.randomBytes(6).toString("hex")}${extension}`;

    const imageUrl = await saveUpload({
      folder: "process",
      fileName,
      data: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
    });

    return NextResponse.json({ success: true, image: imageUrl, fileName });
  } catch (error) {
    console.error("PROCESS IMAGE UPLOAD ERROR:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to upload process image." },
      { status: 500 }
    );
  }
}
