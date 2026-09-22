import { z } from "zod";

const featureSchema = z.object({
  name: z.string().trim().min(1).max(200),
  disabled: z.boolean().optional(),
});

const planItemSchema = z.object({
  name: z.string().trim().min(1).max(200),
  enabled: z.boolean(),
  value: z.string().trim().max(120).nullish(),
});

const groupSchema = z.object({
  title: z.string().trim().min(1).max(120),
  items: z.array(planItemSchema).max(100),
});

export const packageInputSchema = z
  .object({
    kind: z.enum(["PACKAGE", "PLAN"]),
    name: z.string().trim().min(2).max(120),
    category: z.string().trim().min(2).max(80),
    description: z.string().trim().max(1000).nullish(),
    price: z.coerce.number().min(0).max(1_000_000),
    currency: z.string().trim().length(3).transform((value) => value.toUpperCase()).default("GBP"),
    billingPeriod: z.string().trim().min(2).max(30).default("one-time"),
    durationDays: z.coerce.number().int().positive().max(3650).nullish(),
    features: z.array(featureSchema).max(100).default([]),
    groups: z.array(groupSchema).max(30).default([]),
    contactOnly: z.boolean().default(false),
    productId: z.string().trim().max(40).nullish(),
    sortOrder: z.coerce.number().int().min(0).max(9999).default(0),
    isActive: z.boolean().default(true),
  })
  .superRefine((value, ctx) => {
    if (value.kind === "PLAN") {
      if (value.contactOnly) {
        ctx.addIssue({ code: "custom", path: ["contactOnly"], message: "A marketing plan must have a price." });
      }
      if (value.groups.length === 0) {
        ctx.addIssue({ code: "custom", path: ["groups"], message: "Add at least one feature group." });
      }
    }
    // Stripe rejects charges below 50 minor units.
    if (!value.contactOnly && value.price < 0.5) {
      ctx.addIssue({ code: "custom", path: ["price"], message: "Price must be at least 0.50, or mark it Contact Us." });
    }
  });

export type ParsedPackageInput = z.infer<typeof packageInputSchema>;

/** Prisma `data` for a validated input (Contact-Us packages are stored at price 0). */
export function toPackageData(input: ParsedPackageInput) {
  const isPlan = input.kind === "PLAN";
  return {
    kind: input.kind,
    name: input.name,
    category: input.category,
    description: input.description || null,
    price: input.contactOnly ? 0 : input.price,
    currency: input.currency,
    billingPeriod: input.billingPeriod,
    durationDays: input.durationDays ?? null,
    features: isPlan ? [] : input.features.map(({ name, disabled }) => ({ name, ...(disabled ? { disabled: true } : {}) })),
    groups: isPlan
      ? input.groups.map(({ title, items }) => ({
          title,
          items: items.map(({ name, enabled, value }) => ({ name, enabled, ...(value ? { value } : {}) })),
        }))
      : undefined,
    contactOnly: isPlan ? false : input.contactOnly,
    productId: input.productId || null,
    sortOrder: input.sortOrder,
    isActive: input.isActive,
  };
}
