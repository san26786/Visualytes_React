"use client";

import React from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
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
  FileText,
  ImageIcon,
  ListChecks,
  SearchCheck,
  Settings,
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
      { id: "pages", label: "Pages", icon: FileText, badge: "Soon" },
      { id: "services", label: "Services", icon: Layers, badge: "Dynamic" },
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
    title: "SEO",
    items: [{ id: "seo", label: "SEO Settings", icon: SearchCheck, badge: "Soon" }],
  },
  {
    title: "Forms & Sales",
    items: [
      { id: "forms", label: "Forms & Responses", icon: ClipboardList },
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
      { id: "settings", label: "Settings", icon: Settings, badge: "Soon" },
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
}

export function Sidebar({ tab, setTab, open, setOpen, adminName }: SidebarProps) {
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
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800/80 bg-slate-950 text-slate-300 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-18 shrink-0 items-center justify-between border-b border-slate-800/80 px-5 bg-slate-950/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl">
              <span className="text-lg"> 
                 <Image
                   src="/assets/jpng/footer_logo2.png"
                   alt="logo"
                   width={27}
                  height={19}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                   />
                                   </span>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">
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
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden transition"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Navigation Area with Custom Scrollbar */}
        <nav className="flex-1 min-h-0 overflow-y-auto px-3.5 py-4 space-y-6 [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.2)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-800 hover:[&::-webkit-scrollbar-thumb]:bg-slate-700">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="space-y-1.5">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400/90">
                {group.title}
              </div>
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
                      className={`group relative flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-150 cursor-pointer ${
                        active
                          ? "bg-gradient-to-r from-cyan-500/15 via-cyan-500/10 to-transparent text-cyan-300 font-semibold border-l-3 border-cyan-400 shadow-xs"
                          : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          size={17}
                          className={`transition-colors shrink-0 ${
                            active
                              ? "text-cyan-400"
                              : "text-slate-400 group-hover:text-slate-200"
                          }`}
                        />
                        <span className="truncate">{label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
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
        <div className="shrink-0 border-t border-slate-800/80 p-3.5 bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center justify-between rounded-xl bg-slate-900/80 p-2.5 border border-slate-800/80">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-xs font-bold text-white shadow-xs">
                {adminName ? adminName.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-xs font-semibold text-white">
                  {adminName || "Administrator"}
                </p>
                <p className="flex items-center gap-1 text-[10px] text-cyan-400 font-medium">
                  <ShieldCheck size={11} /> Super Admin
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}