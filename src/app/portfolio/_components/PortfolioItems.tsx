"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { categoryRoutes } from "./data/portfoliodata";

interface PortfolioItem {
  image: string;
  title: string;
  category: string;
}

interface Props {
  items: PortfolioItem[];
}

const ITEMS_PER_PAGE = 12;

export default function PortfolioItems({ items }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));

  // If current page becomes invalid (items changed), clamp it safely
  const safePage = Math.min(currentPage, totalPages);

  const currentItems = useMemo(() => {
    return items.slice(
      (safePage - 1) * ITEMS_PER_PAGE,
      safePage * ITEMS_PER_PAGE
    );
  }, [items, safePage]);

  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-16">
        <AnimatePresence mode="popLayout">
          {currentItems.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group relative overflow-hidden border border-gray-200 bg-white"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-white/90 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="px-5 text-center">
                  <Link
                    href={
                      categoryRoutes[item.category] ??
                      "/archives/portfolio"
                    }
                  >
                    <p className="text-[11px] uppercase tracking-[3px] text-[#ff497c] hover:text-black">
                      {item.category}
                    </p>
                  </Link>

                  <h3 className="mt-3 text-[24px] font-medium text-black hover:text-[#ff497c]">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <nav className="mt-16 mb-10 flex justify-center">
          <ul className="flex items-center gap-4">
            {/* Prev */}
            <li>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff497c] text-white text-3xl font-semibold disabled:opacity-80 hover:bg-black hover:scale-105 transition-all"
              >
                &#8249;
              </button>
            </li>

            {/* Pages */}
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;

              return (
                <li key={page}>
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold transition-all duration-300 ${
                      safePage === page
                        ? "bg-[#ff497c] text-white"
                        : "border-2 border-gray-200 bg-white text-black hover:border-[#ff497c] hover:bg-[#ff497c] hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                </li>
              );
            })}

            {/* Next */}
            <li>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={safePage === totalPages}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff497c] text-white text-3xl font-semibold disabled:opacity-80 hover:bg-black hover:scale-105 transition-all"
              >
                &#8250;
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}