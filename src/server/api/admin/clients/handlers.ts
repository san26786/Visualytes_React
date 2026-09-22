import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("GET clients error:", error);

    return NextResponse.json(
      { message: "Failed to fetch clients." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, image, } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { message: "Client name is required." },
        { status: 400 }
      );
    }

    if (!image?.trim()) {
      return NextResponse.json(
        { message: "Client image is required." },
        { status: 400 }
      );
    }

    const client = await prisma.client.create({
      data: {
        name: name.trim(),
        image: image.trim(),
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("POST client error:", error);

    return NextResponse.json(
      { message: "Failed to create client." },
      { status: 500 }
    );
  }
}