// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

// const blogs = [
//   {
//     title: "How Partnering with a Web Development Company Can Elevate Your Online Presence",
//     image:
//       "https://www.visualytes.com/wp-content/uploads/2024/11/Web-Development-Company-Online-Presence-Boost-online-presence.png",
//     category: "Web Design",
//     link: "#",
//   },
//   {
//     title:
//       "SEO Company in London Shares the Importance of SEO Slugs for Better Rankings",
//     image:
//       "https://www.visualytes.com/wp-content/uploads/2024/11/SEO-Company-in-London-SEO-Slugs.png",
//     category: "SEO",
//     link: "#",
//   },
//   {
//     title:
//       "How Google’s RankBrain Algorithm Impacts Social Media Marketing Strategies",
//     image:
//       "https://www.visualytes.com/wp-content/uploads/2024/11/image-3.png",
//     category: "Marketing",
//     link: "#",
//   },
//   {
//     title:
//       "How a Web Development Company Creates Impactful Meta Descriptions for Better SEO",
//     image:
//       "https://www.visualytes.com/wp-content/uploads/2024/11/Meta-Decription.png",
//     category: "Development",
//     link: "#",
//   },
//   {
//     title: "Eastleigh Mela 2024",
//     image:
//       "https://www.visualytes.com/wp-content/uploads/2022/07/fd6980e1-c733-4e44-bce3-f97f8558e7bc-1.jpg",
//     category: "Events",
//     link: "#",
//   },
// ];
// export default function LatestBlogs() {
//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         {/* Heading */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900">
//             Our Latest Blogs
//           </h2>
//         </div>

//         {/* Slider */}
//         <Swiper
//           modules={[Navigation, Autoplay]}
//           navigation
//           loop
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//           }}
//           spaceBetween={30}
//           breakpoints={{
//             320: {
//               slidesPerView: 1,
//             },
//             640: {
//               slidesPerView: 2,
//             },
//             768: {
//               slidesPerView: 3,
//             },
//             1280: {
//               slidesPerView: 4,
//             },
//           }}
//         >
//           {blogs.map((blog, index) => (
//             <SwiperSlide key={index}>
//               <article className="overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
//                 <div className="overflow-hidden">
//                   <img
//                     src={blog.image}
//                     alt={blog.title}
//                     className="h-60 w-full object-cover transition-transform duration-500 hover:scale-110"
//                   />
//                 </div>

//                 <div className="p-5">
//                   <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
//                     {blog.category}
//                   </span>

//                   <h3 className="mt-4 line-clamp-3 text-lg font-semibold text-gray-900">
//                     {blog.title}
//                   </h3>

//                   <a
//                     href={blog.link}
//                     className="mt-4 inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
//                   >
//                     Read More →
//                   </a>
//                 </div>
//               </article>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }
// "use client";

// import Image from "next/image";

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
//       "How Google's RankBrain Algorithm Impacts Social Media Marketing Agency's Strategies",
//     tags: ["BLOG", "BRANDING"],
//   },
//   {
//     image: "/assets/png/blog/blog4.png",
//     title:
//       "How a Web Development Company Creates Impactful Meta Descriptions for Better SEO",
//     tags: ["BLOG", "WEB DESIGN"],
//   },
// ];

// export default function LatestBlogs() {
//   return (
//     <section className="bg-[#f3f3f3] py-24">
//       <div className="max-w-[1700px] mx-auto px-6">

//         <h2 className="text-center text-[60px] font-semibold text-[#232c3b] mb-16">
//           Our Latest Blogs
//         </h2>

//         <div className="grid grid-cols-[180px_1fr_180px] items-center">

//           {/* Prev */}
//           <div className="text-[#dcdcdc] font-bold text-[52px] leading-none text-center">
//             <div>PREV</div>
//             <div>POST</div>
//           </div>

//           {/* Cards */}
//           <div className="grid grid-cols-4 gap-8">

//             {blogs.map((blog, index) => (
//               <div
//                 key={index}
//                 className="group cursor-pointer"
//               >
//                 {/* Image */}
//                 <div className="relative overflow-hidden">
//                   <Image
//                     src={blog.image}
//                     alt={blog.title}
//                     width={400}
//                     height={250}
//                     className="w-full h-[220px] object-cover transition-all duration-500 group-hover:scale-110"
//                   />

//                   {/* Hover Overlay */}
//                   <div className="absolute inset-0 bg-[#1c2540]/0 group-hover:bg-[#1c2540]/70 transition-all duration-500 flex items-center justify-center">
//                     <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 text-center">
//                       <span className="bg-[#ff4f86] text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wider">
//                         VIEW BLOG
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-center mt-8 text-[30px] font-semibold text-[#232c3b] leading-tight">
//                   {blog.title}
//                 </h3>

//                 {/* Tags */}
//                 <div className="flex flex-wrap justify-center gap-2 mt-6">
//                   {blog.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="bg-[#ff4f86] text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Next */}
//           <div className="text-[#dcdcdc] font-bold text-[52px] leading-none text-center">
//             <div>NEXT</div>
//             <div>POST</div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }