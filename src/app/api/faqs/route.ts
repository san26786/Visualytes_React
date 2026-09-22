import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        question: true,
        answer: true,
      },
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Public FAQ API error:", error);

    return NextResponse.json(
      {
        message: "Failed to load FAQs.",
      },
      {
        status: 500,
      }
    );
  }
}