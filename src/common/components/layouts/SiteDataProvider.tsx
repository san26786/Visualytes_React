"use client";

import { createContext, useContext, type ReactNode } from "react";

import { DEFAULT_SITE_DATA, type SiteData } from "@/src/lib/site/types";

const SiteDataContext = createContext<SiteData>(DEFAULT_SITE_DATA);

/** Hands the admin-managed header / footer / contact data to any client component below the root layout. */
export function SiteDataProvider({ value, children }: { value: SiteData; children: ReactNode }) {
  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export const useSiteData = () => useContext(SiteDataContext);
