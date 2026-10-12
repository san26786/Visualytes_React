import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import { BRAND_SURFACE, BRAND_TEXT } from "@/src/common/components/ui/brand/theme";
import { getCaseStudyBySlug } from "@/src/lib/case-studies";
import { isExternalHref } from "@/src/lib/case-study-links";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = await getCaseStudyBySlug((await params).slug);
  if (!study) return { title: "Case Study | Visualytes" };
  return {
    title: `${study.title} | Case Study | Visualytes`,
    description: study.description || `${study.title} — ${study.category} by Visualytes.`,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const study = await getCaseStudyBySlug((await params).slug);
  if (!study) notFound();

  const liveSite = study.href && isExternalHref(study.href) ? study.href : null;

  return (
    <BrandSubPageShell title={study.title} eyebrow={study.category} subtitle={study.description ?? undefined}>
      <section className="px-4 pb-24 pt-4">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/case-study"
            className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Case Studies
          </Link>

          {study.image ? (
            // The image is a full-page screenshot of the project: let the visitor scroll through it.
            <div className={`max-h-[80vh] overflow-y-auto ${BRAND_SURFACE.glassCard}`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- full-page screenshot of unknown height */}
              <img src={study.image} alt={`${study.title} — full page`} className="block w-full" />
            </div>
          ) : (
            <div className={`flex h-80 items-center justify-center ${BRAND_SURFACE.glassCard}`}>
              <span className="text-sm text-slate-500">No Image</span>
            </div>
          )}

          <div className={`mx-auto mt-12 max-w-3xl px-6 py-10 text-center ${BRAND_SURFACE.sectionWrap}`}>
            <p className={BRAND_TEXT.sectionBody}>
              Like what we did for {study.title}? Let&apos;s talk about how we can help your business too.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {liveSite && (
                <a
                  href={liveSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/40 bg-fuchsia-300/10 px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-200 transition-all hover:border-fuchsia-300 hover:bg-fuchsia-300/20"
                >
                  Visit Website
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-300/20"
              >
                Start Your Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </BrandSubPageShell>
  );
}
