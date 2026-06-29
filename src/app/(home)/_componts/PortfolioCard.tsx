"use client";

import Image from "next/image";
import { FiSearch, FiLink } from "react-icons/fi";

interface Props {
  image: string;
  title: string;
  category: string;
  url?: string;
}

export default function PortfolioCard({
  image,
  title,
  category,
  url = "#",
}: Props) {
  return (
    <article className="group w-[270px] gap-7">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/2] gap-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="270px"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#6f7485]/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Icons */}
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-5">
          <a
            href={image}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Image"
            className="text-[#ff4f86] text-[42px] opacity-0 -translate-y-20 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-0"
          >
            <FiSearch />
          </a>

          <a
            href={url}
            aria-label="Open Project"
            className="text-[#ff4f86] text-[42px] opacity-0 -translate-y-20 transition-all duration-700 delay-100 ease-out group-hover:opacity-100 group-hover:translate-y-0"
          >
            <FiLink />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="mt-7 text-center">
        <h3 className="text-[28px] leading-[1.1] font-medium text-[#2d3443] transition-colors duration-300 hover:text-[#ff497c]">
          {title}
        </h3>

        <div className="mt-5">
          <span className="inline-block rounded-full border border-[#ff4f86] px-4 py-2 text-[12px] uppercase tracking-[2px] text-[#ff4f86] transition-all duration-300 hover:bg-[#ff497c] hover:text-white">
            {category}
          </span>
        </div>
      </div>
    </article>
  );
}