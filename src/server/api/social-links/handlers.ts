import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

export async function GET() {
  return NextResponse.json(await prisma.socialLink.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" }, select: { platform: true, url: true } }));
}
