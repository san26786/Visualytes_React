import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { getContentManager } from "@/src/lib/admin";
import { getAdminPost, getBlogMeta } from "@/src/lib/blog/server";
import BlogEditorForm from "../_components/BlogEditorShell";

export const metadata: Metadata = { title: "Blog Editor | Visualytes Admin", robots: { index: false } };

export default async function EditBlogPostPage({ params }: PageProps<"/admin-dashboard/blog/[id]">) {
  const session = await getContentManager();
  if (!session) redirect("/seo-questionnaire");

  const { id } = await params;
  const [post, meta] = await Promise.all([getAdminPost(id), getBlogMeta()]);
  if (!post) notFound();

  return <BlogEditorForm key={post.id} post={post} meta={meta} defaultAuthorId={null} />;
}
