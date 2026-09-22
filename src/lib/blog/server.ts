import "server-only";

import { revalidatePath } from "next/cache";

import { Prisma } from "@/src/generated/prisma-admin";
import { prisma } from "@/src/lib/prisma";

import { SLUG_MAX_LENGTH, slugify } from "./slug";
import { EMPTY_DOC, readingMinutes, toTiptapDoc, type TiptapDoc } from "./tiptap";
import type {
  AdminBlogList,
  AdminBlogListItem,
  AdminBlogPost,
  BlogMeta,
  BlogStatus,
  FieldErrors,
  PublicBlogCard,
  PublicBlogPost,
} from "./types";
import {
  blogPostPatchSchema,
  blogPostSchema,
  flattenIssues,
  getPublishBlockers,
  parseContent,
} from "./validation";

/* -------------------------------------------------------------------------- */
/* Shared                                                                      */
/* -------------------------------------------------------------------------- */

const adminInclude = {
  category: { select: { id: true, name: true, slug: true } },
  tags: { select: { id: true, name: true, slug: true }, orderBy: { name: "asc" } },
  author: { select: { id: true, name: true } },
  featuredImage: { select: { id: true, url: true, width: true, height: true } },
} satisfies Prisma.BlogPostInclude;

type PostWithRelations = Prisma.BlogPostGetPayload<{ include: typeof adminInclude }>;

const isoOrNull = (date: Date | null) => (date ? date.toISOString() : null);

function toKeywords(value: Prisma.JsonValue | null): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function toListItem(post: PostWithRelations): AdminBlogListItem {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    status: post.status,
    publishedAt: isoOrNull(post.publishedAt),
    views: post.views,
    likes: post.likes,
    category: post.category,
    author: post.author,
    featuredImage: post.featuredImage,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

function toAdminPost(post: PostWithRelations): AdminBlogPost {
  return {
    ...toListItem(post),
    excerpt: post.excerpt,
    content: toTiptapDoc(post.content),
    tags: post.tags,
    featuredImageAlt: post.featuredImageAlt,
    comments: post.comments,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    seoKeywords: toKeywords(post.seoKeywords),
  };
}

/** Everything cached on the public site that can show blog data. */
export function revalidateBlogPages() {
  revalidatePath("/", "layout");
}

async function uniqueSlug(source: string, excludeId?: string) {
  const root = slugify(source, SLUG_MAX_LENGTH - 6) || "post";
  let candidate = root;
  let suffix = 2;

  while (
    await prisma.blogPost.findFirst({
      where: { slug: candidate, ...(excludeId ? { id: { not: excludeId } } : {}) },
      select: { id: true },
    })
  ) {
    candidate = `${root}-${suffix++}`;
  }
  return candidate;
}

async function resolveTagIds(names: string[]) {
  const bySlug = new Map<string, string>();
  for (const name of names) {
    const slug = slugify(name, 60);
    if (slug && !bySlug.has(slug)) bySlug.set(slug, name.trim());
  }

  const ids: string[] = [];
  for (const [slug, name] of bySlug) {
    const tag = await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
      select: { id: true },
    });
    ids.push(tag.id);
  }
  return ids;
}

/* -------------------------------------------------------------------------- */
/* Admin: read                                                                 */
/* -------------------------------------------------------------------------- */

export type AdminListQuery = {
  search?: string;
  categoryId?: string;
  status?: BlogStatus;
  sort?: "updated" | "newest" | "oldest" | "title" | "views";
  page?: number;
  pageSize?: number;
};

