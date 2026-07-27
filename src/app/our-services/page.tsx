import type { Metadata } from "next";
import ServicesClient from "./_componets/ServicesClient";


export const metadata: Metadata = {
  title: "Mobile App, Website Development Services | Visualytes",
  description:
    "Visualytes provides website development, mobile app development, digital marketing, corporate branding, bespoke software, hosting, QA and maintenance services.",

  keywords: [
    "Website Development Services",
    "Mobile App Development",
    "Digital Marketing",
    "Software Development",
    "Corporate Branding",
    "Visualytes",
  ],

  alternates: {
    canonical: "/our-services",
  },

  openGraph: {
    title: "Mobile App, Website Development Services | Visualytes",
    description:
      "Explore Visualytes digital solutions including web development, mobile apps, branding and software services.",
    url: "/our-services",
    siteName: "Visualytes",
    type: "website",
    images: [
      {
        url: "/assets/png/services/Website-designing-600x600.png",
        width: 1200,
        height: 630,
        alt: "Visualytes Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Visualytes Services",
    description:
      "Website, mobile app and software development services.",
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
  return <ServicesClient/>;
}
