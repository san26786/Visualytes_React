import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./sponsors.module.css";
import PageBanner from "@/src/common/components/layouts/PageBanner";

export const metadata: Metadata = {
  title: "We Sponsor | Visualytes",
  description:
    "Events and communities Visualytes has sponsored, from local festivals to charity tournaments.",
};

type Sponsorship = {
  id: string;
  index: string;
  title: string;
  dateLabel: string;
  sortDate: string; // ISO, for ordering only
  detail: string;
  href: string;
  featured?: boolean;
  colorClasses: string; // tailwind bg/text pair
};

// Real entries only, taken directly from the current /we-sponsor page.
const sponsorships: Sponsorship[] = [
  {
    id: "eastleigh-mela-2023",
    index: "01",
    title: "Eastleigh Mela 2023",
    dateLabel: "11 May 2023",
    sortDate: "2023-05-11",
    detail:
      "Lead sponsor, organized together with the Asian Welfare and Cultural Association (AWCA).",
    href: "https://www.visualytes.com/archives/11338",
    featured: true,
    colorClasses:
      "bg-violet-50 text-violet-950 dark:bg-violet-950/40 dark:text-violet-50",
  },
  {
    id: "eastleigh-mela-2024",
    index: "02",
    title: "Eastleigh Mela 2024",
    dateLabel: "5 Jul 2022",
    sortDate: "2022-07-05",
    detail: "24 July, held at Eastleigh recreation ground.",
    href: "https://www.visualytes.com/archives/10739",
    colorClasses:
      "bg-teal-50 text-teal-950 dark:bg-teal-950/40 dark:text-teal-50",
  },
  {
    id: "golf-day-championship",
    index: "03",
    title: "Golf Day Championship",
    dateLabel: "21 Feb 2022",
    sortDate: "2022-02-21",
    detail: "Visualytes Golf Day Championship, held 4 June 2022.",
    href: "https://www.visualytes.com/archives/10720",
    colorClasses:
      "bg-orange-50 text-orange-950 dark:bg-orange-950/40 dark:text-orange-50",
  },
  {
    id: "big-platinum-festival",
    index: "04",
    title: "The Big Platinum Festival",
    dateLabel: "1 Feb 2022",
    sortDate: "2022-02-01",
    detail: "22 July, 10:00am - 9:00pm.",
    href: "https://www.visualytes.com/archives/10683",
    colorClasses:
      "bg-pink-50 text-pink-950 dark:bg-pink-950/40 dark:text-pink-50",
  },
  {
    id: "gosport-festival-2021",
    index: "05",
    title: "Gosport Festival 2021",
    dateLabel: "30 Jul - 1 Aug 2021",
    sortDate: "2021-07-30",
    detail: "Held at Gosport Waterfront.",
    href: "https://www.visualytes.com/archives/10660",
    colorClasses:
      "bg-amber-50 text-amber-950 dark:bg-amber-950/40 dark:text-amber-50",
  },
];

export default function WeSponsorPage() {
  // Duplicated once so the marquee can loop seamlessly at -50%.
  const tickerItems = [...sponsorships, ...sponsorships];

  return (
    <>
    <PageBanner title="We Sponsored"/>
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Ticker */}
      <div
        className={`${styles.tickerViewport} border-y border-neutral-200 py-3 dark:border-neutral-800`}
        aria-hidden="true"
      >
        <div className={styles.tickerTrack}>
          {tickerItems.map((item, i) => (
            <span
              key={`${item.id}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap px-5 text-sm font-medium text-neutral-500 dark:text-neutral-400"
            >
              {item.title}
              <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </span>
          ))}
        </div>
      </div>

      {/* Heading */}
      <header className="pt-10 pb-8 text-center sm:pt-12">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
          We sponsor
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Hover, or focus with tab, any card to see the details.
        </p>
      </header>

      {/* Bento grid */}
      <ul
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        role="list"
      >
        {sponsorships.map((item, i) => (
          <li
            key={item.id}
            className={`${item.featured ? "sm:col-span-2 sm:row-span-2" : ""}`}
          >
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.flipCard} ${styles.enter} group block h-40 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-100 ${
                item.featured ? "sm:h-full sm:min-h-[21rem]" : ""
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
              aria-label={`${item.title}, ${item.dateLabel}. ${item.detail} Opens in a new tab.`}
            >
              <div className={`${styles.flipInner} h-full w-full`}>
                {/* Front */}
                <div
                  className={`${styles.flipFace} ${styles.flipFront} flex h-full flex-col justify-between rounded-xl p-5 ${item.colorClasses}`}
                >
                  <span className="text-xs font-medium tracking-wide opacity-70">
                    {item.index}
                    {item.featured ? " — MOST RECENT" : ""}
                  </span>
                  <span
                    className={`font-medium leading-tight ${
                      item.featured ? "text-2xl sm:text-3xl" : "text-base"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>

                {/* Back */}
                <div
                  className={`${styles.flipFace} ${styles.flipBack} flex h-full flex-col justify-center gap-3 rounded-xl p-5 ${item.colorClasses}`}
                >
                  <p className="text-xs font-medium tracking-wide opacity-70">
                    {item.dateLabel}
                  </p>
                  <p
                    className={`leading-snug ${
                      item.featured ? "text-base" : "text-sm"
                    }`}
                  >
                    {item.detail}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium">
                    View details
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
    </>
  );
}