export async function listAdminPosts(query: AdminListQuery): Promise<AdminBlogList> {
  const pageSize = Math.min(50, Math.max(1, query.pageSize ?? 10));
  const search = query.search?.trim();

  const where: Prisma.BlogPostWhereInput = {
    ...(query.status ? { status: query.status } : {}),
    ...(query.categoryId ? { categoryId: query.categoryId } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search } },
            { slug: { contains: search } },
            { excerpt: { contains: search } },
          ],
        }
      : {}),
  };

  const orderBy: Prisma.BlogPostOrderByWithRelationInput =
    query.sort === "newest"
      ? { createdAt: "desc" }
      : query.sort === "oldest"
        ? { createdAt: "asc" }
        : query.sort === "title"
          ? { title: "asc" }
          : query.sort === "views"
            ? { views: "desc" }
            : { updatedAt: "desc" };

  const total = await prisma.blogPost.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, query.page ?? 1), totalPages);

  const [rows, grouped] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: [orderBy, { id: "asc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: adminInclude,
    }),
    prisma.blogPost.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const counts = { all: 0, DRAFT: 0, PUBLISHED: 0, ARCHIVED: 0 };
  for (const row of grouped) {
    counts[row.status] = row._count._all;
    counts.all += row._count._all;
  }

  return { items: rows.map(toListItem), total, page, pageSize, totalPages, counts };
}

export async function getAdminPost(id: string): Promise<AdminBlogPost | null> {
  const post = await prisma.blogPost.findUnique({ where: { id }, include: adminInclude });
  return post ? toAdminPost(post) : null;
}

export async function getBlogMeta(): Promise<BlogMeta> {
  const [categories, tags, authors] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, _count: { select: { posts: true } } },
    }),
    prisma.tag.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, slug: true } }),
    prisma.author.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, _count: { select: { posts: true } } },
    }),
  ]);

  return {
    categories: categories.map(({ _count, ...category }) => ({
      ...category,
      postCount: _count.posts,
    })),
    tags,
    authors: authors.map(({ _count, ...author }) => ({ ...author, postCount: _count.posts })),
  };
}

/* -------------------------------------------------------------------------- */
/* Admin: write                                                                */
/* -------------------------------------------------------------------------- */

export type WriteResult =
  | { ok: true; post: AdminBlogPost }
  | { ok: false; status: number; message: string; errors?: FieldErrors };

const fail = (status: number, message: string, errors?: FieldErrors): WriteResult => ({
  ok: false,
  status,
  message,
  errors,
});

async function checkReferences(data: {
  categoryId?: string | null;
  authorId?: string | null;
  featuredImageId?: string | null;
}): Promise<FieldErrors> {
  const errors: FieldErrors = {};
  const [category, author, image] = await Promise.all([
    data.categoryId
      ? prisma.category.findUnique({ where: { id: data.categoryId }, select: { id: true } })
      : true,
    data.authorId
      ? prisma.author.findUnique({ where: { id: data.authorId }, select: { id: true } })
      : true,
    data.featuredImageId
      ? prisma.mediaAsset.findUnique({ where: { id: data.featuredImageId }, select: { id: true } })
      : true,
  ]);
  if (!category) errors.categoryId = "That category no longer exists.";
  if (!author) errors.authorId = "That author no longer exists.";
  if (!image) errors.featuredImageId = "That image no longer exists.";
  return errors;
}

export async function createPost(raw: unknown): Promise<WriteResult> {
  const parsed = blogPostSchema.safeParse(raw);
  if (!parsed.success) return fail(422, "Please fix the highlighted fields.", flattenIssues(parsed.error));
  const input = parsed.data;

  let content: TiptapDoc = EMPTY_DOC;
  if (input.content !== undefined) {
    const result = parseContent(input.content);
    if ("error" in result) return fail(422, result.error, { content: result.error });
    content = result.doc;
  }

  const status = input.status ?? "DRAFT";
  const slug = await uniqueSlug(input.slug || input.title);
  const authorId = input.authorId ?? null;

  const refErrors = await checkReferences({
    categoryId: input.categoryId,
    authorId,
    featuredImageId: input.featuredImageId,
  });
  if (Object.keys(refErrors).length) return fail(422, "Please fix the highlighted fields.", refErrors);

  const candidate = {
    title: input.title,
    slug,
    excerpt: input.excerpt ?? "",
    content,
    categoryId: input.categoryId ?? null,
    authorId: authorId ?? null,
    featuredImageId: input.featuredImageId ?? null,
  };

  if (status === "PUBLISHED") {
    const blockers = getPublishBlockers(candidate);
    if (Object.keys(blockers).length) return fail(422, "Complete the required fields before publishing.", blockers);
  }

  const tagIds = input.tags ? await resolveTagIds(input.tags) : [];
  const publishedAt = input.publishedAt
    ? new Date(input.publishedAt)
    : status === "PUBLISHED"
      ? new Date()
      : null;

  const post = await prisma.blogPost.create({
    data: {
      title: candidate.title,
      slug,
      excerpt: candidate.excerpt,
      content: content as unknown as Prisma.InputJsonValue,
      categoryId: candidate.categoryId,
      authorId: candidate.authorId,
      featuredImageId: candidate.featuredImageId,
      featuredImageAlt: input.featuredImageAlt ?? null,
      status,
      publishedAt,
      views: input.views ?? 0,
      likes: input.likes ?? 0,
      comments: input.comments ?? 0,
      seoTitle: input.seoTitle ?? null,
      seoDescription: input.seoDescription ?? null,
      seoKeywords: input.seoKeywords?.length ? input.seoKeywords : Prisma.DbNull,
      tags: { connect: tagIds.map((id) => ({ id })) },
    },
    include: adminInclude,
  });

  revalidateBlogPages();
  return { ok: true, post: toAdminPost(post) };
}

