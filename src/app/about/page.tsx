import type { Metadata } from "next";
import { ABOUT_FORM_KEY } from "@/src/lib/forms/defaults";
import { getPublicForm } from "@/src/lib/forms/server";
import { getPageContent } from "@/src/lib/page-content/server";
import AboutBrandSection from "./_componets/AboutBrandSection";


export const metadata: Metadata = {
  title:
    "About Visualytes: Our Story, Who We Are, What We Do, Why We Do It",

  description:
    "Visualytes is a global design company committed to creating positive impact. We work with organizations on complex challenges around the world.",

  keywords: [
    "About Visualytes",
    "Software development company",
    "Web design company",
    "Digital solutions",
    "Mobile app development",
    "Global design company",
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title:
      "About Visualytes: Our Story, Who We Are, What We Do, Why We Do It",

    description:
      "Visualytes is a global design company committed to creating positive impact. We work with organizations on complex challenges around the world.",

    url: "/about",

    siteName: "Visualytes",

    type: "website",

    images: [
      {
        url: "/assets/png/about-og-image.png",
        width: 1200,
        height: 630,
        alt: "About Visualytes",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "About Visualytes: Our Story, Who We Are, What We Do, Why We Do It",

    description:
      "Visualytes is a global design company committed to creating positive impact.",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


// Cached for an hour; any admin save clears it straight away (see api/admin/[...slug]/route.ts).
export const revalidate = 3600;

export default async function Page() {
  const [content, form] = await Promise.all([getPageContent("about"), getPublicForm(ABOUT_FORM_KEY)]);

  return <AboutBrandSection content={content} form={form} />;
}
