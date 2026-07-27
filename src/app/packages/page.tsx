import PackageWrapper from "./PackageWrapper";

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
export default function Page() {


  return (
    <PackageWrapper/>
   
  );
}
