"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";

import HomeBrandButton from "@/src/app/(home)/_componts/shared/HomeBrandButton";
import { offers as staticOffers, type Offer } from "@/src/app/packages/data/offer";
import { sectionReveal } from "@/src/common/components/ui/brand/page-effects";
import { BRAND_HOVER } from "@/src/common/components/ui/brand/theme";

/* ------------------------------------------------------------------ */
/* cards.imageTriple                                                   */
/* ------------------------------------------------------------------ */

export type ImageTripleData = {
  items: { title: string; subtitle: string; description: string; icon: string }[];
};

export function ImageTriple({ data }: { data: ImageTripleData }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {data.items.map((item, index) => (
            <motion.div
              key={index}
              {...sectionReveal}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 p-8 shadow-[0_22px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl ${BRAND_HOVER.card}`}
            >
              <div className="relative h-64 w-full">
                {item.icon && <Image fill src={item.icon} alt={item.title} className="object-cover pb-4" />}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center mt-4">{item.title}</h3>
              <p className="text-cyan-300 font-semibold text-sm mb-4 text-center">{item.subtitle}</p>
              <p className="text-slate-300 text-center">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* grid.imageCards                                                     */
/* ------------------------------------------------------------------ */

export type ImageCardGridData = {
  eyebrow: string;
  heading: string;
  accent: string;
  headingEnd: string;
  items: { title: string; description: string; icon: string }[];
};

export function ImageCardGrid({ data }: { data: ImageCardGridData }) {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1820px] px-6">
        <motion.div {...sectionReveal} className="mb-16 text-center">
          <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300 mb-6">
            {data.eyebrow}
          </span>
          <h2 className="text-[40px] sm:text-[48px] font-bold text-white">
            {data.heading}{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
              {data.accent}
            </span>
            {data.headingEnd && <> {data.headingEnd}</>}
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((type, index) => (
            <motion.div
              key={index}
              {...sectionReveal}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl hover:border-cyan-400/40 transition-all"
            >
              <div className="relative h-84 w-full">
                {type.icon && <Image fill src={type.icon} alt={type.title || "what we do"} className="object-cover pb-4" />}
              </div>
              <p className="text-slate-400 text-lg leading-relaxed">{type.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* portfolio.filter                                                    */
/* ------------------------------------------------------------------ */

export type PortfolioFilterData = {
  eyebrow: string;
  heading: string;
  accent: string;
  categories: string[];
  projects: { title: string; categories: string[]; image: string }[];
  buttonText: string;
  buttonLink: string;
};

export function PortfolioFilter({ data }: { data: PortfolioFilterData }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? data.projects
      : data.projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="mb-16 text-center">
          <span className="inline-block rounded-full border border-pink-300/30 bg-pink-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-pink-300 mb-6">
            {data.eyebrow}
          </span>
          <h2 className="text-[40px] sm:text-[48px] font-bold text-white">
            {data.heading}{" "}
            <span className="bg-gradient-to-r from-pink-300 to-fuchsia-300 bg-clip-text text-transparent">
              {data.accent}
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {data.categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 text-sm font-bold transition-all duration-300 ${
                activeFilter === category
                  ? "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-lg"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              {...sectionReveal}
              transition={{ delay: index * 0.08 }}
              className={`group relative overflow-hidden  cursor-pointer ${BRAND_HOVER.card}`}
              onClick={() => project.image && window.open(project.image, "_blank")}
            >
              <div className="relative h-[380px] w-full bg-slate-950">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain  transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

                <div className="absolute bottom-0 left-0 right-0 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 p-6">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {data.buttonText && (
        <div className="mt-12 flex justify-center">
          <HomeBrandButton href={data.buttonLink || "/portfolio"} variant="outline">
            {data.buttonText}
          </HomeBrandButton>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* pricing.offers  (cards come live from the Packages tab)             */
/* ------------------------------------------------------------------ */

export type OffersData = {
  eyebrow: string;
  heading: string;
  accent: string;
  headingEnd: string;
  limit: number;
  priceSuffix: string;
  buttonText: string;
  moreText: string;
  moreLink: string;
};

export function OffersSection({ data, offers }: { data: OffersData; offers?: Offer[] }) {
  const router = useRouter();
  const list = (offers ?? staticOffers).slice(0, data.limit || 4);

  const handleCheckout = async (offer: Offer) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: offer.name }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Unable to start checkout.");
      }

      if (json.url) {
        router.push(json.url);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="mb-16 text-center">
          <span className="mb-6 inline-block rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-fuchsia-300">
            {data.eyebrow}
          </span>

          <h2 className="text-[40px] font-bold text-white sm:text-[48px]">
            {data.heading}{" "}
            <span className="bg-gradient-to-r from-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
              {data.accent}
            </span>
            {data.headingEnd && <> {data.headingEnd}</>}
          </h2>
        </motion.div>

        <div className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-4">
          {list.map((offer, index) => (
            <motion.div
              key={index}
              {...sectionReveal}
              transition={{ delay: index * 0.1 }}
              className={`
                group relative flex h-full flex-col overflow-hidden
                rounded-3xl border border-cyan-400/50
                bg-gradient-to-b from-cyan-500/10 to-slate-900/80
                p-8 backdrop-blur-xl
                shadow-[0_22px_60px_rgba(2,6,23,0.55)]
                ${BRAND_HOVER.card}
              `}
            >
              <div className="flex h-full flex-col">
                <div className="flex h-16 items-start">
                  <h3 className="text-2xl font-bold leading-tight text-white">{offer.name}</h3>
                </div>

                <div className="relative mb-6 h-px overflow-hidden rounded-full bg-white/10">
                  <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-transparent" />
                </div>

                <div className="mb-8 flex h-16 items-end gap-1">
                  <span className="text-5xl font-bold text-white">{offer.price}</span>
                  <span className="mb-1 text-sm text-slate-400">{data.priceSuffix}</span>
                </div>

                <ul className="flex-1">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex min-h-[42px] items-start gap-3 text-sm text-slate-300">
                      <div
                        className="
                          mt-0.5 flex h-5 w-5 flex-shrink-0
                          items-center justify-center
                          rounded-full
                          bg-gradient-to-r
                          from-cyan-500
                          to-fuchsia-500
                        "
                      >
                        <span className="text-xs font-bold text-white">✓</span>
                      </div>

                      <span
                        className={`leading-6 ${
                          feature.disabled ? "text-slate-500 line-through" : "text-slate-300"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleCheckout(offer)}
                  className="
                    mt-8 w-full rounded-xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-fuchsia-500
                    px-6 py-4
                    font-bold text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:opacity-90
                  "
                >
                  {data.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {data.moreText && (
          <div className="mt-12 flex justify-center">
            <HomeBrandButton href={data.moreLink || "/packages"} variant="outline">
              {data.moreText}
            </HomeBrandButton>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* stats.whyUs                                                         */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px -100px 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span
      ref={ref}
      className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent"
    >
      {count}
      {suffix}
    </span>
  );
}

export type WhyUsData = {
  eyebrow: string;
  heading: string;
  accent: string;
  headingEnd: string;
  paragraph1: string;
  paragraph2: string;
  stats: { number: number; label: string }[];
};

export function WhyUsStats({ data }: { data: WhyUsData }) {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div {...sectionReveal}>
            <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300 mb-6">
              {data.eyebrow}
            </span>
            <h2 className="text-[40px] sm:text-[48px] font-bold text-white mb-6">
              {data.heading}{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                {data.accent}
              </span>
              {data.headingEnd && <> {data.headingEnd}</>}
            </h2>
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">{data.paragraph1}</p>
            {data.paragraph2 && <p className="text-slate-300 text-lg leading-relaxed">{data.paragraph2}</p>}
          </motion.div>

          <motion.div {...sectionReveal} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-6">
            {data.stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-3 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl"
              >
                <AnimatedCounter target={stat.number} />
                <p className="text-slate-400 font-medium mt-2 text-xs sm:text-base">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* split.bestDesign                                                    */
/* ------------------------------------------------------------------ */

function Divider({ white = false }: { white?: boolean }) {
  return (
    <div className="flex items-center justify-center mt-8 mb-10">
      <div className={`w-9 h-[2px] ${white ? "bg-white" : "bg-[#0699b8]"}`} />
      <div className={`mx-2 w-3 h-3 rounded-full border-2 ${white ? "border-white" : "border-[#0699b8]"}`} />
      <div className={`w-9 h-[2px] ${white ? "bg-white" : "bg-[#0699b8]"}`} />
    </div>
  );
}

export type BestDesignData = {
  leftTitle: string;
  leftText: string;
  rightTitle: string;
  rightText: string;
};

export function BestDesignSplit({ data }: { data: BestDesignData }) {
  return (
    <section className="w-full">
      <div className="grid lg:grid-cols-2">
        <div className="bg-[#0797B5] min-h-[520px] flex items-center justify-end">
          <div className="w-full max-w-[560px] px-12 text-right">
            <h2 className="text-[48px] font-semibold text-white">{data.leftTitle}</h2>

            <div className="flex justify-end">
              <Divider white />
            </div>

            <p className="text-[18px] leading-[2.1] text-white font-serif">{data.leftText}</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#fafafa] min-h-[520px] flex items-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-10 left-24 w-12 h-12 rotate-45 border-2 border-gray-300"></div>
            <div className="absolute top-10 right-32 w-14 h-14 rotate-45 border-2 border-gray-300"></div>
            <div className="absolute top-32 left-1/3 w-12 h-12 border-2 border-gray-300 rounded-xl rotate-12"></div>
            <div className="absolute top-20 right-16 w-12 h-12 rounded-full border-2 border-gray-300"></div>
            <div className="absolute bottom-20 right-20 text-6xl font-light text-gray-300">+</div>
            <div className="absolute bottom-20 left-28 w-10 h-10 rotate-45 border-2 border-gray-300"></div>
            <div className="absolute top-44 right-56 h-12 border border-gray-300 rotate-25"></div>
          </div>

          <div className="relative w-full max-w-[560px] px-12">
            <h2 className="text-[48px] font-semibold text-[#0699b8]">{data.rightTitle}</h2>

            <div className="flex justify-start">
              <Divider />
            </div>

            <p className="text-[18px] leading-[2.1] text-[#14498b] font-serif">{data.rightText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* logos.techGrid                                                      */
/* ------------------------------------------------------------------ */

export type TechGridData = {
  eyebrow: string;
  heading: string;
  accent: string;
  items: { title: string; image: string }[];
};

export function TechGrid({ data }: { data: TechGridData }) {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-9xl px-6">
        <motion.div {...sectionReveal} className="mb-16 text-center">
          <span className="inline-block rounded-full border border-green-300/30 bg-green-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-green-300 mb-6">
            {data.eyebrow}
          </span>
          <h2 className="text-[40px] sm:text-[48px] font-bold text-white">
            {data.heading}{" "}
            <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
              {data.accent}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 bg-white  max-w-6xl mx-auto p-8">
          {data.items.map((tech, index) => (
            <motion.div
              key={index}
              {...sectionReveal}
              transition={{ delay: index * 0.05 }}
              className="group flex flex-col items-center justify-center p-9   bg-white backdrop-blur-xl hover:border-cyan-400/40 hover:bg-white transition-all"
            >
              <div>
                {tech.image && (
                  <Image
                    fill
                    src={tech.image}
                    alt={tech.title || "tech icon"}
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>
              <span className="text-slate-300 font-semibold mt-9">{tech.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* logos.clients                                                       */
/* ------------------------------------------------------------------ */

export type ClientLogosData = {
  eyebrow: string;
  heading: string;
  accent: string;
  items: { name: string; logo: string }[];
  buttonText: string;
  buttonLink: string;
};

export function ClientLogos({ data }: { data: ClientLogosData }) {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="mb-16 text-center">
          <span className="inline-block rounded-full border border-yellow-300/30 bg-yellow-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-yellow-300 mb-6">
            {data.eyebrow}
          </span>
          <h2 className="text-[40px] sm:text-[48px] font-bold text-white">
            {data.heading}{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              {data.accent}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {data.items.map((client, index) => (
            <motion.div
              key={index}
              {...sectionReveal}
              transition={{ delay: index * 0.05 }}
              className="group flex flex-col items-center justify-center p-8 backdrop-blur-xl hover:border-yellow-400/40 transition-all h-40 w-full text-center"
            >
              {client.logo && (
                <Image
                  fill
                  src={client.logo}
                  alt={client.name || "tech icon"}
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {data.buttonText && (
        <div className="mt-12 flex justify-center">
          <HomeBrandButton href={data.buttonLink || "/clients"} variant="outline">
            {data.buttonText}
          </HomeBrandButton>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* cards.certifications                                                */
/* ------------------------------------------------------------------ */

export type CertificationsData = {
  eyebrow: string;
  heading: string;
  accent: string;
  items: { name: string; description: string; icon: string }[];
};

export function Certifications({ data }: { data: CertificationsData }) {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6">
        <motion.div {...sectionReveal} className="mb-16 text-center">
          <span className="inline-block rounded-full border border-purple-300/30 bg-purple-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-purple-300 mb-6">
            {data.eyebrow}
          </span>
          <h2 className="text-[40px] sm:text-[48px] font-bold text-white">
            {data.heading}{" "}
            <span className="bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
              {data.accent}
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 mx-auto text-center items-center">
          {data.items.map((cert, index) => (
            <motion.div
              key={index}
              {...sectionReveal}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col items-center text-center p-8 bg-slate-900/80 shadow-[0_22px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl hover:border-purple-400/40 transition-all h-50 w-40 gap-4"
            >
              {cert.icon && (
                <Image
                  fill
                  src={cert.icon}
                  alt={cert.name || "tech icon"}
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
              )}
              <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
              <p className="text-slate-400 text-sm">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
