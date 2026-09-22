import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Props
) {
  const { id } = await params;

  const portfolio = await prisma.portfolio.findUnique({
    where: {
      id,
    },
  });

  if (!portfolio) {
    return NextResponse.json(
      { message: "Portfolio not found." },
      { status: 404 }
    );
  }

  return NextResponse.json(portfolio);
}

export async function PATCH(
  req: NextRequest,
  { params }: Props
) {
  const { id } = await params;

  const body = await req.json();

  const { title, category, image } = body;

  const portfolio = await prisma.portfolio.update({
    where: {
      id,
    },
    data: {
      title,
      category,
      image,
    },
  });

  return NextResponse.json(portfolio);
}

export async function DELETE(
  req: NextRequest,
  { params }: Props
) {
  const { id } = await params;

  await prisma.portfolio.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}