export async function updatePost(id: string, raw: unknown): Promise<WriteResult> {
  const parsed = blogPostPatchSchema.safeParse(raw);
  if (!parsed.success) return fail(422, "Please fix the highlighted fields.", flattenIssues(parsed.error));
  const input = parsed.data;

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return fail(404, "Blog post not found.");

  let content: TiptapDoc | undefined;
  if (input.content !== undefined) {
    const result = parseContent(input.content);
    if ("error" in result) return fail(422, result.error, { content: result.error });
    content = result.doc;
  }

  let slug = existing.slug;
  if (input.slug) {
    if (input.slug !== existing.slug) {
      const taken = await prisma.blogPost.findFirst({
        where: { slug: input.slug, id: { not: id } },
        select: { id: true },
      });
      if (taken) return fail(409, "That slug is already used by another post.", { slug: "That slug is already used by another post." });
      slug = input.slug;
    }
  }

  const refErrors = await checkReferences({
    categoryId: input.categoryId,
    authorId: input.authorId,
    featuredImageId: input.featuredImageId,
  });
  if (Object.keys(refErrors).length) return fail(422, "Please fix the highlighted fields.", refErrors);

  const status = input.status ?? existing.status;
  const merged = {
    title: input.title ?? existing.title,
    slug,
    excerpt: input.excerpt ?? existing.excerpt,
    content: content ?? toTiptapDoc(existing.content),
    categoryId: input.categoryId === undefined ? existing.categoryId : input.categoryId,
    authorId: input.authorId === undefined ? existing.authorId : input.authorId,
    featuredImageId: input.featuredImageId === undefined ? existing.featuredImageId : input.featuredImageId,
  };

  if (status === "PUBLISHED") {
    const blockers = getPublishBlockers(merged);
    if (Object.keys(blockers).length) return fail(422, "Complete the required fields before publishing.", blockers);
  }

  let publishedAt = existing.publishedAt;
  if (input.publishedAt !== undefined) publishedAt = input.publishedAt ? new Date(input.publishedAt) : null;
  if (status === "PUBLISHED" && !publishedAt) publishedAt = new Date();

  const tagIds = input.tags ? await resolveTagIds(input.tags) : undefined;

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      title: merged.title,
      slug,
      excerpt: merged.excerpt,
      ...(content ? { content: content as unknown as Prisma.InputJsonValue } : {}),
      categoryId: merged.categoryId,
      authorId: merged.authorId,
      featuredImageId: merged.featuredImageId,
      ...(input.featuredImageAlt !== undefined ? { featuredImageAlt: input.featuredImageAlt } : {}),
      status,
      publishedAt,
      ...(input.views !== undefined ? { views: input.views } : {}),
      ...(input.likes !== undefined ? { likes: input.likes } : {}),
      ...(input.comments !== undefined ? { comments: input.comments } : {}),
      ...(input.seoTitle !== undefined ? { seoTitle: input.seoTitle } : {}),
      ...(input.seoDescription !== undefined ? { seoDescription: input.seoDescription } : {}),
      ...(input.seoKeywords !== undefined
        ? { seoKeywords: input.seoKeywords.length ? input.seoKeywords : Prisma.DbNull }
        : {}),
      ...(tagIds ? { tags: { set: tagIds.map((tagId) => ({ id: tagId })) } } : {}),
    },
    include: adminInclude,
  });

  revalidateBlogPages();
  return { ok: true, post: toAdminPost(post) };
}

