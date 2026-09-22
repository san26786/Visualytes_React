"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";

/* ------------------------------------------------------------------ */
/* about.video                                                         */
/* ------------------------------------------------------------------ */

export type AboutVideoData = {
  heading: string;
  subheading: string;
  description: string;
  videoPath: string;
};

export function AboutVideo({ data }: { data: AboutVideoData }) {
  return (
    <section className="py-20">
      <div className="relative mx-auto max-w-8xl px-18">
        <motion.div {...sectionReveal} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">{data.heading}</h2>
            <h3 className="text-2xl font-semibold text-cyan-300 mb-6">{data.subheading}</h3>
            <p className="text-slate-300 text-lg leading-relaxed">{data.description}</p>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 blur-xl" />

            {data.videoPath && (
              <video
                className="relative h-[700px] w-full rounded-2xl border border-slate-800 object-cover shadow-2xl"
                src={data.videoPath}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* services.imageGrid                                                  */
/* ------------------------------------------------------------------ */

export type ServiceImageGridData = {
  heading: string;
  subheading: string;
  items: { title: string; description: string; image: string }[];
};

export function ServiceImageGrid({ data }: { data: ServiceImageGridData }) {
  return (
    <section className="py-20">
      <div className="relative mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{data.heading}</h2>
          <p className="text-xl text-slate-300">{data.subheading}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <div className="relative h-80 w-60 overflow-hidden mx-auto">
                {service.image && (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-300">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* clients.showcase                                                    */
/* ------------------------------------------------------------------ */

export type ClientShowcaseData = {
  badges: { name: string; image: string }[];
  heading: string;
  subheading: string;
  chipLabel: string;
  items: { name: string; description: string; responsibilities: string[]; image: string }[];
};

function ReviewBadges({ badges }: { badges: { name: string; image: string }[] }) {
  return (
    <section className="overflow-hidden py-16 ">
      <div className="mx-auto max-w-[1620px] px-6 bg-white">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {badges.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="
                flex
                h-28
                w-52
                shrink-0
                items-center
                justify-center
                p-5
              "
            >
              {logo.image && (
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={180}
                  height={80}
                  className="
                  h-16
                  w-auto
                  object-contain
                "
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClientShowcase({ data }: { data: ClientShowcaseData }) {
  return (
    <section className="py-20 bg-slate-900/30">
      {data.badges.length > 0 && <ReviewBadges badges={data.badges} />}
      <div className="relative mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{data.heading}</h2>
          <p className="text-xl text-slate-300">{data.subheading}</p>
        </motion.div>

        <div className="space-y-24">
          {data.items.map((client, index) => (
            <motion.div
              key={`${client.name}-${index}`}
              {...sectionReveal}
              transition={{ delay: index * 0.08 }}
              className={`grid items-center gap-16 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-3xl" />

                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 p-10">
                  {client.image && (
                    <Image
                      src={client.image}
                      alt={client.name}
                      width={600}
                      height={600}
                      className="mx-auto h-[520px] w-auto object-contain transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
              </div>

              <div>
                {data.chipLabel && (
                  <span className="mb-4 inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                    {data.chipLabel}
                  </span>
                )}

                <h3 className="mb-6 text-5xl font-bold text-white">{client.name}</h3>

                <p className="mb-8 text-lg leading-8 text-slate-400">{client.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  {client.responsibilities.map((item, i) => (
                    <div
                      key={`${item}-${i}`}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4"
                    >
                      <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      <span className="text-sm text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* awards.grid                                                         */
/* ------------------------------------------------------------------ */

export type AwardsData = {
  heading: string;
  subheading: string;
  items: { title: string; rank: string }[];
};

export function AwardsGrid({ data }: { data: AwardsData }) {
  return (
    <section className="py-16 bg-slate-900/30">
      <div className="relative mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{data.heading}</h2>
          <p className="text-xl text-slate-300">{data.subheading}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center hover:border-cyan-300/40 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyan-300">🏆</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
              {award.rank && <p className="text-cyan-300 font-semibold text-lg">{award.rank}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* text.highlight                                                      */
/* ------------------------------------------------------------------ */

export type HighlightTextData = { heading: string; subheading: string };

export function HighlightText({ data }: { data: HighlightTextData }) {
  return (
    <section className="py-16">
      <div className="relative mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{data.heading}</h2>
          <p className="text-2xl text-cyan-300 font-semibold mb-6">{data.subheading}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* cta.gradient                                                        */
/* ------------------------------------------------------------------ */

export type GradientCtaData = {
  badge: string;
  heading: string;
  textBefore: string;
  highlightText: string;
  textAfter: string;
  primaryText: string;
  primaryLink: string;
  secondaryText: string;
  secondaryLink: string;
};

export function GradientCta({ data }: { data: GradientCtaData }) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-700" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        {data.badge && (
          <span className="mb-4 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium uppercase tracking-[0.2em] text-cyan-100 backdrop-blur">
            {data.badge}
          </span>
        )}

        <h2 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">{data.heading}</h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-cyan-50/90 md:text-xl">
          {data.textBefore}
          {data.highlightText && (
            <>
              {" "}
              <span className="font-semibold text-white">{data.highlightText}</span>
            </>
          )}
          {data.textAfter && <> {data.textAfter}</>}
        </p>

        <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row">
          {data.primaryText && (
            <Link
              href={data.primaryLink || "/estimate-project"}
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-slate-900 transition-all duration-300 hover:scale-105 hover:bg-cyan-50"
            >
              {data.primaryText}
            </Link>
          )}

          {data.secondaryText && (
            <a
              href={data.secondaryLink || "#"}
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/10"
            >
              {data.secondaryText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* faq.accordion                                                       */
/* ------------------------------------------------------------------ */

export type FaqData = {
  heading: string;
  items: { question: string; answer: string }[];
};

export function FaqAccordion({ data }: { data: FaqData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="relative mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{data.heading}</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {data.items.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/30 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                <ChevronDown
                  className={`w-6 h-6 text-cyan-300 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
