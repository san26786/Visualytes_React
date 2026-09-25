import type { Metadata } from "next";
import PortfolioClient from "./_components/PortfolioClient";
import { getPortfolioItems } from "@/src/lib/portfolio";


export const metadata: Metadata = {
  title: "Portfolio for SEO Company, Web Design Service, App Developers",

  description:
    "View our collection of portfolio website designs, Corporate Branding, SEO Services and find inspiration as you design your website.",

  keywords: [
    "SEO company portfolio",
    "web design services",
    "app developers",
    "corporate branding",
    "website design portfolio",
  ],

  alternates: {
    canonical: "/portfolio",
  },

  openGraph: {
    title:
      "Portfolio for SEO Company, Web Design Service, App Developers",

    description:
      "View our collection of portfolio website designs, Corporate Branding, SEO Services and find inspiration as you design your website.",

    url: "/portfolio",

    siteName: "Visualytes",

    type: "website",

    images: [
      {
        url: "/assets/png/portfolio-og-image.png",
        width: 1200,
        height: 630,
        alt: "Visualytes Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Portfolio for SEO Company, Web Design Service, App Developers",
    description:
      "View our collection of portfolio website designs, Corporate Branding, SEO Services and find inspiration as you design your website.",
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default async function Page() {
    const portfolioData = await getPortfolioItems();

  return <PortfolioClient 
      portfolioData={portfolioData}
    />;
}
