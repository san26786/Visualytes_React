"use client";

import Link from "next/link";
import BlogCard from "../_compoents/BlogCard";
import { motion } from "framer-motion";
import { BrandPageBackdrop, sectionReveal } from "@/src/common/components/ui/brand/page-effects";
import { BRAND_GRADIENT } from "@/src/common/components/ui/brand/theme";
import type { PublicBlogCard } from "@/src/lib/blog/types";

type Props = {
  posts: PublicBlogCard[];
  categories: { name: string; slug: string; postCount: number }[];
  selectedCategory: string | null;
  page: number;
  totalPages: number;
};

const ACTIVE =
  "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30";
const IDLE =
  "border border-white/15 bg-slate-900/80 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-300";
const ARROW =
  "flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-2xl font-semibold text-white transition-all";

function blogHref(category: string | null, page: number) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

export default function BlogClient({ posts, categories, selectedCategory, page, totalPages }: Props) {
  return (
    <main className="relative overflow-hidden bg-slate-950">
      <BrandPageBackdrop />

      <div className="relative z-10">
        <section className="relative mt-[130px] overflow-hidden">
          <div className="relative flex min-h-[440px] flex-col items-center justify-center px-4 pb-36 pt-20 text-center">
            <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-fuchsia-500/25 blur-[100px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[80px]" />

            <ol className="relative z-10 mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]">
              <li>
                <Link href="/" className="text-cyan-300 transition-colors duration-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li className="text-white/30">●</li>
              <li className="text-white/60">Blog</li>
            </ol>

            <h1 className="relative z-10 max-w-3xl text-[52px] font-bold leading-[1.1] tracking-tight text-white sm:text-[64px] lg:text-[76px]">
              Our <span className={BRAND_GRADIENT.text}>Blog</span>
            </h1>

            <p className="relative z-10 mt-5 max-w-xl text-[17px] leading-relaxed text-slate-300">
              Discover insights, tips, and stories about design, development, and digital innovation.
            </p>

            <div className="relative z-10 mt-10 flex items-center gap-3">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300/80" />
            </div>
          </div>
        </section>

        <motion.div {...sectionReveal}>
          <section className="py-12 lg:py-20">
            <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
              <div className="mb-16 text-center">
                <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300">
                  Latest Articles
                </span>
              </div>

              <div className="mb-12 flex flex-wrap justify-center gap-3">
                <Link
                  href="/blog"
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory ? IDLE : ACTIVE
                  }`}
                >
                  All
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={blogHref(cat.slug, 1)}
                    className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      selectedCategory === cat.slug ? ACTIVE : IDLE
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              {posts.length === 0 ? (
                <p className="py-20 text-center text-lg text-slate-400">No articles published yet.</p>
              ) : (
                <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
                  {posts.map((post) => (
                    <BlogCard key={post.id} {...post} />
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <nav aria-label="Blog pages" className="mt-16 flex justify-center">
                  <ul className="flex items-center gap-4">
                    <li>
                      {page > 1 ? (
                        <Link href={blogHref(selectedCategory, page - 1)} aria-label="Previous page" className={`${ARROW} hover:border-cyan-300/40`}>
                          ‹
                        </Link>
                      ) : (
                        <span className={`${ARROW} cursor-not-allowed opacity-40`}>‹</span>
                      )}
                    </li>

                    {Array.from({ length: totalPages }).map((_, index) => {
                      const number = index + 1;
                      return (
                        <li key={number}>
                          <Link
                            href={blogHref(selectedCategory, number)}
                            aria-current={page === number ? "page" : undefined}
                            className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold transition-all duration-300 ${
                              page === number ? ACTIVE : IDLE
                            }`}
                          >
                            {number}
                          </Link>
                        </li>
                      );
                    })}

                    <li>
                      {page < totalPages ? (
                        <Link href={blogHref(selectedCategory, page + 1)} aria-label="Next page" className={`${ARROW} hover:border-cyan-300/40`}>
                          ›
                        </Link>
                      ) : (
                        <span className={`${ARROW} cursor-not-allowed opacity-40`}>›</span>
                      )}
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
