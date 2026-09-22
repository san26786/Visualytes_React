import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

/**
 * `next start` only serves files that existed in `public/` at build time. Images uploaded
 * from the admin afterwards land in public/uploads, so this route serves them at runtime.
 * (During `next dev`, and for files present at build time, Next serves public/ directly.)
 */
export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params;
  const target = path.resolve(UPLOAD_ROOT, ...segments);
  const contentType = CONTENT_TYPES[path.extname(target).toLowerCase()];

  // Only images, and never anything outside public/uploads.
  if (!contentType || !target.startsWith(UPLOAD_ROOT + path.sep)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await fs.readFile(target);
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
