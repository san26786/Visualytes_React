
// "use client";

// import { useRef, useState, useCallback } from "react";
// import Image from "next/image";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// import "swiper/css";
// import "swiper/css/navigation";
// import VerticalLine from "@/src/common/icons/VerticalLine";

// const categories = [
//   "ALL",
//   "WEB DESIGN",
//   "SEO",
//   "MOBILE APPS",
//   "CORPORATE BRANDING",
//   "ECOMMERCE WEBSITE",
// ];
// const allOnlyPortfolio = [
//   {
//     title: "Blogs on Web",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/blogs-on-web.jpg.bv.webp",
//   },
//   {
//     title: "Business Connector Local",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/Artboard-–-3.jpg.bv.webp",
//   },
//   {
//     title: "Eastleigh MELA",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/Eastleigh-Mela-23.png.bv.webp",
//   },
//   {
//     title: "Eastleigh Mela 2023",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/Eastleigh-Mela-23.png.bv.webp",
//   },
//   {
//     title: "Eastleigh Mela 2024",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/Eastleigh-Mela-23.png.bv.webp",
//   },
//   {
//     title: "Golf Day Championship",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/Artboard-–-4.jpg.bv.webp",
//   },
//   {
//     title: "Golf Event",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/Artboard-–-4.jpg.bv.webp",
//   },
//   {
//     title: "GOSPORT FESTIVAL 2021",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/Artboard-–-5.jpg.bv.webp",
//   },
//   {
//     title: "How a Web Development Company Creates Impactful Meta Descriptions",
//     category: "ALL_ONLY",
//     image:
//       "/assets/webp/portfolio/Web-Development-Company-Online-Presence-Boost-online-presence.png.bv.webp",
//   },
//   {
//     title: "How Google's RankBrain Algorithm Impacts Social Media",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/SEO-Company-in-London-SEO-Slugs.png.bv.webp",
//   },
//   {
//     title:
//       "How Partnering with a Web Development Company Can Elevate Your Online Presence",
//     category: "ALL_ONLY",
//     image:
//       "/assets/webp/portfolio/Web-Development-Company-Online-Presence-Boost-online-presence.png.bv.webp",
//   },
//   {
//     title: "Learning on Web",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/learning-on-web.jpg.bv.webp",
//   },
//   {
//     title: "LMS on Web",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/Artboard-–-5.jpg.bv.webp",
//   },
//   {
//     title: "Loyalty on Web",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/loyalty-on-web.jpg.bv.webp",
//   },
//   {
//     title: "Maintenance & Support",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/maintenance-and-support-1170x780-min.png",
//   },
//   {
//     title: "Newsletter On Web",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/newsletter-ron-web.jpg.bv.webp",
//   },
//   {
//     title: "Punch Monitor",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/punch-moniter.jpg.bv.webp",
//   },
//   {
//     title: "SEO Company in London Shares the Importance of SEO Slugs",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/SEO-Company-in-London-SEO-Slugs.png.bv.webp",
//   },
//   {
//     title: "Speed Networking",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/speed-networking.jpg.bv.webp",
//   },
//   {
//     title: "The Big Platinum Festival",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/Artboard-–-3.jpg.bv.webp",
//   },
//   {
//     title: "The Digital Buzz Magazine",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/Artboard-–-4.jpg.bv.webp",
//   },
//   {
//     title: "Trade Show",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/trade-show.jpg.bv.webp",
//   },
//   {
//     title: "Voucher Line on Code",
//     category: "ALL_ONLY",
//     image: "/assets/webp/portfolio/voucher-line-on-code.jpg.bv.webp",
//   },
// ];
// const portfolio = [
//   // ================= WEB DESIGN =================
//   {
//     title: "3D Pro Lashes",
//     category: "WEB DESIGN",
//     image: "/assets/webp/portfolio/3d-2.jpg",
//   },
//   {
//     title: "Ashford Motors",
//     category: "WEB DESIGN",
//     image: "/assets/webp/portfolio/asford.jpg",
//   },
//   {
//     title: "Digital Age Expo",
//     category: "WEB DESIGN",
//     image: "/assets/webp/portfolio/digital-age.jpg",
//   },
//   {
//     title: "Ganyana Car Rental",
//     category: "WEB DESIGN",
//     image: "/assets/webp/portfolio/ganyana.jpg",
//   },
//   {
//     title: "GNS Travels",
//     category: "WEB DESIGN",
//     image: "/assets/webp/portfolio/Gns-Travel.png.bv.webp",
//   },
//   {
//     title: "London Car Rentals",
//     category: "WEB DESIGN",
//     image: "/assets/webp/portfolio/lcr.jpg",
//   },
//   {
//     title: "Marsham Court Hotel",
//     category: "WEB DESIGN",
//     image: "/assets/webp/portfolio/marsham.jpg",
//   },
//   {
//     title: "MW Estate Planning",
//     category: "WEB DESIGN",
//     image: "/assets/webp/portfolio/mw.jpg",
//   },
//   {
//     title: "Omis Spice Website",
//     category: "WEB DESIGN",
//     image: "/assets/webp/portfolio/omi-1.jpg",
//   },
//   {
//     title: "Redcell Pathlab",
//     category: "WEB DESIGN",
//     image: "/assets/webp/portfolio/redcell.jpg",
//   },
//   {
//     title: "Unity 101",
//     category: "WEB DESIGN",
//     image: "/assets/webp/portfolio/unity101.jpg",
//   },
//   {
//     title: "Yellowsands",
//     category: "WEB DESIGN",
//     image: "/assets/webp/portfolio/yellow.jpg",
//   },
//   {
//     title: "Yoga Uganda",
//     category: "WEB DESIGN",
//     image: "/assets/webp/portfolio/Yoga-uganda.png.bv.webp",
//   },

