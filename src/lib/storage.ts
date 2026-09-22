import "server-only";

import fs from "fs/promises";
import path from "path";

import { del, put } from "@vercel/blob";

/**
 * Where admin uploads live.
 *
 *  - Locally (`next dev` / `next start` on your PC): files are written to public/uploads/<folder>
 *    and referenced as /uploads/<folder>/<file>, exactly as before.
 *  - On Vercel the filesystem is read-only, so files go to Vercel Blob and the stored URL is the
 *    public https://…blob.vercel-storage.com URL.
 *
 * Override with UPLOAD_DRIVER=local|blob. Default: blob on Vercel, local everywhere else.
 */
const PUBLIC_ROOT = path.join(process.cwd(), "public");
const UPLOAD_ROOT = path.join(PUBLIC_ROOT, "uploads");

/** Default local paths that may be deleted (never anything outside public/). Callers narrow this. */
const DELETABLE_PREFIXES = ["/uploads/"];

export function uploadDriver(): "blob" | "local" {
  const forced = process.env.UPLOAD_DRIVER;
  if (forced === "blob" || forced === "local") return forced;
  return process.env.VERCEL ? "blob" : "local";
}

function isBlobUrl(url: string) {
  return /^https:\/\/[^/]+\.blob\.vercel-storage\.com\//.test(url);
}

type SaveOptions = {
  /** Sub-folder, e.g. "services", "blog", "case-study". */
  folder: string;
  /** Final file name, already sanitised and unique. */
  fileName: string;
  data: Buffer;
  contentType: string;
};

/** Stores a file and resolves the URL to save in the database. */
export async function saveUpload({ folder, fileName, data, contentType }: SaveOptions): Promise<string> {
  if (uploadDriver() === "blob") {
    const blob = await put(`uploads/${folder}/${fileName}`, data, {
      access: "public",
      contentType,
      addRandomSuffix: false,
      allowOverwrite: false,
    });
    return blob.url;
  }

  const directory = path.join(UPLOAD_ROOT, folder);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(path.join(directory, fileName), data);
  return `/uploads/${folder}/${fileName}`;
}

/**
 * Best-effort delete of a previously stored file. Never throws: a missing file must not fail the
 * database operation that triggered it. Files that shipped inside the deployment (committed to
 * git) are read-only on Vercel and are left in place.
 */
export async function removeUpload(
  url: string | null | undefined,
  localPrefixes: string[] = DELETABLE_PREFIXES,
): Promise<void> {
  if (!url) return;

  try {
    if (isBlobUrl(url)) {
      await del(url);
      return;
    }

    if (uploadDriver() !== "local") return;
    if (!localPrefixes.some((prefix) => url.startsWith(prefix))) return;

    const target = path.resolve(PUBLIC_ROOT, `.${url}`);
    if (!target.startsWith(PUBLIC_ROOT + path.sep)) return;
    await fs.rm(target, { force: true });
  } catch (error) {
    console.error("Failed to delete uploaded file:", url, error);
  }
}
