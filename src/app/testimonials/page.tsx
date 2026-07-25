
import TestimonialClient from "./_componets/TestimonialClient";
export const metadata = {
  title: "Testimonials | Web Design & App Development Company Reviews",
  description:
    "Read client testimonials about Visualytes' web design, app development, and software projects completed with quality and expertise.",
  keywords: [
    "Visualytes testimonials",
    "web design reviews",
    "app development company reviews",
    "software development testimonials",
    "client reviews",
    "web development company",
  ],
  openGraph: {
    title: "Testimonials | Web Design & App Development Company Reviews",
    description:
      "Read client testimonials about Visualytes' web design, app development, and software projects completed with quality and expertise.",
    url: "https://www.visualytes.com/testimonials",
    siteName: "Visualytes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonials | Web Design & App Development Company Reviews",
    description:
      "Read client testimonials about Visualytes' web design, app development, and software projects completed with quality and expertise.",
  },
};
export default function TestimonialsPage() {
  return (
   <TestimonialClient/>
  );
}
