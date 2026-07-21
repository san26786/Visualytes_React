"use client";

import { Search, X } from "lucide-react";
import { BRAND_MOTION, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-12 flex justify-center md:mb-16">
      <div className="w-full max-w-md">
        <div className={`relative ${BRAND_SURFACE.mutedGlassCard} ${BRAND_MOTION.softTransition} focus-within:border-cyan-300/40`}>
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-300"
            strokeWidth={1.5}
          />
          <input
            type="text"
            placeholder="Search clients..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-14 w-full bg-transparent pl-14 pr-14 text-base font-medium text-white placeholder:text-slate-400 outline-none sm:h-16 sm:text-lg"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition-colors hover:text-white"
              aria-label="Clear search"
            >
              <X size={20} strokeWidth={1.8} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
