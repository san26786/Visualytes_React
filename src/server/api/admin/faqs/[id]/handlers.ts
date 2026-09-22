import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const { question, answer, sortOrder, isActive } = body;

    if (!question?.trim()) {
      return NextResponse.json(
        { message: "Question is required." },
        { status: 400 }
      );
    }

    if (!answer?.trim()) {
      return NextResponse.json(
        { message: "Answer is required." },
        { status: 400 }
      );
    }

    const faq = await prisma.fAQ.update({
      where: {
        id,
      },
      data: {
        question: question.trim(),
        answer: answer.trim(),
        sortOrder: Number(sortOrder) || 0,
        isActive:
          isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    return NextResponse.json(faq);
  } catch (error) {
    console.error("PUT FAQ error:", error);

    return NextResponse.json(
      { message: "Failed to update FAQ." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    await prisma.fAQ.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "FAQ deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE FAQ error:", error);

    return NextResponse.json(
      { message: "Failed to delete FAQ." },
      { status: 500 }
    );
  }
}