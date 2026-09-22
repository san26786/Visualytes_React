"use client";

import { useEffect } from "react";

/** Records one view per browser session; renders nothing. */
export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `blog-viewed:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Storage can be blocked; still count the view once per mount.
    }
    fetch(`/api/blog/${encodeURIComponent(slug)}/view`, { method: "POST", keepalive: true }).catch(() => {});
  }, [slug]);

  return null;
}
