import { NextRequest, NextResponse } from "next/server";

import fs from "fs/promises";
import path from "path";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const portfolio = body.portfolio;

    if (!Array.isArray(portfolio)) {
      return NextResponse.json(
        { success: false, message: "portfolio array required" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "portfolio"
    );

    await fs.mkdir(uploadDir, { recursive: true });

    const records = [];

    for (const item of portfolio) {
      const oldImage = item.image;

      const sourcePath = path.join(
        process.cwd(),
        "public",
        oldImage.replace(/^\//, "")
      );

      const ext = path.extname(oldImage);

      const newFileName =
        `${Date.now()}-${Math.floor(Math.random() * 100000)}${ext}`;

      const destination = path.join(uploadDir, newFileName);

      await fs.copyFile(sourcePath, destination);

      records.push({
        title: item.title,
        category: item.category,
        image: `/uploads/portfolio/${newFileName}`,
      });
    }

    await prisma.portfolio.createMany({
      data: records,
    });

    return NextResponse.json({
      success: true,
      count: records.length,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Import failed",
      },
      {
        status: 500,
      }
    );
  }
}