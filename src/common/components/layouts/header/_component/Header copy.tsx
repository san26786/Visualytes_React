import Link from "next/link";
import { Search, Menu } from "lucide-react";
import Logo from "../../../../../../public/assets/svg/Logo";
// import "@/styles/wordpress.css"; 

export default function Headerds() {
  return (
<header className="absolute top-0 left-0 z-50 w-full bg-[#A7A9B9]">
        <div className="container mx-auto px-6">
        <div className="flex h-[130px] items-center justify-between">

          {/* Logo */}
          <div className="flex-shrink-0">
          <Logo />

          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-10">

              <li>
                <Link
                  href="/"
                  className="text-white text-xs font-semibold uppercase tracking-[0.2em] hover:text-[#ff497c] transition-colors"
                >
                  Home
                </Link>
              </li>

              <li className="group relative">
                <button className="text-white text-xs font-semibold uppercase tracking-[0.2em] hover:text-[#ff497c] transition-colors">
                  Services
                </button>

                <div className="absolute left-1/2 top-full hidden min-w-[280px] -translate-x-1/2 bg-white py-6 text-center shadow-xl group-hover:block">
                  <Link
                    href="/services/web-development"
                    className="block px-6 py-2 text-sm text-[#1f2732] hover:text-[#ff497c]"
                  >
                    Web Development
                  </Link>

                  <Link
                    href="/services/digital-marketing"
                    className="block px-6 py-2 text-sm text-[#1f2732] hover:text-[#ff497c]"
                  >
                    Digital Marketing
                  </Link>

                  <Link
                    href="/services/mobile-app-development"
                    className="block px-6 py-2 text-sm text-[#1f2732] hover:text-[#ff497c]"
                  >
                    Mobile App Development
                  </Link>

                  <Link
                    href="/services/ui-ux-design"
                    className="block px-6 py-2 text-sm text-[#1f2732] hover:text-[#ff497c]"
                  >
                    UI / UX Design
                  </Link>
                </div>
              </li>

              <li>
                <Link
                  href="/portfolio"
                  className="text-white text-xs font-semibold uppercase tracking-[0.2em] hover:text-[#ff497c] transition-colors"
                >
                  Portfolio
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="text-white text-xs font-semibold uppercase tracking-[0.2em] hover:text-[#ff497c] transition-colors"
                >
                  Blog
                </Link>
              </li>

              <li className="group relative">
                <button className="text-white text-xs font-semibold uppercase tracking-[0.2em] hover:text-[#ff497c] transition-colors">
                  About Us
                </button>

                <div className="absolute left-1/2 top-full hidden min-w-[280px] -translate-x-1/2 bg-white py-6 text-center shadow-xl group-hover:block">
                  <Link
                    href="/about"
                    className="block px-6 py-2 text-sm text-[#1f2732] hover:text-[#ff497c]"
                  >
                    Our Story
                  </Link>

                  <Link
                    href="/team"
                    className="block px-6 py-2 text-sm text-[#1f2732] hover:text-[#ff497c]"
                  >
                    Our Team
                  </Link>

                  <Link
                    href="/careers"
                    className="block px-6 py-2 text-sm text-[#1f2732] hover:text-[#ff497c]"
                  >
                    Careers
                  </Link>
                </div>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-white text-xs font-semibold uppercase tracking-[0.2em] hover:text-[#ff497c] transition-colors"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/client-login"
                  className="text-white text-xs font-semibold uppercase tracking-[0.2em] hover:text-[#ff497c] transition-colors"
                >
                  Client Login
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-8">

            <a
              href="tel:02380970305"
              className="text-[24px] font-light text-white"
            >
              <span className="text-[#ff497c]">023</span> 8097 0305
            </a>

            <button className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white bg-white text-[#1f2732] transition hover:bg-[#ff497c] hover:text-white">
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white">
            <Menu size={32} />
          </button>

        </div>
      </div>
    </header>
  );
}
// "use client";

// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface SubMenuItem {
//   label: string;
//   href: string;
// }

// interface NavItem {
//   label: string;
//   href: string;
//   children?: SubMenuItem[];
//   isActive?: boolean;
// }

// // ─── Nav Data (from source HTML) ─────────────────────────────────────────────
// const NAV_ITEMS: NavItem[] = [
//   { label: "Home", href: "https://www.visualytes.com/" },
//   {
//     label: "Services",
//     href: "https://www.visualytes.com/our-services/",
//     children: [
//       { label: "Web Development", href: "https://services.visualytes.com/" },
//       { label: "Digital Marketing", href: "https://services.visualytes.com/digital-marketing-agency/" },
//       { label: "Mobile App Development", href: "https://services.visualytes.com/app-development/" },
//       { label: "Corporate Branding", href: "https://www.visualytes.com/services/corporate-branding/" },
//       { label: "Bespoke Software Development", href: "https://services.visualytes.com/bespoke-software-development" },
//       { label: "Website Hosting Services", href: "https://www.visualytes.com/services/hosting-services/" },
//       { label: "Quality Assurance", href: "https://www.visualytes.com/services/quality-assurance/" },
//       { label: "Website Maintenance & Support", href: "https://www.visualytes.com/services/maintenance-and-support/" },
//     ],
//   },
//   { label: "Portfolio", href: "https://www.visualytes.com/portfolio", isActive: true },
//   { label: "Blog", href: "https://www.visualytes.com/archives/category/blog" },
//   {
//     label: "About Us",
//     href: "https://www.visualytes.com/about",
//     children: [
//       { label: "Our story", href: "https://www.visualytes.com/our-story" },
//       { label: "Our Team", href: "/team" },
//       { label: "Our Process", href: "https://www.visualytes.com/our-process" },
//       { label: "Clientele", href: "https://www.visualytes.com/clients" },
//       { label: "Testimonials", href: "https://www.visualytes.com/testimonials" },
//       { label: "Case studies", href: "/case-study" },
//       { label: "Media And PR", href: "/media-and-pr/" },
//       { label: "We Sponsored", href: "https://www.visualytes.com/we-sponsor" },
//       { label: "Careers", href: "https://www.visualytes.com/careers" },
//       { label: "FAQ", href: "https://www.visualytes.com/faq" },
//     ],
//   },
//   { label: "Contact Us", href: "https://www.visualytes.com/contact-us" },
// ];

// // ─── Dropdown Menu ────────────────────────────────────────────────────────────
// function DropdownMenu({ items }: { items: SubMenuItem[] }) {
//   return (
//     <ul
//       className="
//         absolute top-full left-0 mt-[10px] z-50
//         bg-[#1e2235] border-t-2 border-[#ff3d75]
//         min-w-[220px] py-2 shadow-xl
//       "
//       role="menu"
//     >
//       {items.map((item) => (
//         <li key={item.href} role="none">
//           <Link
//             href={item.href}
//             role="menuitem"
//             className="
//               block px-5 py-[9px]
//               text-[13px] font-light text-[#c5c8d4]
//               leading-[1.6] tracking-wide
//               hover:text-white hover:bg-[#ffffff0d]
//               transition-colors duration-150
//               font-[Poppins,sans-serif]
//             "
//           >
//             {item.label}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// }

// // ─── Nav Link with optional dropdown ─────────────────────────────────────────
// function NavLink({ item }: { item: NavItem }) {
//   const [open, setOpen] = useState<boolean>(false);
//   const ref = useRef<HTMLLIElement>(null);

//   // Close on outside click
//   useEffect(() => {
//     function handleClick(e: MouseEvent) {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   const hasChildren = item.children && item.children.length > 0;

//   return (
//     <li
//       ref={ref}
//       className="relative flex items-center"
//       onMouseEnter={() => hasChildren && setOpen(true)}
//       onMouseLeave={() => hasChildren && setOpen(false)}
//     >
//       <Link
//         href={item.href}
//         className={`
//           inline-flex items-center gap-1
//           text-[11px] font-normal tracking-[0.12em] uppercase
//           leading-[30px] py-[49.5px]
//           transition-colors duration-150
//           font-[Poppins,sans-serif]
//           ${item.isActive ? "text-white" : "text-[#9da3b4] hover:text-white"}
//         `}
//         aria-haspopup={hasChildren ? "true" : undefined}
//         aria-expanded={hasChildren ? open : undefined}
//       >
//         {item.label}
//         {hasChildren && (
//           // Tiny SF-style arrow icon
//           <svg
//             className="w-2 h-2 ml-0.5 mt-px opacity-60"
//             viewBox="0 0 8 5"
//             fill="currentColor"
//             aria-hidden="true"
//           >
//             <path d="M0 0l4 5 4-5z" />
//           </svg>
//         )}
//       </Link>

//       {hasChildren && open && <DropdownMenu items={item.children!} />}
//     </li>
//   );
// }

// // ─── Bullet separator ─────────────────────────────────────────────────────────
// function Bullet() {
//   return (
//     <li aria-hidden="true" className="mx-[6px] text-[#4a4f63] text-[10px] select-none leading-[30px]">
//       •
//     </li>
//   );
// }

// // ─── Mobile Hamburger ─────────────────────────────────────────────────────────
// function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
//   return (
//     <button
//       type="button"
//       aria-label={open ? "Close menu" : "Open menu"}
//       aria-expanded={open}
//       onClick={onClick}
//       className="
//         flex flex-col justify-center items-center gap-[5px]
//         w-10 h-10 ml-4 xs:hidden sm:hidden lg:hidden xl:hidden 2xl:hidden
//         md:hidden
//       "
//     >
//       <span
//         className={`block h-[2px] w-6 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`}
//       />
//       <span
//         className={`block h-[2px] w-6 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`}
//       />
//       <span
//         className={`block h-[2px] w-6 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}
//       />
//     </button>
//   );
// }

// // ─── Main Header ──────────────────────────────────────────────────────────────
// export default function Header() {
//   const [mobileOpen, setMobileOpen] = useState<boolean>(false);

//   return (
//     <header
//       id="header"
//       className="main-header-wrap w-full"
//       style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300 }}
//     >
//       {/* Spacer that reserves the fixed header height — matches source height:129px */}
//       <div style={{ height: "129px" }}>
//         <div
//           className="
//             fixed top-0 left-0 right-0 z-[1000]
//             bg-[#252836]
//             w-full
//           "
//           style={{ height: "129px" }}
//         >
//           {/* container-fluid equivalent — full width with horizontal padding */}
//           <div className="w-full px-4 sm:px-6 lg:px-8 h-full">
//             {/* Single flex row matching display_table layout */}
//             <div className="flex items-center h-full w-full">

//               {/* ── Logo (header_left_logo) ──────────────────────────────── */}
//               <div className="flex-shrink-0 flex items-center" style={{ minWidth: 0 }}>
//                 <Link
//                   href="https://www.visualytes.com/"
//                   rel="home"
//                   aria-label="Digital Marketing Agency, web development company"
//                 >
//                   <Image
//                     src="/assets/png/logo.png"
//                     alt="Digital Marketing Agency, web development company"
//                     width={160}
//                     height={52}
//                     priority
//                     className="h-[52px] w-auto object-contain"
//                   />
//                 </Link>
//               </div>

//               {/* ── Main Nav (header_mainmenu) — hidden on mobile ─────────── */}
//               <nav
//                 className="hidden lg:flex flex-1 items-center justify-center"
//                 aria-label="Primary navigation"
//               >
//                 <ul className="flex items-center m-0 p-0 list-none">
//                   {NAV_ITEMS.map((item, i) => (
//                     <>
//                       <NavLink key={item.label} item={item} />
//                       {i < NAV_ITEMS.length - 1 && <Bullet key={`sep-${i}`} />}
//                     </>
//                   ))}
//                   {/* Extra bullet before CLIENT LOGIN */}
//                   <Bullet key="sep-last" />
//                 </ul>
//               </nav>

//               {/* ── Right side: CLIENT LOGIN + phone ─────────────────────── */}
//               <div className="flex-shrink-0 flex items-center gap-5 ml-auto lg:ml-0">
//                 {/* CLIENT LOGIN button */}
//                 <Link
//                   href="https://www.visualytes.com/seo-questionnaire/"
//                   className="
//                     inline-block
//                     bg-[#ff3d75] hover:bg-[#e8325f]
//                     text-white text-[11px] font-semibold tracking-[0.14em] uppercase
//                     px-[22px] py-[13px]
//                     leading-none
//                     transition-colors duration-150
//                     whitespace-nowrap
//                   "
//                   style={{ borderRadius: 0 }}
//                 >
//                   Client Login
//                 </Link>

//                 {/* Phone — hidden on xs screens to match hidden-xs */}
//                 <span
//                   className="hidden sm:inline-block text-[#ff3d75] font-bold text-[15px] tracking-wide whitespace-nowrap"
//                   aria-label="Phone number"
//                 >
//                   023 8097 0305
//                 </span>

//                 {/* Search icon */}
//                 <button
//                   type="button"
//                   aria-label="Open search"
//                   className="text-[#9da3b4] hover:text-white transition-colors duration-150 ml-1"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-[15px] h-[15px]"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth={2.2}
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     aria-hidden="true"
//                   >
//                     <circle cx="11" cy="11" r="8" />
//                     <line x1="21" y1="21" x2="16.65" y2="16.65" />
//                   </svg>
//                 </button>

//                 {/* Mobile hamburger */}
//                 <Hamburger open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
//               </div>
//             </div>
//           </div>

//           {/* ── Mobile nav drawer ───────────────────────────────────────── */}
//           {mobileOpen && (
//             <nav
//               className="lg:hidden bg-[#1e2235] border-t border-[#ffffff12] px-4 pb-4"
//               aria-label="Mobile navigation"
//             >
//               <ul className="flex flex-col gap-0 list-none m-0 p-0">
//                 {NAV_ITEMS.map((item) => (
//                   <li key={item.label} className="border-b border-[#ffffff0d]">
//                     <Link
//                       href={item.href}
//                       className={`
//                         block py-3 text-[13px] tracking-wide uppercase
//                         font-[Poppins,sans-serif]
//                         ${item.isActive ? "text-white" : "text-[#9da3b4] hover:text-white"}
//                         transition-colors duration-150
//                       `}
//                       onClick={() => setMobileOpen(false)}
//                     >
//                       {item.label}
//                     </Link>
//                     {item.children && (
//                       <ul className="pl-4 pb-2 list-none m-0">
//                         {item.children.map((child) => (
//                           <li key={child.href}>
//                             <Link
//                               href={child.href}
//                               className="block py-1.5 text-[12px] text-[#7b8097] hover:text-white transition-colors duration-150"
//                               onClick={() => setMobileOpen(false)}
//                             >
//                               {child.label}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }