// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/src/lib/prisma";

// export async function GET() {
//   try {
//     const portfolio = await prisma.portfolio.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json(portfolio);
//   } catch {
//     return NextResponse.json(
//       { message: "Failed to fetch portfolio." },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const { title, category, image } = body;

//     if (!title || !category || !image) {
//       return NextResponse.json(
//         { message: "All fields are required." },
//         { status: 400 }
//       );
//     }

//     const portfolio = await prisma.portfolio.create({
//       data: {
//         title,
//         category,
//         image,
//       },
//     });

//     return NextResponse.json(portfolio);
//   } catch {
//     return NextResponse.json(
//       { message: "Unable to create portfolio." },
//       { status: 500 }
//     );
//   }
// }
import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

  return NextResponse.json(portfolio);
}