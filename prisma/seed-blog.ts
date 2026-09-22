/**
 * One-off, idempotent import of the original static blog articles
 * (prisma/seed-data/*) into the BlogPost CMS tables.
 *
 *   npm run db:seed-blog            # import posts that do not exist yet
 *   npm run db:seed-blog -- --force # also overwrite posts that already exist
 *
 * Each article's HTML body is converted to Tiptap JSON, its image is copied to
 * public/uploads/blog and registered as a MediaAsset, and categories / tags /
 * author are linked through the normal relations.
 */
import fs from "node:fs/promises";
import path from "node:path";

import { StarterKit } from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { generateJSON } from "@tiptap/html/server";
import sharp from "sharp";

import { Prisma, PrismaClient } from "../src/generated/prisma-admin/index.js";
import { sanitizeTiptapDoc } from "../src/lib/blog/tiptap.ts";
import { slugify } from "../src/lib/blog/slug.ts";
import { blogs, localBlogImages } from "./seed-data/blog-data.ts";
import { blogContentById } from "./seed-data/blog-content.ts";

const prisma = new PrismaClient();
const force = process.argv.includes("--force");

const ROOT = process.cwd();
const UPLOAD_DIR = path.join(ROOT, "public", "uploads", "blog");
const AUTHOR_NAME = "Visualytes Team";

const extensions = [
  StarterKit,
  Image,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Highlight,
  TextStyle,
  Color,
];

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

function ensureAuthor() {
  return prisma.author.upsert({ where: { name: AUTHOR_NAME }, update: {}, create: { name: AUTHOR_NAME } });
}

async function importImage(blogKey: string, alt: string) {
  const relative = localBlogImages[blogKey];
  if (!relative) return null;

  const source = path.join(ROOT, "public", relative.replace(/^\//, ""));
  const ext = path.extname(source).toLowerCase();
  const fileName = `${blogKey}${ext}`;
  const url = `/uploads/blog/${fileName}`;

  const existing = await prisma.mediaAsset.findUnique({ where: { url } });
  if (existing) return existing;

  const buffer = await fs.readFile(source);
  const meta = await sharp(buffer).metadata();
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, fileName), buffer);

  return prisma.mediaAsset.create({
    data: {
      url,
      fileName,
      originalName: path.basename(source),
      mimeType: MIME[ext] ?? "image/png",
      size: buffer.length,
      width: meta.width ?? null,
      height: meta.height ?? null,
      alt,
      folder: "blog",
    },
  });
}

async function main() {
  const author = await ensureAuthor();
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const post of blogs) {
    const slug = post.blogKey;
    const existing = await prisma.blogPost.findUnique({ where: { slug }, select: { id: true } });
    if (existing && !force) {
      skipped++;
      continue;
    }

    const html = blogContentById[post.id] || `<p>${post.description}</p>`;
    const doc = sanitizeTiptapDoc(generateJSON(html, extensions));
    if (!doc) throw new Error(`Could not convert content for ${post.blogKey}`);

    // "Blog" is the site-wide bucket; the first specific label becomes the category, the rest tags.
    const labels = post.categories.filter((c) => c.slug !== "blog");
    const [primary, ...rest] = labels.length ? labels : post.categories;
    const categorySlug = primary.slug ?? slugify(primary.name);
    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: {},
      create: { name: primary.name, slug: categorySlug },
    });

    const tagIds: string[] = [];
    for (const label of rest) {
      const tagSlug = label.slug ?? slugify(label.name);
      const tag = await prisma.tag.upsert({
        where: { slug: tagSlug },
        update: {},
        create: { name: label.name, slug: tagSlug },
      });
      tagIds.push(tag.id);
    }

    const image = await importImage(post.blogKey, post.images.alt);

    const data = {
      title: post.title,
      slug,
      excerpt: post.description,
      content: doc as unknown as Prisma.InputJsonValue,
      categoryId: category.id,
      authorId: author.id,
      featuredImageId: image?.id ?? null,
      featuredImageAlt: post.images.alt || null,
      status: "PUBLISHED" as const,
      publishedAt: new Date(post.date),
      views: post.metrics.views ?? 0,
      likes: post.metrics.likes ?? 0,
      tags: { set: tagIds.map((id) => ({ id })) },
    };

    if (existing) {
      await prisma.blogPost.update({ where: { id: existing.id }, data });
      updated++;
    } else {
      await prisma.blogPost.create({ data: { ...data, tags: { connect: tagIds.map((id) => ({ id })) } } });
      created++;
    }
    console.log(`  ${existing ? "updated" : "created"}  /blog/${slug}  (${post.title.slice(0, 60)})`);
  }

  console.log(`\nBlog import finished: ${created} created, ${updated} updated, ${skipped} skipped.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
