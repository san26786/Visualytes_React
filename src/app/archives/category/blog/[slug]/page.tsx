"use client";

import { use, useMemo, useState } from "react";
import PageBanner from "@/src/common/components/layouts/PageBanner";
import { blogs } from "@/src/app/blog/_data/data";
import BlogCard from "@/src/app/blog/_compoents/BlogCard";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const POSTS_PER_PAGE = 6;
  const [currentPage, ] = useState(1);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((post) =>
      post.categories.some((cat) => {
        const categorySlug = cat.url.split("/").filter(Boolean).pop();
        return categorySlug === slug;
      })
    );
  }, [slug]);

  // const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  // const safePage = Math.min(
  //   Math.max(currentPage, 1),
  //   Math.max(totalPages, 1)
  // );
  


  const categoryName =
    filteredBlogs[0]?.categories.find((cat) => {
      const categorySlug = cat.url.split("/").filter(Boolean).pop();
      return categorySlug === slug;
    })?.name || "Blog";

  return (
    <>
      <PageBanner title={categoryName} />

      <div className="max-w-[1200px] mx-auto py-20 px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {currentBlogs.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>

       
      </div>
    </>
  );
}