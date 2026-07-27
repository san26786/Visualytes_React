import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticleClient from "../_compoents/BlogArticleClient";
import { blogs, getBlogBySlugOrKey } from "../_data/data";

type WordPressPost = {
  content?: { rendered?: string };
};

async function getArticleHtml(postId: string, fallback: string) {
  try {
    const response = await fetch(
      `https://www.visualytes.com/wp-json/wp/v2/posts/${postId}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) return `<p>${fallback}</p>`;

    const article = (await response.json()) as WordPressPost;
    return article.content?.rendered || `<p>${fallback}</p>`;
  } catch {
    return `<p>${fallback}</p>`;
  }
}

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
    alternates: { canonical: `https://www.visualytes.com/blog/${post.blogKey}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `https://www.visualytes.com/blog/${post.blogKey}`,
      publishedTime: post.date,
      images: [{ url: post.images.main, alt: post.images.alt || post.title }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlogBySlugOrKey(slug);

  if (!post) notFound();

  const postId = post.id.replace("post-", "");
  const contentHtml = await getArticleHtml(postId, post.description);

  return <BlogArticleClient post={post} contentHtml={contentHtml} />;
}