//   // ================= SEO =================
//   {
//     title: "Autostopcock",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Autostopcock.png",
//   },
//   {
//     title: "Focus Magazines",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Focus-Magazines.png",
//   },
//   {
//     title: "Greensure Environmental",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Greensure-Environmental.png",
//   },
//   {
//     title: "Jervis Accounting Services",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Jervis-Accounting-Services.png",
//   },
//   {
//     title: "Marsham Court Hotel",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Marsham-court.png.bv.webp",
//   },
//   {
//     title: "MW Estate Planning",
//     category: "SEO",
//     image: "/assets/webp/portfolio/MW-Estate-Planning.png",
//   },
//   {
//     title: "Office Furniture Solutions",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Office-Furniture-Solutions.png",
//   },
//   {
//     title: "Oseason",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Oseason.png",
//   },
//   {
//     title: "Positive Branding",
//     category: "SEO",
//     image: "/assets/webp/portfolio/positive-branding.png.bv.webp",
//   },
//   {
//     title: "Propeller Tech",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Propeller-Tech.png",
//   },
//   {
//     title: "Reeds Central",
//     category: "SEO",
//     image: "/assets/webp/portfolio/reeds-central.png.bv.webp",
//   },
//   {
//     title: "Signit Online",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Signit-Online-2.png",
//   },
//   {
//     title: "Sterling Washroom Services",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Sterling-washroom.png.bv.webp",
//   },
//   {
//     title: "Success Moves Candidates",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Success-Moves-Candidates.png",
//   },
//   {
//     title: "Success Moves Sales",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Success-Moves-Sales.png",
//   },
//   {
//     title: "The VA Team",
//     category: "SEO",
//     image: "/assets/webp/portfolio/The-Va-Team.png",
//   },
//   {
//     title: "Thorney Park",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Thorney-Park.png",
//   },
//   {
//     title: "Vena Space",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Vena-Space.png",
//   },

