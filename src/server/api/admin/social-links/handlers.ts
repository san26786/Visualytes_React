import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { isAdmin } from "../../../../lib/admin";
import { prisma } from "../../../../lib/prisma";
import { SITE_DATA_TAG } from "../../../../lib/site/types";

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
  revalidateTag(SITE_DATA_TAG, { expire: 0 });
  return NextResponse.json(link);
}
