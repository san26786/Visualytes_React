import TeamClient from "./TeamClient";
export const metadata = {
  title: "Team | Website Design, SEO & Software Development Experts",
  description:
    "Meet the Visualytes team led by Founder Nagendra Mishra. We deliver high-quality website design, SEO, and software development solutions for businesses.",
  keywords: [
    "Visualytes team",
    "website design company",
    "SEO company",
    "software development company",
    "web development experts",
    "Nagendra Mishra",
  ],
  openGraph: {
    title: "Team | Website Design, SEO & Software Development Experts",
    description:
      "Meet the Visualytes team led by Founder Nagendra Mishra. We deliver high-quality website design, SEO, and software development solutions for businesses.",
    url: "https://www.visualytes.com/team",
    siteName: "Visualytes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team | Website Design, SEO & Software Development Experts",
    description:
      "Meet the Visualytes team led by Founder Nagendra Mishra. We deliver high-quality website design, SEO, and software development solutions for businesses.",
  },
};
export default function OurStoryPage() {
  return (
    <TeamClient />
  );
}
