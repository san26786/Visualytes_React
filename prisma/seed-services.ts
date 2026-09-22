/**
 * One-off, idempotent import of the original static service pages into the Service table.
 *
 *   npm run db:seed-services            # convert rows that do not have `sections` yet
 *   npm run db:seed-services -- --force # rebuild every built-in service from the original content
 *
 * - The 4 rich templates are rebuilt from the original page content (the DB only held placeholders).
 * - Corporate Branding is rebuilt from its original static page.
 * - Hosting / QA / Maintenance keep whatever was stored (admin edits) and are converted to sections.
 * - Existing name / tagline / card image / order / SEO columns are never overwritten.
 */
import { Prisma, PrismaClient } from "../src/generated/prisma-admin/index.js";
import { sectionsFromLegacyArticle } from "../src/lib/services/sections/legacy.ts";
import { createSection, createTemplateContent } from "../src/lib/services/sections/templates.ts";
import { corporateBranding } from "./seed-data/corporate-branding.ts";

const prisma = new PrismaClient();
const force = process.argv.includes("--force");

type BuiltIn = {
  slug: string;
  name: string;
  tagline: string;
  cardImage: string;
  template: "WEB_DESIGN" | "DIGITAL_MARKETING" | "MOBILE_APP" | "BESPOKE" | "STANDARD_ARTICLE";
  sortOrder: number;
  meta?: { title: string; description: string; keywords: string[] };
};

/** Used only when a row is missing entirely. Values come from the original /our-services cards. */
const BUILT_INS: BuiltIn[] = [
  {
    slug: "web-design",
    name: "Website Designing",
    tagline:
      "Our creative web designers can read between the colours. Let the website design talk to your customers directly, while they easily navigate through your sales funnel.",
    cardImage: "/assets/png/services/Website-designing-600x600.png",
    template: "WEB_DESIGN",
    sortOrder: 1,
    meta: {
      title: "Software Development | Web Development Company London, UK",
      description:
        "Visualytes is a leading Web Development Company in London, UK, offering professional web design, software development, and digital solutions.",
      keywords: [
        "software development company London",
        "web development company London",
        "web design agency UK",
        "website development services",
        "custom software development",
        "London web developers",
        "digital solutions company",
      ],
    },
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    tagline: "Performance marketing services are led by a team of professional digital marketers.",
    cardImage: "/assets/png/services/Digital-header-600x600.jpg",
    template: "DIGITAL_MARKETING",
    sortOrder: 2,
  },
  {
    slug: "mobile-app",
    name: "Mobile App Development",
    tagline: "Launch a beast of a business in the app store and turn all the spotlight on your mobile app.",
    cardImage: "/assets/png/services/mobile-app-development.jpg-min-600x600.png",
    template: "MOBILE_APP",
    sortOrder: 3,
    meta: {
      title: "Mobile App Development Company London, UK | Visualytes",
      description:
        "Hire Visualytes, a leading Mobile App Development Company in London, UK. Our experienced mobile app developers deliver innovative app solutions.",
      keywords: [
        "mobile app development company London",
        "mobile app developers UK",
        "app development services",
        "iOS app development",
        "Android app development",
        "custom mobile applications",
        "Visualytes mobile app services",
      ],
    },
  },
  {
    slug: "corporate-branding",
    name: "Corporate Branding",
    tagline: "The first impression is indeed the last one and branding can boost conversion.",
    cardImage: "/assets/png/services/corporate-branding-min-600x600.png",
    template: "STANDARD_ARTICLE",
    sortOrder: 4,
    meta: {
      title: "Branding Agencies London | Corporate Branding London",
      description:
        "Visualytes is a leading branding agency in London offering corporate branding and company branding services, creating adaptive and impactful brands across the UK.",
      keywords: [
        "branding agency London",
        "corporate branding London",
        "company branding services",
        "brand identity design",
        "creative branding agency",
        "UK branding agency",
        "Visualytes branding services",
      ],
    },
  },
  {
    slug: "bespoke",
    name: "Bespoke Software",
    tagline: "Do you have a business model in mind? Let's get it into the market.",
    cardImage: "/assets/png/services/Bespoke-Software-Development-600x600.png",
    template: "BESPOKE",
    sortOrder: 5,
    meta: {
      title: "Bespoke Software Development Company London | Visualytes",
      description:
        "Bespoke Software Development and Digital Transformation from Conception to Delivery. 250+ expert developers across UK and nearshore centres.",
      keywords: [],
    },
  },
  {
    slug: "hosting-services",
    name: "Website Hosting Services",
    tagline: "Reliable hosting services with advanced features to drive high traffic.",
    cardImage: "/assets/png/services/website-hosting-services-min-600x600.png",
    template: "STANDARD_ARTICLE",
    sortOrder: 6,
  },
  {
    slug: "quality-assurance",
    name: "Quality Assurance",
    tagline: "Experienced QA team capable of detecting flaws at an early stage.",
    cardImage: "/assets/png/services/Quality-Assurance-min-600x600.png",
    template: "STANDARD_ARTICLE",
    sortOrder: 7,
  },
  {
    slug: "maintenance-and-support",
    name: "Maintenance & Support",
    tagline: "Support your app or website and take it to the level you desire.",
    cardImage: "/assets/png/services/maintenance-and-support-1170x780-min-600x600.png",
    template: "STANDARD_ARTICLE",
    sortOrder: 8,
  },
];

