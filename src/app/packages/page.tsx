import { getPublicOffers } from "@/src/lib/packages/queries";
import PackageWrapper from "./PackageWrapper";

// Cached for an hour; any admin save clears it straight away (see api/admin/[...slug]/route.ts).
export const revalidate = 3600;

export const metadata = {
  title: "Packages | Visualytes Limited",
  description:
    "Explore Visualytes packages designed to deliver professional web development, software solutions, digital marketing, and technology services for businesses.",
  keywords: [
    "Visualytes packages",
    "web development packages",
    "software development packages",
    "digital marketing packages",
    "business technology solutions",
    "Visualytes Limited services",
  ],
  openGraph: {
    title: "Packages | Visualytes Limited",
    description:
      "Explore Visualytes packages designed to deliver professional web development, software solutions, digital marketing, and technology services for businesses.",
    url: "/packages",
    siteName: "Visualytes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packages | Visualytes Limited",
    description:
      "Explore Visualytes packages designed to deliver professional web development, software solutions, digital marketing, and technology services for businesses.",
  },
};
export default async function Page() {
  return <PackageWrapper offers={await getPublicOffers()} />;
}
