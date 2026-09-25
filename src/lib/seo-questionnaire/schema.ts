/**
 * Answers to the SEO questionnaire: empty values, coercion of untrusted input, validation and
 * secret handling. Everything is driven by the (database-stored) QConfig - there is no hard-coded
 * field here. Pure TypeScript: shared by the form, the API and the e-mail/report builders.
 */
import { z } from "zod";

import { isLayoutType, type Condition, type QConfig, type QField, type QStep } from "./config";

export { FORM_KEY, COUNTRIES } from "./config";

export type AccountValue = { has: boolean; username: string; password: string };
export type RepeaterRow = Record<string, string>;
export type Values = Record<string, unknown>;
export type FieldErrors = Record<string, string>;

export const PASSWORD_MASK = "••••••••";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function normalizeUrl(value: string): string {
  const v = value.trim();
  if (!v) return "";
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(normalizeUrl(value));
    return /^https?:$/.test(url.protocol) && url.hostname.includes(".") && !/\s/.test(value.trim());
  } catch {
    return false;
  }
}

const PHONE = /^[+()\d][\d\s()+-]{5,19}$/;
const isEmail = (value: string) => z.email().safeParse(value).success;

/** "Keywords" -> "keyword" (used in "Add at least one keyword."). */
export const singular = (label: string) => {
  const word = label.trim().toLowerCase() || "item";
  return word.endsWith("ies") ? `${word.slice(0, -3)}y` : word.endsWith("s") && !word.endsWith("ss") ? word.slice(0, -1) : word;
};

const asString = (value: unknown, max: number) => (typeof value === "string" ? value.slice(0, max) : "");
const asObject = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};

const textMax = (field: QField) => field.maxLength ?? (field.type === "textarea" ? 3000 : field.type === "url" ? 300 : 300);

export const isInput = (field: QField) => !isLayoutType(field.type);

export function conditionMet(condition: Condition | undefined, values: Values): boolean {
  if (!condition) return true;
  const actual = values[condition.field];
  return String(actual ?? "") === condition.equals;
}

/** Fields the visitor can currently see (enabled, and any "show if" satisfied). */
export const visibleFields = (step: QStep, values: Values) => step.fields.filter((field) => field.enabled && conditionMet(field.showIf, values));

/** Every answerable field of every enabled step (regardless of "show if"). */
export const inputFields = (config: QConfig) => config.steps.filter((s) => s.enabled).flatMap((s) => s.fields.filter((f) => f.enabled && isInput(f)));

/* ------------------------------------------------------------------ */
/* Empty values and coercion                                           */
/* ------------------------------------------------------------------ */

function emptyValue(field: QField): unknown {
  switch (field.type) {
    case "yesno":
    case "checkbox":
      return false;
    case "tags":
      return [];
    case "repeater":
      return Array.from({ length: field.rows ?? 3 }, () => Object.fromEntries((field.subFields ?? []).map((s) => [s.key, ""])));
    case "account":
      return { has: false, username: "", password: "" } satisfies AccountValue;
    case "select":
      return field.defaultValue && field.options?.includes(field.defaultValue) ? field.defaultValue : "";
    default:
      return field.defaultValue ?? "";
  }
}

export function emptyValues(config: QConfig, user?: { name: string; email: string }): Values {
  const values: Values = {};
  for (const field of inputFields(config)) {
    values[field.key] = emptyValue(field);
    if (user && field.prefill === "name") values[field.key] = user.name;
    if (user && field.prefill === "email") values[field.key] = user.email;
  }
  return values;
}

function coerceField(field: QField, raw: unknown): unknown {
  switch (field.type) {
    case "yesno":
    case "checkbox":
      return raw === true;
    case "tags": {
      const max = (field.maxLength ?? 30) + 5;
      return Array.isArray(raw) ? raw.filter((v): v is string => typeof v === "string").slice(0, max).map((v) => v.slice(0, 200)) : [];
    }
    case "repeater": {
      const rows = Array.isArray(raw) ? raw : [];
      return Array.from({ length: field.rows ?? 3 }, (_, i) => {
        const row = asObject(rows[i]);
        return Object.fromEntries((field.subFields ?? []).map((s) => [s.key, asString(row[s.key], 400)]));
      });
    }
    case "account": {
      const a = asObject(raw);
      return { has: a.has === true, username: asString(a.username, 300), password: asString(a.password, 300) } satisfies AccountValue;
    }
    case "select": {
      const value = asString(raw, 300);
      return value || emptyValue(field);
    }
    case "password":
      return asString(raw, 300);
    default:
      return asString(raw, Math.max(textMax(field), 20) + 100);
  }
}

/**
 * Turns any JSON into well-formed answers for the given questionnaire: unknown keys are dropped,
 * wrong types become empty values, and answers to fields that are currently hidden are cleared.
 */
