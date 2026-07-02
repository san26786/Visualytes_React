// "use client";

// import Image from "next/image";
// import { useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import { FiLink, FiSearch } from "react-icons/fi";
// // interface Props {
// //     image: string;
// //     title: string;
// //     tags: string[];
// //     url?: string;
// //   }
// const blogs = [
//   {
//     image: "/assets/png/blog/blog1.png",
//     title:
//       "How Partnering with a Web Development Company Can Elevate Your Online Presence",
//     tags: ["BLOG", "CUSTOM WEBSITES", "WEB DESIGN"],
//   },
//   {
//     image: "/assets/png/blog/blog2.png",
//     title:
//       "SEO Company in London Shares the Importance of SEO Slugs for Better Rankings",
//     tags: ["BLOG", "BRANDING", "SEO"],
//   },
//   {
//     image: "/assets/png/blog/blog3.png",
//     title:
//       "How Google’s RankBrain Algorithm Impacts Social Media Marketing agency’s strategies",
//     tags: ["BLOG", "BRANDING"],
//   },
//   {
//     image: "/assets/png/blog/blog4.png",
//     title:
//       "How a Web Development Company Creates Impactful Meta Descriptions for Better SEO",
//     tags: ["BLOG", "WEB DESIGN"],
//   },
//   {
//     image: "/assets/png/blog/blog5.png",
//     title: "Eastleigh Mela 2023",
//     tags: ["JUL", "NEWEST"],
//   },
//   {
//     image: "/assets/png/blog/blog6.jpg",
//     title: "Eastleigh Mela 2024",
//     tags: ["JUL", "NEWEST", "SPONSORS"],
//   },
//   {
//     image: "/assets/png/blog/blog7.jpg",
//     title: "Golf Day Championship",
//     tags: ["NEWEST"],
//   },
//   {
//     image: "/assets/png/blog/blog8.jpg",
//     title: "The Big Platinum Festival",
//     tags: ["SPONSORS", "JUL", "NEWEST"],
//   },
//   {
//     image: "/assets/png/blog/blog9.png",
//     title: "Golf Event",
//     tags: ["SEP"],
//   },
//   {
//     image: "/assets/png/blog/blog10.jpg",
//     title: "Eastleigh MELA",
//     tags: ["AUG"],
//   },
//   {
//     image: "/assets/png/blog/blog11.jpg",
//     title: "GOSPORT FESTIVAL 2021",
//     tags: ["JAN-MONTH"],
//   },
//   {
//     image: "/assets/png/blog/blog12.png",
//     title: "Maintenance & Support",
//     tags: ["BRANDING", "SEO"],
//   },
// ];

// export default function BlogSlider() {
//     const prevRef = useRef<HTMLDivElement | null>(null);
//     const nextRef = useRef<HTMLDivElement | null>(null);
  

//   return (
//     <section className="max-w-7xl mx-auto w-full bg-white py-16 relative">
//      <h2 className="text-center text-[#1f2732] text-[46px] leading-[56px] font-medium mb-10">
//         Our Latest Blogs
//       </h2>

//       <div className="relative flex items-center">
//         {/* PREV */}
//         <div
//           ref={prevRef}
//           className="
//             absolute left-5 z-10 cursor-pointer select-none
//             text-[#ddd] hover:text-[rgba(255,73,124,0.35)]
//             transition
//           "
//         >
//           <div className="text-[40px] font-black leading-none">PREV</div>
//           <div className="text-[40px] font-black leading-none">POST</div>
//         </div>
//  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500" />

//         {/* ICONS */}
//         <div className="absolute inset-0 flex items-center justify-center gap-6">
          
//           {/* <a
//             href={image}
//             className="
//               text-white text-[40px]
//               opacity-0 -translate-y-10
//               transition-all duration-500
//               group-hover:opacity-100 group-hover:translate-y-0
//             "
//           >
//             <FiSearch/>
//           </a> */}

//           {/* <a
//             href={url}
//             className="
//               text-white text-[40px]
//               opacity-0 -translate-y-10
//               transition-all duration-500 delay-100
//               group-hover:opacity-100 group-hover:translate-y-0
//             "
//           >
//             <FiLink />
//           </a> */}
//         </div>
//       </div>

//         {/* SLIDER */}
//         <Swiper
//           modules={[Navigation, Autoplay]}
//           loop={true}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           spaceBetween={30}
//           slidesPerView={4}
//           onBeforeInit={(swiper: any) => {
//             swiper.params.navigation.prevEl = prevRef.current;
//             swiper.params.navigation.nextEl = nextRef.current;
//           }}
//           navigation={{
//             prevEl: prevRef.current,
//             nextEl: nextRef.current,
//           }}
//           breakpoints={{
//             320: { slidesPerView: 1 },
//             640: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//             1280: { slidesPerView: 4 },
//           }}
//           className="w-full px-24"
//         >
//           {blogs.map((item, i) => (
//             <SwiperSlide key={i}>
//             <div className="group cursor-pointer">
//               {/* IMAGE */}
//               <div className="relative overflow-hidden w-[270px] h-[195px] mx-auto">
//                 <Image
//                   src={item.image}
//                   alt={item.title}
//                   width={270}
//                   height={195}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
          
//                 {/* Overlay */}
//                 <div className="absolute inset-0 bg-white/0 group-hover:bg-white/50 transition-all duration-300" />
          
//                 {/* Hover Icons */}
//                 <div className="absolute inset-0 flex items-center justify-center gap-5">
//                   <a
//                     href={item.image}
//                     className="
//                       w-12 h-12 rounded-full
//                       bg-white text-[#ff497c]
//                       flex items-center justify-center
//                       opacity-0 translate-y-6
//                       transition-all duration-300
//                       group-hover:opacity-100 group-hover:translate-y-0
//                     "
//                   >
//                     <FiSearch size={22} />
//                   </a>
          
//                   <a
//                     href="#"
//                     className="
//                       w-12 h-12 rounded-full
//                       bg-white text-[#ff497c]
//                       flex items-center justify-center
//                       opacity-0 translate-y-6
//                       transition-all duration-300 delay-100
//                       group-hover:opacity-100 group-hover:translate-y-0
//                     "
//                   >
//                     <FiLink size={22} />
//                   </a>
//                 </div>
//               </div>
          
//               {/* TITLE */}
//               <h3 className="text-center mt-5 text-[20px] font-medium text-[#222]">
//                 {item.title}
//               </h3>
          
//               {/* TAGS */}
//               <div className="flex justify-center flex-wrap gap-2 mt-4">
//                 {item.tags.map((tag, idx) => (
//                   <span
//                     key={idx}
//                     className="px-3 py-1 text-xs rounded-full bg-pink-500 text-white"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* NEXT */}
//         <div
//           ref={nextRef}
//           className="
//             absolute right-5 z-10 cursor-pointer select-none
//             text-[#ddd] hover:text-[rgba(255,73,124,0.35)]
//             transition
//           "
//         >
//           <div className="text-[40px] font-black leading-none">NEXT</div>
//           <div className="text-[40px] font-black leading-none">POST</div>
//         </div>
//     </section>
    
//   );
// }