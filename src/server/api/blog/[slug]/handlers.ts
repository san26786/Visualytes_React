import { NextResponse } from "next/server";

import { getPublishedPost } from "@/src/lib/blog/server";

/** Public single post (published only) including the Tiptap JSON body. */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const post = await getPublishedPost((await params).slug);
    return post
      ? NextResponse.json({ post })
      : NextResponse.json({ message: "Blog post not found." }, { status: 404 });
  } catch (error) {
    console.error("GET /api/blog/[slug] failed:", error);
    return NextResponse.json({ message: "Failed to load blog post." }, { status: 500 });
  }
}
