"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Globe, MonitorSmartphone, PoundSterling, Users, Zap } from "lucide-react";

import HomeBrandButton from "@/src/app/(home)/_componts/shared/HomeBrandButton";
import HomeSection from "@/src/app/(home)/_componts/shared/HomeSection";
import { popIn, staggerContainer } from "@/src/app/(home)/_componts/shared/motion";
import LatestBlogCards from "@/src/app/blog/_compoents/LatestBlogCards";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";
import { getIcon } from "./icons";

/* ------------------------------------------------------------------ */
/* highlights.icons                                                    */
/* ------------------------------------------------------------------ */

const HIGHLIGHT_ICONS = [Users, Globe, PoundSterling, Zap, Award, MonitorSmartphone];
/* Literal classes so Tailwind keeps them (mirrors ACCENT_OPTIONS in defs.ts). */
const HIGHLIGHT_ACCENTS = [
  "from-cyan-400 to-cyan-600",
  "from-fuchsia-400 to-pink-500",
  "from-violet-400 to-indigo-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-red-500",
];

export type HighlightTilesData = { items: string[] };

export function HighlightTiles({ data }: { data: HighlightTilesData }) {
  return (
    <section className="py-16 lg:py-20 bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.items.map((item, i) => {
            const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
            return (
              <motion.div
                key={`${item}-${i}`}
                custom={i}
                variants={popIn}
                className={`group relative overflow-hidden p-6  ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
              >
                <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${HIGHLIGHT_ACCENTS[i % HIGHLIGHT_ACCENTS.length]} shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <p className="text-base font-semibold leading-snug text-white">{item}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* partner.segments                                                    */
/* ------------------------------------------------------------------ */

export type PartnerSegmentsData = {
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  whoEyebrow: string;
  whoTitle: string;
  whoHighlight: string;
  whoSubtitle: string;
  segments: { title: string; icon: string; accent: string }[];
};

export function PartnerSegments({ data }: { data: PartnerSegmentsData }) {
  return (
    <section className="relative overflow-hidden py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid items-center gap-16 lg:grid-cols-2"
        >
          <div>
            <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300 mb-6">
              {data.eyebrow}
            </span>
            <h2 className="text-[32px] font-bold leading-tight text-white sm:text-[40px] lg:text-[44px]">
              {data.heading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">{data.description}</p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4  " />
            <div className="relative overflow-hidden ">
              <div className="relative aspect-[4/3]">
                {data.image && <Image src={data.image} alt={data.imageAlt} fill className="object-contain" />}
                <div className="absolute inset-0 " />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <HomeSection
        eyebrow={data.whoEyebrow}
        title={data.whoTitle}
        highlight={data.whoHighlight}
        subtitle={data.whoSubtitle}
        className="pb-0"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {data.segments.map((segment, i) => {
            const Icon = getIcon(segment.icon, Users);
            return (
              <motion.article
                key={`${segment.title}-${i}`}
                custom={i}
                variants={popIn}
                className={`group relative overflow-hidden p-8 text-left ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${segment.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                />
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${segment.accent} shadow-lg`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold leading-snug text-white group-hover:text-cyan-300 transition-colors">
                  {segment.title}
                </h3>
              </motion.article>
            );
          })}
        </motion.div>
      </HomeSection>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* cases.grid                                                          */
/* ------------------------------------------------------------------ */

export type CaseGridData = {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  items: { title: string; subtitle: string; description: string; image: string; href: string }[];
};

export function CaseGrid({ data }: { data: CaseGridData }) {
  return (
    <section className="relative overflow-hidden bg-slate-900/30 py-10">
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-cyan-500/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-fuchsia-500/8 blur-[90px]" />

      <HomeSection eyebrow={data.eyebrow} title={data.title} highlight={data.highlight} subtitle={data.subtitle}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {data.items.map((study, i) => (
            <motion.a
              key={`${study.title}-${i}`}
              href={study.href || undefined}
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              variants={popIn}
              className={`group relative flex flex-col overflow-hidden text-left ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
            >
              <div className="relative h-[220px] overflow-hidden bg-slate-950">
                {study.image && (
                  <Image
                    src={study.image}
                    alt={study.subtitle}
                    fill
                    loading="lazy"
                    sizes="(max-width:768px) 200vw, 33vw"
                    className={`object-cover transition-transform duration-700 ${BRAND_HOVER.image}`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="mb-2 inline-flex w-fit rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  {study.subtitle}
                </span>
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-300">
                  {study.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{study.description}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </HomeSection>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* products.grid                                                       */
/* ------------------------------------------------------------------ */

export type ProductGridData = {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  items: { title: string; description: string; image: string }[];
};

export function ProductGrid({ data }: { data: ProductGridData }) {
  return (
    <section className="relative overflow-hidden py-10">
      <HomeSection eyebrow={data.eyebrow} title={data.title} highlight={data.highlight} subtitle={data.subtitle}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {data.items.map((product, i) => (
            <motion.article
              key={`${product.title}-${i}`}
              custom={i}
              variants={popIn}
              className={`group relative overflow-hidden text-left ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
            >
              <div className="relative h-[200px] overflow-hidden border-b border-white/10 bg-slate-950/80">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    loading="lazy"
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-300">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{product.description}</p>
              </div>

              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:bg-fuchsia-500/30" />
            </motion.article>
          ))}
        </motion.div>
      </HomeSection>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* testimonials.quotes                                                 */
/* ------------------------------------------------------------------ */

export type QuoteGridData = {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  items: { quote: string; name: string; role: string }[];
};

export function QuoteGrid({ data }: { data: QuoteGridData }) {
  return (
    <section className="relative overflow-hidden bg-slate-900/30 py-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />

      <HomeSection eyebrow={data.eyebrow} title={data.title} highlight={data.highlight} subtitle={data.subtitle}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 md:grid-cols-3"
        >
          {data.items.map((item, i) => (
            <motion.blockquote
              key={`${item.name}-${i}`}
              custom={i}
              variants={popIn}
              className={`relative flex flex-col p-8 text-left ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
            >
              <span className="absolute -right-2 -top-2 text-5xl text-fuchsia-400/40">&rdquo;</span>
              <p className="flex-1 text-sm italic leading-7 text-slate-300">{item.quote}</p>
              <footer className="mt-6 border-t border-white/10 pt-6">
                <cite className="not-italic">
                  <p className="text-lg font-semibold text-white">{item.name}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">{item.role}</p>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </HomeSection>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* technology.split                                                    */
/* ------------------------------------------------------------------ */

export type TechSplitData = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  stack: { label: string; icon: string }[];
  buttonText: string;
  buttonLink: string;
};

export function TechSplit({ data }: { data: TechSplitData }) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="mx-auto max-w-7xl ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid items-center gap-16 lg:grid-cols-2"
        >
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/10 to-purple-500/20 blur-2xl" />
            <div className="relative overflow-hidden ">
              <div className="relative aspect-square">
                {data.image && <Image src={data.image} alt={data.imageAlt} fill className="object-contain" />}
                <div className="absolute inset-0 h-full bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {data.stack.map(({ label, icon }, i) => {
                const Icon = getIcon(icon);
                return (
                  <div
                    key={`${label}-${i}`}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                  >
                    <Icon className="h-5 w-5 text-cyan-300" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block rounded-full border border-purple-300/30 bg-purple-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-purple-300 mb-6">
              {data.eyebrow}
            </span>
            <h2 className="text-[28px] font-bold leading-tight text-white sm:text-[36px] lg:text-[40px]">
              {data.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">{data.description}</p>
            {data.buttonText && (
              <div className="mt-8">
                <HomeBrandButton href={data.buttonLink || "/contact-us"}>{data.buttonText}</HomeBrandButton>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* blog.cards                                                          */
/* ------------------------------------------------------------------ */

export type BlogCardsData = {
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  limit: number;
  buttonText: string;
  buttonLink: string;
};

export function BlogCards({ data }: { data: BlogCardsData }) {
  return (
    <section className="relative overflow-hidden bg-slate-900/30 py-10">
      <HomeSection eyebrow={data.eyebrow} title={data.title} highlight={data.highlight} subtitle={data.subtitle}>
        <LatestBlogCards
          limit={data.limit || 4}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
        />

        {data.buttonText && (
          <div className="mt-12 flex justify-center">
            <HomeBrandButton href={data.buttonLink || "/blog"} variant="outline">
              {data.buttonText}
            </HomeBrandButton>
          </div>
        )}
      </HomeSection>
    </section>
  );
}
