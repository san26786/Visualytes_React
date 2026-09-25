import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { PORTFOLIO_TAG } from "@/src/lib/portfolio";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const portfolio = await prisma.portfolio.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(portfolio);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const portfolio = await prisma.portfolio.create({
    data: {
      title: body.title,
      category: body.category,
      image: body.image,
    },
  });

  revalidateTag(PORTFOLIO_TAG, { expire: 0 });
  return NextResponse.json(portfolio);
}