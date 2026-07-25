import StoryClient from "./_componets/StoryClient"
export const metadata = {
  title: "Our Story | Visualytes - IT Solutions & Digital Innovation",
  description:
    "Discover Visualytes' journey from a UK startup to a global IT partner delivering web apps, software development, and digital marketing solutions with premium service.",
  keywords: [
    "Visualytes",
    "Visualytes story",
    "about Visualytes",
    "IT solutions company",
    "software development company",
    "web application development",
    "digital marketing services",
    "UK IT partner",
  ],
  openGraph: {
    title: "Our Story | Visualytes - IT Solutions & Digital Innovation",
    description:
      "Learn how Visualytes evolved from a UK startup into a global IT partner delivering software, web applications, and digital marketing solutions.",
    url: "https://www.visualytes.com/about/our-story",
    siteName: "Visualytes",
    type: "website",
    images: [
      {
        url: "/assets/png/og-image.png",
        width: 1200,
        height: 630,
        alt: "Visualytes Our Story",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story | Visualytes - IT Solutions & Digital Innovation",
    description:
      "Discover Visualytes' journey, values, and expertise in software development, web applications, and digital marketing.",
    images: ["/assets/png/og-image.png"],
  },
};

export default function OurStoryPage() {
  return (
    <StoryClient />
  );
}
