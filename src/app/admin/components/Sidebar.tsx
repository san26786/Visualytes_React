"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  FileText,
  ClipboardList,
  Loader2,
  LogOut,
  Package,
  MessageSquareQuote,
  Link2,
  BookOpen,
  PhoneCall,
  BriefcaseBusiness,
  X,
  HelpCircle,
  Handshake,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  ImageIcon,
  ListChecks,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { Tab } from "../../admin-dashboard/types/dashboard";
import Image from "next/image";

export interface NavItemConfig {
  id: Tab;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export interface NavGroup {
  title: string;
  items: NavItemConfig[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Dashboard",
    items: [{ id: "overview", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Content",
    items: [
      { id: "blogs", label: "Blog Posts", icon: BookOpen },
      { id: "services", label: "Services", icon: Layers, badge: "Dynamic" },
      { id: "page-content", label: "Page Content", icon: FileText },
      { id: "case-studies", label: "Case Studies", icon: BriefcaseBusiness },
      { id: "faqs", label: "FAQs", icon: HelpCircle },
      { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
      { id: "portfolio", label: "Portfolio Items", icon: Sparkles },
      { id: "clients", label: "Client Logos", icon: Handshake },
      { id: "process", label: "Process Steps", icon: ListChecks },
    ],
  },
  {
    title: "Media",
    items: [{ id: "media", label: "Media Library", icon: ImageIcon }],
  },
  {
    title: "Forms & Sales",
    items: [
      { id: "forms", label: "Forms & Responses", icon: ClipboardList },
      { id: "seo-questionnaire", label: "SEO Questionnaire", icon: ClipboardCheck, badge: "Dynamic" },
      { id: "packages", label: "Packages & Billing", icon: Package },
    ],
  },
  {
    title: "Users",
    items: [{ id: "users", label: "Users", icon: Users }],
  },
  {
    title: "Settings",
    items: [
      { id: "settings", label: "Settings", icon: Settings },
      { id: "contact-page", label: "Contact Content", icon: PhoneCall },
      { id: "social", label: "Social Links", icon: Link2 },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

interface SidebarProps {
  tab: Tab;
  setTab: (tab: Tab) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  adminName: string;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export function Sidebar({
  tab,
  setTab,
  open,
  setOpen,
  adminName,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const [signingOut, setSigningOut] = useState(false);
  // Collapsing is a desktop-only mode; the mobile drawer always shows full labels.
  const hideWhenCollapsed = collapsed ? "lg:hidden" : "";

  const signOut = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      // Full navigation so no signed-in state survives; /admin shows the sign-in card.
      window.location.href = "/admin";
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800/80 bg-slate-950 text-slate-300 shadow-2xl transition-[width,transform] duration-300 ease-in-out lg:translate-x-0 ${
          collapsed ? "lg:w-20" : "lg:w-72"
        } ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Brand Header */}
        <div
          className={`flex h-18 shrink-0 items-center justify-between border-b border-slate-800/80 px-5 bg-slate-950/90 backdrop-blur-md ${
            collapsed ? "lg:justify-center lg:px-0" : ""
          }`}
        >
          <div className={`flex items-center gap-3 ${hideWhenCollapsed}`}>
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <Image
                src="/assets/jpng/footer_logo2.png"
                alt="logo"
                width={27}
                height={19}
                className="w-full h-full object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-500" />
              </span>
            </div>
            <div className="whitespace-nowrap">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white">
                  Visualytes
                </span>
                <span className="rounded-md bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-400 border border-cyan-500/20">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                Admin Console
              </p>
            </div>
          </div>

          {/* Desktop collapse toggle */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
          </button>

          {/* Mobile close */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden transition"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Navigation Area with Custom Scrollbar */}
        <nav
          className={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3.5 py-4 space-y-6 [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.2)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-800 hover:[&::-webkit-scrollbar-thumb]:bg-slate-700 ${
            collapsed ? "lg:px-3 lg:space-y-3" : ""
          }`}
        >
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="space-y-1.5">
              <div
                className={`px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400/90 whitespace-nowrap ${hideWhenCollapsed}`}
              >
                {group.title}
              </div>
              {collapsed && (
                <div className="mx-auto hidden h-px w-8 bg-slate-800 lg:block" aria-hidden="true" />
              )}
              <div className="space-y-1">
                {group.items.map(({ id, label, icon: Icon, badge }) => {
                  const active = tab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        setTab(id);
                        setOpen(false);
                      }}
                      title={collapsed ? label : undefined}
                      aria-label={label}
                      className={`group relative flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer ${
                        collapsed ? "lg:justify-center lg:px-0" : ""
                      } ${
                        active
                          ? `bg-gradient-to-r from-cyan-500/15 via-cyan-500/10 to-transparent text-cyan-300 font-semibold border-l-3 border-cyan-400 shadow-xs ${
                              collapsed ? "lg:border-l-0 lg:bg-cyan-500/15" : ""
                            }`
                          : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Icon
                          size={17}
                          className={`transition-colors shrink-0 ${
                            active
                              ? "text-cyan-400"
                              : "text-slate-400 group-hover:text-slate-200"
                          }`}
                        />
                        <span className={`truncate ${hideWhenCollapsed}`}>{label}</span>
                      </div>
                      <div className={`flex items-center gap-1.5 ${hideWhenCollapsed}`}>
                        {badge && (
                          <span className="rounded-full bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300 border border-cyan-500/30">
                            {badge}
                          </span>
                        )}
                        {active && (
                          <ChevronRight
                            size={14}
                            className="text-cyan-400 opacity-80"
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Info Footer */}
        <div
          className={`shrink-0 border-t border-slate-800/80 p-3.5 bg-slate-950/80 backdrop-blur-md ${
            collapsed ? "lg:px-2" : ""
          }`}
        >
          <div
            className={`flex items-center justify-between rounded-xl bg-slate-900/80 p-2.5 border border-slate-800/80 ${
              collapsed ? "lg:flex-col lg:gap-2 lg:px-1.5" : ""
            }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div
                className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-xs font-bold text-white shadow-xs"
                title={collapsed ? adminName || "Administrator" : undefined}
              >
                {adminName ? adminName.charAt(0).toUpperCase() : "A"}
              </div>
              <div className={`overflow-hidden ${hideWhenCollapsed}`}>
                <p className="truncate text-xs font-semibold text-white">
                  {adminName || "Administrator"}
                </p>
                <p className="flex items-center gap-1 text-[10px] text-cyan-400 font-medium whitespace-nowrap">
                  <ShieldCheck size={11} /> Super Admin
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              title="Sign out"
              aria-label="Sign out"
              className={`ml-2 flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-slate-800 px-2.5 text-[11px] font-semibold text-slate-300 transition hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300 disabled:opacity-60 ${
                collapsed ? "lg:ml-0 lg:w-9 lg:justify-center lg:px-0" : ""
              }`}
            >
              {signingOut ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />}
              <span className={hideWhenCollapsed}>Sign out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}