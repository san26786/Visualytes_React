"use client";

import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import type { PublicBlogCard } from "@/src/lib/blog/types";

/** Client-side strip of the newest published posts, loaded from the public blog API. */
export default function LatestBlogCards({
  limit = 3,
  className = "grid gap-8 md:grid-cols-2 lg:grid-cols-3",
}: {
  limit?: number;
  className?: string;
}) {
  const [posts, setPosts] = useState<PublicBlogCard[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/blog?pageSize=${limit}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : { items: [] }))
      .then((data: { items?: PublicBlogCard[] }) => setPosts(data.items ?? []))
      .catch((error) => {
        if (error?.name !== "AbortError") setPosts([]);
      });
    return () => controller.abort();
  }, [limit]);

  if (posts && posts.length === 0) return null;

  return (
    <div className={className}>
      {posts
        ? posts.map((post) => <BlogCard key={post.id} {...post} />)
        : Array.from({ length: limit }).map((_, index) => (
            <div key={index} className="h-[520px] animate-pulse rounded-2xl border border-white/10 bg-white/5" />
          ))}
    </div>
  );
}