//   // ================= CORPORATE BRANDING =================
//   {
//     title: "Find Us On Web",
//     category: "CORPORATE BRANDING",
//     image: "/assets/webp/portfolio/Find-us-on-web.png.bv.webp",
//   },
//   {
//     title: "Geecon Global",
//     category: "CORPORATE BRANDING",
//     image: "/assets/webp/portfolio/Geecon-Global.png.bv.webp",
//   },
//   {
//     title: "Sign IT Online",
//     category: "CORPORATE BRANDING",
//     image: "/assets/webp/portfolio/Signit-Online-2.png",
//   },
//   {
//     title: "Visualytes",
//     category: "CORPORATE BRANDING",
//     image: "/assets/webp/portfolio/Visualytes.png.bv.webp",
//   },

//   // ================= ECOMMERCE =================
//   {
//     title: "Lillies Online Store",
//     category: "ECOMMERCE WEBSITE",
//     image: "/assets/webp/portfolio/lilles.jpg",
//   },
//   {
//     title: "ShopsFit",
//     category: "ECOMMERCE WEBSITE",
//     image: "/assets/webp/portfolio/shopfits.jpg",
//   },
//   {
//     title: "Skinni Snax",
//     category: "ECOMMERCE WEBSITE",
//     image: "/assets/webp/portfolio/skinnisnax.jpg",
//   },

//   // ================= ADDED FROM YOUR LINKS =================

//   // SEO / branding extras
//   {
//     title: "Greensure Environmental",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Greensure-Environmental.png",
//   },
//   {
//     title: "Sterling Washroom",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Sterling-washroom.png.bv.webp",
//   },
//   {
//     title: "MW Estate Planning",
//     category: "SEO",
//     image: "/assets/webp/portfolio/MW-Estate-Planning.png",
//   },
//   {
//     title: "Reeds Central",
//     category: "SEO",
//     image: "/assets/webp/portfolio/reeds-central.png.bv.webp",
//   },
//   {
//     title: "Marsham Court",
//     category: "SEO",
//     image: "/assets/webp/portfolio/Marsham-court.png.bv.webp",
//   },
//   {
//     title: "Positive Branding",
//     category: "SEO",
//     image: "/assets/webp/portfolio/positive-branding.png.bv.webp",
//   },

//   // Mobile apps
//   {
//     title: "Mobile App UI 1",
//     category: "MOBILE APPS",
//     image: "/assets/webp/portfolio/Artboard-–-4-400x399.jpg",
//   },
//   {
//     title: "The Digital Buzz Magazine",
//     category: "MOBILE APPS",
//     image: "/assets/webp/portfolio/Artboard-–-3-400x399.jpg",
//   },
//   {
//     title: "lms on Web ",
//     category: "MOBILE APPS",
//     image: "/assets/webp/portfolio/Artboard-–-5-400x399.jpg",
//   },
//   {
//     title: "Voucher System",
//     category: "MOBILE APPS",
//     image: "/assets/webp/portfolio/voucher-line-on-code-400x399.jpg",
//   },
//   {
//     title: "Trade Show App",
//     category: "MOBILE APPS",
//     image: "/assets/webp/portfolio/trade-show-400x399.jpg",
//   },
//   {
//     title: "Punch Monitor",
//     category: "MOBILE APPS",
//     image: "/assets/webp/portfolio/punch-moniter-400x399.jpg",
//   },
//   {
//     title: "Newsletter System",
//     category: "MOBILE APPS",
//     image: "/assets/webp/portfolio/newsletter-ron-web-400x399.jpg",
//   },
//   {
//     title: "Loyalty System",
//     category: "MOBILE APPS",
//     image: "/assets/webp/portfolio/loyalty-on-web-400x399.jpg",
//   },
//   {
//     title: "Learning Platform",
//     category: "MOBILE APPS",
//     image: "/assets/webp/portfolio/learning-on-web-400x399.jpg",
//   },
//   {
//     title: "Blog System",
//     category: "MOBILE APPS",
//     image: "/assets/webp/portfolio/blogs-on-web-400x399.jpg",
//   },
//   {
//     title: "Speed Networking",
//     category: "MOBILE APPS",
//     image: "/assets/webp/portfolio/speed-networking-400x399.jpg",
//   },

