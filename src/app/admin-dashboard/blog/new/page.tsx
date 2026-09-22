import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getContentManager } from "@/src/lib/admin";
import { getBlogMeta, getDefaultAuthorId } from "@/src/lib/blog/server";
import BlogEditorForm from "../_components/BlogEditorShell";

export const metadata: Metadata = { title: "New Blog Post | Visualytes Admin", robots: { index: false } };

export default async function NewBlogPostPage() {
  const session = await getContentManager();
  if (!session) redirect("/seo-questionnaire");

  const [meta, defaultAuthorId] = await Promise.all([getBlogMeta(), getDefaultAuthorId(session.name)]);
  return <BlogEditorForm post={null} meta={meta} defaultAuthorId={defaultAuthorId} />;
}
