"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css";
const originalTestimonials= [
  {
    image: "/assets/png/no-image.png",
    name: "Andrew Bridges",
    role: "DIRECTOR , SOUTH COAST CLEARANCE SERVICES LTD",
    text: "The website is beautifully done! Everything that needed attention has been addressed with great care. I'm really pleased with the progress so far.",
  },
  {
    image: "/assets/png/foto-trendz-owner.png",
    name: "Mark Vella",
    role: "FOTO TRENDZ OWNER",
    text: "I was introduced to Visualytes by a friend. I had a website produced by them. To say I am pleased with the website and their customer service is an understatement. They guided me through every step and made everything very easy.",
  },
  {
    image: "/assets/png/julie-1.png",
    name: "Julie Freeman",
    role: "REEDS CENTRAL LTD OWNER",
    text: "Fabulous service from start to finish. They were extremely patient with us and produced exactly the website we wanted. Thank you guys, great work.",
  },
  {
    image: "/assets/png/Andrew-killing.png",
    name: "Andrew Killing",
    role: "DIRECTOR, THORNEY PARK GOLF CLUB",
    text: "Visualytes helped recover our ROI and generate annual revenue in just a couple of months. Highly recommended.",
  },
  {
    image: "/assets/png/Matthew-Potter.png",
    name: "Matthew Potter",
    role: "PGA PROFESSIONAL",
    text: "The new website is so much easier to update. I couldn't recommend them enough.",
  },
  {
    image: "/assets/png/helleo-1.png",
    name: "Hellen Ohwofasa",
    role: "DIRECTOR, 3D PRO LASHES",
    text: "Highly professional services, solution oriented and always willing to go the extra mile.",
  },
  {
    image: "/assets/jpg/gurd_s.jpg",
    name: "Gurd Singh",
    role: "DIRECTOR, LAMODA",
    text: "Cannot recommend highly enough, fantastic team and all the support we could need for our large online platform. Our needs are always catered for, nothing is ever too much. Thank you.",
  },
  {
    image: "/assets/jpg/sanket_t.jpg",
    name: "Sanket Tamboli",
    role: "DIRECTOR, FACTORY FRESH",
    text: "Great to work with the team. They provide proper guidance and unique solutions to your business according to the need, be it digital marketing or web designing. Also, the support team is very efficient and available at all times. Highly recommended!",
  },
  {
    image: "/assets/png/Ram_kallyan.png",
    name: "Dr. Ram Kalyan",
    role: "STATION MANAGER, UNITY101",
    text: "I want to thank you and your team for your excellent service and the constant 'can do' approach to satisfying our needs. Your service, the quality of the know-how, and the consistently pleasant and positive attitude are second to none. Those qualities make it an absolute pleasure to work with you. It's nice to know that Visualytes is a source we can always count on. Again, thanks.",
  },
];
const testimonials = [
  ...originalTestimonials,
  ...originalTestimonials.slice(0, 3),
];

export default function TestimonialsSection() {
    const [activeDot, setActiveDot] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#1f2732] bg-cover bg-center bg-fixed ">


<div className="relative z-10 mx-auto max-w-[2000px] overflow-visible px-6">
        {/* Top Line */}
        <div className="mb-10 flex justify-center">
          <div className="h-25 w-[5px] bg-white" />
        </div>
        <div className="overflow-visible">

<Swiper
  modules={[Autoplay]}
  onSwiper={(swiper) => (swiperRef.current = swiper)}
  onSlideChange={(swiper) => {
    setActiveDot(Math.floor(swiper.realIndex / 3));
  }}
  slidesPerView={1}
  loop
  autoplay={{
    delay: 5000,
    disableOnInteraction: false,
  }}
  breakpoints={{
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  }}
>
  {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="!h-auto overflow-visible pt-[150px] pb-10">
            <div className="overflow-visible text-center">
              {/* Avatar */}
              <div className="relative mx-auto mb-[-110px] w-fit -translate-y-[150px]">
                <div className="relative h-[90px] w-[90px] overflow-hidden rounded-full border-[5px] border-[#dedfe1] bg-white">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
          
                {/* Double Quote */}
                <span className="absolute top-[52px] right-[-5px] font-['Vidaloka'] text-[120px] leading-none text-[#ff497c]">
                  ”
                </span>
              </div>
          
              {/* Name */}
              <h3 className="mt-2 text-[22px] font-semibold text-white">
                {item.name}
              </h3>
          
              {/* Role */}
              <p className="mt-2 text-[13px] font-bold uppercase tracking-[3px] text-[#ff497c]">
                {item.role}
              </p>
          
              {/* Description */}
              <p className="mx-auto mt-6 max-w-[750px] px-5 text-[18px] italic leading-[36px] text-[#8d94a5]">
                {item.text}
              </p>
            </div>
          </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-6 flex justify-center gap-4">
  {[0, 1, 2, 3].map((dot) => (
    <button
      key={dot}
      onClick={() => {
        swiperRef.current?.slideToLoop(dot * 3);
        setActiveDot(dot);
      }}
      className={`h-2 w-2 rounded-full transition-all duration-300 ${
        activeDot === dot ? "bg-[#ff497c]" : "bg-white"
      }`}
    />
  ))}
</div>
        <div className="testimonial-pagination flex items-center justify-center gap-[18px] mt-4" />       </div>
        <style jsx global>{`
  .testimonial-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px;
    margin-top: 5px;
  }

  .testimonial-bullet {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.95);
    opacity: 1;
    cursor: pointer;
    transition: background-color .25s ease,
                transform .25s ease;
  }

  .testimonial-bullet:hover {
    transform: scale(1.15);
  }

  .testimonial-bullet-active {
    background: #ff497c;
  }
`}</style>
        {/* Bottom Line */}
        <div className="mt-5 flex justify-center">
          <div className="h-25 w-[5px] bg-white mb-18" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
  <div className="absolute -bottom-[30px] left-0 h-[60px] w-1/2 skew-y-[3deg] bg-white" />
  <div className="absolute -bottom-[30px] right-0 h-[60px] w-1/2 -skew-y-[3deg] bg-white" />
</div>
      
    </section>
  );
}