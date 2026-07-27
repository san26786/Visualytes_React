import type { Metadata } from "next";
import BlogClient from "./_compoents/BlogClient";


export const metadata: Metadata = {
  title: "Blog Archives - Website Design, SEO, Software Development Company",

  description:
    "Read the latest blogs about website design, SEO services, software development, mobile apps, digital marketing and technology trends.",

  keywords: [
    "website design blog",
    "SEO company blog",
    "software development blog",
    "mobile app development",
    "digital marketing",
    "technology insights",
    "Visualytes blog",
  ],

  openGraph: {
    title:
      "Blog Archives - Website Design, SEO, Software Development Company",

    description:
      "Explore insights about website design, SEO, software development and digital innovation.",

    siteName: "Visualytes",

    type: "website",

    images: [
      {
        url: "/assets/png/blog-og-image.png",
        width: 1200,
        height: 630,
        alt: "Visualytes Blog",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Blog Archives - Website Design, SEO, Software Development Company",

    description:
      "Read expert insights about web design, SEO, software development and digital innovation.",
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
  return <BlogClient />;
}
