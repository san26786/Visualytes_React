"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, HeartHandshake } from "lucide-react";
import type { Sponsorship } from "./sponsor-data";
import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";

export default function SponsorDetailClient({ sponsor, contentHtml }: { sponsor: Sponsorship; contentHtml: string }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 pt-[130px] text-white">
      <BrandPageBackdrop />
      <article className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-14 lg:px-10 lg:pt-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/we-sponsor" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300 transition hover:text-white"><ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" /> All sponsorships</Link>
          <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300"><HeartHandshake size={16} /> Community partnership · {sponsor.index}</div>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{sponsor.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{sponsor.detail}</p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-200"><CalendarDays size={16} /> {sponsor.dateLabel}</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative mt-10 aspect-[16/8] overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
          <Image src={sponsor.image} alt={sponsor.title} fill priority sizes="(max-width: 1200px) 100vw, 1152px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.18 }} className="blog-article-content mx-auto mt-12 max-w-3xl" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </main>
  );
}
