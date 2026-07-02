"use client";

import Link from "next/link";
import { categoryRoutes } from "./data/portfoliodata";

interface Props {
  categories: string[];
  active?: string;
  setActive?: (value: string) => void;
}

export default function PortfolioFilter({
  categories,
  active,
  setActive,
}: Props) {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5">
      {categories.map((item) => (
        <Link
          key={item}
          href={categoryRoutes[item] ?? "/archives/portfolio"}
          onClick={() => setActive?.(item)}
          className={`relative uppercase tracking-[3px] text-[13px] font-bold transition-all duration-300 ${
            active === item
              ? "text-[#ff497c]"
              : "text-[#1f2732] hover:text-[#ff497c]"
          }`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}