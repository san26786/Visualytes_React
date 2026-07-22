"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import BlogCard from "./_compoents/BlogCard";
import { blogs } from "./_data/data";
import { motion } from "framer-motion";
import {
  BrandPageBackdrop,
  sectionReveal,
} from "@/src/common/components/ui/brand/page-effects";
import { BRAND_GRADIENT } from "@/src/common/components/ui/brand/theme";

const allCategories = [
  { name: "All", url: "/blog" },
  ...Array.from(
    new Map(
      blogs
        .flatMap((post) => post.categories)
        .map((cat) => [cat.name, cat])
    ).values()
  ),
];

export default function Page() {
  const POSTS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "All") return blogs;

    return blogs.filter((post) =>
      post.categories.some((cat) => cat.name === selectedCategory)
    );
  }, [selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / POSTS_PER_PAGE));

  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const currentBlogs = useMemo(() => {
    const start = (safePage - 1) * POSTS_PER_PAGE;
    return filteredBlogs.slice(start, start + POSTS_PER_PAGE);
  }, [filteredBlogs, safePage]);

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
                <Link href="/" className="text-cyan-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li className="text-white/30">●</li>
              <li className="text-white/60">Blog</li>
            </ol>

            <h1 className="relative z-10 max-w-3xl text-[52px] font-bold leading-[1.1] tracking-tight text-white sm:text-[64px] lg:text-[76px]">
              Our{" "}
              <span className={BRAND_GRADIENT.text}>
                Blog
              </span>
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
                {allCategories.map((cat) => (
                  <motion.button
                    key={cat.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setCurrentPage(1);
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      selectedCategory === cat.name
                        ? "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30"
                        : "border border-white/15 bg-slate-900/80 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-300"
                    }`}
                  >
                    {cat.name}
                  </motion.button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {currentBlogs.map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
              </div>

              <nav className="mt-16 flex justify-center">
                <ul className="flex items-center gap-4">
                  <li>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={safePage === 1}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-white text-2xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:border-cyan-300/40 transition-all"
                    >
                      ‹
                    </motion.button>
                  </li>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                      <li key={page}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setCurrentPage(page)}
                          className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold transition-all duration-300 ${
                            safePage === page
                              ? "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30"
                              : "border border-white/15 bg-slate-900/80 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-300"
                          }`}
                        >
                          {page}
                        </motion.button>
                      </li>
                    );
                  })}

                  <li>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={safePage === totalPages}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-white text-2xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:border-cyan-300/40 transition-all"
                    >
                      ›
                    </motion.button>
                  </li>
                </ul>
              </nav>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}