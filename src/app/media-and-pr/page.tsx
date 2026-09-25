
import { getPageContent } from "@/src/lib/page-content/server";
import MediaprClient from "./_componets/MediaprClient";

export const metadata = {
  title: "Company News & Media | Visualytes Business Updates",
  description:
    "Stay updated with Visualytes company news, business insights, media updates, financial information, strategy, and public relations announcements.",
  keywords: [
    "Visualytes news",
    "company news",
    "business updates",
    "company announcements",
    "media and PR",
    "business strategy",
    "Visualytes Limited",
  ],
  openGraph: {
    title: "Company News & Media | Visualytes Business Updates",
    description:
      "Stay updated with Visualytes company news, business insights, media updates, financial information, strategy, and public relations announcements.",
    url: "/news",
    siteName: "Visualytes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Company News & Media | Visualytes Business Updates",
    description:
      "Stay updated with Visualytes company news, business insights, media updates, financial information, strategy, and public relations announcements.",
  },
};
export default async function MediaPage() {
  const content = await getPageContent("media-and-pr");

  return <MediaprClient content={content} />;
}

