import fs from "fs/promises";
import path from "path";

const TESTIMONIAL_UPLOAD_PREFIX =
  "/uploads/testimonial/";

export async function deleteTestimonialImage(
  image?: string | null
) {
  if (!image) return;

  // Only delete files that belong to testimonial uploads.
  // Never delete /assets/... files.
  if (!image.startsWith(TESTIMONIAL_UPLOAD_PREFIX)) {
    return;
  }

  try {
    const relativePath = image.replace(
      /^\//,
      ""
    );

    const filePath = path.join(
      process.cwd(),
      "public",
      relativePath
    );

    await fs.unlink(filePath);

    console.log(
      `Deleted testimonial image: ${filePath}`
    );
  } catch (error: unknown) {
    // File already doesn't exist — that's okay.
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return;
    }

    console.error(
      "Failed to delete testimonial image:",
      error
    );

    throw error;
  }
}