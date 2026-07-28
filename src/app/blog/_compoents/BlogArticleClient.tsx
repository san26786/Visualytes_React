"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock3, Eye, UserRound } from "lucide-react";
import { getLocalBlogImage, type BlogPost } from "../_data/data";
import { BrandPageBackdrop } from "@/src/common/components/ui/brand/page-effects";
import { BRAND_GRADIENT } from "@/src/common/components/ui/brand/theme";

export default function BlogArticleClient({
  post,
  contentHtml,
}: {
  post: BlogPost;
  contentHtml: string;
}) {
  const readingTime = Math.max(3, Math.ceil(contentHtml.replace(/<[^>]*>/g, " ").split(/\s+/).length / 220));

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 pt-[130px] text-white">
      <BrandPageBackdrop />
      <article className="relative z-10 pb-24">
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-5xl px-6 pb-10 pt-14 lg:px-10 lg:pt-20"
        >
          <Link href="/blog" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300 transition-colors hover:text-white">
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" /> All articles
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span key={category.name} className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200">
                {category.name}
              </span>
            ))}
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className={`mt-6 max-w-3xl text-lg leading-relaxed ${BRAND_GRADIENT.textSubtle}`}>{post.description}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2"><UserRound size={16} className="text-cyan-300" /> {post.author.name}</span>
            <span className="inline-flex items-center gap-2"><CalendarDays size={16} className="text-cyan-300" /> {post.formattedDate}</span>
            <span className="inline-flex items-center gap-2"><Clock3 size={16} className="text-cyan-300" /> {readingTime} min read</span>
            {post.metrics.views ? <span className="inline-flex items-center gap-2"><Eye size={16} className="text-cyan-300" /> {post.metrics.views.toLocaleString()} views</span> : null}
          </div>
        </motion.header>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }} className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-white/15 shadow-[0_26px_70px_rgba(2,6,23,0.6)]">
            <Image src={getLocalBlogImage(post.blogKey)} alt={post.images.alt || post.title} fill priority sizes="(max-width: 1200px) 100vw, 1152px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.18 }} className="mx-auto mt-12 grid max-w-5xl gap-10 px-6 lg:grid-cols-[120px_minmax(0,1fr)] lg:px-10">
          <aside className="hidden lg:block" />
          <div className="blog-article-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </motion.div>
      </article>
    </main>
  );
}
