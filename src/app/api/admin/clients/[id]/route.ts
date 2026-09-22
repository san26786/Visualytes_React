import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { removeUpload } from "@/src/lib/storage";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { name, image } = body;

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

    const existingClient = await prisma.client.findUnique({
      where: { id },
    });

    if (!existingClient) {
      return NextResponse.json(
        { message: "Client not found." },
        { status: 404 }
      );
    }

    const client = await prisma.client.update({
      where: { id },
      data: {
        name: name.trim(),
        image: image.trim(),
      },
    });

    // Delete old image when image has changed
    if (existingClient.image && existingClient.image !== image) {
      await removeUpload(existingClient.image, ["/assets/jpng/clients/"]);
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("PUT client error:", error);

    return NextResponse.json(
      { message: "Failed to update client." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      return NextResponse.json(
        { message: "Client not found." },
        { status: 404 }
      );
    }

    await prisma.client.delete({
      where: { id },
    });

    // Delete the stored image (local legacy folder or Vercel Blob)
    await removeUpload(client.image, ["/assets/jpng/clients/"]);

    return NextResponse.json({
      message: "Client deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE client error:", error);

    return NextResponse.json(
      { message: "Failed to delete client." },
      { status: 500 }
    );
  }
}