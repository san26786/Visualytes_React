"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const SERVICES = [
  { label: "Web Designing", href: "/services/web-designing" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Mobile App Development", href: "/services/app-development" },
  { label: "Corporate Branding", href: "/services/corporate-branding" },
  { label: "Bespoke Software", href: "/services/bespoke-software" },
  { label: "Website Hosting Services", href: "/services/hosting-services" },
  { label: "Quality Assurance", href: "/services/quality-assurance" },
  { label: "Maintenance & Support", href: "/services/maintenance-support" },
];

const ABOUT = [
  { label: "Our Story", href: "/about/our-story" },
  { label: "Our Team", href: "/about/our-team" },
  { label: "Our Process", href: "/about/our-process" },
  { label: "Clientele", href: "/about/clientele" },
  { label: "Testimonials", href: "/about/testimonials" },
  { label: "Case Studies", href: "/about/case-studies" },
  { label: "Media & PR", href: "/about/media-pr" },
  { label: "Careers", href: "/about/careers" },
  { label: "FAQ", href: "/about/faq" },
];

interface DropdownProps {
  label: string;
  items: { label: string; href: string }[];
}

function Dropdown({ label, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wide hover:text-[#e63329] transition-colors py-2 px-1"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <svg
          className={`w-3 h-3 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 bg-white shadow-xl border-t-2 border-[#e63329] min-w-[220px] py-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-5 py-2.5 text-[12.5px] font-medium text-[#333] hover:bg-[#e63329] hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Trial() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-shadow bg-white ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      {/* Top bar */}
      <div className="bg-[#002147] text-white">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-9">
          <p className="text-[12px] tracking-wide">
            Welcome to Visualytes — Your Digital Partners
          </p>
          <a
            href="tel:02380970305"
            className="text-[12px] font-semibold tracking-wide hover:text-[#e63329] transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.36.27 2.67.76 3.88a1 1 0 01-.27 1.11l-2.37 1.8z" />
            </svg>
            023 8097 0305
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-[42px] h-[42px] bg-[#002147] rounded flex items-center justify-center">
                <span className="text-white font-black text-lg leading-none">V</span>
              </div>
              <div className="leading-none">
                <span className="block text-[20px] font-black text-[#002147] tracking-tight leading-tight">
                  visua<span className="text-[#e63329]">lytes</span>
                </span>
                <span className="block text-[9px] font-semibold text-[#666] uppercase tracking-[0.15em] leading-tight">
                  Digital Agency
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <Link
              href="/"
              className="text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wide hover:text-[#e63329] transition-colors py-2 px-3"
            >
              Home
            </Link>
            <div className="px-2">
              <Dropdown label="Services" items={SERVICES} />
            </div>
            <Link
              href="/portfolio"
              className="text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wide hover:text-[#e63329] transition-colors py-2 px-3"
            >
              Portfolio
            </Link>
            <Link
              href="/blog"
              className="text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wide hover:text-[#e63329] transition-colors py-2 px-3"
            >
              Blog
            </Link>
            <div className="px-2">
              <Dropdown label="About Us" items={ABOUT} />
            </div>
            <Link
              href="/contact"
              className="text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wide hover:text-[#e63329] transition-colors py-2 px-3"
            >
              Contact Us
            </Link>
            <Link
              href="/client-login"
              className="text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wide hover:text-[#e63329] transition-colors py-2 px-3"
            >
              Client Login
            </Link>
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#enquiry"
              className="hidden sm:inline-flex items-center justify-center bg-[#e63329] hover:bg-[#c52a21] text-white text-[12px] font-bold uppercase tracking-widest px-5 py-2.5 transition-colors"
            >
              Get Started
            </a>
            <button
              className="lg:hidden p-2 text-[#002147]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="max-w-[1200px] mx-auto px-4 py-3 flex flex-col">
            <Link
              href="/"
              className="py-3 text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wide border-b border-gray-100 hover:text-[#e63329]"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <button
              className="py-3 text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wide border-b border-gray-100 hover:text-[#e63329] flex justify-between items-center"
              onClick={() => setMobileServices((v) => !v)}
            >
              Services
              <svg className={`w-4 h-4 transition-transform ${mobileServices ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileServices && (
              <div className="bg-gray-50 pl-4">
                {SERVICES.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2.5 text-[12.5px] text-[#444] border-b border-gray-100 hover:text-[#e63329]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            <Link
              href="/portfolio"
              className="py-3 text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wide border-b border-gray-100 hover:text-[#e63329]"
              onClick={() => setMobileOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/blog"
              className="py-3 text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wide border-b border-gray-100 hover:text-[#e63329]"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <button
              className="py-3 text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wide border-b border-gray-100 hover:text-[#e63329] flex justify-between items-center"
              onClick={() => setMobileAbout((v) => !v)}
            >
              About Us
              <svg className={`w-4 h-4 transition-transform ${mobileAbout ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileAbout && (
              <div className="bg-gray-50 pl-4">
                {ABOUT.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2.5 text-[12.5px] text-[#444] border-b border-gray-100 hover:text-[#e63329]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            <Link
              href="/contact"
              className="py-3 text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wide border-b border-gray-100 hover:text-[#e63329]"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="/client-login"
              className="py-3 text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wide border-b border-gray-100 hover:text-[#e63329]"
              onClick={() => setMobileOpen(false)}
            >
              Client Login
            </Link>
            <a
              href="#enquiry"
              className="mt-3 inline-flex items-center justify-center bg-[#e63329] text-white text-[12px] font-bold uppercase tracking-widest px-5 py-3"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
