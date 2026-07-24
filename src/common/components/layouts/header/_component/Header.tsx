"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Logo from "../../../../../../public/assets/svg/Logo";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/common/utils/cn";
import { 
  Menu, 
  X, 
  ChevronRight, 
  ArrowUpRight, 
  Phone, 
  Users, 
  Briefcase, 
  PenTool, 
  Code2, 
  TrendingUp, 
  Shield, 
  Layout, 
  Cpu, 
  Globe,
  Sparkles
} from "lucide-react";
import Image from "next/image";
// Utility function for class merging (create if needed)


const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/our-services",
    submenu: [
      {
        label: "Web Design",
        href: "/archives/services/web-design",
        icon: <Layout size={20} />,
        description: "Creative, conversion-focused websites"
      },
      {
        label: "Web Development",
        href: "/archives/services/bespoke-software-branding",
        icon: <Code2 size={20} />,
        description: "Robust, scalable digital solutions"
      },
      {
        label: "Digital Marketing",
        href: "/archives/services/digital",
        icon: <TrendingUp size={20} />,
        description: "Data-driven growth strategies"
      },
      {
        label: "Mobile Apps",
        href: "/archives/services/mobile-app",
        icon: <Cpu size={20} />,
        description: "Native & cross-platform apps"
      },
      {
        label: "Corporate Branding",
        href: "/archives/services/corporate-branding",
        icon: <PenTool size={20} />,
        description: "Memorable brand identities"
      },
      {
        label: "Quality Assurance",
        href: "/archives/services/quality-assurance",
        icon: <Shield size={20} />,
        description: "Bug-free, premium experiences"
      },
      {
        label: "Hosting Services",
        href: "/archives/services/hosting-services",
        icon: <Globe size={20} />,
        description: "Reliable, high-performance hosting"
      },
      {
        label: "Maintenance & Support",
        href: "/archives/services/maintenance-and-support",
        icon: <Shield size={20} />,
        description: "Ongoing care & optimization"
      },
    ],
  },
  {
    label: "Portfolio",
    href: "/portfolio",
   
  },
    { label: "Blog", href: "/blog" },

  {
  label: "About Us",
  href: "/about",
  submenu: [
    {
      label: "Our Story",
      href: "/our-story",
      icon: <Briefcase size={20} />,
      description: "Discover our journey and vision"
    },
    {
      label: "Our Team",
      href: "/team",
      icon: <Users size={20} />,
      description: "Meet the people behind our work"
    },
    {
      label: "Our Process",
      href: "/our-process",
      icon: <Cpu size={20} />,
      description: "How we create digital solutions"
    },
    {
      label: "Case Studies",
      href: "/case-study",
      icon: <Layout size={20} />,
      description: "Explore our successful projects"
    },
    {
      label: "Testimonials",
      href: "/testimonials",
      icon: <TrendingUp size={20} />,
      description: "Stories from our clients"
    },
    {
      label: "Clientele",
      href: "/clients",
      icon: <Globe size={20} />,
      description: "Brands we collaborate with"
    },
    {
      label: "Media And PR",
      href: "/media-and-pr",
      icon: <PenTool size={20} />,
      description: "Latest news and media presence"
    },
    {
      label: "We Sponsored",
      href: "/we-sponsor",
      icon: <Shield size={20} />,
      description: "Our partnerships and support"
    },
    {
      label: "Careers",
      href: "/careers",
      icon: <ArrowUpRight size={20} />,
      description: "Join our creative team"
    },
    {
      label: "FAQ",
      href: "/faq",
      icon: <ChevronRight size={20} />,
      description: "Answers to common questions"
    },
  ],
},
  { label: "Contact Us", href: "/contact-us" },
  { label: "Client Login", href: "/seo-questionnaire" },
];

// Magnetic Button Component
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 6;
    const y = (e.clientY - rect.top - rect.height / 2) / 6;
    setPosition({ x, y });
  };

  return (
    <motion.button
      ref={ref}
      className={cn("relative cursor-pointer", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setPosition({ x: 0, y: 0 });
      }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.1 }}
    >
      {children}
    </motion.button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const pathname = usePathname();
  // const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Premium Glass Header */}
      <header
  className={cn(
    "fixed left-0 z-50 w-full transition-all duration-500",
    scrolled
      ? "top-0 py-0"
      : "top-0 py-6"
  )}
