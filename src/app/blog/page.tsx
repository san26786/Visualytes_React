"use client";

import { useMemo, useState } from "react";
import PageBanner from "@/src/common/components/layouts/PageBanner";
import BlogCard from "./_compoents/BlogCard";
import { blogs } from "./_data/data";
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
  
  
  
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

  const safePage = Math.min(
    Math.max(currentPage, 1),
    Math.max(totalPages, 1)
  );
  
  const currentBlogs = useMemo(() => {
    const start = (safePage - 1) * POSTS_PER_PAGE;
    return filteredBlogs.slice(start, start + POSTS_PER_PAGE);
  }, [filteredBlogs, safePage]);
  return (
    <>
     <PageBanner title="Blog"/>

    <div className="flex flex-wrap justify-center  p-6 min-h-screen max-w-6xl mx-auto mt-[10px]  pt-20 ">
    <div className="mb-10 flex flex-wrap justify-center gap-4">
    {allCategories.map((cat) => (
  <button
    key={cat.name}
    onClick={() => {
      setSelectedCategory(cat.name);
      setCurrentPage(1);
    }}
    className="bg-[#ff497c] px-[18px] py-[10px] text-[16px] font-light leading-[30px] text-white transition hover:bg-[#e63d6e]"
  >
    {cat.name}
  </button>
))}
      </div>     
    <div className="max-w-[1200px] pb-[10vw] mx-auto px-5 pt-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
    {currentBlogs.map((post) => (
                <BlogCard key={post.id} {...post} />
      ))}
    </div>
    <nav className="mt-16 mb-10 flex justify-center">
  <ul className="flex items-center gap-4">
    {/* Prev */}
    <li>
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={safePage === 1}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff497c] text-white text-3xl font-semibold disabled:opacity-50 hover:bg-black transition-all"
      >
        &#8249;
      </button>
    </li>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }).map((_, index) => {
      const page = index + 1;

      return (
        <li key={page}>
          <button
            onClick={() => setCurrentPage(page)}
            className={`flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold transition-all duration-300 ${
              safePage === page
                ? "bg-[#ff497c] text-white"
                : "border-2 border-gray-200 bg-white text-black hover:border-[#ff497c] hover:bg-[#ff497c] hover:text-white"
            }`}
          >
            {page}
          </button>
        </li>
      );
    })}

    {/* Next */}
    <li>
      <button
        onClick={() =>
          setCurrentPage((p) => Math.min(totalPages, p + 1))
        }
        disabled={safePage === totalPages}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff497c] text-white text-3xl font-semibold disabled:opacity-50 hover:bg-black transition-all"
      >
        &#8250;
      </button>
    </li>
  </ul>
</nav>
  </div>
    </div>
    </>
  );
}