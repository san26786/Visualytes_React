/**
 * Adds the footer's social icons to the Social Links table (Admin > Social Links) so they can be
 * edited from the backend. Safe to re-run: existing rows are left untouched.
 * Run with: npm run db:seed-social
 */
import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma-admin/index.js";

const LINKS = [
  { platform: "Facebook", url: "https://www.facebook.com/visualyteslimited", sortOrder: 1 },
  { platform: "Twitter", url: "https://twitter.com/visualytes", sortOrder: 2 },
  { platform: "Google", url: "https://www.google.com/search?q=Visualytes+Limited", sortOrder: 3 },
  { platform: "YouTube", url: "https://www.youtube.com/channel/UCVV3R4Ye2162x8BrCuUY40Q", sortOrder: 4 },
  { platform: "LinkedIn", url: "https://www.linkedin.com/company/visualytes-limited/about/", sortOrder: 5 },
];

const prisma = new PrismaClient();

for (const link of LINKS) {
  await prisma.socialLink.upsert({ where: { platform: link.platform }, update: {}, create: { ...link, isActive: true } });
}
console.log(`Social links ready: ${(await prisma.socialLink.count())} in the database.`);
await prisma.$disconnect();