export async function duplicatePost(id: string): Promise<WriteResult> {
  const source = await prisma.blogPost.findUnique({
    where: { id },
    include: { tags: { select: { id: true } } },
  });
  if (!source) return fail(404, "Blog post not found.");

  const title = `${source.title} (Copy)`.slice(0, 200);
  const post = await prisma.blogPost.create({
    data: {
      title,
      slug: await uniqueSlug(`${source.slug}-copy`),
      excerpt: source.excerpt,
      content: source.content as Prisma.InputJsonValue,
      categoryId: source.categoryId,
      authorId: source.authorId,
      featuredImageId: source.featuredImageId,
      featuredImageAlt: source.featuredImageAlt,
      status: "DRAFT",
      publishedAt: null,
      seoTitle: source.seoTitle,
      seoDescription: source.seoDescription,
      seoKeywords: (source.seoKeywords ?? Prisma.DbNull) as Prisma.InputJsonValue,
      tags: { connect: source.tags },
    },
    include: adminInclude,
  });

  revalidateBlogPages();
  return { ok: true, post: toAdminPost(post) };
}

export async function deletePost(id: string) {
  const existing = await prisma.blogPost.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return false;
  await prisma.blogPost.delete({ where: { id } });
  revalidateBlogPages();
  return true;
}

/* -------------------------------------------------------------------------- */
/* Public                                                                      */
/* -------------------------------------------------------------------------- */

const publicWhere = (): Prisma.BlogPostWhereInput => ({
  status: "PUBLISHED",
  publishedAt: { lte: new Date() },
});

const publicInclude = {
  category: { select: { name: true, slug: true } },
  tags: { select: { name: true, slug: true }, orderBy: { name: "asc" } },
  author: { select: { name: true } },
  featuredImage: { select: { url: true, width: true, height: true } },
} satisfies Prisma.BlogPostInclude;

type PublicRow = Prisma.BlogPostGetPayload<{ include: typeof publicInclude }>;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function toCard(post: PublicRow): PublicBlogCard {
  const publishedAt = post.publishedAt ?? post.createdAt;
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    image: post.featuredImage?.url ?? null,
    imageAlt: post.featuredImageAlt || post.title,
    category: post.category,
    // A tag that repeats the category name would show as a duplicate chip.
    tags: post.tags.filter((tag) => tag.slug !== post.category?.slug && tag.name !== post.category?.name),
    author: post.author?.name ?? "Visualytes",
    publishedAt: publishedAt.toISOString(),
    formattedDate: dateFormatter.format(publishedAt),
    views: post.views,
    likes: post.likes,
    comments: post.comments,
  };
}

export type PublicListQuery = {
  /** Category slug or tag slug. */
  categorySlug?: string;
  page?: number;
  pageSize?: number;
};

export async function listPublishedPosts(query: PublicListQuery = {}) {
  const pageSize = Math.min(50, Math.max(1, query.pageSize ?? 6));
  const where: Prisma.BlogPostWhereInput = {
    ...publicWhere(),
    // A topic page matches the post's category or any of its tags.
    ...(query.categorySlug
      ? {
          OR: [
            { category: { slug: query.categorySlug } },
            { tags: { some: { slug: query.categorySlug } } },
          ],
        }
      : {}),
  };

  const total = await prisma.blogPost.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, query.page ?? 1), totalPages);

  const rows = await prisma.blogPost.findMany({
    where,
    orderBy: [{ publishedAt: "desc" }, { id: "asc" }],
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: publicInclude,
  });

  return { items: rows.map(toCard), total, page, pageSize, totalPages };
}

export async function getLatestPublishedPosts(limit: number) {
  return (await listPublishedPosts({ pageSize: limit })).items;
}

