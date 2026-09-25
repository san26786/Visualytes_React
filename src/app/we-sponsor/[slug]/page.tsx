import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SponsorDetailClient from "../SponsorDetailClient";
import { getPageContent } from "@/src/lib/page-content/server";
import { toSponsorships } from "../sponsor-view";

async function findSponsor(slug: string) {
  const { items } = await getPageContent("sponsors");
  const index = items.findIndex((item) => item.id === slug);
  return index < 0 ? null : { sponsor: toSponsorships(items)[index], html: items[index].content };
}

export async function generateStaticParams() {
  const { items } = await getPageContent("sponsors");
  return items.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: PageProps<"/we-sponsor/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = await findSponsor(slug);
  return found ? { title: `${found.sponsor.title} | We Sponsor`, description: found.sponsor.detail } : {};
}

export default async function SponsorDetailPage({ params }: PageProps<"/we-sponsor/[slug]">) {
  const { slug } = await params;
  const found = await findSponsor(slug);
  if (!found) notFound();

  return <SponsorDetailClient sponsor={found.sponsor} contentHtml={found.html || `<p>${found.sponsor.detail}</p>`} />;
}
