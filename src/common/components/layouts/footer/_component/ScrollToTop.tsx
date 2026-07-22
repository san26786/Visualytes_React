"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Scroll to Top"
          className="fixed bottom-4 right-8 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-pink-500 to-purple-500 text-white shadow-xl shadow-pink-500/30 transition-all duration-300 hover:shadow-pink-500/50"
        >
          <ChevronUp size={26} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
