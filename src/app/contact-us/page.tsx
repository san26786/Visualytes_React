import type { Metadata } from "next";
import { CONTACT_FORM_KEY } from "@/src/lib/forms/defaults";
import { getPublicForm } from "@/src/lib/forms/server";
import ContactClient from "./_componets/ContactClient";

// Form fields come from the database, so this page must not be statically cached.
export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Get in Touch with Mobile App Development Services",

  description:
    "Do you need any help from us regarding any of our services? Our Dedicated support team is available for you. Call Us Now: 023 8097 0305",

  keywords: [
    "mobile app development services",
    "contact Visualytes",
    "software development company",
    "web development services",
    "digital solutions",
  ],

  alternates: {
    canonical: "/contact-us",
  },

  openGraph: {
    title:
      "Get in Touch with Mobile App Development Services",

    description:
      "Do you need any help from us regarding any of our services? Our Dedicated support team is available for you.",

    url: "/contact-us",

    siteName: "Visualytes",

    type: "website",

    images: [
      {
        url: "/assets/png/contact-og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Visualytes",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Get in Touch with Mobile App Development Services",

    description:
      "Contact Visualytes for mobile app development and digital services.",
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


export default async function Page() {
  const form = await getPublicForm(CONTACT_FORM_KEY);
  return <ContactClient form={form} />;
}
