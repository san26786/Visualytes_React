// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/src/lib/prisma";

// interface Context {
//   params: Promise<{
//     id: string;
//   }>;
// }

// export async function PATCH(
//   request: NextRequest,
//   context: Context
// ) {
//   try {
//     const { id } = await context.params;

//     const body = await request.json();

//     const {
//       title,
//       description,
//       image,
//       color,
//       sortOrder,
//       isActive,
//     } = body;

//     if (!title?.trim()) {
//       return NextResponse.json(
//         {
//           message: "Title is required.",
//         },
//         { status: 400 }
//       );
//     }

//     if (!description?.trim()) {
//       return NextResponse.json(
//         {
//           message: "Description is required.",
//         },
//         { status: 400 }
//       );
//     }

//     const step =
//       await prisma.processStep.update({
//         where: {
//           id,
//         },

//         data: {
//           title: title.trim(),
//           description: description.trim(),
//           image: image?.trim() || "",
//           color: color || "#ff4d7a",

//           sortOrder:
//             typeof sortOrder === "number"
//               ? sortOrder
//               : 0,

//           isActive:
//             typeof isActive === "boolean"
//               ? isActive
//               : true,
//         },
//       });

//     return NextResponse.json(step);
//   } catch (error) {
//     console.error(
//       "PATCH process step error:",
//       error
//     );

//     return NextResponse.json(
//       {
//         message:
//           error instanceof Error
//             ? error.message
//             : "Failed to update process step.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   context: Context
// ) {
//   try {
//     const { id } = await context.params;

//     await prisma.processStep.delete({
//       where: {
//         id,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Process step deleted.",
//     });
//   } catch (error) {
//     console.error(
//       "DELETE process step error:",
//       error
//     );

//     return NextResponse.json(
//       {
//         message: "Failed to delete process step.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { removeUpload } from "@/src/lib/storage";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const {
      title,
      description,
      image,
      color,
      sortOrder,
      isActive,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { message: "Title is required." },
        { status: 400 }
      );
    }

    if (!description?.trim()) {
      return NextResponse.json(
        { message: "Description is required." },
        { status: 400 }
      );
    }

    const step = await prisma.processStep.update({
      where: {
        id,
      },
      data: {
        title: title.trim(),
        text: description.trim(),
        image: image?.trim() ?? "",
        color: color ?? "#ff4d7a",
        sortOrder: Number(sortOrder ?? 0),
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json(step);
  } catch (error) {
    console.error("UPDATE PROCESS STEP ERROR:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to update process step.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const step = await prisma.processStep.findUnique({
      where: {
        id,
      },
    });

    if (!step) {
      return NextResponse.json(
        {
          message: "Process step not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Delete database record first
    await prisma.processStep.delete({
      where: {
        id,
      },
    });

    // Delete the stored image (local file in dev, Vercel Blob on Vercel)
    await removeUpload(step.image, ["/uploads/process/"]);

    return NextResponse.json({
      success: true,
      message: "Process step deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE PROCESS STEP ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to delete process step.",
      },
      {
        status: 500,
      }
    );
  }
}