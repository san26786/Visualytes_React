/**
 * SEO questionnaire definition: the steps and fields the admin can edit, plus the built-in default.
 * The definition lives in the database (SeoQuestionnaireConfig); this module is pure TypeScript
 * (no React, no server-only imports) so the form, the API, e-mails and the admin builder share it.
 */
import { z } from "zod";

export const FORM_KEY = "seo-questionnaire";

export const FIELD_TYPES = [
  "text",
  "email",
  "tel",
  "url",
  "textarea",
  "select",
  "password",
  "yesno",
  "checkbox",
  "tags",
  "plans",
  "repeater",
  "account",
  "heading",
  "note",
] as const;
export type FieldType = (typeof FIELD_TYPES)[number];

export const SUB_FIELD_TYPES = ["text", "email", "tel", "url"] as const;
export type SubFieldType = (typeof SUB_FIELD_TYPES)[number];

/** Layout-only fields hold no answer. */
export const isLayoutType = (type: FieldType) => type === "heading" || type === "note";
/** Fields whose answer is a single string. */
export const isTextLike = (type: FieldType) => ["text", "email", "tel", "url", "textarea", "password", "select", "plans"].includes(type);

export const FIELD_TYPE_INFO: Record<FieldType, { label: string; description: string }> = {
  text: { label: "Short text", description: "A single line answer." },
  textarea: { label: "Long text", description: "A multi-line answer." },
  email: { label: "Email", description: "Validated email address." },
  tel: { label: "Phone", description: "Validated phone number." },
  url: { label: "Website address", description: "Validated web address (https:// is added for them)." },
  select: { label: "Dropdown", description: "Choose one from a list of options." },
  password: { label: "Password", description: "Hidden while typing; masked in stored copies and the client email." },
  yesno: { label: "Yes / No", description: "A Yes or No toggle." },
  checkbox: { label: "Checkbox", description: "A tick box - make it required for a consent confirmation." },
  tags: { label: "List of items", description: "Add several short items (keywords, locations...)." },
  plans: { label: "Plan picker", description: "Cards for the plans created in the Packages tab." },
  repeater: { label: "Repeating group", description: "Several rows of the same small fields (e.g. competitors)." },
  account: { label: "Account access", description: "Have one? Yes/No, then username and password." },
  heading: { label: "Section heading", description: "A title (and short text) that splits a step into sections." },
  note: { label: "Information note", description: "A highlighted tip or notice shown to the client." },
};

export const ACCOUNT_ICONS = ["generic", "map", "chart", "search", "facebook", "twitter", "linkedin", "instagram"] as const;
export type AccountIcon = (typeof ACCOUNT_ICONS)[number];

export const STEP_ICONS = ["building", "briefcase", "package", "target", "globe", "search", "share", "user", "file", "star", "shield", "mail"] as const;
export type StepIcon = (typeof STEP_ICONS)[number];

export type SubField = { key: string; label: string; type: SubFieldType; required: boolean; placeholder?: string };
export type Condition = { field: string; equals: string };

export type QField = {
  key: string;
  label: string;
  type: FieldType;
  enabled: boolean;
  required: boolean;
  width: "half" | "full";
  placeholder?: string;
  hint?: string;
  /** select */
  options?: string[];
  /** text/textarea/password: max characters. tags: max items. */
  maxLength?: number;
  /** textarea: visible rows. repeater: number of rows. */
  rows?: number;
  /** text/select: the value a new form starts with. */
  defaultValue?: string;
  /** Pre-fill from the signed-in user. */
  prefill?: "name" | "email";
  /** Only show (and require) this field when another field has the given value ("true"/"false" for Yes/No). */
  showIf?: Condition;
  /** note: colour of the box. */
  tone?: "info" | "secure";
  /** account: icon preset. */
  icon?: AccountIcon;
  /** repeater */
  subFields?: SubField[];
  itemLabel?: string;
  requiredRows?: number;
};

export type QStep = {
  id: string;
  title: string;
  short: string;
  description: string;
  icon: StepIcon;
  enabled: boolean;
  fields: QField[];
};

export type QSettings = {
  /** Field that holds the client's name (used for the greeting, e-mail and list of responses). */
  nameKey: string;
  /** Field that holds the client's email - the copy of their answers is sent here. */
  emailKey: string;
  /** Field that holds the business name (used in subjects and headings). Optional. */
  businessKey: string;
  /** Extra address for the team notification; empty = the site's default mail recipient. */
  teamEmail: string;
};

