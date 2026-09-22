import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "@/src/lib/prisma";
import { removeUpload } from "@/src/lib/storage";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET
 * /api/admin/case-studies/:id
 */
export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const caseStudy =
      await prisma.caseStudy.findUnique({
        where: {
          id,
        },
      });

    if (!caseStudy) {
      return NextResponse.json(
        {
          error: "Case study not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error(
      "GET case study error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to load case study.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * PUT
 * /api/admin/case-studies/:id
 */
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const existing =
      await prisma.caseStudy.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Case study not found.",
        },
        {
          status: 404,
        }
      );
    }

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

    const updated =
      await prisma.caseStudy.update({
        where: {
          id,
        },

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
              : existing.sortOrder,

          isActive:
            typeof isActive === "boolean"
              ? isActive
              : existing.isActive,
        },
      });

    /**
     * If the image changed, remove the old
     * locally uploaded image.
     */
    if (
      existing.image &&
      image &&
      existing.image !== image
    ) {
      await deleteLocalCaseStudyImage(
        existing.image
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error(
      "PUT case study error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to update case study.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * DELETE
 * /api/admin/case-studies/:id
 */
export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const existing =
      await prisma.caseStudy.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Case study not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.caseStudy.delete({
      where: {
        id,
      },
    });

    /**
     * Remove local image after deleting DB record.
     */
    if (existing.image) {
      await deleteLocalCaseStudyImage(
        existing.image
      );
    }

    return NextResponse.json({
      success: true,
      message: "Case study deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE case study error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to delete case study.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * Deletes a case-study image: the local file in dev, the Vercel Blob object on Vercel.
 * A failure never blocks the database change.
 */
async function deleteLocalCaseStudyImage(imageUrl: string) {
  await removeUpload(imageUrl, ["/uploads/case-study/"]);
}
