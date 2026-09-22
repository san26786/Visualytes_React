import { getSectionDef } from "./defs.ts";
import { normalizeData } from "./normalize.ts";
import { mobileHeroLogos } from "./seedData.ts";
import type { SectionData, SectionInstance, ServiceContent, ServiceTemplateKey, TemplateDef } from "./types.ts";

const DARK_MAIN = "relative overflow-hidden bg-slate-950";

export const TEMPLATES: TemplateDef[] = [
  {
    key: "STANDARD_ARTICLE",
    label: "Standard Article",
    description: "Simple inner page: banner plus an article with image, paragraphs and bullet points. Used by Corporate Branding, Hosting, QA and Maintenance.",
    sections: ["hero.archive", "article.standard"],
    customizable: false,
    mainClass: DARK_MAIN,
  },
  {
    key: "WEB_DESIGN",
    label: "Web Design",
    description: "Rich showcase: experience cards, filterable portfolio, live packages, counters, technology and client logos, certifications.",
    sections: [
      "hero.centered",
      "cards.imageTriple",
      "portfolio.filter",
      "grid.imageCards",
      "pricing.offers",
      "stats.whyUs",
      "split.bestDesign",
      "logos.techGrid",
      "logos.clients",
      "cards.certifications",
    ],
    customizable: false,
    mainClass: DARK_MAIN,
  },
  {
    key: "MOBILE_APP",
    label: "Mobile App",
    description: "App-agency page: logo strip, video about, services, client showcase, awards, call-to-action and a long FAQ.",
    sections: [
      "hero.centered",
      "about.video",
      "services.imageGrid",
      "clients.showcase",
      "awards.grid",
      "text.highlight",
      "cta.gradient",
      "faq.accordion",
    ],
    customizable: false,
    mainClass: DARK_MAIN,
  },
  {
    key: "BESPOKE",
    label: "Bespoke Software",
    description: "Split hero, highlight tiles, partner story, audience cards, case studies, products, testimonials, technology and latest blog posts.",
    sections: [
      "hero.split",
      "highlights.icons",
      "partner.segments",
      "cases.grid",
      "products.grid",
      "testimonials.quotes",
      "technology.split",
      "blog.cards",
    ],
    customizable: false,
    mainClass: `${DARK_MAIN} min-h-screen`,
  },
  {
    key: "DIGITAL_MARKETING",
    label: "Digital Marketing",
    description: "Orbit hero, numbered service list, outcome cards, process, plans, portfolio, testimonials, blog, appointment block and client slider.",
    sections: [
      "hero.orbit",
      "services.cards",
      "text.responsive",
      "cta.e2e",
      "embed.process",
      "pricing.plans",
      "embed.portfolio",
      "embed.testimonials",
      "blog.section",
      "embed.appointment",
      "embed.clients",
      "embed.aboveFooter",
    ],
    customizable: false,
    mainClass: "relative min-h-screen overflow-hidden bg-slate-950 text-white",
  },
  {
    key: "MODULAR_BUILDER",
    label: "Custom (build your own)",
    description: "Starts empty. Pick any section from the library, in any order, and edit every field.",
    sections: [],
    customizable: true,
    mainClass: "relative min-h-screen overflow-hidden bg-slate-950 text-white",
  },
];

export const TEMPLATE_MAP: Record<string, TemplateDef> = Object.fromEntries(TEMPLATES.map((t) => [t.key, t]));

export function getTemplate(key: string | null | undefined): TemplateDef {
  return TEMPLATE_MAP[key ?? ""] ?? TEMPLATE_MAP.STANDARD_ARTICLE;
}

/** Legacy DB enum value kept for old rows. */
export function toTemplateKey(value: string | null | undefined): ServiceTemplateKey {
  if (value === "ARCHIVE_SIMPLE" || !value) return "STANDARD_ARTICLE";
  return (TEMPLATE_MAP[value] ? value : "STANDARD_ARTICLE") as ServiceTemplateKey;
}

let counter = 0;
export function newSectionId(type: string): string {
  counter += 1;
  return `${type.replace(/\./g, "-")}-${Date.now().toString(36)}${counter.toString(36)}`;
}

/** Build a section with the definition's default content (plus optional overrides). */
export function createSection(type: string, overrides: SectionData = {}, id?: string): SectionInstance {
  const def = getSectionDef(type);
  if (!def) throw new Error(`Unknown section type: ${type}`);
  return {
    id: id ?? newSectionId(type),
    type,
    enabled: true,
    data: normalizeData(def.fields, { ...def.defaults, ...overrides }),
  };
}

/** Per-template overrides so a fresh service looks exactly like the original page it was modelled on. */
const PRESET_OVERRIDES: Partial<Record<ServiceTemplateKey, Record<string, SectionData>>> = {
  MOBILE_APP: {
    "hero.centered": {
      breadcrumbLabel: "Development",
      title: "iOS & Android Mobile App Development",
      titleAccent: "Company Based in London",
      subtitle: "Choose a Long-Term Partner Who Takes The Whole Mobile App Development Process off your shoulders",
      tagline: "More than 130 Startups, Brands & Enterprise Companies around the Globe Chose Visualytes",
      ctaText: "Estimate Project",
      ctaLink: "/estimate-project/",
      logos: mobileHeroLogos,
    },
  },
};

export function createTemplateContent(key: ServiceTemplateKey, extra: Record<string, SectionData> = {}): ServiceContent {
  const template = getTemplate(key);
  const overrides = PRESET_OVERRIDES[key] ?? {};
  return {
    sections: template.sections.map((type, index) => {
      const data = { ...(overrides[type] ?? {}), ...(extra[type] ?? {}) };
      return createSection(type, data, `${type.replace(/\./g, "-")}-${index + 1}`);
    }),
  };
}
