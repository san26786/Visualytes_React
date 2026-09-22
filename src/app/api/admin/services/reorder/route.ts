import { NextResponse } from "next/server";
import { z } from "zod";

import { isAdmin } from "@/src/lib/admin";
import { errorResponse } from "@/src/lib/services/api";
import { reorderServices } from "@/src/lib/services/server";

export const dynamic = "force-dynamic";

const schema = z.object({ slugs: z.array(z.string().min(1)).min(1).max(200) });

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "slugs must be a list of service slugs." }, { status: 400 });

  try {
    await reorderServices(parsed.data.slugs);
    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error, "Failed to reorder services.");
  }
}
