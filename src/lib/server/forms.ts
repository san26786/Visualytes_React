import "server-only";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class ValidationError extends Error {}

export function requiredText(
  value: unknown,
  field: string,
  { min = 1, max = 2_000 }: { min?: number; max?: number } = {}
) {
  if (typeof value !== "string") {
    throw new ValidationError(`${field} is required.`);
  }

  const text = value.trim();
  if (text.length < min || text.length > max) {
    throw new ValidationError(`${field} must be between ${min} and ${max} characters.`);
  }

  return text;
}

export function optionalText(value: unknown, field: string, max = 2_000) {
  if (value === undefined || value === null || value === "") return "";
  return requiredText(value, field, { max });
}

export function email(value: unknown) {
  const address = requiredText(value, "Email address", { max: 254 }).toLowerCase();
  if (!EMAIL_PATTERN.test(address)) {
    throw new ValidationError("Enter a valid email address.");
  }
  return address;
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>'\"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '\"': "&quot;",
    };
    return entities[character];
  });
}

export function textToHtml(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

export function isFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File;
}
