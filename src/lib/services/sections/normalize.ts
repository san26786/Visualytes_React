import { getSectionDef } from "./defs.ts";
import type { FieldDef, SectionData, SectionInstance } from "./types.ts";

function emptyValue(field: FieldDef): unknown {
  switch (field.type) {
    case "strings":
    case "list":
      return [];
    case "number":
      return 0;
    case "boolean":
      return false;
    default:
      return "";
  }
}

function coerce(field: FieldDef, value: unknown): unknown {
  switch (field.type) {
    case "number": {
      const n = typeof value === "number" ? value : Number(value);
      return Number.isFinite(n) ? n : 0;
    }
    case "boolean":
      return value === true || value === "true";
    case "strings":
      return Array.isArray(value) ? value.map((v) => (typeof v === "string" ? v : String(v ?? ""))) : [];
    case "list": {
      if (!Array.isArray(value)) return [];
      return value.map((item) => normalizeData(field.fields, item && typeof item === "object" ? (item as SectionData) : {}));
    }
    default:
      return typeof value === "string" ? value : value == null ? "" : String(value);
  }
}

/**
 * Keep only known keys and coerce each value to its field type.
 * A key that is `undefined` falls back to `defaults[key]` (when given), else to an empty value.
 * An explicit empty string / empty array is preserved - it means "the editor cleared it".
 */
export function normalizeData(fields: FieldDef[], data: SectionData | null | undefined, defaults?: SectionData): SectionData {
  const source = data && typeof data === "object" ? data : {};
  const out: SectionData = {};
  for (const field of fields) {
    let value = source[field.key];
    if (value === undefined && defaults && defaults[field.key] !== undefined) value = defaults[field.key];
    out[field.key] = value === undefined ? emptyValue(field) : coerce(field, value);
  }
  return out;
}

/** Data ready for a renderer: defaults fill only the keys that are missing. */
export function resolveSectionData(type: string, data: SectionData | null | undefined): SectionData {
  const def = getSectionDef(type);
  if (!def) return {};
  return normalizeData(def.fields, data, def.defaults);
}

export class SectionValidationError extends Error {}

/** Validate + clean the sections array coming from the editor. Throws SectionValidationError. */
export function normalizeSections(input: unknown): SectionInstance[] {
  if (!Array.isArray(input)) throw new SectionValidationError("sections must be an array.");
  if (input.length > 60) throw new SectionValidationError("A page can have at most 60 sections.");

  const seen = new Set<string>();
  return input.map((raw, index) => {
    if (!raw || typeof raw !== "object") throw new SectionValidationError(`Section ${index + 1} is invalid.`);
    const item = raw as Record<string, unknown>;
    const type = typeof item.type === "string" ? item.type : "";
    const def = getSectionDef(type);
    if (!def) throw new SectionValidationError(`Section ${index + 1} has an unknown type "${type}".`);

    let id = typeof item.id === "string" && item.id.trim() ? item.id.trim().slice(0, 80) : `${type.replace(/\./g, "-")}-${index + 1}`;
    while (seen.has(id)) id = `${id}-${index + 1}`;
    seen.add(id);

    return {
      id,
      type,
      enabled: item.enabled !== false,
      data: normalizeData(def.fields, (item.data as SectionData) ?? {}),
    };
  });
}