>
  <div
    className={cn(
      "transition-all duration-500",
      scrolled
        ? "w-full"
        : "mx-auto max-w-[2000px] px-6"
    )}
  >
          {/* Glassmorphism Container */}
          <div
 className={cn(
  "relative flex items-center justify-between border transition-all duration-500",
  
  scrolled
   ? `
     rounded-none
     bg-[#075783]/95
     border-white/10
     backdrop-blur-xl
     shadow-[0_10px_40px_rgba(0,0,0,0.35)]
   `
   : `
     rounded-full
     bg-[#230b3a]/90
     border-white/5
     backdrop-blur-md
     shadow-[0_20px_60px_rgba(0,0,0,0.25)]
   `
 )}
>
            {/* Decorative gradient borders */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
<div
 className={cn(
  "flex w-full items-center justify-between transition-all duration-500",
  scrolled
   ? "px-4 py-1"
   : "px-2 py-2"
 )}
>              {/* Logo Area */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex items-center z-10"
              >
                <Logo />
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-2">
                <ul className="flex items-center gap-1">
                  {navItems.map((item, ) => {
                    const isActive = pathname === item.href;
                    const isHovered = hoveredNavItem === item.label;
                    
                    // Skip CTA button here, we'll place it separately
                    if (item.label === "Client Login") return null;

                    return (
                      <li
                        key={item.label}
                        className="relative group"
                        onMouseEnter={() => item.submenu && setHoveredNavItem(item.label)}
                        onMouseLeave={() => setHoveredNavItem(null)}
                      >
                        <Link
  href={item.href}
  className={cn(
    `
    group/nav relative flex items-center gap-2
    px-4 py-2.5 rounded-full
    overflow-hidden
    text-xs font-semibold uppercase
    tracking-[0.25em]
    transition-all duration-300
    `,
    isActive
      ? "text-cyan-300"
      : "text-slate-300 hover:text-white"
  )}
>

  {/* Liquid color slide */}
  <span
    className="
      absolute inset-0
      -translate-x-full
      bg-gradient-to-r
      from-cyan-400
      via-pink-500
      to-cyan-400
      opacity-30
      blur-sm
      transition-transform
      duration-700
      ease-out
      group-hover/nav:translate-x-0
    "
  />


  {/* Glass layer */}
  <span
    className="
      absolute inset-0
      rounded-full
      border border-white/10
      opacity-0
      transition-all
      duration-500
      group-hover/nav:opacity-100
    "
  />


  {/* Label */}
  <span className="relative z-10">
    {item.label}
  </span>


  {item.submenu && (
    <motion.span
      className="relative z-10"
      animate={{ rotate: isHovered ? 90 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <ChevronRight size={14} />
    </motion.span>
  )}

</Link>

                        {/* Mega Menu */}
                        {item.submenu && (
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                              className="absolute left-1/2 top-full mt-4 -translate-x-1/2 w-[1200px] z-50"
                              >
                                <div className="bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden">
                                  <div className="grid grid-cols-12 gap-0">
                                    {/* Left Menu Items */}
                                    <div className="col-span-7 p-6 border-r border-gray/8">
                                      <div className="grid grid-cols-2 gap-4">
                                        {item.submenu.map((subItem, ) => (
                                          <Link
                                            key={subItem.label}
                                            href={subItem.href}
                                            className="group flex items-start gap-3 p-4 rounded-2xl hover:bg-white/30 transition-all duration-300"
                                          >
                                            {"icon" in subItem && (
                                              <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-pink-500/20 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform duration-300">
                                                {subItem.icon}
                                              </div>
                                            )}
                                            <div>
                                              <h4 className="text-lg font-semibold text-white group-hover:text-white transition-colors">
                                                {subItem.label}
                                              </h4>
                                              {"description" in subItem && (
                                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                                  {subItem.description}
                                                </p>
                                              )}
                                            </div>
                                          </Link>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Right Creative Preview */}
                                    <div className="col-span-5 p-6 bg-gradient-to-br from-slate-900/50 to-slate-950/50 relative overflow-hidden">
                                      {/* Decorative blobs */}
                                      <div className="absolute top-0 right-0 w-64 h-94 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                      <div className="absolute bottom-0 left-0 w-78 h-98 bg-pink-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                                      <div className="relative z-10">
                                        <div className="mb-4">
                                          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">
                                            Featured Work
                                          </span>
                                        </div>

                                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black group">

  {item.label === "Services" ? (
    <video
      src="/assets/mp4/high.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="
        absolute inset-0 
        w-full h-full 
        object-cover
        transition-transform 
        duration-700 
        group-hover:scale-110
      "
    />
  ) : item.label === "About Us" ? (
    <Image
  src="/assets/jpng/aboutusheader.jpeg"
  alt="About Us"
  fill
  priority
  className="object-cover transition-transform duration-700 group-hover:scale-110"
/>
  ) : null}


  {/* Cinematic Overlay */}
  <div className="
    absolute inset-0 
    bg-gradient-to-t 
    from-black/80 
    via-black/30 
    to-transparent
  "/>


  {/* Text */}
<div className="
  absolute 
  bottom-0 
  left-0 
  p-9 
  z-10
">

  {/* About Us Icon */}
  {item.label === "About Us" && (
    <div className="
\      mb-3
      w-10
      h-10
      rounded-xl
      bg-white/10
      backdrop-blur-md
      border
      border-white/20
      flex
      items-center
      justify-center
    ">
      <Users 
        size={20}
        className="text-cyan-300"
      />
    </div>
  )}


  {/* Services Icon */}
  {item.label === "Services" && (
    <div className="
      mb-3
      w-10
      h-10
      rounded-xl
      bg-white/10
      backdrop-blur-md
      border
      border-white/20
      flex
      items-center
      justify-center
    ">
      <Sparkles
        size={20}
        className="text-pink-300"
      />
    </div>
  )}


  <h3 className="text-xl font-bold text-white">
    {item.label === "Services"
      ? "Premium Digital Experiences"
      : "Building Digital Stories"}
  </h3>


  <p className="text-sm text-slate-300 mt-1">
    {item.label === "Services"
      ? "Crafting the future of web design"
      : "Meet our team and our journey"}
  </p>

</div>

</div>
  {/* Content */}
 

                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Right Section: Phone + CTA */}
              <div className="hidden lg:flex items-center gap-6">
                <a
                  href="tel:02380970305"
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <Phone size={16} className="text-cyan-400" />
                  <span className="tracking-wide">+023 8097 0305</span>
                </a>

                {/* Premium CTA Button */}
                <MagneticButton>
                  <Link
                    href="/seo-questionnaire"
                    className="relative inline-flex items-center gap-2 px-7 py-3 rounded-full overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Client Login
                      <ArrowUpRight size={14} />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </MagneticButton>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm lg:hidden"
            />

            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-[100] h-full w-[85%] max-w-[400px] bg-slate-950 border-l border-white/10 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Close Button */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 hover:mt-9">
                  <div className="scale-75 origin-left">
                    <Logo />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Nav */}
                <nav className="flex-1 p-4">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.label}>
                        {item.submenu ? (
                          <div>
                            <button
                              onClick={() =>
                                setOpenSubMenu(openSubMenu === item.label ? null : item.label)
                              }
                              className="w-full flex items-center justify-between py-4 text-left text-lg font-medium text-white"
                            >
                              {item.label}
                              <ChevronRight
                                size={18}
                                className={cn(
                                  "transition-transform duration-300",
                                  openSubMenu === item.label && "rotate-90"
                                )}
                              />
                            </button>

                            <AnimatePresence>
                              {openSubMenu === item.label && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden pl-4"
                                >
                                  <ul className="space-y-2 pb-4">
                                    {item.submenu.map((subItem) => (
                                      <li key={subItem.label}>
                                        <Link
                                          href={subItem.href}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="block py-2.5 text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                                        >
                                          {subItem.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "block py-4 text-lg font-medium transition-colors",
                              item.label === "Client Login"
                                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 rounded-xl mt-4"
                                : "text-white hover:text-cyan-300"
                            )}
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Footer */}
                <div className="p-6 border-t border-white/5">
                  <a
                    href="tel:02380970305"
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Phone size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">Call Us</p>
                      <p className="font-medium">+023 8097 0305</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}