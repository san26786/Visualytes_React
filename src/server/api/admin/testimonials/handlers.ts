import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET ADMIN TESTIMONIALS ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Bulk insert
    if (Array.isArray(body.testimonials)) {
      const testimonials = body.testimonials.map(
        (item: any, index: number) => ({
          image: item.image || "/assets/png/no-image.png",
          name: item.name,
          designation: item.designation || "",
          company: item.company || null,
          review: item.review,
          sortOrder:
            typeof item.sortOrder === "number"
              ? item.sortOrder
              : index + 1,
          isActive:
            typeof item.isActive === "boolean"
              ? item.isActive
              : true,
        })
      );

      const result =
        await prisma.testimonial.createMany({
          data: testimonials,
        });

      return NextResponse.json(
        {
          success: true,
          message: `${result.count} testimonials created successfully`,
          count: result.count,
        },
        { status: 201 }
      );
    }

    // Normal single insert
    const testimonial =
      await prisma.testimonial.create({
        data: {
          image:
            body.image ||
            "/assets/png/no-image.png",
          name: body.name,
          designation: body.designation || "",
          company: body.company || null,
          review: body.review,
          sortOrder: body.sortOrder ?? 0,
          isActive: body.isActive ?? true,
        },
      });

    return NextResponse.json(
      testimonial,
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Create testimonial error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create testimonial",
      },
      { status: 500 }
    );
  }
}