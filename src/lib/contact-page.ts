import "server-only";

import { prisma } from "@/src/lib/prisma";

export const CONTACT_PAGE_SLUG = "contact-us";

/** The content the Contact page shipped with; also fills any section missing from the stored row. */
export const DEFAULT_CONTACT_CONTENT = {
  hero: {
    titleNormal: "Let's",
    titleHighlight: "Talk",
    subtitle: "We're always happy to hear from you — whether it's a new project, a quick question, or just a hello.",
  },
  contactInfo: {
    call: { title: "Call Us", enquiryLabel: "Enquiry:", enquiryValue: "023 8097 0305", supportLabel: "Support:", supportValue: "023 8097 0305" },
    write: { title: "Write Us", emails: ["hello@visualytes.com", "support@visualytes.com"] },
    visit: { title: "Visit Us", addresses: ["Cumberland House, Southampton, SO15 2BG", "12 Shirley Road, Southampton, SO15 3EU"] },
  },
  liveSupport: {
    badge: "REAL-TIME ASSISTANCE",
    titleNormal: "Live",
    titleHighlight: "Support",
    description: "Do you need any urgent help from us regarding any of our services? Our dedicated support team is available for you.",
    callLabel: "Call Us Now:",
    callNumber: "023 8097 0305",
    whatsappNumber: "447913027482",
    whatsappButtonText: "START WHATSAPP CHAT NOW!",
    whatsappNote: "Requires WhatsApp Desktop to chat from a computer, or WhatsApp mobile app on your phone.",
    image: "",
    availabilityLabel: "AVAILABLE",
    availabilityValue: "24/7",
    responseTimeLabel: "RESPONSE TIME",
    responseTimeValue: "< 2 min",
  },
  contactForm: {
    badge: "WE READ EVERY MESSAGE",
    titleNormal: "Send Your",
    titleHighlight: "Message",
    submitButtonText: "Send Message",
    clearButtonText: "Clear",
  },
  officeMap: {
    badge: "VISIT OUR TEAM",
    title: "Our UK Office Locations",
    embedUrl: "",
  },
  offices: {
    badge: "GLOBAL PRESENCE",
    title: "Offices Across Continents",
    groups: [
      { title: "Delivery Centers", locations: ["Southampton, United Kingdom", "London, United Kingdom", "Mumbai, India", "Ahmedabad, India", "Kolkata, India", "Noida, India"] },
      { title: "Sales Offices", locations: ["London, United Kingdom", "Mumbai, India", "Texas, USA", "Sydney, Australia", "United Arab Emirates", "Douglas, Isle of Man"] },
      { title: "Corporate Offices", locations: ["London, United Kingdom", "Basingstoke, United Kingdom", "Mumbai, India"] },
    ],
  },
};

export type ContactContent = typeof DEFAULT_CONTACT_CONTENT;

const isObject = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);

/** Section-by-section merge: stored values win, missing fields fall back to the defaults. */
function mergeSection<T extends Record<string, unknown>>(base: T, stored: unknown): T {
  if (!isObject(stored)) return base;
  const out: Record<string, unknown> = { ...base };
  for (const [key, fallback] of Object.entries(base)) {
    const value = stored[key];
    if (value === undefined || value === null) continue;
    if (isObject(fallback)) out[key] = mergeSection(fallback, value);
    else if (Array.isArray(fallback)) out[key] = Array.isArray(value) ? value : fallback;
    else if (typeof fallback === typeof value) out[key] = value;
  }
  return out as T;
}

/** The Contact Us page content (Admin > Contact Content). Never throws: falls back to the defaults. */
export async function getContactContent(): Promise<ContactContent> {
  try {
    const row = await prisma.contactPage.findUnique({ where: { slug: CONTACT_PAGE_SLUG } });
    if (row) {
      return {
        hero: mergeSection(DEFAULT_CONTACT_CONTENT.hero, row.hero),
        contactInfo: mergeSection(DEFAULT_CONTACT_CONTENT.contactInfo, row.contactInfo),
        liveSupport: mergeSection(DEFAULT_CONTACT_CONTENT.liveSupport, row.liveSupport),
        contactForm: mergeSection(DEFAULT_CONTACT_CONTENT.contactForm, row.contactForm),
        officeMap: mergeSection(DEFAULT_CONTACT_CONTENT.officeMap, row.officeMap),
        offices: mergeSection(DEFAULT_CONTACT_CONTENT.offices, row.offices),
      };
    }
  } catch (error) {
    console.error("Unable to load the contact page content, using the defaults", error);
  }
  return DEFAULT_CONTACT_CONTENT;
}
