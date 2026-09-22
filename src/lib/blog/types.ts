import type { TiptapDoc } from "./tiptap";

export const BLOG_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export type BlogStatus = (typeof BLOG_STATUSES)[number];

export type BlogCategoryRef = { id: string; name: string; slug: string };
export type BlogTagRef = { id: string; name: string; slug: string };
export type BlogAuthorRef = { id: string; name: string };
export type BlogImageRef = {
  id: string;
  url: string;
  width: number | null;
  height: number | null;
};

/** Row in the admin listing (no article body). */
export type AdminBlogListItem = {
  id: string;
  title: string;
  slug: string;
  status: BlogStatus;
  publishedAt: string | null;
  views: number;
  likes: number;
  category: BlogCategoryRef | null;
  author: BlogAuthorRef | null;
  featuredImage: BlogImageRef | null;
  createdAt: string;
  updatedAt: string;
};

/** Full post as edited in the Blog Editor. */
export type AdminBlogPost = AdminBlogListItem & {
  excerpt: string;
  content: TiptapDoc;
  tags: BlogTagRef[];
  featuredImageAlt: string | null;
  comments: number;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
};

export type AdminBlogList = {
  items: AdminBlogListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  counts: { all: number } & Record<BlogStatus, number>;
};

export type BlogMeta = {
  categories: (BlogCategoryRef & { postCount: number })[];
  tags: BlogTagRef[];
  authors: (BlogAuthorRef & { postCount: number })[];
};

export type MediaItem = {
  id: string;
  url: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  alt: string | null;
  createdAt: string;
};

/** Public card used by /blog, category pages and "latest posts" strips. */
export type PublicBlogCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string | null;
  imageAlt: string;
  category: { name: string; slug: string } | null;
  tags: { name: string; slug: string }[];
  author: string;
  publishedAt: string;
  formattedDate: string;
  views: number;
  likes: number;
  comments: number;
};

export type PublicBlogPost = PublicBlogCard & {
  content: TiptapDoc;
  imageWidth: number | null;
  imageHeight: number | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[];
  updatedAt: string;
  readingMinutes: number;
};

/** Payload the editor sends to create / update a post. */
export type BlogPostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: TiptapDoc;
  categoryId: string | null;
  tags: string[];
  authorId: string | null;
  featuredImageId: string | null;
  featuredImageAlt: string;
  status: BlogStatus;
  publishedAt: string | null;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  views: number;
  likes: number;
  comments: number;
};

export type FieldErrors = Partial<Record<keyof BlogPostInput, string>>;

/** A post is publicly visible when published and its publish date has arrived. */
export function isLive(status: BlogStatus, publishedAt: Date | string | null) {
  return status === "PUBLISHED" && !!publishedAt && new Date(publishedAt).getTime() <= Date.now();
}
