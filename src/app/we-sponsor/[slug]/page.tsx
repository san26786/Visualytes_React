import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SponsorDetailClient from "../SponsorDetailClient";
import { sponsorContentById } from "../sponsor-content";
import { getSponsorship, sponsorships } from "../sponsor-data";

export function generateStaticParams() {
  return sponsorships.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: PageProps<"/we-sponsor/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const sponsor = getSponsorship(slug);
  return sponsor ? { title: `${sponsor.title} | We Sponsor`, description: sponsor.detail } : {};
}

export default async function SponsorDetailPage({ params }: PageProps<"/we-sponsor/[slug]">) {
  const { slug } = await params;
  const sponsor = getSponsorship(slug);
  if (!sponsor) notFound();

  return <SponsorDetailClient sponsor={sponsor} contentHtml={sponsorContentById[sponsor.postId] || `<p>${sponsor.detail}</p>`} />;
}
