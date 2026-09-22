/**
 * One-off, idempotent import of the original static /packages offers and
 * /end-to-end-digital-marketing-plans plans into the Package table.
 *
 *   npm run db:seed-packages            # import rows that do not exist yet
 *   npm run db:seed-packages -- --force # also overwrite rows that already exist
 */
import { PrismaClient } from "../src/generated/prisma-admin/index.js";
import { marketingPlans } from "../src/app/end-to-end-digital-marketing-plans/data/data.ts";
import { offers } from "../src/app/packages/data/offer.ts";

const prisma = new PrismaClient();
const force = process.argv.includes("--force");

async function save(name: string, data: Parameters<typeof prisma.package.create>[0]["data"]) {
  const existing = await prisma.package.findUnique({ where: { name } });
  if (existing && !force) return "skipped";
  if (existing) {
    await prisma.package.update({ where: { id: existing.id }, data });
    return "updated";
  }
  await prisma.package.create({ data });
  return "created";
}

async function main() {
  const counts: Record<string, number> = { created: 0, updated: 0, skipped: 0 };

  for (const [index, offer] of offers.entries()) {
    const contactOnly = !/^\d+$/.test(offer.price);
    const result = await save(offer.name, {
      name: offer.name,
      kind: "PACKAGE",
      category: "Website",
      price: contactOnly ? 0 : Number(offer.price),
      contactOnly,
      billingPeriod: "one-time",
      features: offer.features.map(({ name, disabled }) => ({ name, ...(disabled ? { disabled: true } : {}) })),
      sortOrder: index,
    });
    counts[result]++;
  }

  for (const [index, plan] of marketingPlans.entries()) {
    const result = await save(plan.name, {
      name: plan.name,
      kind: "PLAN",
      category: "Marketing",
      price: plan.price,
      productId: plan.productId,
      billingPeriod: "one-time",
      features: [],
      groups: plan.groups.map(({ title, items }) => ({
        title,
        items: items.map(({ name, enabled, value }) => ({ name, enabled, ...(value ? { value } : {}) })),
      })),
      sortOrder: index,
    });
    counts[result]++;
  }

  console.log(`Packages: ${counts.created} created, ${counts.updated} updated, ${counts.skipped} skipped.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
