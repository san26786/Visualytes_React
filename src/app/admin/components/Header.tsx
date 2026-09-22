"use client";

import React from "react";
import { Menu, ExternalLink, Sparkles } from "lucide-react";
import { NAV_ITEMS } from "./Sidebar";
import { Tab } from "../../admin-dashboard/types/dashboard";

export function Header({
  tab,
  setOpen,
}: {
  tab: Tab;
  setOpen: (open: boolean) => void;
}) {
  const currentNav = NAV_ITEMS.find((item) => item.id === tab);
  const CurrentIcon = currentNav?.icon || Sparkles;

  return (
    <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 sm:px-8 backdrop-blur-md transition-all">
      <div className="flex items-center gap-3.5">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs hover:bg-slate-50 hover:text-slate-900 lg:hidden cursor-pointer transition"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={19} />
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-100">
            <CurrentIcon size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Visualytes Admin
              </span>
              <span className="text-slate-300">/</span>
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900">
                {currentNav?.label || "Dashboard"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:text-slate-950 hover:border-slate-300 active:scale-98"
        >
          <span>View Site</span>
          <ExternalLink size={13} className="text-slate-400" />
        </a>
      </div>
    </header>
  );
}