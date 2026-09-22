import { z } from "zod";

import { SLUG_MAX_LENGTH, SLUG_PATTERN } from "./slug";
import {
  MAX_DOC_BYTES,
  countWords,
  sanitizeTiptapDoc,
  type TiptapDoc,
} from "./tiptap";
import { BLOG_STATUSES, type BlogPostInput, type FieldErrors } from "./types";

export const LIMITS = {
  titleMin: 5,
  titleMax: 200,
  excerptMin: 20,
  excerptMax: 1000,
  minWords: 30,
  seoTitleMax: 70,
  seoDescriptionMax: 200,
  keywordMax: 60,
  keywords: 15,
  tags: 15,
  tagMax: 40,
  altMax: 300,
} as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Must be ${max} characters or fewer.`)
    .nullish()
    .transform((v) => (v ? v : null));

const counter = z.number().int("Must be a whole number.").min(0, "Cannot be negative.").max(1_000_000_000).optional();

/**
 * Shape check for *saving* (drafts included). Publishing adds the stricter
 * checks in `getPublishBlockers`.
 */
export const blogPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(LIMITS.titleMax, `Title must be ${LIMITS.titleMax} characters or fewer.`),
  slug: z
    .string()
    .trim()
    .max(SLUG_MAX_LENGTH, `Slug must be ${SLUG_MAX_LENGTH} characters or fewer.`)
    .refine((v) => v === "" || SLUG_PATTERN.test(v), "Use lowercase letters, numbers and single hyphens only.")
    .optional(),
  excerpt: z.string().trim().max(LIMITS.excerptMax, `Excerpt must be ${LIMITS.excerptMax} characters or fewer.`).optional(),
  content: z.unknown().optional(),
  categoryId: z.string().min(1).nullish(),
  tags: z
    .array(z.string().trim().min(1).max(LIMITS.tagMax, `Tags must be ${LIMITS.tagMax} characters or fewer.`))
    .max(LIMITS.tags, `Use at most ${LIMITS.tags} tags.`)
    .optional(),
  authorId: z.string().min(1).nullish(),
  featuredImageId: z.string().min(1).nullish(),
  featuredImageAlt: optionalText(LIMITS.altMax),
  status: z.enum(BLOG_STATUSES).optional(),
  publishedAt: z.iso.datetime({ offset: true, message: "Invalid publish date." }).nullish(),
  seoTitle: optionalText(LIMITS.seoTitleMax),
  seoDescription: optionalText(LIMITS.seoDescriptionMax),
  seoKeywords: z
    .array(z.string().trim().min(1).max(LIMITS.keywordMax))
    .max(LIMITS.keywords, `Use at most ${LIMITS.keywords} keywords.`)
    .optional(),
  views: counter,
  likes: counter,
  comments: counter,
});

export const blogPostPatchSchema = blogPostSchema.partial();

export type ParsedBlogPost = z.infer<typeof blogPostSchema>;

export function flattenIssues(error: z.ZodError): FieldErrors {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out as FieldErrors;
}

/** Validates + sanitises the Tiptap document sent by the client. */
export function parseContent(value: unknown): { doc: TiptapDoc } | { error: string } {
  const source = typeof value === "string" ? safeJson(value) : value;
  if (source == null) return { error: "Content is invalid." };
  if (JSON.stringify(source).length > MAX_DOC_BYTES) {
    return { error: "Article is too large (2 MB limit)." };
  }
  const doc = sanitizeTiptapDoc(source);
  return doc ? { doc } : { error: "Content must be a Tiptap document." };
}

function safeJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

type PublishCandidate = {
  title: string;
  slug: string;
  excerpt: string;
  content: TiptapDoc;
  categoryId: string | null;
  authorId: string | null;
  featuredImageId: string | null;
};

/** Everything that must be present before a post may go live. */
export function getPublishBlockers(post: PublishCandidate): FieldErrors {
  const errors: FieldErrors = {};

  if (post.title.trim().length < LIMITS.titleMin) {
    errors.title = `Title needs at least ${LIMITS.titleMin} characters to publish.`;
  }
  if (!post.slug || !SLUG_PATTERN.test(post.slug)) {
    errors.slug = "A valid slug is required to publish.";
  }
  if (post.excerpt.trim().length < LIMITS.excerptMin) {
    errors.excerpt = `Excerpt needs at least ${LIMITS.excerptMin} characters to publish.`;
  }
  if (countWords(post.content) < LIMITS.minWords) {
    errors.content = `Write at least ${LIMITS.minWords} words of content to publish.`;
  }
  if (!post.categoryId) errors.categoryId = "Choose a category to publish.";
  if (!post.featuredImageId) errors.featuredImageId = "A featured image is required to publish.";
  if (!post.authorId) errors.authorId = "Choose an author to publish.";

  return errors;
}

export type { BlogPostInput };
