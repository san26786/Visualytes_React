import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import {
  deleteTestimonialImage,
} from "@/src/lib/testimonialImage";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const existing =
      await prisma.testimonial.findUnique({
        where: { id },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Testimonial not found",
        },
        { status: 404 }
      );
    }

    const newImage =
      body.image !== undefined
        ? body.image
        : existing.image;

    /*
     * If image changed:
     *
     * old:
     * /uploads/testimonial/old.jpg
     *
     * new:
     * /uploads/testimonial/new.jpg
     *
     * delete old.jpg
     */
    if (
      newImage !== existing.image &&
      existing.image
    ) {
      await deleteTestimonialImage(
        existing.image
      );
    }

    const testimonial =
      await prisma.testimonial.update({
        where: { id },
        data: {
          image: newImage,
          name: body.name,
          designation:
            body.designation ?? "",
          company:
            body.company || null,
          review: body.review,
          sortOrder:
            body.sortOrder ?? existing.sortOrder,
          isActive:
            body.isActive ?? existing.isActive,
        },
      });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error(
      "Update testimonial error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to update testimonial",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const existing =
      await prisma.testimonial.findUnique({
        where: { id },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Testimonial not found",
        },
        { status: 404 }
      );
    }

    // Delete database record
    await prisma.testimonial.delete({
      where: { id },
    });

    // Delete associated local image
    await deleteTestimonialImage(
      existing.image
    );

    return NextResponse.json({
      success: true,
      message:
        "Testimonial and image deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete testimonial error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to delete testimonial",
      },
      { status: 500 }
    );
  }
}