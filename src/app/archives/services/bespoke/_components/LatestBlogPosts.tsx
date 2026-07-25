"use client";

import HomeSection from "@/src/app/(home)/_componts/shared/HomeSection";
import HomeBrandButton from "@/src/app/(home)/_componts/shared/HomeBrandButton";
import BlogCard from "@/src/app/blog/_compoents/BlogCard";
import { blogs } from "@/src/app/blog/_data/data";
import { latestBlogSlugs } from "./data";

export default function LatestBlogPosts() {
  const featuredBlogs = latestBlogSlugs
    .map((slug) => blogs.find((blog) => blog.slug === slug))
    .filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-slate-900/30 py-10">
      <HomeSection
        eyebrow="From Our Blog"
        title="Latest"
        highlight="Blog Posts"
        subtitle="Insights on mobile apps, hosting, social media, and the technologies shaping bespoke software."
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {featuredBlogs.map((blog) =>
            blog ? <BlogCard key={blog.id} {...blog} /> : null
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <HomeBrandButton href="/blog" variant="outline">
            View All Blogs
          </HomeBrandButton>
        </div>
      </HomeSection>
    </section>
  );
}
