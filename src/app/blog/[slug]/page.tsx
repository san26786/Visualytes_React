import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticleClient from "../_compoents/BlogArticleClient";
import { blogs, getBlogBySlugOrKey, getLocalBlogImage } from "../_data/data";
import { blogContentById } from "../_data/content";

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.blogKey }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlugOrKey(slug);

  if (!post) return {};

  return {
    title: `${post.title} | Visualytes`,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: [{ url: getLocalBlogImage(post.blogKey), alt: post.images.alt || post.title }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlogBySlugOrKey(slug);

  if (!post) notFound();

  const contentHtml = blogContentById[post.id] || `<p>${post.description}</p>`;

  return <BlogArticleClient post={post} contentHtml={contentHtml} />;
}
