"use client";

import Image from "next/image";

export default function ReviewLogo() {
  const reviewLogos = [
    {
      name: "GoodFirms",
      image: "/assets/png/goodfirms-badge.png",
    },
    {
      name: "Clutch",
      image: "/assets/png/clutch-dark.jpg",
    },
    {
      name: "Top Company",
      image: "/assets/png/badge-top-company.png",
    },
    {
      name: "Companies",
      image: "/assets/png/companies.png",
    },
  ];

  return (
    <section className="overflow-hidden py-16 ">
      <div className="mx-auto max-w-[1620px] px-6 bg-white">

        <div className="flex flex-wrap items-center justify-center gap-6">

          {reviewLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="
                flex
                h-28
                w-52
                shrink-0
                items-center
                justify-center
                p-5
              "
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={180}
                height={80}
                className="
                  h-16
                  w-auto
                  object-contain
                "
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}