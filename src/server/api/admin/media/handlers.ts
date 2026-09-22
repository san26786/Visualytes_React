import { NextResponse } from "next/server";

import { jsonError, requireContentManager } from "@/src/lib/blog/api";
import { toMediaItem } from "@/src/lib/blog/media";
import { prisma } from "@/src/lib/prisma";

export async function GET(request: Request) {
  const auth = await requireContentManager();
  if ("error" in auth) return auth.error;

  const params = new URL(request.url).searchParams;
  const search = params.get("search")?.trim();
  const pageSize = Math.min(60, Math.max(1, Number(params.get("pageSize")) || 24));

  try {
    const where = search
      ? { OR: [{ originalName: { contains: search } }, { alt: { contains: search } }] }
      : {};
    const total = await prisma.mediaAsset.count({ where });
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(Math.max(1, Number(params.get("page")) || 1), totalPages);

    const rows = await prisma.mediaAsset.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({ items: rows.map(toMediaItem), total, page, pageSize, totalPages });
  } catch (error) {
    console.error("GET /api/admin/media failed:", error);
    return jsonError("Failed to load media.", 500);
  }
}
