import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error("GET FAQ error:", error);

    return NextResponse.json(
      { message: "Failed to fetch FAQs." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
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

    const faq = await prisma.fAQ.create({
      data: {
        question: question.trim(),
        answer: answer.trim(),
        sortOrder: Number(sortOrder) || 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error("POST FAQ error:", error);

    return NextResponse.json(
      { message: "Failed to create FAQ." },
      { status: 500 }
    );
  }
}