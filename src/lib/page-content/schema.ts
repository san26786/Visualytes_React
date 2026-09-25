/**
 * A tiny schema language describing the editable content of a page (text, images, lists...).
 * It drives three things from one definition: the admin editor form, the clean-up of what is saved,
 * and the merge with the built-in defaults. Pure TypeScript (no React, no server-only imports).
 */

export type SelectOption = { value: string; label: string };

export type Node =
  | { kind: "text"; label: string; multiline?: boolean; rows?: number; hint?: string; placeholder?: string }
  | { kind: "html"; label: string; hint?: string }
  | { kind: "image"; label: string; hint?: string }
  | { kind: "link"; label: string; hint?: string; placeholder?: string }
  | { kind: "number"; label: string; hint?: string }
  | { kind: "bool"; label: string; hint?: string }
  | { kind: "select"; label: string; options: SelectOption[]; hint?: string }
  | { kind: "strings"; label: string; itemLabel: string; multiline?: boolean; hint?: string }
  | { kind: "group"; label: string; hint?: string; fields: Record<string, Node> }
  | { kind: "list"; label: string; itemLabel: string; titleField: string; fields: Record<string, Node>; hint?: string };

export type Group = Extract<Node, { kind: "group" }>;

const MAX_TEXT = 60_000;
const MAX_ITEMS = 200;

/** A blank value for a node (what "Add item" starts from). */
export function emptyValue(node: Node): unknown {
  switch (node.kind) {
    case "bool":
      return false;
    case "number":
      return 0;
    case "select":
      return node.options[0]?.value ?? "";
    case "strings":
    case "list":
      return [];
    case "group":
      return Object.fromEntries(Object.entries(node.fields).map(([key, field]) => [key, emptyValue(field)]));
    default:
      return "";
  }
}

const isObject = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);

/**
 * Coerces `value` into the shape of `node`. Anything missing or of the wrong type falls back to
 * `fallback` (the built-in default), so old or partial saves never break a page.
 */
export function normalize(node: Node, value: unknown, fallback: unknown): unknown {
  switch (node.kind) {
    case "text":
    case "html":
    case "image":
    case "link":
      return typeof value === "string" ? value.slice(0, MAX_TEXT) : typeof fallback === "string" ? fallback : "";
    case "number":
      return typeof value === "number" && Number.isFinite(value) ? value : typeof fallback === "number" ? fallback : 0;
    case "bool":
      return typeof value === "boolean" ? value : fallback === true;
    case "select":
      return typeof value === "string" && node.options.some((o) => o.value === value) ? value : typeof fallback === "string" ? fallback : emptyValue(node);
    case "strings":
      return Array.isArray(value)
        ? value.filter((v): v is string => typeof v === "string").slice(0, MAX_ITEMS).map((v) => v.slice(0, MAX_TEXT))
        : Array.isArray(fallback)
          ? fallback
          : [];
    case "group": {
      const source = isObject(value) ? value : {};
      const base = isObject(fallback) ? fallback : {};
      return Object.fromEntries(Object.entries(node.fields).map(([key, field]) => [key, normalize(field, source[key], base[key])]));
    }
    case "list": {
      if (!Array.isArray(value)) return Array.isArray(fallback) ? fallback : [];
      const itemSchema: Group = { kind: "group", label: node.itemLabel, fields: node.fields };
      // Saved items are complete rows: missing fields become blank, never the default of some other row.
      return value.slice(0, MAX_ITEMS).map((item) => normalize(itemSchema, item, emptyValue(itemSchema)));
    }
  }
}

export const isEmptyList = (value: unknown) => Array.isArray(value) && value.length === 0;
