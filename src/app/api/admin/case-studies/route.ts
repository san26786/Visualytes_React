import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET
 * /api/admin/case-studies
 */
export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "asc",
        },
      ],
    });

    return NextResponse.json(caseStudies);
  } catch (error) {
    console.error(
      "GET /api/admin/case-studies error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to load case studies.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * POST
 * /api/admin/case-studies
 */
export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      title,
      category,
      image,
      href,
      accent,
      tag,
      description,
      sortOrder,
      isActive,
    } = body;

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return NextResponse.json(
        {
          error: "Title is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      typeof category !== "string" ||
      !category.trim()
    ) {
      return NextResponse.json(
        {
          error: "Category is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      image !== undefined &&
      image !== null &&
      typeof image !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Image must be a string.",
        },
        {
          status: 400,
        }
      );
    }

    const caseStudy = await prisma.caseStudy.create({
      data: {
        title: title.trim(),

        category: category.trim(),

        image:
          typeof image === "string" &&
          image.trim()
            ? image.trim()
            : null,

        href:
          typeof href === "string" &&
          href.trim()
            ? href.trim()
            : "/portfolio",

        accent:
          typeof accent === "string" &&
          accent.trim()
            ? accent.trim()
            : "from-cyan-400/20 to-cyan-300/5",

        tag:
          typeof tag === "string" &&
          tag.trim()
            ? tag.trim()
            : "text-cyan-300",

        description:
          typeof description === "string" &&
          description.trim()
            ? description.trim()
            : null,

        sortOrder:
          Number.isFinite(Number(sortOrder))
            ? Number(sortOrder)
            : 0,

        isActive:
          typeof isActive === "boolean"
            ? isActive
            : true,
      },
    });

    return NextResponse.json(
      caseStudy,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/admin/case-studies error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create case study.",
      },
      {
        status: 500,
      }
    );
  }
}