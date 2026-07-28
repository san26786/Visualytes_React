"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BlogCard from "@/src/app/blog/_compoents/BlogCard";
import { blogs } from "@/src/app/blog/_data/data";
import BrandArchiveShell from "@/src/common/components/ui/brand/BrandArchiveShell";
import { BRAND_GRADIENT } from "@/src/common/components/ui/brand/theme";

const POSTS_PER_PAGE = 6;

const categorySlugLabels: Record<string, string> = {
  blog: "Blog",
  "custom-websites": "Custom Websites",
  "web-design-blog": "Web Design",
  "branding-blog": "Branding",
  seo: "SEO",
  "mobile-app": "Mobile App",
  "e-commerce": "E-commerce",
};

const allCategories = Array.from(
  new Map(
    blogs
      .flatMap((post) => post.categories)
      .map((cat) => [cat.slug, cat])
  ).values()
);

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((post) =>
      post.categories.some((cat) => cat.slug === slug)
    );
  }, [slug]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / POSTS_PER_PAGE));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const currentBlogs = useMemo(() => {
    const start = (safePage - 1) * POSTS_PER_PAGE;
    return filteredBlogs.slice(start, start + POSTS_PER_PAGE);
  }, [filteredBlogs, safePage]);

  const categoryName =
    categorySlugLabels[slug] ??
    filteredBlogs[0]?.categories.find(
      (cat) => cat.slug === slug
    )?.name ??
    "Blog";

  const titleParts = categoryName.split(" ");
  const titleMain = titleParts.slice(0, -1).join(" ") || categoryName;
  const titleAccent = titleParts.length > 1 ? titleParts.at(-1) : undefined;

  return (
    <BrandArchiveShell
      title={titleMain}
      titleAccent={titleAccent}
      eyebrow=""
      subtitle="Discover insights, tips, and stories about design, development, and digital innovation."
      breadcrumbs={[
        { label: "Blog", href: "/blog" },
        { label: categoryName },
      ]}
    >
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300">
              {filteredBlogs.length} Articles
            </span>
            <h2 className="mt-5 text-[32px] font-bold text-white sm:text-[40px]">
              Browse by{" "}
              <span className={BRAND_GRADIENT.text}>Category</span>
            </h2>
          </div>

          <div className="mb-12 flex flex-wrap justify-center gap-3">
            <Link
              href="/blog"
              className="rounded-full border border-white/15 bg-slate-900/80 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-300 transition-all duration-300 hover:border-cyan-300/40 hover:text-cyan-300"
            >
              All
            </Link>
            {allCategories.map((cat) => {
              const catSlug = cat.slug;
              return (
                <Link
                  key={catSlug}
                  href={`/archives/category/blog/${catSlug}`}
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    catSlug === slug
                      ? "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30"
                      : "border border-white/15 bg-slate-900/80 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-300"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {currentBlogs.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <p className="py-20 text-center text-lg text-slate-400">
              No articles found in this category yet.
            </p>
          )}

          {totalPages > 1 && (
            <nav className="mt-16 flex justify-center">
              <ul className="flex items-center gap-4">
                <li>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={safePage === 1}
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-2xl font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:border-cyan-300/40"
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
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-2xl font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:border-cyan-300/40"
                  >
                    ›
                  </motion.button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </section>
    </BrandArchiveShell>
  );
}