//   // Ecommerce images extras
//   {
//     title: "Skinni Snax Extra",
//     category: "ECOMMERCE WEBSITE",
//     image: "/assets/webp/portfolio/skinnisnax.jpg",
//   },
//   {
//     title: "Shopfits Extra",
//     category: "ECOMMERCE WEBSITE",
//     image: "/assets/webp/portfolio/shopfits.jpg",
//   },
//   {
//     title: "Lillies Extra",
//     category: "ECOMMERCE WEBSITE",
//     image: "/assets/webp/portfolio/lilles.jpg",
//   },

//   // Corporate branding extras
//   {
//     title: "Geecon Global Extra",
//     category: "CORPORATE BRANDING",
//     image: "/assets/webp/portfolio/Geecon-Global.png.bv.webp",
//   },
//   {
//     title: "Visualytes Extra",
//     category: "CORPORATE BRANDING",
//     image: "/assets/webp/portfolio/Visualytes.png.bv.webp",
//   },
// ];
// const Portfolio = () => {
//   const [active, setActive] = useState("ALL");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);

//   const slideDuration = 6000;

//   const allPortfolio = [...portfolio, ...allOnlyPortfolio];

//   const prevRef = useRef(null);
//   const nextRef = useRef(null);
//   const swiperRef = useRef<any>(null);

//   const filtered =
//     active === "ALL"
//       ? allPortfolio
//       : portfolio.filter((item) => item.category === active);

//   const handleNext = useCallback(() => {
//     setDirection(1);
//     setCurrentIndex((prev) => (prev + 1) % portfolio.length);
//   }, []);

//   const handlePrev = useCallback(() => {
//     setDirection(-1);
//     setCurrentIndex((prev) => (prev - 1 + portfolio.length) % portfolio.length);
//   }, []);

//   return (
//     <section className="relative bg-white  overflow-hidden">
//       {/* Pink Line */}
//  {/* Center Block */}
// <div className="flex flex-col items-center justify-center gap-3 ">
//   <button
//     className="
//       text-center
//       min-w-[230px]
//       h-[80px]
//       px-[35px]
//       border-[4px]
//       border-[#ff497c]
//       rounded-full
//       bg-transparent
//       text-[#1f2732]
//       text-[12px]
//       font-[700]
//       uppercase
//       tracking-[2.4px]
//       leading-[12px]
//       transition-all
//       duration-[400ms]
//       hover:bg-[#ff497c]
//       hover:border-[#ff497c]
//       hover:text-white
//       mb-14 mt-6
//     "
//   >
//     Get Started
//   </button>

//   <VerticalLine variant="pink" />
// </div>

//       {/* Heading */}
//       <h2 className="mt-8 text-center text-[58px] font-semibold leading-none text-[#1f2732]">
//         Our Portfolio
//       </h2>

//       {/* Filter */}
//       <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5">
//         {categories.map((item) => (
//           <button
//             key={item}
//             onClick={() => setActive(item)}
//             className={`uppercase tracking-[3px] text-[13px] font-semibold transition duration-300 ${
//               active === item
//                 ? "text-[#ff497c]"
//                 : "text-[#1f2732] hover:text-[#ff497c]"
//             }`}
//           >
//             {item}
//           </button>
//         ))}
//       </div>

//       {/* Slider */}
//       <div className="relative mt-16 flex items-center">
//         {/* Previous Button */}
//         <button
//           ref={prevRef}
//           aria-label="Previous Slide"
//           className="
//               absolute top-1/2 -translate-y-1/2
//               left-[-40px] hover:left-0
//               z-30
//               w-[80px] h-[80px]
//               rounded-r-full
//               bg-[#ff497c] hover:bg-white
//               transition-all duration-300
//               flex items-center justify-end
//               pr-[14px] hover:pr-[40px]
//               text-white hover:text-black
//             "
//         >
//           <ChevronLeft size={22} />
//         </button>