export function coerceValues(config: QConfig, input: unknown): Values {
  const raw = asObject(input);
  const values: Values = {};
  for (const field of inputFields(config)) values[field.key] = coerceField(field, raw[field.key]);
  for (const field of inputFields(config)) {
    if (!conditionMet(field.showIf, values)) values[field.key] = emptyValue(field);
  }
  return values;
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

function validateText(field: QField, value: unknown, path: string, errors: FieldErrors, isRequired = field.required, label = field.label) {
  const v = typeof value === "string" ? value.trim() : "";
  if (!v) {
    if (isRequired) errors[path] = `${label} is required.`;
    return;
  }
  const max = textMax(field);
  if (v.length > max) errors[path] = `${label} must be ${max} characters or fewer.`;
  else if (field.type === "email" && !isEmail(v)) errors[path] = "Enter a valid email address.";
  else if (field.type === "tel" && !PHONE.test(v)) errors[path] = "Enter a valid phone number, e.g. +44 7700 900123.";
  else if (field.type === "url" && !isValidUrl(v)) errors[path] = "Enter a valid web address, e.g. https://example.com";
  else if (field.type === "select" && !(field.options ?? []).includes(v)) errors[path] = `Choose an option for ${label}.`;
}

function validateField(field: QField, value: unknown, errors: FieldErrors) {
  const path = field.key;
  switch (field.type) {
    case "text":
    case "textarea":
    case "email":
    case "tel":
    case "url":
    case "select":
      validateText(field, value, path, errors);
      break;
    case "password": {
      const v = typeof value === "string" ? value : "";
      if (field.required && !v) errors[path] = `${field.label} is required.`;
      else if (v.length > 200) errors[path] = "Password is too long.";
      break;
    }
    case "plans": {
      const v = typeof value === "string" ? value.trim() : "";
      if (field.required && !v) errors[path] = "Please choose a plan.";
      break;
    }
    case "checkbox":
      if (field.required && value !== true) errors[path] = field.label.length > 60 ? "Please tick this box to continue." : `Please tick “${field.label}” to continue.`;
      break;
    case "tags": {
      const list = Array.isArray(value) ? (value as string[]).map((v) => v.trim()).filter(Boolean) : [];
      const max = field.maxLength ?? 30;
      const noun = singular(field.label);
      if (field.required && list.length === 0) errors[path] = `Add at least one ${noun}.`;
      else if (list.length > max) errors[path] = `You can add up to ${max} ${noun}s.`;
      else if (list.some((v) => v.length > 80)) errors[path] = `Each ${noun} must be 80 characters or fewer.`;
      break;
    }
    case "repeater": {
      const rows = Array.isArray(value) ? (value as RepeaterRow[]) : [];
      const subs = field.subFields ?? [];
      rows.forEach((row, index) => {
        const filled = subs.some((s) => (row[s.key] ?? "").trim());
        const mustFill = index < (field.requiredRows ?? 0);
        if (!filled && !mustFill) return;
        for (const sub of subs) {
          const subField = { ...field, type: sub.type, maxLength: undefined } as QField;
          validateText(subField, row[sub.key], `${field.key}.${index}.${sub.key}`, errors, sub.required, sub.label);
        }
      });
      break;
    }
    case "account": {
      const a = asObject(value);
      if (a.has === true && !String(a.username ?? "").trim()) errors[`${path}.username`] = "Enter the username or email for this account.";
      else if (String(a.password ?? "").length > 200) errors[`${path}.password`] = "Password is too long.";
      break;
    }
    default:
      break;
  }
}

/** Validate one step against the current answers. Empty object = valid. */
export function validateStep(step: QStep, values: Values): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of visibleFields(step, values)) {
    if (isInput(field)) validateField(field, values[field.key], errors);
  }
  return errors;
}

export type ValidationResult =
  | { ok: true; values: Values }
  | { ok: false; step: number; errors: FieldErrors };

/** Validate every enabled step and return the normalised answers (trimmed, web addresses get https://). */
export function validateAll(config: QConfig, values: Values): ValidationResult {
  const steps = config.steps.filter((s) => s.enabled);
  for (let index = 0; index < steps.length; index += 1) {
    const errors = validateStep(steps[index], values);
    if (Object.keys(errors).length > 0) return { ok: false, step: index, errors };
  }
  return { ok: true, values: normalizeValues(config, values) };
}

export function normalizeValues(config: QConfig, values: Values): Values {
  const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const out: Values = {};

  const normText = (type: string, v: unknown) => (type === "url" ? normalizeUrl(clean(v)) : type === "email" ? clean(v).toLowerCase() : clean(v));

  for (const field of inputFields(config)) {
    const value = values[field.key];
    switch (field.type) {
      case "tags":
        out[field.key] = (Array.isArray(value) ? (value as string[]) : []).map(clean).filter(Boolean);
        break;
      case "repeater":
        out[field.key] = (Array.isArray(value) ? (value as RepeaterRow[]) : []).map((row) =>
          Object.fromEntries((field.subFields ?? []).map((s) => [s.key, normText(s.type, row?.[s.key])])),
        );
        break;
      case "account": {
        const a = asObject(value);
        out[field.key] = a.has === true ? { has: true, username: clean(a.username), password: String(a.password ?? "") } : { has: false, username: "", password: "" };
        break;
      }
      case "password":
        out[field.key] = typeof value === "string" ? value : "";
        break;
      case "yesno":
      case "checkbox":
        out[field.key] = value === true;
        break;
      default:
        out[field.key] = normText(field.type, value);
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Secrets                                                             */
/* ------------------------------------------------------------------ */

/** Copy of the answers with every password replaced (or emptied): safe to persist or show to the client. */
export function maskSecrets(config: QConfig, values: Values, mask: string = PASSWORD_MASK): Values {
  const hide = (v: unknown) => (typeof v === "string" && v ? mask : "");
  const out: Values = { ...values };
  for (const field of inputFields(config)) {
    if (field.type === "password") out[field.key] = hide(values[field.key]);
    if (field.type === "account") {
      const a = asObject(values[field.key]);
      out[field.key] = { ...a, password: hide(a.password) };
    }
  }
  return out;
}

/** Same as maskSecrets but for a draft kept in the browser: passwords are dropped entirely. */
export const stripSecrets = (config: QConfig, values: Values): Values => maskSecrets(config, values, "");
