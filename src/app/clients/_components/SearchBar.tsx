"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="flex justify-center mb-16">
      <div className="w-full max-w-[380px]">
        <div className="relative">
          {/* Search Icon */}
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-black"
            strokeWidth={1.5}
          />

          {/* Input */}
          <input
            type="text"
            placeholder="Enter Name"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="
              h-[62px]
              w-full
              bg-[#f4f4f4]
              pl-14
              pr-14
              text-[18px]
              font-medium
              text-[#666]
              placeholder:text-[#777]
              outline-none
              border-none
            "
          />

          {/* Clear Button */}
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-5 top-1/2 -translate-y-1/2"
            >
              <X
                size={20}
                strokeWidth={1.8}
                className="text-black hover:text-gray-600 transition-colors"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}