import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      processId,
      title,
      description,
      image,
      color = "#ff4d7a",
      sortOrder = 0,
      isActive = true,
    } = body;

    if (!processId) {
      return NextResponse.json(
        { message: "Process ID is required." },
        { status: 400 }
      );
    }

    if (!title?.trim()) {
      return NextResponse.json(
        { message: "Title is required." },
        { status: 400 }
      );
    }

    if (!description?.trim()) {
      return NextResponse.json(
        { message: "Description is required." },
        { status: 400 }
      );
    }

    if (!image?.trim()) {
      return NextResponse.json(
        { message: "Image is required." },
        { status: 400 }
      );
    }

    const step = await prisma.processStep.create({
      data: {
        processId,
        title: title.trim(),

        // IMPORTANT
        text: description.trim(),

        image: image.trim(),
        color,
        sortOrder: Number(sortOrder),
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json(step, { status: 201 });
  } catch (error) {
    console.error("CREATE PROCESS STEP ERROR:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to create process step.",
      },
      { status: 500 }
    );
  }
}