import { NextResponse } from "next/server";
import { z } from "zod";

import { isAdmin } from "../../../../lib/admin";
import { prisma } from "../../../../lib/prisma";

const socialSchema = z.object({ platform: z.string().trim().min(2).max(50), url: z.string().trim().url(), isActive: z.boolean(), sortOrder: z.coerce.number().int().min(0) });

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  return NextResponse.json(await prisma.socialLink.findMany({ orderBy: { sortOrder: "asc" } }));
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const parsed = socialSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Enter a platform and valid URL." }, { status: 400 });
  const link = await prisma.socialLink.upsert({ where: { platform: parsed.data.platform }, update: parsed.data, create: parsed.data });
  return NextResponse.json(link);
}
