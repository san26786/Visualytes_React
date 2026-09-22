import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogCard from "@/src/app/blog/_compoents/BlogCard";
import BrandArchiveShell from "@/src/common/components/ui/brand/BrandArchiveShell";
import { BRAND_GRADIENT } from "@/src/common/components/ui/brand/theme";
import { getTopicName, listPublicCategories, listPublishedPosts } from "@/src/lib/blog/server";

const POSTS_PER_PAGE = 6;

const ACTIVE =
  "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30";
const IDLE =
  "border border-white/15 bg-slate-900/80 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-300";
const ARROW =
  "flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-2xl font-semibold text-white transition-all";

export async function generateMetadata({
  params,
}: PageProps<"/archives/category/blog/[slug]">): Promise<Metadata> {
  const name = await getTopicName((await params).slug);
  return name ? { title: `${name} Articles | Visualytes Blog` } : {};
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<"/archives/category/blog/[slug]">) {
  const { slug } = await params;
  const query = await searchParams;
  const requestedPage = Number(typeof query.page === "string" ? query.page : 1) || 1;

  const [name, list, categories] = await Promise.all([
    getTopicName(slug),
    listPublishedPosts({ categorySlug: slug, page: requestedPage, pageSize: POSTS_PER_PAGE }),
    listPublicCategories(),
  ]);
  if (!name) notFound();

  const { items, total, page, totalPages } = list;
  const titleParts = name.split(" ");
  const titleMain = titleParts.slice(0, -1).join(" ") || name;
  const titleAccent = titleParts.length > 1 ? titleParts.at(-1) : undefined;
  const pageHref = (n: number) => (n > 1 ? `/archives/category/blog/${slug}?page=${n}` : `/archives/category/blog/${slug}`);

  return (
    <BrandArchiveShell
      title={titleMain}
      titleAccent={titleAccent}
      eyebrow=""
      subtitle="Discover insights, tips, and stories about design, development, and digital innovation."
      breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: name }]}
    >
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300">
              {total} Articles
            </span>
            <h2 className="mt-5 text-[32px] font-bold text-white sm:text-[40px]">
              Browse by <span className={BRAND_GRADIENT.text}>Category</span>
            </h2>
          </div>

          <div className="mb-12 flex flex-wrap justify-center gap-3">
            <Link href="/blog" className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${IDLE}`}>
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/archives/category/blog/${cat.slug}`}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  cat.slug === slug ? ACTIVE : IDLE
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {items.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>

          {items.length === 0 && (
            <p className="py-20 text-center text-lg text-slate-400">No articles found in this category yet.</p>
          )}

          {totalPages > 1 && (
            <nav aria-label="Category pages" className="mt-16 flex justify-center">
              <ul className="flex items-center gap-4">
                <li>
                  {page > 1 ? (
                    <Link href={pageHref(page - 1)} aria-label="Previous page" className={`${ARROW} hover:border-cyan-300/40`}>
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
                        href={pageHref(number)}
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
                    <Link href={pageHref(page + 1)} aria-label="Next page" className={`${ARROW} hover:border-cyan-300/40`}>
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
    </BrandArchiveShell>
  );
}
