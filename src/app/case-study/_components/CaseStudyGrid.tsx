"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import {
  BRAND_MOTION,
  BRAND_SURFACE,
  BRAND_TEXT,
} from "@/src/common/components/ui/brand/theme";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  image: string | null;
  href: string | null;
  accent: string | null;
  tag: string | null;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function CaseStudyGrid() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadCaseStudies = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/admin/case-studies",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch case studies"
          );
        }

        const data: CaseStudy[] =
          await response.json();

        if (!mounted) return;

        const activeCaseStudies = data
          .filter((item) => item.isActive)
          .sort(
            (a, b) =>
              a.sortOrder - b.sortOrder
          );

        setCaseStudies(activeCaseStudies);
      } catch (error) {
        console.error(
          "Failed to load case studies:",
          error
        );

        if (mounted) {
          setCaseStudies([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCaseStudies();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="px-4 pb-24 pt-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-6 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />

            Selected Projects
          </span>

          <p
            className={`mx-auto max-w-2xl ${BRAND_TEXT.sectionBody}`}
          >
            Visualytes is not just another IT agency —
            we work with a different approach to your
            requirement, and 99 out of 100 times we
            exceed our clients&apos; expectations.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[260px] animate-pulse rounded-2xl bg-slate-800/40 sm:h-[320px]"
              />
            ))}
          </div>
        )}

        {/* No case studies */}
        {!loading &&
          caseStudies.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">
              <p className="text-sm text-slate-400">
                No case studies available.
              </p>
            </div>
          )}

        {/* Case Studies */}
        {!loading &&
          caseStudies.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {caseStudies.map(
                (study, index) => (
                  <motion.div
                    key={study.id}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: "-40px",
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    className={
                      index === 0
                        ? "md:row-span-2"
                        : ""
                    }
                  >
                    <Link
                      href={
                        study.href ||
                        "/portfolio"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative block overflow-hidden ${BRAND_SURFACE.glassCard} ${BRAND_MOTION.softTransition} hover:-translate-y-2 hover:border-cyan-300/30 hover:shadow-[0_28px_70px_rgba(34,211,238,0.12)] ${
                        index === 0
                          ? "h-[280px] sm:h-[360px] md:h-full md:min-h-[520px]"
                          : "h-[260px] sm:h-[320px] md:h-[380px]"
                      }`}
                    >
                      {/* Image */}
                      {study.image ? (
                        <div
                          className="absolute inset-0 bg-cover bg-top transition-all duration-[20000ms] ease-linear group-hover:bg-bottom"
                          style={{
                            backgroundImage: `url("${study.image}")`,
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                          <span className="text-sm text-slate-500">
                            No Image
                          </span>
                        </div>
                      )}

                      {/* Accent */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${
                          study.accent ||
                          "from-cyan-400/20 to-cyan-300/5"
                        } from-slate-950 via-slate-950/60 to-transparent`}
                      />

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-slate-950/20 transition-colors duration-300 group-hover:bg-slate-950/10" />

                      {/* Content */}
                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-[0.25em] ${
                            study.tag ||
                            "text-cyan-300"
                          }`}
                        >
                          {study.category}
                        </span>

                        <h3
                          className={`mt-2 ${BRAND_TEXT.sectionTitle} text-2xl sm:text-3xl`}
                        >
                          {study.title}
                        </h3>

                        <div className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/80 transition-colors group-hover:text-cyan-300">
                          View Project

                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          )}

        {/* Bottom CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
          className={`mx-auto mt-16 max-w-3xl px-6 py-10 text-center ${BRAND_SURFACE.sectionWrap}`}
        >
          <p
            className={
              BRAND_TEXT.sectionBody
            }
          >
            We don&apos;t say we are different — we
            just understand the individual needs of
            B2B and B2C businesses better. Leverage
            our expertise to strategize web
            development, brand messaging, and
            content marketing effectively.
          </p>

          <Link
            href="/contact-us"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-300/20"
          >
            Start Your Project

            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}