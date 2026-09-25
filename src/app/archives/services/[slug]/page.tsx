import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPublicOffers } from "@/src/lib/packages/queries";
import { getPublicService } from "@/src/lib/services/server";
import { getTemplate } from "@/src/lib/services/sections/templates";

import { ServiceSections } from "../_sections/renderers";

// Cached for an hour; any admin save clears it straight away (see api/admin/[...slug]/route.ts).
export const revalidate = 3600;

// Nothing prerendered at build; each service page is cached on its first visit.
export function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPublicService(slug);

  if (!service) {
    return { title: "Service Not Found | Visualytes" };
  }

  const title = service.metaTitle || `${service.name} | Visualytes`;
  const description = service.metaDescription || service.tagline || `Professional ${service.name} solutions by Visualytes.`;
  const keywords =
    service.metaKeywords.length > 0
      ? service.metaKeywords
      : [service.name, "Visualytes", "digital services London", "software solutions"];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: service.href,
      siteName: "Visualytes",
      type: "website",
      images: [{ url: service.cardImage, width: 1200, height: 630, alt: service.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.cardImage],
    },
  };
}

export default async function ServiceDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getPublicService(slug);

  if (!service) {
    notFound();
  }

  const template = getTemplate(service.template);
  // Hidden sections must not even reach the browser, so drop them before crossing to the client.
  const sections = service.sections.filter((section) => section.enabled);
  const offers = sections.some((section) => section.type === "pricing.offers") ? await getPublicOffers() : undefined;

  return <ServiceSections sections={sections} mainClass={template.mainClass} ctx={{ offers }} />;
}
