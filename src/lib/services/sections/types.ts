/**
 * Section model shared by the public renderer, the admin editor and the API.
 *
 * A service page is an ordered list of sections stored in `Service.content`:
 *   { sections: [{ id, type, enabled, data }], seo?: {...} }
 * A template is nothing more than a preset list of sections; the "Custom"
 * template starts empty so any section can be added.
 *
 * This file must stay React-free so server code (API, seed) can import it.
 */

export type SelectOption = { value: string; label: string };

type BaseField = {
  key: string;
  label: string;
  help?: string;
  placeholder?: string;
};

export type FieldDef =
  | (BaseField & { type: "text" | "textarea" | "url" | "image" | "video" | "number" | "boolean" })
  | (BaseField & { type: "select"; options: SelectOption[] })
  /** string[] */
  | (BaseField & { type: "strings"; itemLabel?: string; multiline?: boolean })
  /** object[] – every object follows `fields` */
  | (BaseField & {
      type: "list";
      itemLabel: string;
      /** Field whose value is shown as the row title in the editor. */
      titleKey?: string;
      fields: FieldDef[];
    });

/** Tiny layout hint used to draw the wireframe in the template picker. */
export type WireKind =
  | "hero"
  | "hero-split"
  | "cards-3"
  | "cards-4"
  | "grid"
  | "logos"
  | "split"
  | "text"
  | "stats"
  | "pricing"
  | "faq"
  | "cta"
  | "list"
  | "quotes"
  | "video"
  | "embed";

export type SectionGroup = "Hero" | "Content" | "Cards & Lists" | "Logos & Proof" | "Conversion" | "Live data";

export type SectionData = Record<string, unknown>;

export type SectionDef = {
  type: string;
  label: string;
  description: string;
  group: SectionGroup;
  wire: WireKind;
  fields: FieldDef[];
  defaults: SectionData;
};

export type SectionInstance = {
  id: string;
  type: string;
  enabled: boolean;
  data: SectionData;
};

export type ServiceSeo = {
  title?: string;
  description?: string;
  keywords?: string[];
};

export type ServiceContent = {
  sections: SectionInstance[];
  seo?: ServiceSeo;
};

export type ServiceTemplateKey =
  | "STANDARD_ARTICLE"
  | "WEB_DESIGN"
  | "DIGITAL_MARKETING"
  | "MOBILE_APP"
  | "BESPOKE"
  | "MODULAR_BUILDER";

export type TemplateDef = {
  key: ServiceTemplateKey;
  label: string;
  description: string;
  /** Section types (in order) that a new service of this template starts with. */
  sections: string[];
  /** Custom lets the editor add / remove any section; presets only edit + hide/show + reorder. */
  customizable: boolean;
  /** Tailwind classes of the page's <main> wrapper (kept identical to the original pages). */
  mainClass: string;
};
