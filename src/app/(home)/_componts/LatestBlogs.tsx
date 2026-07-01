"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import PortfolioCard from "./PortfolioCard";

const blogs = [
  {
    image: "/assets/png/blog/blog1.png",
    title:
      "How Partnering with a Web Development Company Can Elevate Your Online Presence",
    tags: ["BLOG", "CUSTOM WEBSITES", "WEB DESIGN"],
  },
  {
    image: "/assets/png/blog/blog2.png",
    title:
      "SEO Company in London Shares the Importance of SEO Slugs for Better Rankings",
    tags: ["BLOG", "BRANDING", "SEO"],
  },
  {
    image: "/assets/png/blog/blog3.png",
    title:
      "How Google’s RankBrain Algorithm Impacts Social Media Marketing agency’s strategies",
    tags: ["BLOG", "BRANDING"],
  },
  {
    image: "/assets/png/blog/blog4.png",
    title:
      "How a Web Development Company Creates Impactful Meta Descriptions for Better SEO",
    tags: ["BLOG", "WEB DESIGN"],
  },
  {
    image: "/assets/png/blog/blog5.png",
    title: "Eastleigh Mela 2023",
    tags: ["JUL", "NEWEST"],
  },
  {
    image: "/assets/png/blog/blog6.jpg",
    title: "Eastleigh Mela 2024",
    tags: ["JUL", "NEWEST", "SPONSORS"],
  },
  {
    image: "/assets/png/blog/blog7.jpg",
    title: "Golf Day Championship",
    tags: ["NEWEST"],
  },
  {
    image: "/assets/png/blog/blog8.jpg",
    title: "The Big Platinum Festival",
    tags: ["SPONSORS", "JUL", "NEWEST"],
  },
  {
    image: "/assets/png/blog/blog9.png",
    title: "Golf Event",
    tags: ["SEP"],
  },
  {
    image: "/assets/png/blog/blog10.jpg",
    title: "Eastleigh MELA",
    tags: ["AUG"],
  },
  {
    image: "/assets/png/blog/blog11.jpg",
    title: "GOSPORT FESTIVAL 2021",
    tags: ["JAN-MONTH"],
  },
  {
    image: "/assets/png/blog/blog12.png",
    title: "Maintenance & Support",
    tags: ["BRANDING", "SEO"],
  },
];

export default function LatestBlogs() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-10 max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-[#1f2732] text-[46px] leading-[56px] font-medium mb-10">
        Our Latest Blogs
      </h2>

      <div className="grid grid-cols-[220px_1fr_220px] items-center max-w-7xl  mx-auto">
        {/* PREV */}
        <div
          ref={prevRef}
          className="cursor-pointer text-center text-[#dddddd]"
        >
          <div className="text-[40px] leading-none font-black uppercase">
            PREV
          </div>
          <div className="text-[40px] leading-none font-black uppercase">
            POST
          </div>
        </div>

        {/* SWIPER */}
        <div className="overflow-hidden">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={4}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {blogs.map((item, idx) => (
              <SwiperSlide key={idx}>
                <PortfolioCard
                  image={item.image}
                  title={item.title}
                  category={item.tags?.[0] || "BLOG"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* NEXT */}
        <div
          ref={nextRef}
          className="cursor-pointer text-center text-[#dddddd]"
        >
          <div className="text-[40px] leading-none font-semibold">
            NEXT
          </div>
          <div className="text-[40px] leading-none font-semibold">
            POST
          </div>
        </div>
      </div>
    </section>
  );
}