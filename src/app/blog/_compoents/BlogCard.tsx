"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "../_data/data";
import {
  FaEye,
  FaHeart,
  FaComment,
  FaShareAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { BRAND_HOVER,  } from "@/src/common/components/ui/brand/theme";

export default function BlogCard({
  title,
  slug,
  formattedDate,
  author,
  images,
  categories,
  description,
  metrics,
}: BlogPost) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      className={`group overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 shadow-[0_22px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl transition-all duration-300 ${BRAND_HOVER.card}`}
    >
      <div className="relative h-[260px] overflow-hidden">
        <Link href={`/blog/${slug}`}>
          <Image
            src={images.main}
            alt={images.alt || title}
            fill
            className={`absolute object-cover transition-all duration-500 ${BRAND_HOVER.image}`}
          />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      </div>

      <div className="p-8">
        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((cat, index) => {
            const catSlug = cat.url.split("/").filter(Boolean).pop();
            return (
              <Link
                key={index}
                href={`/archives/category/blog/${catSlug}`}
                className="inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-cyan-300 hover:bg-cyan-500/20 transition-colors"
              >
                {cat.name}
              </Link>
            );
          })}
        </div>

        <h3 className="mb-4 text-2xl font-bold text-white">
          <Link href={`/blog/${slug}`} className="hover:text-cyan-300 transition-colors">
            {title}
          </Link>
        </h3>

        <p className="text-sm leading-relaxed text-slate-300 line-clamp-3">
          {description}
        </p>
      </div>

      <div className="border-t border-white/10 bg-slate-950/50 px-8 py-5">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/15">
              <Image
                src={author.avatarUrl}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
              {author.name}
            </span>
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
              {metrics.views}
            </div>
            <div className="flex items-center gap-1.5">
              <FaComment className="text-cyan-400" />
              0
            </div>
            <div className="flex items-center gap-1.5">
              <FaHeart className="text-cyan-400" />
              {metrics.likes}
            </div>
          </div>

          <button className="text-cyan-300 hover:text-cyan-200 transition-colors">
            <FaShareAlt />
          </button>
        </div>
      </div>
    </motion.article>
  );
}