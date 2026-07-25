"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BRAND_GRADIENT,
  BRAND_HOVER,
  BRAND_SURFACE,
  BRAND_TEXT,
} from "@/src/common/components/ui/brand/theme";
import { popIn, staggerContainer } from "@/src/app/(home)/_componts/shared/motion";

interface BrandServiceSectionProps {
  title: string;
  intro: string;
  description: string[];
  image: string;
  topDescription: string[];
  bullets: string[];
  bottomTitle?: string;
  bottomDescription: string;
  reverse?: boolean;
}

function isNumberedHeading(text: string) {
  return /^\d+\.\s/.test(text.trim());
}

export default function BrandServiceSection({
  title,
  intro,
  description,
  image,
  topDescription,
  bullets,
  bottomTitle,
  bottomDescription,
  reverse = false,
}: BrandServiceSectionProps) {
  const numberedBlocks: { heading: string; body: string[] }[] = [];
  let currentBlock: { heading: string; body: string[] } | null = null;

  for (const text of topDescription) {
    if (isNumberedHeading(text)) {
      if (currentBlock) numberedBlocks.push(currentBlock);
      currentBlock = { heading: text, body: [] };
    } else if (currentBlock) {
      currentBlock.body.push(text);
    }
  }
  if (currentBlock) numberedBlocks.push(currentBlock);

  const plainTopDescription = topDescription.filter(
    (text) => !isNumberedHeading(text) && !numberedBlocks.some((b) => b.body.includes(text))
  );

  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div
          className={`grid items-start gap-12 lg:grid-cols-2 lg:gap-16 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.span
              variants={popIn}
              className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300"
            >
              Our Expertise
            </motion.span>

            <motion.h2
              variants={popIn}
              custom={1}
              className={`mt-5 text-3xl font-bold sm:text-4xl ${BRAND_TEXT.sectionTitle}`}
            >
              {title}
            </motion.h2>

            {intro && (
              <motion.p variants={popIn} custom={2} className={`mt-6 ${BRAND_TEXT.sectionBody}`}>
                {intro}
              </motion.p>
            )}

            {description.map((item, index) => (
              <motion.p
                key={index}
                variants={popIn}
                custom={index + 3}
                className={`mt-4 ${BRAND_TEXT.sectionBody}`}
              >
                {item}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reverse ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/15 to-pink-500/20 blur-2xl" />
              <div
                className={`relative overflow-hidden p-6 ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
              >
                <div className="relative aspect-[4/3] w-full min-w-[580px] max-w-[540px]">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {(numberedBlocks.length > 0 || plainTopDescription.length > 0 || bullets.length > 0) && (
          <div className="mt-16 lg:mt-24">
            {plainTopDescription.map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={`mb-6 ${BRAND_TEXT.sectionBody}`}
              >
                {text}
              </motion.p>
            ))}

            {numberedBlocks.length > 0 && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {numberedBlocks.map((block, index) => (
                  <motion.div
                    key={block.heading}
                    variants={popIn}
                    custom={index}
                    className={`group p-6 ${BRAND_SURFACE.mutedGlassCard} ${BRAND_HOVER.card}`}
                  >
                    <h3 className={`text-lg font-semibold ${BRAND_GRADIENT.text}`}>
                      {block.heading}
                    </h3>
                    {block.body.map((paragraph, pIndex) => (
                      <p key={pIndex} className={`mt-3 ${BRAND_TEXT.cardBody}`}>
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {bottomTitle && (
              <h3 className={`mt-12 text-2xl font-semibold ${BRAND_TEXT.sectionTitle}`}>
                {bottomTitle}
              </h3>
            )}

            {bullets.length > 0 && (
              <ul className="mt-8 space-y-4">
                {bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400" />
                    <span className={BRAND_TEXT.cardBody}>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {bottomDescription && (
              <p className={`mt-8 ${BRAND_TEXT.sectionBody}`}>{bottomDescription}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
