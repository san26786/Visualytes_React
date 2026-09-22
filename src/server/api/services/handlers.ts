import { NextResponse } from "next/server";

import { getPublicServiceCards } from "@/src/lib/services/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getPublicServiceCards());
  } catch (error) {
    console.error("GET /api/services failed", error);
    return NextResponse.json({ message: "Failed to load services." }, { status: 500 });
  }
}
