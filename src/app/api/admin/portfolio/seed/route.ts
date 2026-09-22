import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { portfolio } = await req.json();

    if (!Array.isArray(portfolio)) {
      return NextResponse.json(
        { message: "Portfolio array required." },
        { status: 400 }
      );
    }

    await prisma.portfolio.createMany({
      data: portfolio.map((item: any) => ({
        title: item.title,
        category: item.category,
        image:
          "/uploads/portfolio/" +
          item.image.split("/").pop(),
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: true,
      inserted: portfolio.length,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}