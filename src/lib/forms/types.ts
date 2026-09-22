export const FIELD_TYPES = ["text", "email", "tel", "textarea", "select", "checkbox"] as const;
export type FieldType = (typeof FIELD_TYPES)[number];

export type FormField = {
  /** Key used in the submitted payload and stored response. Immutable once locked. */
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required: boolean;
  enabled: boolean;
  width: "half" | "full";
  /** select only */
  options?: string[];
  minLength?: number;
  maxLength?: number;
  /** Core field the mail templates depend on: cannot be deleted or renamed. */
  locked?: boolean;
};

export type PublicForm = {
  key: string;
  title: string;
  isActive: boolean;
  fields: FormField[];
};

export function emptyValues(fields: FormField[]): Record<string, string | boolean> {
  return Object.fromEntries(fields.map((f) => [f.name, f.type === "checkbox" ? false : ""]));
}

export function humanize(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
}