export async function getPublishedPostsBySlugs(slugs: string[]) {
  const rows = await prisma.blogPost.findMany({
    where: { ...publicWhere(), slug: { in: slugs } },
    include: publicInclude,
  });
  const order = new Map(slugs.map((slug, index) => [slug, index]));
  return rows
    .map(toCard)
    .sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
}

export async function listPublicCategories() {
  const rows = await prisma.category.findMany({
    where: { posts: { some: publicWhere() } },
    orderBy: { name: "asc" },
    select: {
      name: true,
      slug: true,
      _count: { select: { posts: { where: publicWhere() } } },
    },
  });
  return rows.map(({ _count, ...category }) => ({ ...category, postCount: _count.posts }));
}

export async function getPublishedPost(slug: string): Promise<PublicBlogPost | null> {
  const post = await prisma.blogPost.findFirst({
    where: { ...publicWhere(), slug },
    include: publicInclude,
  });
  return post ? toPublicPost(post) : null;
}

/** Same shape as the public page, but for any status (admin preview). */
export async function getPostForPreview(id: string): Promise<PublicBlogPost | null> {
  const post = await prisma.blogPost.findUnique({ where: { id }, include: publicInclude });
  return post ? toPublicPost(post) : null;
}

function toPublicPost(post: PublicRow): PublicBlogPost {
  const content = toTiptapDoc(post.content);
  return {
    ...toCard(post),
    content,
    imageWidth: post.featuredImage?.width ?? null,
    imageHeight: post.featuredImage?.height ?? null,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    seoKeywords: toKeywords(post.seoKeywords),
    updatedAt: post.updatedAt.toISOString(),
    readingMinutes: readingMinutes(content),
  };
}

export async function getRelatedPosts(post: { id: string; category: { slug: string } | null }, limit = 3) {
  const rows = await prisma.blogPost.findMany({
    where: {
      ...publicWhere(),
      id: { not: post.id },
      ...(post.category ? { category: { slug: post.category.slug } } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
    include: publicInclude,
  });
  return rows.map(toCard);
}

export async function incrementViews(slug: string) {
  const result = await prisma.blogPost.updateMany({
    where: { ...publicWhere(), slug },
    data: { views: { increment: 1 } },
  });
  return result.count > 0;
}

/** Display name for a /archives/category/blog/[slug] page (category first, then tag). */
export async function getTopicName(slug: string) {
  const [category, tag] = await Promise.all([
    prisma.category.findUnique({ where: { slug }, select: { name: true } }),
    prisma.tag.findUnique({ where: { slug }, select: { name: true } }),
  ]);
  return category?.name ?? tag?.name ?? null;
}

/* -------------------------------------------------------------------------- */
/* Authors (byline names, separate from login accounts)                        */
/* -------------------------------------------------------------------------- */

export async function createAuthor(name: string) {
  const clean = name.trim().replace(/\s+/g, " ");
  // The name column is unique (case-insensitive collation), so reuse an existing match.
  const author =
    (await prisma.author.findFirst({ where: { name: clean } })) ??
    (await prisma.author.create({ data: { name: clean } }));
  return { id: author.id, name: author.name };
}

export type DeleteAuthorResult = { ok: true } | { ok: false; status: 404 | 409; message: string };

/** An author can only be removed while no post uses it. */
export async function deleteAuthor(id: string): Promise<DeleteAuthorResult> {
  const author = await prisma.author.findUnique({
    where: { id },
    select: { name: true, _count: { select: { posts: true } } },
  });
  if (!author) return { ok: false, status: 404, message: "Author not found." };
  if (author._count.posts > 0) {
    const n = author._count.posts;
    return {
      ok: false,
      status: 409,
      message: `"${author.name}" is the author of ${n} post${n === 1 ? "" : "s"}. Change those posts to another author first.`,
    };
  }
  await prisma.author.delete({ where: { id } });
  return { ok: true };
}

/** Pre-selects the author whose name matches the logged-in user, if there is one. */
export async function getDefaultAuthorId(userName: string) {
  const author = await prisma.author.findFirst({ where: { name: userName }, select: { id: true } });
  return author?.id ?? null;
}
