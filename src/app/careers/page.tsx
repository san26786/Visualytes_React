
import { getPageContent } from "@/src/lib/page-content/server";
import CareersClient from "./CareersClient";
export const metadata = {
  title: "Visualytes Careers & Job Opportunities | Visualytes",
  description:
    "Visualytes careers open the door for professional growth and development, giving you access to innovative tools, experiences, and opportunities.",
  keywords: [
    "Visualytes careers",
    "Visualytes jobs",
    "career opportunities",
    "software development jobs",
    "web development careers",
    "digital marketing jobs",
    "technology jobs",
    "join Visualytes",
  ],
  openGraph: {
    title: "Visualytes Careers & Job Opportunities | Visualytes",
    description:
      "Visualytes careers open the door for professional growth and development, giving you access to innovative tools, experiences, and opportunities.",
    siteName: "Visualytes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visualytes Careers & Job Opportunities | Visualytes",
    description:
      "Visualytes careers open the door for professional growth and development, giving you access to innovative tools, experiences, and opportunities.",
  },
};
export default async function CareersPage() {
  const content = await getPageContent("careers");

  return <CareersClient content={content} />;
}

