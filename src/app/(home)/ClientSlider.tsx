"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const clientGroups = [
    [
      "/assets/png/client_talk/Untitled-design-1.png",
      "/assets/png/client_talk/Untitled-design-2.png",
      "/assets/png/client_talk/Untitled-design-3.png",
    ],
    [
      "/assets/png/client_talk/Untitled-design-4.png",
      "/assets/png/client_talk/Untitled-design-5.png",
      "/assets/png/client_talk/Untitled-design-6.png",
    ],
  ];

export default function ClientSlider() {
  return (
    <section className="w-full bg-white py-[50px]">
      <div className="mx-auto max-w-[1600px]">

        <h2 className="text-center text-[#1f2732] text-[46px] leading-[56px] font-medium mb-[35px]">
          Our Latest Client
        </h2>

        <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  slidesPerView={1}
  loop
  navigation
  autoplay={{
    delay: 2000,
    disableOnInteraction: false,
  }}
  pagination={{ clickable: true }}
  className="
  !px-[40px]
  !pb-[45px]

  [&_.swiper-pagination]:!bottom-0
  [&_.swiper-pagination-bullet]:!bg-[#d1d5db]
  [&_.swiper-pagination-bullet]:!opacity-100
  [&_.swiper-pagination-bullet-active]:!bg-[#ff497c]

  [&_.swiper-button-prev]:!text-[#7f7f7f]
  [&_.swiper-button-next]:!text-[#7f7f7f]
[&_.swiper-button-prev]:after:!font-black
[&_.swiper-button-next]:after:!font-black
  [&_.swiper-button-prev]:!-left-[4px]
  [&_.swiper-button-next]:!-right-[4px]

  [&_.swiper-button-prev]:!w-5
  [&_.swiper-button-prev]:!h-5
  [&_.swiper-button-next]:!w-5
  [&_.swiper-button-next]:!h-5

  [&_.swiper-button-prev]:after:!text-[17px]
  [&_.swiper-button-next]:after:!text-[17px]
"
>
  {clientGroups.map((group, index) => (
    <SwiperSlide key={index}>
      <div className="grid grid-cols-3 gap-14 max-w-7xl justify-center mx-auto">
        {group.map((item, i) => (
          <div
            key={i}
            className="h-[212px] flex items-center justify-center"
          >
            <Image
              src={item}
              alt=""
              width={270}
              height={180}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </SwiperSlide>
  ))}
</Swiper>
      </div>
    </section>
  );
}