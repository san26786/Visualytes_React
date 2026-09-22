import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Eye } from "lucide-react";

import BlogArticleClient from "@/src/app/blog/_compoents/BlogArticleClient";
import { getContentManager } from "@/src/lib/admin";
import { getPostForPreview } from "@/src/lib/blog/server";
import { isLive } from "@/src/lib/blog/types";
import { prisma } from "@/src/lib/prisma";

export const metadata: Metadata = { title: "Blog Preview | Visualytes Admin", robots: { index: false, follow: false } };

const LABELS = { DRAFT: "Draft", PUBLISHED: "Published", ARCHIVED: "Archived" } as const;

/** Renders any post (draft included) exactly as the public article page will. */
export default async function BlogPreviewPage({ params }: PageProps<"/admin-dashboard/blog/[id]/preview">) {
  const session = await getContentManager();
  if (!session) redirect("/seo-questionnaire");

  const { id } = await params;
  const [post, meta] = await Promise.all([
    getPostForPreview(id),
    prisma.blogPost.findUnique({ where: { id }, select: { status: true, publishedAt: true } }),
  ]);
  if (!post || !meta) notFound();

  const live = isLive(meta.status, meta.publishedAt);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] flex h-12 items-center justify-between gap-3 border-b border-amber-300/40 bg-amber-100 px-4 text-xs font-semibold text-amber-900 shadow-sm">
        <span className="inline-flex items-center gap-2">
          <Eye size={14} /> Preview · {LABELS[meta.status]}
          {live ? "" : " · not visible to the public"}
        </span>
        <span className="inline-flex items-center gap-4">
          {live && (
            <Link href={`/blog/${post.slug}`} target="_blank" className="hover:underline">
              View live page
            </Link>
          )}
          <Link href={`/admin-dashboard/blog/${id}`} className="inline-flex items-center gap-1.5 rounded-lg bg-amber-900 px-3 py-1.5 text-amber-50 transition hover:bg-amber-950">
            <ArrowLeft size={12} /> Back to editor
          </Link>
        </span>
      </div>
      <BlogArticleClient post={post} />
    </>
  );
}
