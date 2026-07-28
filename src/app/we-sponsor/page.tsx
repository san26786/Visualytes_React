import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import styles from "./sponsors.module.css";
import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import { sponsorships } from "./sponsor-data";

export const metadata: Metadata = {
  title: "We Sponsor | Visualytes",
  description:
    "Events and communities Visualytes has sponsored, from local festivals to charity tournaments.",
};

export default function WeSponsorPage() {
  const tickerItems = [...sponsorships, ...sponsorships];

  return (
    <>
      <BrandSubPageShell
  title="We Sponsored"
  eyebrow="Our Partnerships"
  subtitle="Visualytes proudly supports community events, cultural celebrations, and initiatives that bring people together."
>
     

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
        <header className="pb-8 pt-10 text-center sm:pt-12">
         

          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Hover, or focus with tab, any card to see the details.
          </p>
        </header>


        {/* Cards */}
       {/* Cards */}
<ul
  className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
  role="list"
>
  {sponsorships.map((item, i) => (
    <li
      key={item.id}
      className={item.featured ? "lg:col-span-2" : ""}
    >
      <Link
        href={`/we-sponsor/${item.id}`}
        className={`${styles.flipCard} ${styles.enter} group block aspect-square rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-100`}
        style={{
          animationDelay: `${i * 60}ms`,
        }}
        aria-label={`${item.title}, ${item.dateLabel}. ${item.detail}`}
      >
        <div className={`${styles.flipInner} h-full w-full`}>

          {/* Front */}
          <div
            className={`${styles.flipFace} ${styles.flipFront} relative flex h-full flex-col justify-between overflow-hidden rounded-xl p-5`}
          >

            {item.image && (
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover"
                priority={item.featured}
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />


            <span className="relative z-10 text-xs font-medium tracking-wide text-white opacity-80">
              {item.index}
              {item.featured ? " — MOST RECENT" : ""}
            </span>


            <span
              className={`relative z-10 font-medium leading-tight text-white ${
                item.featured
                  ? "text-2xl sm:text-3xl"
                  : "text-base"
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
                item.featured
                  ? "text-base"
                  : "text-sm"
              }`}
            >
              {item.detail}
            </p>


            <span className="inline-flex items-center gap-1 text-sm font-medium">
              View details

              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>

          </div>

        </div>
      </Link>
    </li>
  ))}
</ul>

      </main>
      </BrandSubPageShell>
    </>
  );
}
