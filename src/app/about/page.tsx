import type { Metadata } from "next";
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


export default function Page() {
  return <AboutBrandSection />;
}
