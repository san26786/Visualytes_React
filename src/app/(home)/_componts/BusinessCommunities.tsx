"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const members = [
  "/assets/png/members/Untitled-design-5.png",
  "/assets/png/members/Untitled-design-1.png",
  "/assets/png/members/Untitled-design-3.png",
  "/assets/png/members/Untitled-design-4.png",
  "/assets/png/members/Untitled-design-6.png",
  "/assets/png/members/Institute-of-Directors-Logo.jpg",
  "/assets/png/members/B2b-Growth-hub.jpg",
  "/assets/png/members/Entrepreneurs-Circle.webp",
];

export default function BusinessCommunities() {
  const swiperRef = useRef<SwiperType | null>(null);
    const [activeDot, setActiveDot] = useState(0);

  return (
    <section className="relative overflow-hidden bg-white py-10">
      <div className="mx-auto max-w-[1905px] px-4">
        <h3 className="mb-10 text-center text-4xl font-medium text-[#1f2732] lg:text-[42px]">
          Proud Member of Business Communities
        </h3>

        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={2}
          spaceBetween={30}
          loop
          navigation
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setActiveDot(swiper.realIndex < 4 ? 0 : 1);
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="member-swiper pb-14"
        >
          {members.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="flex h-[200px] items-center justify-center">
                <Image
                  src={logo}
                  alt={`Member ${index + 1}`}
                  width={320}
                  height={180}
                  className="h-[170px] w-[250px] object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="mt-6 mb-4 flex justify-center gap-3">
          {[0, 1].map((dot) => (
            <button
              key={dot}
              onClick={() =>
                swiperRef.current?.slideToLoop(dot === 0 ? 0 : 4)
              }
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                activeDot === dot ? "bg-[#ff497c]" : "bg-[#1f2732]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Curve */}
      
    </section>
  );
}