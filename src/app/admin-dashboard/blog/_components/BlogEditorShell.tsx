"use client";

import dynamic from "next/dynamic";

/**
 * The editor is browser-only (Tiptap, local-time date inputs, window events), so it
 * is loaded client-side. This also avoids server/browser timezone hydration mismatches.
 */
const BlogEditorShell = dynamic(() => import("./BlogEditorForm"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-50/70">
      <div className="h-16 border-b border-slate-200 bg-white" />
      <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <div className="h-40 animate-pulse rounded-2xl bg-white shadow-sm" />
          <div className="h-[520px] animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>
        <div className="space-y-4">
          <div className="h-56 animate-pulse rounded-2xl bg-white shadow-sm" />
          <div className="h-72 animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>
      </div>
    </div>
  ),
});

export default BlogEditorShell;
