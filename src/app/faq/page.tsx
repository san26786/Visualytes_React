import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import FAQSection from "./_compoents/FAQSection";
export const metadata = {
  title: "Mark Up Your FAQs | Website Design & Software Development",
  description:
    "A Frequently Asked Question (FAQ) page contains a list of questions and answers about website design, software development, and services.",
  keywords: [
    "Visualytes FAQs",
    "website design FAQs",
    "software development FAQs",
    "FAQ page",
    "web development questions",
    "software solutions",
    "digital services",
  ],
  openGraph: {
    title: "Mark Up Your FAQs | Website Design & Software Development",
    description:
      "A Frequently Asked Question (FAQ) page contains a list of questions and answers about website design, software development, and services.",
    url: "/faqs",
    siteName: "Visualytes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Up Your FAQs | Website Design & Software Development",
    description:
      "A Frequently Asked Question (FAQ) page contains a list of questions and answers about website design, software development, and services.",
  },
};
export default function FAQPage() {
  return (
    <BrandSubPageShell
      title="FAQ"
      eyebrow="Got Questions?"
      subtitle="Find answers to the most common questions about our web design, development and SEO services."
    >
      <FAQSection />
    </BrandSubPageShell>
  );
}

