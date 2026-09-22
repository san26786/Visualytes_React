"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Layers,
  Mail,
  MessageCircle,
  MousePointerClick,
  Search,
  Share2,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";

import HomeBrandButton from "@/src/app/(home)/_componts/shared/HomeBrandButton";
import { BrandArchiveHeader } from "@/src/common/components/ui/brand/BrandArchiveShell";

type Logo = { name: string; image: string };

/* ------------------------------------------------------------------ */
/* hero.centered                                                       */
/* ------------------------------------------------------------------ */

function LogoMarquee({ logos }: { logos: Logo[] }) {
  return (
    <section className="py-16 overflow-hidden">
      <div className="mx-auto max-w-[1620px]">
        <motion.div
          className="flex w-max gap-6"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex h-28 w-52 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={150}
                height={70}
                className="h-12 w-auto object-contain"
                unoptimized
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export type CenteredHeroData = {
  breadcrumbLabel: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  tagline: string;
  logos: Logo[];
  ctaText: string;
  ctaLink: string;
};

export function CenteredHero({ data }: { data: CenteredHeroData }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-fuchsia-500/25 blur-[100px]" />

      <div className="relative mx-auto max-w-[1320px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <ol className="relative z-10 mb-6 mt-8 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]">
            <li>
              <Link href="/" className="text-cyan-300 hover:text-white transition-colors duration-200">
                Home
              </Link>
            </li>
            <li className="text-white/30">●</li>
            <li className="text-white/60">{data.breadcrumbLabel}</li>
          </ol>

          <h1 className="relative z-10 max-w-5xl mx-auto text-[48px] sm:text-[56px] lg:text-[64px] font-bold leading-[1.1] tracking-tight text-white mb-6">
            {data.title}
            {data.titleAccent && (
              <>
                {" "}
                <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
                  {data.titleAccent}
                </span>
              </>
            )}
          </h1>

          <p className="relative z-10 max-w-3xl mx-auto text-xl text-slate-300 mb-10">{data.subtitle}</p>

          <div className="relative z-10 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300/80" />
          </div>

          {data.tagline && (
            <div className="relative z-10 mt-12">
              <p className="text-2xl font-bold text-cyan-300">{data.tagline}</p>
            </div>
          )}
          {data.logos.length > 0 && <LogoMarquee logos={data.logos} />}
        </motion.div>
        {data.ctaText && (
          <div className="mt-12 flex justify-center">
            <HomeBrandButton href={data.ctaLink || "/estimate-project"} variant="outline">
              {data.ctaText}
            </HomeBrandButton>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* hero.split                                                          */
/* ------------------------------------------------------------------ */

export type SplitHeroData = {
  breadcrumbLabel: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  image: string;
  imageAlt: string;
};

export function SplitHero({ data }: { data: SplitHeroData }) {
  return (
    <section className="relative mt-[130px] overflow-hidden pb-16 pt-10">
      <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-fuchsia-500/25 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <div className="text-center lg:text-left">
            <ol className="mb-6 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] lg:justify-start">
              <li>
                <Link href="/" className="text-cyan-300 transition-colors duration-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li className="text-white/30">●</li>
              <li>
                <Link
                  href="/our-services"
                  className="text-cyan-300 transition-colors duration-200 hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li className="text-white/30">●</li>
              <li className="text-white/60">{data.breadcrumbLabel}</li>
            </ol>

            <h1 className="text-[36px] font-bold leading-[1.1] tracking-tight text-white sm:text-[48px] lg:text-[56px]">
              {data.title}
              {data.titleAccent && (
                <>
                  {" "}
                  <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                    {data.titleAccent}
                  </span>
                </>
              )}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">{data.subtitle}</p>

            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300/80" />
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              {data.primaryCtaText && (
                <HomeBrandButton href={data.primaryCtaLink || "/"}>{data.primaryCtaText}</HomeBrandButton>
              )}
              {data.secondaryCtaText && (
                <HomeBrandButton href={data.secondaryCtaLink || "/"} variant="outline">
                  {data.secondaryCtaText}
                </HomeBrandButton>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/10 to-purple-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/60 backdrop-blur-xl">
              <div className="relative aspect-square overflow-hidden">
                {data.image && (
                  <Image src={data.image} alt={data.imageAlt} fill className="object-contain" priority />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* hero.orbit                                                          */
/* ------------------------------------------------------------------ */

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const ORBIT_ICONS = [Search, Share2, MousePointerClick, Layers, Video, Mail, MessageCircle, TrendingUp];

export type OrbitHeroData = {
  breadcrumbLabel: string;
  badge: string;
  title: string;
  titleAccent: string;
  paragraph1: string;
  paragraph2: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
};

export function OrbitHero({ data }: { data: OrbitHeroData }) {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-36 lg:pb-28 lg:pt-48">
      <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-10%] top-1/3 -z-10 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.02fr_.98fr] lg:px-10">
        <motion.div {...reveal} transition={{ duration: 0.55 }}>
          <nav
            aria-label="Breadcrumb"
            className="mb-7 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400"
          >
            <Link href="/" className="transition hover:text-cyan-300">
              Home
            </Link>
            <ChevronRight size={13} />
            <Link href="/our-services" className="transition hover:text-cyan-300">
              Services
            </Link>
            <ChevronRight size={13} />
            <span className="text-cyan-200">{data.breadcrumbLabel}</span>
          </nav>

          {data.badge && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">
              <Sparkles size={14} />
              {data.badge}
            </div>
          )}

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
            {data.title}
            {data.titleAccent && (
              <>
                {" "}
                <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-fuchsia-300 bg-clip-text text-transparent">
                  {data.titleAccent}
                </span>
              </>
            )}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">{data.paragraph1}</p>

          {data.paragraph2 && (
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">{data.paragraph2}</p>
          )}

          <div className="mt-9 flex flex-wrap gap-4">
            {data.primaryCtaText && (
              <HomeBrandButton href={data.primaryCtaLink || "/contact-us"}>
                {data.primaryCtaText}
                <ArrowRight size={16} />
              </HomeBrandButton>
            )}
            {data.secondaryCtaText && (
              <HomeBrandButton href={data.secondaryCtaLink || "#"} variant="outline">
                {data.secondaryCtaText}
              </HomeBrandButton>
            )}
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-br from-cyan-400/25 via-transparent to-fuchsia-500/25 blur-2xl" />

          <div
            aria-hidden="true"
            className="relative grid aspect-square place-items-center overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/85 shadow-[0_30px_90px_rgba(2,6,23,.65)] backdrop-blur-xl"
          >
            <div className="absolute h-48 w-48 rounded-full border border-cyan-300/30" />
            <div className="absolute h-80 w-80 rounded-full border border-fuchsia-300/20" />
            <div className="absolute h-[29rem] w-[29rem] rounded-full border border-white/10" />

            <div className="relative grid h-24 w-24 place-items-center rounded-[2rem] bg-gradient-to-br from-cyan-300 to-fuchsia-400 text-slate-950 shadow-[0_0_70px_rgba(34,211,238,.45)]">
              <Sparkles size={38} />
            </div>

            {ORBIT_ICONS.map((Icon, index) => (
              <div
                key={`orbit-icon-${index}`}
                className="absolute grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-slate-950/90 text-cyan-200 shadow-xl"
                style={{
                  transform: `
                rotate(${index * 45}deg)
                translateY(-142px)
                rotate(-${index * 45}deg)
              `,
                }}
              >
                <Icon size={20} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* hero.archive                                                        */
/* ------------------------------------------------------------------ */

export type ArchiveHeroData = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  breadcrumbLabel: string;
};

export function ArchiveHero({ data }: { data: ArchiveHeroData }) {
  return (
    <BrandArchiveHeader
      title={data.title}
      titleAccent={data.titleAccent || undefined}
      eyebrow={data.eyebrow || undefined}
      subtitle={data.subtitle || undefined}
      breadcrumbs={[
        { label: "Services", href: "/our-services" },
        { label: data.breadcrumbLabel || data.title },
      ]}
    />
  );
}
