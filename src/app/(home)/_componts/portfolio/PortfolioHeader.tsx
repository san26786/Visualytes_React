"use client";

import VerticalLine from "@/src/common/icons/VerticalLine";

export interface PortfolioHeaderProps {
  active: string;
  setActive: (category: string) => void;
  categories: string[];
}

export default function PortfolioHeader({
  active,
  setActive,
  categories,
}: PortfolioHeaderProps) {
  return (
    <>
      {/* Top CTA */}
      <div className="flex flex-col items-center justify-center gap-3">
        <button
          className="
            text-center
            min-w-[230px]
            h-[80px]
            px-[35px]
            border-[4px]
            border-[#ff497c]
            rounded-full
            bg-transparent
            text-[#1f2732]
            text-[12px]
            font-[700]
            uppercase
            tracking-[2.4px]
            leading-[12px]
            transition-all
            duration-300
            hover:bg-[#ff497c]
            hover:border-[#ff497c]
            hover:text-white
            mt-6
            mb-14
          "
        >
          Get Started
        </button>

                   <VerticalLine variant="pink" className="h-[94px] w-[4px]"/>
      </div>

      {/* Heading */}
      <h2 className="mt-8 text-center text-[42px] font-medium leading-none text-[#1f2732]">
        Our Portfolio
      </h2>

      {/* Categories */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActive?.(item)}
                        className={`uppercase tracking-[3px] text-[13px] font-bold transition duration-300 ${
              active === item
                ? "text-[#ff497c]"
                : "text-[#1f2732] hover:text-[#ff497c]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}