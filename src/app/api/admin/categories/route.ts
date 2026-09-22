import { NextResponse } from "next/server";
import { z } from "zod";

import { jsonError, readJson, requireContentManager } from "@/src/lib/blog/api";
import { slugify } from "@/src/lib/blog/slug";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  return NextResponse.json(
    await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    })
  );
}

const createSchema = z.object({ name: z.string().trim().min(2, "Category name is too short.").max(80) });

/** Creates a category (or returns the existing one with the same slug). */
export async function POST(request: Request) {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  const parsed = createSchema.safeParse(await readJson(request));
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Invalid category.", 422);

  const slug = slugify(parsed.data.name, 80);
  if (!slug) return jsonError("Category name must contain letters or numbers.", 422);

  const category = await prisma.category.upsert({
    where: { slug },
    update: {},
    create: { name: parsed.data.name, slug },
    select: { id: true, name: true, slug: true },
  });

  return NextResponse.json({ category }, { status: 201 });
}
