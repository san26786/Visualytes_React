import "server-only";

import { z } from "zod";

import { prisma } from "@/src/lib/prisma";
import { email, optionalText, requiredText, ValidationError } from "@/src/lib/server/forms";
import { DEFAULT_FORMS, EMAIL_REQUIRED_FORMS } from "./defaults";
import { FIELD_TYPES, humanize, type FormField, type PublicForm } from "./types";

const fieldSchema = z
  .object({
    name: z.string().trim().regex(/^[a-zA-Z][a-zA-Z0-9_]{0,39}$/, "Field name must start with a letter and use only letters, numbers or underscores."),
    label: z.string().trim().min(1, "Every field needs a label.").max(200),
    type: z.enum(FIELD_TYPES),
    placeholder: z.string().trim().max(200).optional(),
    required: z.boolean(),
    enabled: z.boolean(),
    width: z.enum(["half", "full"]),
    options: z.array(z.string().trim().min(1).max(200)).max(50).optional(),
    minLength: z.number().int().min(0).max(5000).optional(),
    maxLength: z.number().int().min(1).max(5000).optional(),
    locked: z.boolean().optional(),
  })
  .refine((f) => f.type !== "select" || (f.options?.length ?? 0) > 0, { message: "Dropdown fields need at least one option." });

export const fieldsSchema = z
  .array(fieldSchema)
  .min(1, "A form needs at least one field.")
  .max(40)
  .refine((fields) => new Set(fields.map((f) => f.name)).size === fields.length, { message: "Field names must be unique." });

function isFieldArray(raw: unknown): raw is FormField[] {
  return Array.isArray(raw) && raw.every((item) => item && typeof item === "object" && "name" in item && "type" in item);
}

/** Older rows stored a plain list of field names; upgrade them to full field definitions. */
function upgradeLegacy(key: string, raw: unknown): FormField[] {
  if (isFieldArray(raw)) return raw;
  const defaults = DEFAULT_FORMS[key];
  if (defaults) return defaults.fields;
  const names = Array.isArray(raw) ? raw.filter((n): n is string => typeof n === "string") : [];
  return names.map((name) => ({
    name,
    label: humanize(name),
    type: /email/i.test(name) ? "email" : /description|details|message|services/i.test(name) ? "textarea" : "text",
    required: false,
    enabled: true,
    width: "half",
  }));
}

/** Creates missing default forms and upgrades legacy rows, then returns every form. */
export async function listForms() {
  for (const [key, def] of Object.entries(DEFAULT_FORMS)) {
    await prisma.formDefinition.upsert({ where: { key }, create: { key, title: def.title, fields: def.fields }, update: {} });
  }
  // The SEO questionnaire has its own tab (SEO Questionnaire); an old definition row for it must not show here.
  const rows = await prisma.formDefinition.findMany({ where: { key: { not: "seo-questionnaire" } }, orderBy: { id: "asc" } });
  return Promise.all(
    rows.map(async (row) => {
      const fields = upgradeLegacy(row.key, row.fields);
      if (!isFieldArray(row.fields)) await prisma.formDefinition.update({ where: { id: row.id }, data: { fields } });
      return { id: row.id, key: row.key, title: row.title, isActive: row.isActive, fields };
    }),
  );
}

export async function getForm(key: string): Promise<(PublicForm & { id: number }) | null> {
  const def = DEFAULT_FORMS[key];
  let row = await prisma.formDefinition.findUnique({ where: { key } });
  if (!row && def) row = await prisma.formDefinition.create({ data: { key, title: def.title, fields: def.fields } });
  if (!row) return null;
  const fields = upgradeLegacy(key, row.fields);
  if (!isFieldArray(row.fields)) await prisma.formDefinition.update({ where: { id: row.id }, data: { fields } });
  return { id: row.id, key: row.key, title: row.title, isActive: row.isActive, fields };
}

/** For public pages: only enabled fields, and never throws (falls back to built-in defaults). */
export async function getPublicForm(key: string): Promise<PublicForm> {
  try {
    const form = await getForm(key);
    if (form) return { key: form.key, title: form.title, isActive: form.isActive, fields: form.fields.filter((f) => f.enabled) };
  } catch (error) {
    console.error(`Unable to load form "${key}"`, error);
  }
  const def = DEFAULT_FORMS[key];
  return { key, title: def?.title ?? key, isActive: true, fields: def?.fields ?? [] };
}

/** Rules that must hold for the mail templates to keep working. */
export function checkFormRules(key: string, fields: FormField[]) {
  if (!EMAIL_REQUIRED_FORMS.includes(key)) return null;
  const emailField = fields.find((f) => f.name === "email");
  if (!emailField || emailField.type !== "email" || !emailField.enabled || !emailField.required) {
    return "This form needs an enabled, required email field named \"email\" so replies can be sent.";
  }
  const defaults = DEFAULT_FORMS[key];
  const missing = defaults?.fields.find((d) => !fields.some((f) => f.name === d.name && f.type === d.type));
  return missing ? `Core field "${missing.name}" cannot be removed or changed to a different type.` : null;
}

function text(field: FormField, raw: unknown) {
  const max = field.maxLength ?? (field.type === "textarea" ? 5_000 : 500);
  const value = raw === undefined || raw === null || raw === "" ? "" : requiredText(raw, field.label, { min: field.minLength ?? 1, max });
  if (field.required && !value) throw new ValidationError(`${field.label} is required.`);
  return value;
}

/** Validates a submission against the stored field definitions and returns cleaned values. */
export function validateSubmission(fields: FormField[], body: Record<string, unknown>) {
  const values: Record<string, string | boolean> = {};
  for (const field of fields) {
    if (!field.enabled) continue;
    const raw = body[field.name];
    if (field.type === "checkbox") {
      if (field.required && raw !== true) throw new ValidationError(`${field.label} must be accepted.`);
      values[field.name] = raw === true;
    } else if (field.type === "email") {
      if (!field.required && (raw === undefined || raw === null || raw === "")) values[field.name] = "";
      else values[field.name] = email(raw);
    } else if (field.type === "select") {
      const value = optionalText(raw, field.label, 200);
      if (field.required && !value) throw new ValidationError(`${field.label} is required.`);
      if (value && !field.options?.includes(value)) throw new ValidationError(`Choose a valid option for ${field.label}.`);
      values[field.name] = value;
    } else {
      values[field.name] = text(field, raw);
    }
  }
  return values;
}

/** Fields that were added in the admin (i.e. not one of the built-in core fields). */
export function customFields(key: string, fields: FormField[]) {
  const core = new Set(DEFAULT_FORMS[key]?.fields.map((f) => f.name));
  return fields.filter((f) => f.enabled && !core.has(f.name));
}

export function displayValue(value: string | boolean | undefined) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return value ?? "";
}
