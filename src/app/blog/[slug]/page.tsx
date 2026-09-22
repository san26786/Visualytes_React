import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { getPublishedPost, getRelatedPosts } from "@/src/lib/blog/server";
import BlogArticleClient from "../_compoents/BlogArticleClient";
import ViewTracker from "../_compoents/ViewTracker";

export const revalidate = 300;

const loadPost = cache(getPublishedPost);

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;

  return {
    title: `${title} | Visualytes`,
    description,
    keywords: post.seoKeywords.length ? post.seoKeywords : undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.imageAlt }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.author },
    ...(post.image ? { image: `${SITE_URL}${post.image}` } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output only; "<" is escaped so the payload cannot close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ViewTracker slug={post.slug} />
      <BlogArticleClient post={post} related={related} />
    </>
  );
}
