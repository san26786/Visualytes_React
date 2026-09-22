import { NextResponse } from "next/server";

import { getPublicService } from "@/src/lib/services/server";

export const dynamic = "force-dynamic";

/** Public detail by slug (the param keeps its old name `id` for URL compatibility). */
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const service = await getPublicService(id);
    if (!service) return NextResponse.json({ message: "Service not found." }, { status: 404 });
    return NextResponse.json(service);
  } catch (error) {
    console.error("GET /api/services/[id] failed", error);
    return NextResponse.json({ message: "Failed to load service." }, { status: 500 });
  }
}
