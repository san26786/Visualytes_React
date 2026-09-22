import { NextResponse } from "next/server";

import { incrementViews } from "@/src/lib/blog/server";

/** Counts one view of a published post (the client de-duplicates per session). */
export async function POST(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const counted = await incrementViews((await params).slug);
    return NextResponse.json({ counted }, { status: counted ? 200 : 404 });
  } catch (error) {
    console.error("POST /api/blog/[slug]/view failed:", error);
    return NextResponse.json({ message: "Failed to record view." }, { status: 500 });
  }
}
