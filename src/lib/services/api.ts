import "server-only";

import { NextResponse } from "next/server";
import { z } from "zod";

import { SectionValidationError, type ServiceInput } from "./server";
import { TEMPLATE_MAP } from "./sections/templates";
import type { ServiceTemplateKey } from "./sections/types";

const templateKeys = Object.keys(TEMPLATE_MAP) as [ServiceTemplateKey, ...ServiceTemplateKey[]];

const shared = {
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  slug: z.string().trim().min(2).max(120),
  tagline: z.string().max(600).optional(),
  cardImage: z.string().max(500).optional(),
  route: z.string().max(300).nullable().optional(),
  template: z.enum(templateKeys),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  metaTitle: z.string().max(300).optional(),
  metaDescription: z.string().max(1000).optional(),
  metaKeywords: z.array(z.string().max(100)).max(40).optional(),
  sections: z.unknown().optional(),
};

export const createServiceSchema = z.object(shared);
export const updateServiceSchema = z.object(shared).partial();

export function toInput<T extends z.infer<typeof createServiceSchema> | z.infer<typeof updateServiceSchema>>(
  data: T
): T & Partial<ServiceInput> {
  return data as T & Partial<ServiceInput>;
}

export function errorResponse(error: unknown, fallback: string) {
  if (error instanceof SectionValidationError) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  console.error(fallback, error);
  return NextResponse.json({ message: fallback }, { status: 500 });
}

export function invalidResponse(error: z.ZodError) {
  const first = error.issues[0];
  return NextResponse.json(
    { message: first ? `${first.path.join(".") || "input"}: ${first.message}` : "Invalid service data." },
    { status: 400 }
  );
}
