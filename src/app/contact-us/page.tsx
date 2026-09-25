import type { Metadata } from "next";
import { CONTACT_FORM_KEY } from "@/src/lib/forms/defaults";
import { getPublicForm } from "@/src/lib/forms/server";
import { getContactContent } from "@/src/lib/contact-page";
import ContactClient from "./_componets/ContactClient";

// Cached for an hour; any admin save clears it straight away (see api/admin/[...slug]/route.ts).
export const revalidate = 3600;


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
  const [form, content] = await Promise.all([getPublicForm(CONTACT_FORM_KEY), getContactContent()]);
  return <ContactClient form={form} content={content} />;
}
