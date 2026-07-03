"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to Top"
      className={`
        fixed
        bottom-4
        right-6
        z-[9999]
        flex
        h-13
        w-13
        items-center
        justify-center
        rounded-full
        bg-[#ff4f86]/80
        border-2
        
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:bg-[#ff4f86]
        hover:opacity-100
        hover:scale-110
        hover:border-white
        ${
          show
            ? "opacity-80 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }
      `}
    >
      <ChevronUp size={22} strokeWidth={2.5} />
    </button>
  );
}