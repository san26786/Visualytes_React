"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaEye,
  FaHeart,
  FaComment,
  FaShareAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { BRAND_HOVER } from "@/src/common/components/ui/brand/theme";
import type { PublicBlogCard } from "@/src/lib/blog/types";

export default function BlogCard({
  title,
  slug,
  formattedDate,
  author,
  image,
  imageAlt,
  category,
  tags,
  excerpt,
  views,
  likes,
  comments,
}: PublicBlogCard) {
  const chips = [...(category ? [category] : []), ...tags];

  return (
    <motion.article
      whileHover={{ y: -8 }}
      className={`group relative flex h-full flex-col overflow-hidden border border-white/15 bg-slate-900/80 shadow-[0_22px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl transition-all duration-300 ${BRAND_HOVER.card}`}
    >
      <div className="relative h-[260px] overflow-hidden">
        <Link href={`/blog/${slug}`} className="block h-[280px] w-full shrink-0 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={imageAlt}
              width={800}
              height={800}
              className={`h-full w-full object-cover transition-all duration-500 ${BRAND_HOVER.image}`}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-cyan-500/20 via-slate-900 to-fuchsia-500/20" />
          )}
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-8">
        {chips.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <Link
                key={chip.slug}
                href={`/archives/category/blog/${chip.slug}`}
                className="inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-cyan-300 transition-colors hover:bg-cyan-500/20"
              >
                {chip.name}
              </Link>
            ))}
          </div>
        )}

        <h3 className="mb-4 text-2xl font-bold text-white">
          <Link href={`/blog/${slug}`} className="transition-colors hover:text-cyan-300">
            {title}
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-slate-300">{excerpt}</p>
      </div>

      <div className="mt-auto border-t border-white/10 bg-slate-950/50 px-8 py-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-xs font-bold text-cyan-200">
              {author.charAt(0)}
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">{author}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <FaCalendarAlt className="text-cyan-400" />
            {formattedDate}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <FaEye className="text-cyan-400" />
              {views}
            </div>
            <div className="flex items-center gap-1.5">
              <FaComment className="text-cyan-400" />
              {comments}
            </div>
            <div className="flex items-center gap-1.5">
              <FaHeart className="text-cyan-400" />
              {likes}
            </div>
          </div>

          <button type="button" aria-label="Share" className="text-cyan-300 transition-colors hover:text-cyan-200">
            <FaShareAlt />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
