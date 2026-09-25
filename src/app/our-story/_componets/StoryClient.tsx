"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import {
  BRAND_MOTION,
  BRAND_SURFACE,
  BRAND_TEXT,
} from "@/src/common/components/ui/brand/theme";
import Timeline from "./ Timeline";
import type { StoryContent } from "@/src/lib/page-content/types";
import { isRemoteImage } from "@/src/lib/page-content/image";

export default function StoryClient({ content }: { content: StoryContent }) {
  const { welcome } = content;

  return (
    <BrandSubPageShell
      title={content.header.title}
      eyebrow={content.header.eyebrow}
      subtitle={content.header.subtitle}
    >
      <section className="relative px-4 pb-10">
        <div className="mx-auto max-w-[1220px]">
          <div
            className={`relative overflow-hidden ${BRAND_SURFACE.glassCard}`}
          >
            <div className="grid min-h-[520px] grid-cols-1 lg:grid-cols-2">
              <div className="relative hidden min-h-[420px] lg:block">
                <Image
                  src={welcome.image}
                  unoptimized={isRemoteImage(welcome.image)}
                  alt="Visualytes team collaboration"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 0px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/20 to-slate-950/90" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative flex flex-col justify-center px-8 py-12 lg:px-12 lg:py-16"
              >
                <p className={`${BRAND_TEXT.sectionEyebrow}`}>
                  {welcome.eyebrow}
                </p>
                <h2 className={`mt-4 ${BRAND_TEXT.sectionTitle}`}>
                  {welcome.titleNormal}{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                    {welcome.titleHighlight}
                  </span>
                </h2>

                <div className={`mt-6 space-y-5 ${BRAND_TEXT.sectionBody}`}>
                  {welcome.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-8">
                  <Link
                    href={welcome.buttonLink || "/about"}
                    className={`inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-fuchsia-500/25 ${BRAND_MOTION.softTransition} hover:-translate-y-1 hover:shadow-fuchsia-500/40`}
                  >
                    {welcome.buttonText}
                  </Link>
                  <Image
                    src={welcome.signature}
                    unoptimized={isRemoteImage(welcome.signature)}
                    alt="Signature"
                    width={140}
                    height={70}
                    className="object-contain opacity-90"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Timeline content={content.timeline} />
    </BrandSubPageShell>
  );
}