function corporateBrandingSections() {
  return [
    createSection(
      "hero.archive",
      {
        eyebrow: "Services",
        title: "Corporate",
        titleAccent: "Branding",
        subtitle: corporateBranding.subtitle,
        breadcrumbLabel: "Corporate Branding",
      },
      "hero-archive-1"
    ),
    createSection(
      "article.standard",
      {
        // The original page reused the subtitle sentence as the section title.
        title: corporateBranding.subtitle,
        intro: "",
        description: corporateBranding.description,
        image: corporateBranding.image,
        topDescription: corporateBranding.topDescription,
        bullets: [],
        bottomDescription: "",
      },
      "article-standard-2"
    ),
  ];
}

async function main() {
  const counts: Record<string, number> = { created: 0, converted: 0, skipped: 0 };

  for (const item of BUILT_INS) {
    const row = await prisma.service.findUnique({ where: { slug: item.slug } });
    const hasSections =
      !!row && !!row.content && Array.isArray((row.content as { sections?: unknown }).sections);

    const keepAdminEdits = item.template === "STANDARD_ARTICLE" && item.slug !== "corporate-branding";

    if (row && hasSections && (!force || keepAdminEdits)) {
      counts.skipped += 1;
      console.log(`skipped   ${item.slug} (already uses sections)`);
      continue;
    }

    let sections;
    if (item.slug === "corporate-branding") {
      sections = corporateBrandingSections();
    } else if (item.template === "STANDARD_ARTICLE" && row) {
      sections = sectionsFromLegacyArticle(row.content, row) ?? createTemplateContent("STANDARD_ARTICLE").sections;
    } else {
      sections = createTemplateContent(item.template).sections;
    }

    const content = { sections } as unknown as Prisma.InputJsonValue;

    if (!row) {
      await prisma.service.create({
        data: {
          slug: item.slug,
          name: item.name,
          tagline: item.tagline,
          cardImage: item.cardImage,
          route: `/archives/services/${item.slug}`,
          template: item.template,
          content,
          sortOrder: item.sortOrder,
          isActive: true,
          metaTitle: item.meta?.title ?? null,
          metaDescription: item.meta?.description ?? null,
          metaKeywords: item.meta && item.meta.keywords.length > 0 ? item.meta.keywords : Prisma.DbNull,
        },
      });
      counts.created += 1;
      console.log(`created   ${item.slug} (${sections.length} sections)`);
      continue;
    }

    await prisma.service.update({
      where: { slug: item.slug },
      data: {
        content,
        template: item.template,
        // The SEO text that is live today wins over catalog text that was never served.
        metaTitle: item.meta?.title ?? row.metaTitle ?? null,
        metaDescription: item.meta?.description ?? row.metaDescription ?? null,
        ...(item.meta && item.meta.keywords.length > 0 ? { metaKeywords: item.meta.keywords } : {}),
      },
    });
    counts.converted += 1;
    console.log(`converted ${item.slug} (${sections.length} sections)`);
  }

  console.log(counts);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
