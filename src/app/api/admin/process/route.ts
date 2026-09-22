// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/src/lib/prisma";

// export async function GET() {
//   try {
//     const process = await prisma.processSection.findUnique({
//       where: {
//         slug: "process",
//       },
//       include: {
//         steps: {
//           where: {
//             isActive: true,
//           },
//           orderBy: {
//             order: "asc",
//           },
//         },
//       },
//     });

//     if (!process) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Process section not found",
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: process,
//     });
//   } catch (error) {
//     console.error("GET PROCESS ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to fetch process section",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const existing = await prisma.processSection.findUnique({
//       where: {
//         slug: "process",
//       },
//     });

//     if (existing) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Process section already exists",
//         },
//         { status: 409 }
//       );
//     }

//     const process = await prisma.processSection.create({
//       data: {
//         slug: "process",

//         title: body.title ?? "Our Process",
//         subtitle: body.subtitle ?? null,

//         backgroundColor:
//           body.backgroundColor ?? "#111318",

//         textColor:
//           body.textColor ?? "#ffffff",

//         descriptionColor:
//           body.descriptionColor ?? "#c2c7d0",

//         borderColor:
//           body.borderColor ?? "#4e5562",

//         arrowRight:
//           body.arrowRight ?? null,

//         arrowLeft:
//           body.arrowLeft ?? null,

//         topLineColor:
//           body.topLineColor ?? "#000000",

//         bottomLineColor:
//           body.bottomLineColor ?? "#ffffff",

//         topLineHeight:
//           Number(body.topLineHeight ?? 134),

//         bottomLineHeight:
//           Number(body.bottomLineHeight ?? 96),

//         mobileEnabled:
//           body.mobileEnabled ?? true,

//         desktopEnabled:
//           body.desktopEnabled ?? true,

//         isActive:
//           body.isActive ?? true,
//       },
//       include: {
//         steps: true,
//       },
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Process section created successfully",
//         data: process,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("CREATE PROCESS ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to create process section",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const process = await prisma.processSection.findUnique({
//       where: {
//         slug: "process",
//       },
//     });

//     if (!process) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Process section not found",
//         },
//         { status: 404 }
//       );
//     }

//     const updated = await prisma.processSection.update({
//       where: {
//         id: process.id,
//       },
//       data: {
//         title: body.title,
//         subtitle: body.subtitle,

//         backgroundColor:
//           body.backgroundColor,

//         textColor:
//           body.textColor,

//         descriptionColor:
//           body.descriptionColor,

//         borderColor:
//           body.borderColor,

//         arrowRight:
//           body.arrowRight,

//         arrowLeft:
//           body.arrowLeft,

//         topLineColor:
//           body.topLineColor,

//         bottomLineColor:
//           body.bottomLineColor,

//         topLineHeight:
//           body.topLineHeight !== undefined
//             ? Number(body.topLineHeight)
//             : undefined,

//         bottomLineHeight:
//           body.bottomLineHeight !== undefined
//             ? Number(body.bottomLineHeight)
//             : undefined,

//         mobileEnabled:
//           body.mobileEnabled,

//         desktopEnabled:
//           body.desktopEnabled,

//         isActive:
//           body.isActive,
//       },
//       include: {
//         steps: {
//           orderBy: {
//             order: "asc",
//           },
//         },
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Process section updated successfully",
//       data: updated,
//     });
//   } catch (error) {
//     console.error("UPDATE PROCESS ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to update process section",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE() {
//   try {
//     const process = await prisma.processSection.findUnique({
//       where: {
//         slug: "process",
//       },
//     });

//     if (!process) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Process section not found",
//         },
//         { status: 404 }
//       );
//     }

//     await prisma.processSection.delete({
//       where: {
//         id: process.id,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Process section deleted successfully",
//     });
//   } catch (error) {
//     console.error("DELETE PROCESS ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to delete process section",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    let process = await prisma.process.findFirst({
      include: {
        steps: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    if (!process) {
      process = await prisma.process.create({
        data: {
          title: "Our Process",
          subtitle: "",
          backgroundColor: "#111827",
          isActive: true,
        },
        include: {
          steps: true,
        },
      });
    }

    return NextResponse.json(process);
  } catch (error) {
    console.error("GET PROCESS ERROR:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to load process.",
      },
      { status: 500 }
    );
  }
}
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id,
      title,
      subtitle,
      backgroundColor,
      isActive,
    } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Process ID is required." },
        { status: 400 }
      );
    }

    const process = await prisma.process.update({
      where: {
        id,
      },
      data: {
        ...(title !== undefined && {
          title: title.trim(),
        }),

        ...(subtitle !== undefined && {
          subtitle,
        }),

        ...(backgroundColor !== undefined && {
          backgroundColor,
        }),

        ...(isActive !== undefined && {
          isActive: Boolean(isActive),
        }),
      },
      include: {
        steps: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    return NextResponse.json(process);
  } catch (error) {
    console.error("UPDATE PROCESS ERROR:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to update process.",
      },
      { status: 500 }
    );
  }
}