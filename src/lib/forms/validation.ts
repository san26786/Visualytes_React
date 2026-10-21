/**
 * Field rules shared by the public forms (browser) and their API handlers (server), so a visitor
 * sees the same message inline that the server would return. Pure TypeScript.
 */

import { internationalPhoneError } from "./phone";

/** Requires a dot-separated domain with a 2+ letter TLD, e.g. "name@company.com" (not "name@company"). */
export const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
const NUMBER_PATTERN = /^\d+$/;

export function emailError(value: string) {
  const v = value.trim();
  if (!v) return "";
  if (v.length > 254 || v.includes("..") || !EMAIL_PATTERN.test(v)) return "Enter a valid email address, e.g. name@company.com.";
  return "";
}

export function phoneError(value: string) {
  const v = value.trim();
  if (!v) return "";
  // Phone fields send "+<country code> <number>" (see PhoneField); length is checked per country.
  if (!v.startsWith("+")) return /^\d+$/.test(v) ? "Choose your country code." : "Phone number must contain numbers only.";
  return internationalPhoneError(v);
}

export function numberError(value: string, label: string) {
  const v = value.trim();
  if (!v) return "";
  if (!NUMBER_PATTERN.test(v)) return `${label} must contain numbers only.`;
  return "";
}

/** Fields whose answer must be a plain number (no type of their own, so matched by name). */
export const isNumericFieldName = (name: string) => /budget/i.test(name);

/** Shape shared by the dynamic form fields (src/lib/forms/types.ts FormField). */
type RuleField = { name: string; label: string; type: string; required: boolean; minLength?: number };

/** Message for one field of a dynamic form, or "" when the value is valid. */
export function fieldError(field: RuleField, value: string | boolean | undefined): string {
  if (field.type === "checkbox") return field.required && value !== true ? `${field.label} must be accepted.` : "";
  const v = typeof value === "string" ? value.trim() : "";
  if (!v) return field.required ? `${field.label} is required.` : "";
  if (field.type === "email") return emailError(v);
  if (field.type === "tel") return phoneError(v);
  if (isNumericFieldName(field.name)) return numberError(v, field.label);
  if (field.minLength && v.length < field.minLength) return `${field.label} must be at least ${field.minLength} characters.`;
  return "";
}

/** Every field's message, keyed by field name; empty object = the form is valid. */
export function formErrors(fields: RuleField[], values: Record<string, string | boolean>) {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const message = fieldError(field, values[field.name]);
    if (message) errors[field.name] = message;
  }
  return errors;
}

/** Keeps only digits as the visitor types (phone and numeric fields). */
export const digitsOnly = (value: string) => value.replace(/\D/g, "");
