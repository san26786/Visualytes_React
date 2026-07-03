"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Logo from "../../../../../../public/assets/svg/Logo";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";


const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/our-services",
    submenu: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "Mobile App Development", href: "/services/mobile-app-development" },
      { label: "Corporate Branding", href: "/services/corporate-branding" },
      {
        label: "Bespoke Software Development",
        href: "/services/bespoke-software-development",
      },
      {
        label: "Website Hosting Services",
        href: "/services/hosting-services",
      },
      { label: "Quality Assurance", href: "/services/quality-assurance" },
      {
        label: "Website Maintenance & Support",
        href: "/services/maintenance-support",
      },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  {
    label: "About Us",
    href: "/about",
    submenu: [
      { label: "Our Story", href: "/our-story" },
      { label: "Our Team", href: "/team" },
      { label: "Our Process", href: "/our-process" },
      { label: "Clientele", href: "/clients" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Case Studies", href: "/case-study" },
      { label: "Media And PR", href: "/media-and-pr" },
      { label: "We Sponsored", href: "/we-sponsor" },
      { label: "Careers", href: "/careers" },
      { label: "FAQ", href: "/faq" },
    ],
  },  { label: "Contact Us", href: "/contact-us" },
  { label: "Client Login", href: "/client-login" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [mobileMenuOpen]);
  const pathname = usePathname();
const isHome = pathname === "/";
  return (
    <>
  <header
  className={`
fixed top-0 left-0 z-50 w-full
transition-all duration-300 ease-in-out
${
  isHome
    ? scrolled
      ? "bg-[#232833] shadow-lg"
      : "bg-[#232833]/20 backdrop-blur-sm backdrop-saturate-100 border-b border-white/10 shadow-lg"
    : "bg-[#232833] shadow-lg"
}
`}
>
      <div className="mx-auto max-w-[1800px] px-10">
      <div
  className={`
    flex items-center justify-between
    lg:grid lg:grid-cols-[280px_1fr_320px]
    transition-all duration-300
    ${scrolled ? "h-[90px]" : "h-[130px]"}
  `}
>
<button
  onClick={() => setMobileMenuOpen(true)}
  className="flex justify-start lg:hidden text-white"
>
  <Menu size={32} />
</button>
          {/* Logo */}
          <div
            className={`
              origin-left transition-all duration-300
              ${scrolled ? "scale-90" : "scale-100"}
            `}
          >
            <Logo />
          </div>

       
<nav className="hidden justify-center lg:flex">
  <ul className="flex items-center">
    {navItems.map((item, index) => (
      <li
        key={item.label}
        className={`
          group relative flex items-center 
          ${scrolled ? "h-[90px]" : "h-[130px]"}
        `}
      >
        <Link
          href={item.href}
          className={
            item.label === "Client Login"
              ? `
                ml-6

                inline-flex
                items-center
                justify-center

                h-[40px]
                px-[20px]

                rounded-[4px]

                bg-[#ff497c]
                border
                border-[#ff497c]

                text-[13px]
                font-bold
                uppercase
                tracking-[2px]

                text-white

                transition-all
                duration-300

                hover:bg-transparent
                hover:text-[#ff497c]
                hover:border-[#ff497c]
              `
              : `
                flex h-full items-center

                text-[12px]
                font-bold
                uppercase
                tracking-[3px]

                text-white
                transition-colors
                duration-300

                hover:text-[#ff497c]
              `
          }
        >
          {item.label}
        </Link>

        {item.submenu && (
          <ul
            className="
              absolute
              left-1/2
              top-full
              z-[999]
              min-w-[340px]
              -translate-x-1/2

              leading-[30px]
              tracking-[2.4px]
              bg-white

              shadow-[0_10px_30px_rgba(0,0,0,0.12)]

              text-center

              opacity-0
              pointer-events-none
              translate-y-[15px]

              transition-all
              duration-500
              ease-[cubic-bezier(0.23,1,0.32,1)]

              group-hover:translate-y-0
              group-hover:opacity-100
              group-hover:pointer-events-auto
            "
          >
            {item.submenu.map((sub) => (
              <li key={sub.label}>
                <Link
                  href={sub.href}
                  className="
                    block
                   px-[8px]
                   py-[8px]
                   mt-[12px]
                   mb-[12px]
                    leading-[30px]
                    tracking-[2px]

                    text-[15px]
                    font-medium

                    leading-[30px]
                    tracking-[2.4px]

                    text-[#232833]

                    transition-all
                    duration-300

                    hover:translate-x-1
                    hover:text-[#ff497c]
                  "
                >
                  {sub.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {index !== navItems.length - 1 &&
          item.label !== "Contact Us" && (
            <span className="mx-5 text-[14px] text-white/70 px-3 py-3">
              •
            </span>
          )}
      </li>
    ))}
  </ul>
</nav>

          {/* Right Section */}
          <div className="hidden items-center justify-end lg:flex">
            <a
              href="tel:02380970305"
              className="
                text-[20px]
                font-bold
                tracking-[0.5px]
                text-white
              "
            >
              <span className="text-[#ff497c] text-[24px] font-extralight font-[Poppins]">+023 8097 0305</span>
            </a>
          </div>

          {/* Mobile Menu */}
         
        </div>
      </div>

      {/* Floating Search Circle */}
      <button
        className={`
          absolute
          left-1/2
          bottom-0
          h-[58px]
          w-[58px]
          -translate-x-1/2
          rounded-full
          bg-white
          text-[#232833]
          shadow-lg
          transition-all
          duration-300

          ${
            scrolled
              ? "pointer-events-none translate-y-0 opacity-0"
              : "translate-y-1/2 opacity-100"
          }

          hover:bg-[#ff497c]
          hover:text-white
        `}
      >
        <div className="flex h-full w-full items-center justify-center">
          <Search size={20} strokeWidth={2.2} />
        </div>
      </button>
    </header>
    {/* Overlay */}

<div
  onClick={() => setMobileMenuOpen(false)}
  className={`fixed inset-0 z-[90] bg-black/60 transition-opacity duration-300 lg:hidden ${
    mobileMenuOpen
      ? "opacity-100 visible"
      : "opacity-0 invisible"
  }`}
/>

{/* Sidebar */}

<div
  className={`fixed top-0 left-0 z-[100] h-full w-[300px] bg-[#1b2436] transform transition-transform duration-300 lg:hidden ${
    mobileMenuOpen
      ? "translate-x-0"
      : "-translate-x-full"
  }`}
>

  {/* Close */}

  <div className="flex justify-end p-4 border-b border-white/10 ">
    <button onClick={() => setMobileMenuOpen(false)}>
      <X className="text-white" size={28} />
    </button>
  </div>

  <nav>

    {navItems.map((item) => (

      <div
        key={item.label}
        className="border-b border-white/10"
      >

        {/* Menu Item */}

        <div className="flex items-center justify-between">

          <Link
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className={`block w-full px-5 py-4 text-[13px] uppercase tracking-[2px]
            ${
              item.label === "Client Login"
                ? "bg-[#ff497c] text-white font-bold"
                : "text-white"
            }`}
          >
            {item.label}
          </Link>

          {item.submenu && (
            <button
              onClick={() =>
                setOpenSubMenu(
                  openSubMenu === item.label ? null : item.label
                )
              }
              className="px-4 text-white"
            >
              {openSubMenu === item.label ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          )}
        </div>

        {/* Sub Menu */}

        {item.submenu && openSubMenu === item.label && (

          <div className="bg-[#202b40]">

            {item.submenu.map((sub) => (

              <Link
                key={sub.label}
                href={sub.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-8 py-3 text-[13px] text-gray-300 hover:text-[#ff497c]"
              >
                - {sub.label}
              </Link>

            ))}

          </div>

        )}

      </div>

    ))}

  </nav>

</div>
</>
  );
}