//         {/* Next Button */}
//         <button
//           ref={nextRef}
//           aria-label="Next Slide"
//           className="
//               absolute top-1/2 -translate-y-1/2
//               right-[-40px] hover:right-0
//               z-30
//               w-[80px] h-[80px]
//               rounded-l-full
//               bg-[#ff497c] hover:bg-white
//               transition-all duration-300
//               flex items-center justify-start
//               pl-[14px] hover:pl-[40px]
//               text-white hover:text-black
//             "
//         >
//           <ChevronRight size={22} />
//         </button>

//         <Swiper
//           modules={[Navigation, Autoplay]}
//           onBeforeInit={(swiper) => {
//             swiperRef.current = swiper;

//             // attach correct refs
//             // @ts-ignore
//             swiper.params.navigation.prevEl = prevRef.current;
//             // @ts-ignore
//             swiper.params.navigation.nextEl = nextRef.current;
//           }}
//           navigation={{
//             prevEl: prevRef.current,
//             nextEl: nextRef.current,
//           }}
//           autoplay={{
//             delay: 2000,
//             disableOnInteraction: false,
//           }}
//           loop
//           centeredSlides={true} // ✅ IMPORTANT FOR CENTER IMAGE
//           spaceBetween={12}
//           breakpoints={{
//             320: { slidesPerView: 1 },
//             640: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//             1440: { slidesPerView: 5 },
//           }}
//         >
//           {filtered.map((item, index) => (
//             <SwiperSlide key={index}>
//               <div className="group relative h-[370px] overflow-hidden">
//                 <Image
//                   src={item.image}
//                   alt={item.title}
//                   fill
//                   sizes="320px"
//                   className="object-cover transition duration-700 group-hover:scale-105 border-[0.2px] border-black"
//                 />

//                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 opacity-0 transition duration-500 group-hover:opacity-100">
//                   <span className="mb-3 text-[12px] font-semibold uppercase tracking-[3px] text-[#ff497c]">
//                     {item.category}
//                   </span>

//                   <h3 className="px-6 text-center text-[36px] font-semibold leading-tight text-[#1f2732]">
//                     {item.title}
//                   </h3>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* CTA Button */}
//       </div>
//       <div className="mt-10 flex justify-center">
//       <button
//   className="
//     flex
//     h-[82px]
//     min-w-[255px]
//     items-center
//     justify-center
//     rounded-full
//     border-2
//     border-[#ff497c]
//     bg-[#ff497c]
//     px-14
//     text-[13px]
//     font-bold
//     uppercase
//     tracking-[3px]
//     text-white
//     transition-all
//     duration-300
//     hover:bg-white
//     hover:text-black
//     hover:border-[#ff497c]
//   "
// >
//   View Full Portfolio
// </button>
//       </div>
//     </section>
//   );
// };

// export default Portfolio;
"use client";

import { useMemo, useState } from "react";


import {
  categories,
  portfolio,
  allOnlyPortfolio,
} from "./portfolio/data/portfoliodata";
import PortfolioHeader from "./portfolio/PortfolioHeader";
import PortfolioSlider from "./portfolio/PortfolioSlider";

export default function Portfolio() {
  const [active, setActive] = useState("ALL");

  const filtered = useMemo(() => {
    if (active === "ALL") {
      return [...portfolio, ...allOnlyPortfolio];
    }

    return portfolio.filter((item) => item.category === active);
  }, [active]);

  return (
    <section className="relative overflow-hidden bg-white">
      <PortfolioHeader
        active={active}
        setActive={setActive}
        categories={categories}
      />

      <PortfolioSlider items={filtered} />
    </section>
  );
}