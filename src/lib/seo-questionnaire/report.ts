import { defaultConfig, type QConfig, type QField } from "./config.ts";
import { PASSWORD_MASK, coerceValues, conditionMet, inputFields, maskSecrets, type AccountValue, type RepeaterRow, type Values } from "./schema.ts";

export type ReportRow = { label: string; value: string; tags?: string[] };
export type ReportSection = { title: string; rows: ReportRow[] };

const yesNo = (value: unknown) => (value === true ? "Yes" : "No");

function rowsFor(field: QField, value: unknown): ReportRow[] {
  switch (field.type) {
    case "yesno":
    case "checkbox":
      return [{ label: field.label, value: yesNo(value) }];
    case "tags": {
      const tags = Array.isArray(value) ? (value as string[]) : [];
      return [{ label: field.label, value: tags.join(", "), tags }];
    }
    case "repeater": {
      const rows = Array.isArray(value) ? (value as RepeaterRow[]) : [];
      const subs = field.subFields ?? [];
      const item = field.itemLabel || "Item";
      return rows
        .map((row, index) => ({ label: `${item} ${index + 1}`, value: subs.map((s) => row[s.key]).filter(Boolean).join("  -  ") }))
        .filter((row) => row.value);
    }
    case "account": {
      const account = (value ?? { has: false, username: "", password: "" }) as AccountValue;
      const rows: ReportRow[] = [{ label: `${field.label} Account`, value: yesNo(account.has) }];
      if (account.has) {
        rows.push({ label: `${field.label} Username`, value: account.username });
        rows.push({ label: `${field.label} Password`, value: account.password });
      }
      return rows;
    }
    default:
      return [{ label: field.label, value: typeof value === "string" ? value : "" }];
  }
}

/**
 * One section per enabled step, listing the client's answers. Pass `hideSecrets` to replace every
 * password with dots (client e-mail, stored copy and PDF).
 */
export function buildReport(config: QConfig, input: Values, { hideSecrets }: { hideSecrets: boolean }): ReportSection[] {
  const values = hideSecrets ? maskSecrets(config, input, PASSWORD_MASK) : input;
  const live = new Set(inputFields(config).map((f) => f.key));

  return config.steps
    .filter((step) => step.enabled)
    .map((step) => ({
      title: step.title,
      rows: step.fields
        .filter((field) => field.enabled && live.has(field.key) && conditionMet(field.showIf, input))
        .flatMap((field) => rowsFor(field, values[field.key])),
    }))
    .filter((section) => section.rows.length > 0);
}

export function reportToText(sections: ReportSection[]): string {
  return sections
    .map((section) => `${section.title.toUpperCase()}\n${section.rows.map((r) => `${r.label}: ${r.value || "-"}`).join("\n")}`)
    .join("\n\n");
}

/**
 * Reads the report of a stored response. Responses saved by the current system carry a labelled
 * snapshot; the very first version stored the raw answers of the original seven-step form, which
 * are re-labelled here with the original wording.
 */
export function storedReport(input: unknown): { report: ReportSection[]; business: string } {
  let data = input;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      data = null;
    }
  }
  const raw = data && typeof data === "object" && !Array.isArray(data) ? (data as Record<string, unknown>) : {};
  if (Array.isArray(raw.report)) return { report: raw.report as ReportSection[], business: typeof raw.business === "string" ? raw.business : "" };

  const nested = (value: unknown) => (value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {});
  const config = defaultConfig();
  const values = coerceValues(config, { ...raw, ...nested(raw.website), ...nested(raw.accounts) });
  return { report: buildReport(config, values, { hideSecrets: true }), business: typeof raw.businessName === "string" ? raw.businessName : "" };
}
