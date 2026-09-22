"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import HomeBrandButton from "@/src/app/(home)/_componts/shared/HomeBrandButton";
import LatestBlogCards from "@/src/app/blog/_compoents/LatestBlogCards";
import { getIcon } from "./icons";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

/* ------------------------------------------------------------------ */
/* services.cards                                                      */
/* ------------------------------------------------------------------ */

export type ServiceCardsData = {
  eyebrow: string;
  heading: string;
  items: { id: string; title: string; shortTitle: string; icon: string; description: string }[];
};

export function ServiceCards({ data }: { data: ServiceCardsData }) {
  return (
    <section id="services" className="border-y border-white/10 bg-slate-900/35 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...reveal} className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">{data.eyebrow}</p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{data.heading}</h2>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {data.items.map((service, index) => {
            const Icon = getIcon(service.icon);

            return (
              <motion.article
                key={`${service.id}-${index}`}
                {...reveal}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.04, 0.2),
                }}
                className="
              group rounded-3xl
              border border-white/10
              bg-slate-950/60
              p-6
              transition
              hover:-translate-y-1
              hover:border-cyan-300/35
              hover:bg-slate-900
            "
              >
                <div className="flex gap-4">
                  <div
                    className="
                  grid h-12 w-12 shrink-0
                  place-items-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-300/20
                  to-fuchsia-300/20
                  text-cyan-200
                "
                  >
                    <Icon size={22} />
                  </div>

                  <div>
                    <p
                      className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-fuchsia-300
                  "
                    >
                      {String(index + 1).padStart(2, "0")}
                      {" · "}
                      {service.shortTitle}
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>

                <p
                  className="
                mt-5
                text-sm
                leading-7
                text-slate-300
              "
                >
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* text.responsive                                                     */
/* ------------------------------------------------------------------ */

export type ResponsiveTextData = {
  eyebrow: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  quote: string;
  outcomes: { title: string; description: string }[];
};

export function ResponsiveText({ data }: { data: ResponsiveTextData }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
        <motion.div {...reveal}>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">{data.eyebrow}</p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">{data.heading}</h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">{data.paragraph1}</p>

          {data.paragraph2 && <p className="mt-4 leading-7 text-slate-400">{data.paragraph2}</p>}

          {data.quote && (
            <p
              className="
        mt-6
        border-l-2
        border-fuchsia-300/60
        pl-4
        text-sm
        leading-7
        text-slate-300
      "
            >
              {data.quote}
            </p>
          )}
        </motion.div>

        <motion.div {...reveal} transition={{ delay: 0.1 }} className="grid gap-4 sm:grid-cols-3">
          {data.outcomes.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-b
          from-white/[.06]
          to-white/[.02]
          p-6
        "
            >
              <div
                className="
            mb-10
            text-4xl
            font-bold
            text-cyan-300/80
          "
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3 className="text-lg font-bold">{item.title}</h3>

              <p
                className="
            mt-3
            text-sm
            leading-6
            text-slate-400
          "
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* cta.e2e                                                             */
/* ------------------------------------------------------------------ */

export type E2eCtaData = { eyebrow: string; text: string; buttonText: string; buttonLink: string };

export function E2eCta({ data }: { data: E2eCtaData }) {
  return (
    <section className="bg-slate-900/35 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">{data.eyebrow}</p>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">{data.text}</p>

        {data.buttonText && (
          <div className="mt-9">
            <HomeBrandButton href={data.buttonLink || "/"}>
              {data.buttonText}
              <ArrowRight size={16} />
            </HomeBrandButton>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* pricing.plans                                                       */
/* ------------------------------------------------------------------ */

export type PlanCardsData = {
  heading: string;
  items: { name: string; price: string; audience: string }[];
  detailsText: string;
  detailsLink: string;
  purchaseText: string;
};

export function PlanCards({ data }: { data: PlanCardsData }) {
  const [loading, setLoading] = useState<string | null>(null);

  async function checkout(plan: { name: string }) {
    try {
      setLoading(plan.name);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: plan.name }),
      });

      const json = await response.json();

      if (!response.ok || !json.url) {
        throw new Error(json.error || "Checkout failed");
      }

      window.location.assign(json.url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...reveal} className="text-center">
          <h2 className="mt-4 text-4xl font-bold tracking-tight">{data.heading}</h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((plan, index) => (
            <motion.article
              key={`${plan.name}-${index}`}
              {...reveal}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative rounded-3xl border p-6 border-white/10 bg-slate-900/60 hover:border-cyan-300/50 bg-gradient-to-b from-cyan-300/15 to-slate-900 shadow-[0_20px_60px_rgba(34,211,238,.12)]"
            >
              <p className="text-sm font-bold text-slate-300">{plan.name}</p>

              <p className="mt-5 text-4xl font-bold">{plan.price}</p>

              <p className="mt-2 text-sm text-slate-400">{plan.audience}</p>

              <div className="my-7 h-px bg-white/10" />

              <div className="flex flex-wrap gap-4">
                <Link
                  href={data.detailsLink || "/end-to-end-digital-marketing-plans"}
                  className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-slate-300
              transition
              hover:text-white
            "
                >
                  {data.detailsText}

                  <ArrowRight size={15} />
                </Link>

                <button
                  onClick={() => checkout(plan)}
                  disabled={loading === plan.name}
                  className="
  inline-flex
  items-center
  gap-2
  text-sm
  font-bold
  text-cyan-300
  transition
  hover:text-white
  disabled:opacity-50
"
                >
                  {loading === plan.name ? "Processing..." : data.purchaseText}

                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* blog.section                                                        */
/* ------------------------------------------------------------------ */

export type BlogRowData = {
  eyebrow: string;
  heading: string;
  limit: number;
  buttonText: string;
  buttonLink: string;
};

export function BlogRow({ data }: { data: BlogRowData }) {
  return (
    <section className="bg-slate-900/35 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">{data.eyebrow}</p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">{data.heading}</h2>
          </div>

          {data.buttonText && (
            <HomeBrandButton href={data.buttonLink || "/blog"} variant="outline">
              {data.buttonText}
            </HomeBrandButton>
          )}
        </div>

        <div className="mt-10">
          <LatestBlogCards limit={data.limit || 3} />
        </div>
      </div>
    </section>
  );
}
