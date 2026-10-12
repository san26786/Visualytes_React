import { slugify } from "@/src/lib/blog/slug";

export const isExternalHref = (href: string) => /^https?:\/\//i.test(href.trim());

/** Each case study card opens its own page; that page links on to the live site when one is set. */
export const caseStudyPath = (title: string) => `/case-study/${slugify(title)}`;
