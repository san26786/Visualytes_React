import "server-only";

import crypto from "crypto";
import sharp from "sharp";

import { prisma } from "@/src/lib/prisma";
import { removeUpload, saveUpload } from "@/src/lib/storage";

import { slugify } from "./slug";
import type { MediaItem } from "./types";

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

type Sniffed = { mime: string; ext: string };

/** Identify the real image type from the file signature, not the client's claim. */
function sniffImage(buffer: Buffer): Sniffed | null {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return { mime: "image/jpeg", ext: ".jpg" };
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { mime: "image/png", ext: ".png" };
  }
  if (buffer.subarray(0, 4).toString("ascii") === "GIF8") return { mime: "image/gif", ext: ".gif" };
  if (buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") {
    return { mime: "image/webp", ext: ".webp" };
  }
  return null;
}

export function toMediaItem(asset: {
  id: string;
  url: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  alt: string | null;
  createdAt: Date;
}): MediaItem {
  return { ...asset, createdAt: asset.createdAt.toISOString() };
}

export type UploadResult =
  | { ok: true; media: MediaItem }
  | { ok: false; status: number; message: string };

export async function saveBlogImage(file: File, uploadedById: number): Promise<UploadResult> {
  if (!file.size) return { ok: false, status: 400, message: "The uploaded file is empty." };
  if (file.size > MAX_IMAGE_BYTES) return { ok: false, status: 413, message: "Image must be 10 MB or smaller." };

  const buffer = Buffer.from(await file.arrayBuffer());
  const sniffed = sniffImage(buffer);
  if (!sniffed) {
    return { ok: false, status: 415, message: "Only JPG, PNG, WEBP and GIF images are allowed." };
  }

  let width: number | null = null;
  let height: number | null = null;
  try {
    const meta = await sharp(buffer).metadata();
    width = meta.width ?? null;
    height = meta.height ?? null;
  } catch {
    return { ok: false, status: 415, message: "That file could not be read as an image." };
  }

  const baseName = slugify(file.name.replace(/\.[^/.]+$/, ""), 60) || "image";
  const fileName = `${baseName}-${Date.now()}-${crypto.randomBytes(3).toString("hex")}${sniffed.ext}`;

  // Local disk in dev, Vercel Blob on Vercel; either way we store whatever URL comes back.
  const url = await saveUpload({ folder: "blog", fileName, data: buffer, contentType: sniffed.mime });

  const asset = await prisma.mediaAsset.create({
    data: {
      url,
      fileName,
      originalName: file.name.slice(0, 255),
      mimeType: sniffed.mime,
      size: file.size,
      width,
      height,
      folder: "blog",
      uploadedById,
    },
  });

  return { ok: true, media: toMediaItem(asset) };
}

/** True if any post uses the image as its featured image or inside its body. */
export async function countMediaUsage(asset: { id: string; url: string }) {
  const [featured, inBody] = await Promise.all([
    prisma.blogPost.count({ where: { featuredImageId: asset.id } }),
    prisma.$queryRaw<{ total: bigint }[]>`
      SELECT COUNT(*) AS total FROM blogpost WHERE CAST(content AS CHAR) LIKE ${`%${asset.url}%`}
    `,
  ]);
  return featured + Number(inBody[0]?.total ?? 0);
}

export async function deleteMediaFile(asset: { fileName: string; url: string }) {
  await removeUpload(asset.url, ["/uploads/blog/"]);
}
