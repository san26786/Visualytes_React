import { prisma } from "@/src/lib/prisma";
import {  NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST() {
  try {
    /*
     * Source:
     * public/assets/jpng/clients
     *
     * Destination:
     * public/uploads/clients
     */

    const sourceDir = path.join(
      process.cwd(),
      "public",
      "assets",
      "jpng",
      "clients"
    );

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "clients"
    );

    // Make sure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Read all files from original clients folder
    const files = await fs.readdir(sourceDir);

    // Only allow image files
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".gif",
      ".avif",
    ];

    const imageFiles = files.filter((file) =>
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    const imported = [];
    const skipped = [];
    const failed = [];

    for (const fileName of imageFiles) {
      try {
        const sourcePath = path.join(sourceDir, fileName);

        const extension = path.extname(fileName);
        const nameWithoutExtension = path.basename(
          fileName,
          extension
        );

        /*
         * Convert filename into client name.
         *
         * Example:
         *
         * 3dpro-logo.jpg
         *       ↓
         * 3dpro logo
         *
         * Achari-Lounge.jpg
         *       ↓
         * Achari Lounge
         */
        const clientName = nameWithoutExtension
          .replace(/[-_]+/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        /*
         * Destination filename
         *
         * Keep original filename.
         */
        const destinationPath = path.join(
          uploadDir,
          fileName
        );

        const imageUrl = `/uploads/clients/${fileName}`;

        /*
         * Check whether this client/image already exists.
         *
         * This prevents duplicates if you run the import
         * multiple times.
         */
        const existingClient = await prisma.client.findFirst({
          where: {
            image: imageUrl,
          },
        });

        if (existingClient) {
          skipped.push({
            file: fileName,
            reason: "Already imported",
            clientId: existingClient.id,
          });

          continue;
        }

        /*
         * Copy original image
         * public/assets/jpng/clients/xxx
         *
         * TO
         *
         * public/uploads/clients/xxx
         */
        await fs.copyFile(sourcePath, destinationPath);

        /*
         * Create database record
         */
        const client = await prisma.client.create({
          data: {
            name: clientName,
            image: imageUrl,
          },
        });

        imported.push({
          id: client.id,
          name: client.name,
          image: client.image,
        });
      } catch (error) {
        console.error(
          `Failed to import ${fileName}:`,
          error
        );

        failed.push({
          file: fileName,
          error:
            error instanceof Error
              ? error.message
              : "Unknown error",
        });
      }
    }

    return NextResponse.json(
      {
        message: "Client import completed.",
        sourceDirectory: sourceDir,
        uploadDirectory: uploadDir,
        totalImagesFound: imageFiles.length,
        importedCount: imported.length,
        skippedCount: skipped.length,
        failedCount: failed.length,
        imported,
        skipped,
        failed,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Bulk client import error:", error);

    return NextResponse.json(
      {
        message: "Failed to import clients.",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}