export type QConfig = { steps: QStep[]; settings: QSettings };

export const COUNTRIES = [
  "United Kingdom", "India", "United States", "Canada", "Australia", "Ireland", "New Zealand", "United Arab Emirates",
  "Saudi Arabia", "Qatar", "Singapore", "Malaysia", "Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "South Africa", "Nigeria",
  "Kenya", "Germany", "France", "Spain", "Italy", "Netherlands", "Belgium", "Portugal", "Sweden", "Norway", "Denmark",
  "Switzerland", "Poland", "Japan", "China", "Brazil", "Mexico",
];

/* ------------------------------------------------------------------ */
/* Built-in default (the seven steps the manager specified)            */
/* ------------------------------------------------------------------ */

type FieldInput = Partial<QField> & Pick<QField, "key" | "label" | "type">;
const f = (field: FieldInput): QField => ({ enabled: true, required: false, width: "half", ...field });
const heading = (key: string, label: string, hint?: string): QField => f({ key, label, type: "heading", width: "full", hint });
const note = (key: string, label: string, tone: "info" | "secure" = "info"): QField => f({ key, label, type: "note", width: "full", tone });
const account = (key: string, label: string, icon: AccountIcon, hint: string): QField => f({ key, label, type: "account", width: "full", icon, hint });

export function defaultConfig(): QConfig {
  return {
    settings: { nameKey: "fullName", emailKey: "businessEmail", businessKey: "businessName", teamEmail: "" },
    steps: [
      {
        id: "business",
        title: "Business Contact Details",
        short: "Business",
        description: "Who we will be working with and where your business is based.",
        icon: "building",
        enabled: true,
        fields: [
          heading("contactHeading", "Contact person", "The person we should speak to about your SEO campaign."),
          f({ key: "businessName", label: "Business Name", type: "text", required: true, placeholder: "e.g. Acme Ltd", maxLength: 150 }),
          f({ key: "fullName", label: "Contact Person Full Name", type: "text", required: true, placeholder: "e.g. Jane Smith", maxLength: 100, prefill: "name" }),
          f({ key: "mobileNumber", label: "Mobile Phone Number", type: "tel", required: true, placeholder: "+44 7700 900123", hint: "Include your country code." }),
          f({ key: "businessPhone", label: "Business Phone", type: "tel", placeholder: "+44 20 7946 0000" }),
          f({ key: "websiteUrl", label: "Website URL", type: "url", placeholder: "https://www.yourbusiness.com" }),
          f({ key: "businessEmail", label: "Business Contact Email", type: "email", required: true, placeholder: "hello@yourbusiness.com", hint: "We will send a copy of your answers here.", prefill: "email" }),
          heading("addressHeading", "Business address", "Where your business is located."),
          f({ key: "addressLine1", label: "Address Line 1", type: "text", required: true, width: "full", placeholder: "Street address" }),
          f({ key: "addressLine2", label: "Address Line 2", type: "text", width: "full", placeholder: "Apartment, suite, unit (optional)" }),
          f({ key: "city", label: "City", type: "text", required: true, maxLength: 100 }),
          f({ key: "state", label: "State or County", type: "text", required: true, maxLength: 100 }),
          f({ key: "postalCode", label: "Postal / Zip Code", type: "text", required: true, maxLength: 20 }),
          f({ key: "country", label: "Country", type: "select", required: true, options: COUNTRIES, defaultValue: "United Kingdom" }),
        ],
      },
      {
        id: "about",
        title: "About Business",
        short: "About",
        description: "Tell us what you do so we can position you correctly in search.",
        icon: "briefcase",
        enabled: true,
        fields: [
          note("aboutNote", "The more specific you are, the better we can target the right customers. Write it the way you would explain your business to a new customer."),
          f({ key: "industryType", label: "Business or Industry Type", type: "text", required: true, placeholder: "e.g. Restaurant, IT services, Real estate", maxLength: 150 }),
          f({ key: "additionalCategory", label: "Additional Business Category", type: "text", placeholder: "A second category, if you have one", maxLength: 300 }),
          f({
            key: "businessDescription",
            label: "Business Description",
            type: "textarea",
            required: true,
            width: "full",
            rows: 5,
            maxLength: 2000,
            placeholder: "What does your business do, who are your customers, and what makes you different?",
          }),
          f({
            key: "productsServices",
            label: "Products / Services List",
            type: "textarea",
            required: true,
            width: "full",
            rows: 5,
            maxLength: 2000,
            placeholder: "One per line, for example:\nWebsite design\nMobile app development\nSEO",
            hint: "List each product or service on a new line.",
          }),
        ],
      },
      {
        id: "package",
        title: "Package Selection",
        short: "Package",
        description: "Choose your plan, then list the keywords and locations you want to rank for.",
        icon: "package",
        enabled: true,
        fields: [
          heading("planHeading", "Choose your plan", "Pick the SEO plan you would like to start with. You can change it later with our team."),
          f({ key: "selectedPlan", label: "Selected Plan", type: "plans", required: true, width: "full", placeholder: "e.g. Basic - £350" }),
          f({ key: "unlimitedKeywords", label: "Unlimited Keywords", type: "checkbox", hint: "I would like to discuss an unlimited keyword option." }),
          f({ key: "unlimitedLocations", label: "Unlimited Locations", type: "checkbox", hint: "I would like to discuss an unlimited location option." }),
          heading("keywordsHeading", "Keywords and locations", "The search terms and places you want customers to find you for."),
          f({ key: "keywords", label: "Keywords", type: "tags", required: true, width: "full", maxLength: 30, placeholder: "Type a keyword and press Enter…", hint: "Press Enter or comma after each keyword. Tip: paste a comma-separated list." }),
          f({ key: "locations", label: "Locations", type: "tags", required: true, width: "full", maxLength: 5, placeholder: "Type a town, city or country and press Enter…", hint: "Where should you appear in search?" }),
        ],
      },
      {
        id: "competitors",
        title: "Competitor Information",
        short: "Competitors",
        description: "Who are you up against? We benchmark your rankings against them.",
        icon: "target",
        enabled: true,
        fields: [
          note("competitorsNote", "Add the businesses that show up when your customers search for what you do. We will compare your rankings and backlinks against theirs. Competitor 1 is required; the rest are optional."),
          f({
            key: "competitors",
            label: "Competitors",
            type: "repeater",
            width: "full",
            rows: 5,
            requiredRows: 1,
            itemLabel: "Competitor",
            subFields: [
              { key: "name", label: "Name", type: "text", required: true, placeholder: "e.g. Rival Company Ltd" },
              { key: "url", label: "Website", type: "url", required: true, placeholder: "https://www.rival.com" },
            ],
          }),
        ],
      },
      {
        id: "website",
        title: "Website Access Details",
        short: "Website",
        description: "Access we need to make on-site SEO changes for you.",
        icon: "globe",
        enabled: true,
        fields: [
          note(
            "websiteNote",
            "Your details are handled securely. They travel over an encrypted connection straight to our SEO team's inbox and are not kept in this website's database. Prefer not to share a password? Leave it blank and add our team as a user instead. Everything on this page is optional.",
            "secure",
          ),
          heading("adminHeading", "Website admin panel", "The login page of your website (for example WordPress)."),
          f({ key: "adminUrl", label: "Website Admin Panel URL", type: "url", width: "full", placeholder: "https://www.yourbusiness.com/wp-admin" }),
          f({ key: "adminUsername", label: "Admin Username", type: "text", placeholder: "Username or email" }),
          f({ key: "adminPassword", label: "Admin Password", type: "password" }),
          heading("hostingHeading", "Hosting account", "Where your website is hosted."),
          f({ key: "hostingCompany", label: "Hosting Company", type: "text", width: "full", placeholder: "e.g. GoDaddy, Hostinger, or the control panel link" }),
          f({ key: "hostingUsername", label: "Hosting Username", type: "text", placeholder: "Username or email" }),
          f({ key: "hostingPassword", label: "Hosting Password", type: "password" }),
        ],
      },
      {
        id: "google",
        title: "Google Account Details",
        short: "Google",
        description: "Your Google tools, so we can track results and improve local visibility.",
        icon: "search",
        enabled: true,
        fields: [
          note(
            "googleNote",
            "Choose Yes for each account you already have. Prefer not to share a password? Leave it blank and add our team as a user from the account's settings.",
            "secure",
          ),
          account("googleMyBusiness", "Google My Business", "map", "Your Google Business Profile, used for maps and local search."),
          account("googleAnalytics", "Google Analytics", "chart", "Website visitor tracking and reports."),
          account("googleSearchConsole", "Google Search Console", "search", "How Google sees and indexes your website."),
        ],
      },
      {
        id: "social",
        title: "Social Media Details",
        short: "Social",
        description: "Accounts we should connect to your campaign, then confirm and submit.",
        icon: "share",
        enabled: true,
        fields: [
          account("facebook", "Facebook", "facebook", "Your Facebook business page."),
          account("twitter", "Twitter (X)", "twitter", "Your Twitter (X) profile."),
          account("linkedin", "LinkedIn", "linkedin", "Your LinkedIn company page."),
          account("instagram", "Instagram", "instagram", "Your Instagram business profile."),
          f({
            key: "consent",
            label: "I confirm the information above is correct.",
            type: "checkbox",
            required: true,
            width: "full",
            hint: "I authorise Visualytes to use these details, including any account access I have shared, to carry out my SEO campaign.",
          }),
        ],
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Validation of a definition (admin save + reading from the database)  */
/* ------------------------------------------------------------------ */

const keyRule = z.string().trim().regex(/^[a-zA-Z][a-zA-Z0-9_]{0,39}$/, "Field keys must start with a letter and use only letters, numbers or underscores (max 40).");
const text = (max: number) => z.string().trim().max(max);

const subFieldSchema = z.object({
  key: keyRule,
  label: text(120).min(1, "Every repeating-group column needs a label."),
  type: z.enum(SUB_FIELD_TYPES),
  required: z.boolean(),
  placeholder: text(200).optional(),
});

const fieldSchema = z.object({
  key: keyRule,
  label: text(600).min(1, "Every field needs a label."),
  type: z.enum(FIELD_TYPES),
  enabled: z.boolean(),
  required: z.boolean(),
  width: z.enum(["half", "full"]),
  placeholder: text(300).optional(),
  hint: text(600).optional(),
  options: z.array(text(200).min(1)).max(300).optional(),
  maxLength: z.number().int().min(1).max(10000).optional(),
  rows: z.number().int().min(1).max(20).optional(),
  defaultValue: text(200).optional(),
  prefill: z.enum(["name", "email"]).optional(),
  showIf: z.object({ field: keyRule, equals: text(200) }).optional(),
  tone: z.enum(["info", "secure"]).optional(),
  icon: z.enum(ACCOUNT_ICONS).optional(),
  subFields: z.array(subFieldSchema).max(6).optional(),
  itemLabel: text(60).optional(),
  requiredRows: z.number().int().min(0).max(20).optional(),
});

const stepSchema = z.object({
  id: z.string().trim().regex(/^[a-zA-Z][a-zA-Z0-9_-]{0,39}$/, "Invalid step id."),
  title: text(100).min(1, "Every step needs a title."),
  short: text(30),
  description: text(400),
  icon: z.enum(STEP_ICONS),
  enabled: z.boolean(),
  fields: z.array(fieldSchema).max(60),
});

export const configSchema = z.object({
  steps: z.array(stepSchema).min(1, "Add at least one step.").max(15),
  settings: z.object({
    nameKey: z.string().trim().max(40),
    emailKey: z.string().trim().max(40),
    businessKey: z.string().trim().max(40),
    teamEmail: z.string().trim().max(200).refine((v) => !v || z.email().safeParse(v).success, "The team email address is not valid."),
  }),
});

const emptyToUndefined = <T,>(value: T | undefined | "") => (value === "" ? undefined : value);

/** Drops properties that do not belong to a field's type so stored definitions stay tidy. */
function tidyField(field: z.infer<typeof fieldSchema>): QField {
  const out: QField = {
    key: field.key,
    label: field.label,
    type: field.type,
    enabled: field.enabled,
    required: isLayoutType(field.type) ? false : field.required,
    width: field.width,
  };
  const type = field.type;
  if (type !== "note" && emptyToUndefined(field.hint)) out.hint = field.hint;
  if (["text", "email", "tel", "url", "textarea", "password", "tags", "plans", "select"].includes(type) && emptyToUndefined(field.placeholder)) out.placeholder = field.placeholder;
  if (type === "select") {
    out.options = field.options ?? [];
    if (emptyToUndefined(field.defaultValue) && out.options.includes(field.defaultValue as string)) out.defaultValue = field.defaultValue;
  }
  if (["text", "textarea", "tags"].includes(type) && field.maxLength) out.maxLength = field.maxLength;
  if (type === "textarea" && field.rows) out.rows = field.rows;
  if (type === "text" && emptyToUndefined(field.defaultValue)) out.defaultValue = field.defaultValue;
  if ((type === "text" || type === "email") && field.prefill) out.prefill = field.prefill;
  if (!isLayoutType(type) || type === "note" || type === "heading") {
    if (field.showIf && field.showIf.field) out.showIf = { field: field.showIf.field, equals: field.showIf.equals };
  }
  if (type === "note") out.tone = field.tone ?? "info";
  if (type === "account") out.icon = field.icon ?? "generic";
  if (type === "repeater") {
    out.rows = field.rows ?? 3;
    out.itemLabel = emptyToUndefined(field.itemLabel) ?? "Item";
    out.requiredRows = Math.min(field.requiredRows ?? 0, out.rows);
    out.subFields = (field.subFields ?? []).map((s) => ({ key: s.key, label: s.label, type: s.type, required: s.required, ...(s.placeholder ? { placeholder: s.placeholder } : {}) }));
  }
  return out;
}

/** Cross-field rules. Returns a message for the admin, or null when the definition is sound. */
export function checkConfig(config: QConfig): string | null {
  const stepIds = new Set<string>();
  const keys = new Map<string, QField>();

  for (const step of config.steps) {
    if (stepIds.has(step.id)) return `Two steps share the id "${step.id}".`;
    stepIds.add(step.id);
    for (const field of step.fields) {
      if (keys.has(field.key)) return `The field key "${field.key}" is used twice. Keys must be unique across the whole questionnaire.`;
      keys.set(field.key, field);
      if (field.type === "select" && (field.options?.length ?? 0) === 0) return `"${field.label}" is a dropdown and needs at least one option.`;
      if (field.type === "repeater") {
        if ((field.subFields?.length ?? 0) === 0) return `"${field.label}" is a repeating group and needs at least one column.`;
        if (new Set(field.subFields!.map((s) => s.key)).size !== field.subFields!.length) return `"${field.label}" has two columns with the same key.`;
      }
    }
  }

  for (const step of config.steps) {
    for (const field of step.fields) {
      if (field.showIf && !keys.has(field.showIf.field)) return `"${field.label}" is shown only when "${field.showIf.field}" has a value, but no field with that key exists.`;
      if (field.showIf?.field === field.key) return `"${field.label}" cannot depend on itself.`;
    }
  }

  const liveKeys = new Set(config.steps.filter((s) => s.enabled).flatMap((s) => s.fields.filter((f) => f.enabled).map((f) => f.key)));
  if (!config.steps.some((s) => s.enabled)) return "Enable at least one step.";

  const { nameKey, emailKey, businessKey } = config.settings;
  const nameField = keys.get(nameKey);
  if (!nameField || !liveKeys.has(nameKey) || !["text"].includes(nameField.type)) return "Choose an enabled short-text field to hold the client's name (Settings).";
  const emailField = keys.get(emailKey);
  if (!emailField || !liveKeys.has(emailKey) || emailField.type !== "email" || !emailField.required) return "Choose an enabled, required Email field for the client's email - their copy is sent there (Settings).";
  if (businessKey) {
    const business = keys.get(businessKey);
    if (!business || !liveKeys.has(businessKey) || business.type !== "text") return "The business-name setting must point to an enabled short-text field, or be left empty.";
  }
  return null;
}

/** Parses untrusted JSON into a QConfig. Returns an error string when it is not valid. */
export function parseConfig(input: unknown): { ok: true; config: QConfig } | { ok: false; message: string } {
  const parsed = configSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "The questionnaire is not valid." };
  const config: QConfig = {
    settings: parsed.data.settings,
    steps: parsed.data.steps.map((step) => ({ ...step, fields: step.fields.map(tidyField) })),
  };
  const problem = checkConfig(config);
  return problem ? { ok: false, message: problem } : { ok: true, config };
}

/** What the visitor sees: enabled steps and enabled fields only. */
export function publicConfig(config: QConfig): QConfig {
  return {
    settings: config.settings,
    steps: config.steps.filter((s) => s.enabled).map((s) => ({ ...s, fields: s.fields.filter((f) => f.enabled) })),
  };
}
