"use client";

import type { ComponentType } from "react";

import AppointmentTalk from "@/src/app/(home)/_componts/AppointmentTalk";
import ClientSlider from "@/src/app/(home)/_componts/ClientSlider";
import ProcessSection from "@/src/app/(home)/_componts/ProcessSection";
import TestimonialsSection from "@/src/app/(home)/_componts/TestimonialsSection";
import type { Offer } from "@/src/app/packages/data/offer";
import Portfolio from "@/src/app/portfolio/_components/Portfolio";
import AboveFooter from "@/src/common/components/layouts/AboveFooter";
import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import { resolveSectionData } from "@/src/lib/services/sections/normalize";
import type { SectionData, SectionInstance } from "@/src/lib/services/sections/types";

import { ArticleSection } from "./ArticleSection";
import { BlogCards, CaseGrid, HighlightTiles, PartnerSegments, ProductGrid, QuoteGrid, TechSplit } from "./BespokeSections";
import { ArchiveHero, CenteredHero, OrbitHero, SplitHero } from "./HeroSections";
import { BlogRow, E2eCta, PlanCards, ResponsiveText, ServiceCards } from "./MarketingSections";
import { AboutVideo, AwardsGrid, ClientShowcase, FaqAccordion, GradientCta, HighlightText, ServiceImageGrid } from "./MobileSections";
import {
  BestDesignSplit,
  Certifications,
  ClientLogos,
  ImageCardGrid,
  ImageTriple,
  OffersSection,
  PortfolioFilter,
  TechGrid,
  WhyUsStats,
} from "./WebSections";

export type RenderContext = {
  /** Live packages for the "pricing.offers" section (falls back to the static list when empty). */
  offers?: Offer[];
};

type SectionComponent = ComponentType<{ data: never; ctx: RenderContext }>;

const wrap =
  <T,>(Component: ComponentType<{ data: T }>): SectionComponent =>
  // eslint-disable-next-line react/display-name
  ({ data }) => <Component data={data as T} />;

const embed = (Component: ComponentType): SectionComponent =>
  // eslint-disable-next-line react/display-name
  () => <Component />;

const RENDERERS: Record<string, SectionComponent> = {
  "hero.centered": wrap(CenteredHero),
  "hero.split": wrap(SplitHero),
  "hero.orbit": wrap(OrbitHero),
  "hero.archive": wrap(ArchiveHero),
  "article.standard": wrap(ArticleSection),
  "about.video": wrap(AboutVideo),
  "text.highlight": wrap(HighlightText),
  "split.bestDesign": wrap(BestDesignSplit),
  "text.responsive": wrap(ResponsiveText),
  "partner.segments": wrap(PartnerSegments),
  "technology.split": wrap(TechSplit),
  "cards.imageTriple": wrap(ImageTriple),
  "grid.imageCards": wrap(ImageCardGrid),
  "services.imageGrid": wrap(ServiceImageGrid),
  "services.cards": wrap(ServiceCards),
  "highlights.icons": wrap(HighlightTiles),
  "cases.grid": wrap(CaseGrid),
  "products.grid": wrap(ProductGrid),
  "awards.grid": wrap(AwardsGrid),
  "cards.certifications": wrap(Certifications),
  "clients.showcase": wrap(ClientShowcase),
  "portfolio.filter": wrap(PortfolioFilter),
  "logos.techGrid": wrap(TechGrid),
  "logos.clients": wrap(ClientLogos),
  "stats.whyUs": wrap(WhyUsStats),
  "testimonials.quotes": wrap(QuoteGrid),
  "pricing.offers": ({ data, ctx }) => <OffersSection data={data as never} offers={ctx.offers} />,
  "pricing.plans": wrap(PlanCards),
  "cta.gradient": wrap(GradientCta),
  "cta.e2e": wrap(E2eCta),
  "faq.accordion": wrap(FaqAccordion),
  "blog.cards": wrap(BlogCards),
  "blog.section": wrap(BlogRow),
  "embed.process": embed(ProcessSection),
  "embed.portfolio": embed(Portfolio),
  "embed.testimonials": embed(TestimonialsSection),
  "embed.appointment": embed(AppointmentTalk),
  "embed.clients": embed(ClientSlider),
  "embed.aboveFooter": embed(AboveFooter),
};

export function SectionView({ section, ctx = {} }: { section: SectionInstance; ctx?: RenderContext }) {
  const Renderer = RENDERERS[section.type];
  if (!Renderer) return null;
  const data = resolveSectionData(section.type, section.data as SectionData);
  return <Renderer data={data as never} ctx={ctx} />;
}

export function ServiceSections({
  sections,
  mainClass,
  ctx = {},
}: {
  sections: SectionInstance[];
  mainClass: string;
  ctx?: RenderContext;
}) {
  return (
    <main className={mainClass}>
      <BrandPageBackdrop />

      <div className="relative z-10">
        {sections
          .filter((section) => section.enabled)
          .map((section) => (
            <SectionView key={section.id} section={section} ctx={ctx} />
          ))}
      </div>
    </main>
  );
}
