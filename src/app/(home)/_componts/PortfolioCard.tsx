"use client";

import Image from "next/image";
import { FiSearch, FiLink } from "react-icons/fi";

interface Props {
  image: string;
  title: string;
  tags: string[];
  url?: string;
}

export default function PortfolioCard({
  image,
  title,
  tags,
  url = "#",
}: Props) {
  return (
    <article className="group w-full max-w-[300px] mx-auto">
      
      {/* IMAGE */}
      <div className="relative overflow-hidden aspect-[3/2]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* overlay (same as reference: subtle dark, not white) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500" />

        {/* ICONS */}
        <div className="absolute inset-0 flex items-center justify-center gap-6">
          
          <a
            href={image}
            className="
              text-white text-[40px]
              opacity-0 -translate-y-10
              transition-all duration-500
              group-hover:opacity-100 group-hover:translate-y-0
            "
          >
            <FiSearch />
          </a>

          <a
            href={url}
            className="
              text-white text-[40px]
              opacity-0 -translate-y-10
              transition-all duration-500 delay-100
              group-hover:opacity-100 group-hover:translate-y-0
            "
          >
            <FiLink />
          </a>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-6 text-center">
        <h3 className="text-[24px] font-medium text-[#2d3443] hover:text-[rgb(255,73,124)] transition-colors">
          {title}
        </h3>

        {/* TAGS (FULL DYNAMIC FROM DATA) */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {tags?.map((tag, i) => (
            <a
              key={`${tag}-${i}`}
              href="#"
              className="
                inline-block

                text-[16px]
                font-light
                text-[#7f7f7f]

                border border-transparent
                px-2 py-[5px]

                transition-all duration-[50ms] ease-linear

                hover:text-[rgb(255,73,124)]
                hover:text-[12px]
                hover:font-bold
                hover:uppercase
                hover:tracking-[2.4px]

                hover:border-[4px]
                hover:border-[rgb(255,73,124)]
                hover:rounded-full

                hover:px-[7px]
                hover:py-[5px]
              "
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}