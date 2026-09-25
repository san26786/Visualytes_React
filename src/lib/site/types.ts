/**
 * Site-wide data shown in the header, footer and a few shared blocks. Edited in the admin
 * "Settings" tab (SiteSettings), "Social Links" tab (SocialLink) and "Contact Content" tab (ContactPage).
 * Pure TypeScript so client components can import the types and defaults.
 */
import { z } from "zod";

export const SETTINGS_KEY = "site";
/** Cache tag every save invalidates. */
export const SITE_DATA_TAG = "site-data";

export type SiteSettings = {
  general: {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
  };
  contact: {
    /** Shown in the header and the mobile menu. */
    phoneDisplay: string;
    /** Dialled when tapped (tel: link). */
    phoneLink: string;
  };
  footer: {
    registrationText: string;
    companyNumber: string;
    companyNumberUrl: string;
    officeAddress: string;
    icoText: string;
    /** Shown after "© Copyright {year}". */
    copyrightText: string;
  };
  analytics: {
    googleAnalyticsId: string;
    searchConsoleVerification: string;
  };
};

export const DEFAULT_SETTINGS: SiteSettings = {
  general: {
    siteName: "Visualytes",
    defaultTitle: "Web Designing & Digital Marketing Company London-Visualytes",
    defaultDescription: "Visualytes",
  },
  contact: {
    phoneDisplay: "+023 8097 0305",
    phoneLink: "02380970305",
  },
  footer: {
    registrationText: "Visualytes Limited is registered in England and Wales, Company number",
    companyNumber: "10287043",
    companyNumberUrl: "https://find-and-update.company-information.service.gov.uk/company/10287043",
    officeAddress: "Registered office address is 71-75 Shelton Street, London, Greater London, United Kingdom, WC2H 9JQ",
    icoText: "ICO Registration number: ZB049666",
    copyrightText: "All Rights Reserved by Visualytes Limited",
  },
  analytics: {
    googleAnalyticsId: "",
    searchConsoleVerification: "",
  },
};

const text = (max: number) => z.string().trim().max(max);
const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^https?:\/\//i.test(v), "Web addresses must start with http:// or https://");

export const settingsSchema = z.object({
  general: z.object({
    siteName: text(80).min(1, "Enter the site name."),
    defaultTitle: text(160).min(1, "Enter the default page title."),
    defaultDescription: text(400),
  }),
  contact: z.object({
    phoneDisplay: text(40).min(1, "Enter the phone number to show in the header."),
    phoneLink: text(30)
      .min(1, "Enter the number to dial.")
      .regex(/^[+\d][\d\s()+-]*$/, "The dial number can only contain digits, spaces, + ( ) and -."),
  }),
  footer: z.object({
    registrationText: text(300),
    companyNumber: text(40),
    companyNumberUrl: optionalUrl,
    officeAddress: text(400),
    icoText: text(120),
    copyrightText: text(200),
  }),
  analytics: z.object({
    googleAnalyticsId: text(30).refine((v) => v === "" || /^(G|AW|GT)-[A-Z0-9]{4,20}$/i.test(v), "Use a Google tag ID such as G-XXXXXXXXXX."),
    searchConsoleVerification: text(120).refine((v) => v === "" || /^[\w-]+$/.test(v), "Paste only the verification code, not the whole tag."),
  }),
});

/** Merges whatever is stored over the defaults, so a partial or older row never breaks the site. */
export function withDefaults(raw: unknown): SiteSettings {
  const source = raw && typeof raw === "object" ? (raw as Record<string, Record<string, unknown> | undefined>) : {};
  const merge = <K extends keyof SiteSettings>(key: K): SiteSettings[K] => {
    const base = DEFAULT_SETTINGS[key] as Record<string, string>;
    const stored = source[key] ?? {};
    return Object.fromEntries(Object.keys(base).map((field) => [field, typeof stored[field] === "string" ? stored[field] : base[field]])) as SiteSettings[K];
  };
  return { general: merge("general"), contact: merge("contact"), footer: merge("footer"), analytics: merge("analytics") };
}

/* ------------------------------------------------------------------ */
/* Everything the layout hands to the header / footer / shared blocks  */
/* ------------------------------------------------------------------ */

export type ContactInfo = {
  call: { title: string; enquiryLabel: string; enquiryValue: string; supportLabel: string; supportValue: string };
  write: { title: string; emails: string[] };
  visit: { title: string; addresses: string[] };
};

export type SocialLinkItem = { platform: string; url: string };

export type SiteData = {
  settings: SiteSettings;
  socialLinks: SocialLinkItem[];
  contact: ContactInfo;
};

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  call: { title: "Call Us", enquiryLabel: "Enquiry:", enquiryValue: "023 8097 0305", supportLabel: "Support:", supportValue: "023 8097 0305" },
  write: { title: "Write Us", emails: ["hello@visualytes.com", "support@visualytes.com"] },
  visit: { title: "Visit Us", addresses: ["Cumberland House, Southampton, SO15 2BG", "12 Shirley Road, Southampton, SO15 3EU"] },
};

/** Used when the database cannot be reached, so the header and footer always render. */
export const DEFAULT_SOCIAL_LINKS: SocialLinkItem[] = [
  { platform: "Facebook", url: "https://www.facebook.com/visualyteslimited" },
  { platform: "Twitter", url: "https://twitter.com/visualytes" },
  { platform: "Google", url: "https://www.google.com/search?q=Visualytes+Limited" },
  { platform: "YouTube", url: "https://www.youtube.com/channel/UCVV3R4Ye2162x8BrCuUY40Q" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/company/visualytes-limited/about/" },
];

export const DEFAULT_SITE_DATA: SiteData = { settings: DEFAULT_SETTINGS, socialLinks: DEFAULT_SOCIAL_LINKS, contact: DEFAULT_CONTACT_INFO };
