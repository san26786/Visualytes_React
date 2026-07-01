"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const originalTestimonials = [
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
    text: "I was introduced to Visualytes by a friend. I had a website produced by them. To say I am pleased with the website and their customer service is an understatement.",
  },
  {
    image: "/assets/png/julie-1.png",
    name: "Julie Freeman",
    role: "REEDS CENTRAL LTD OWNER",
    text: "Fabulous service from start to finish. They were extremely patient with us and produced exactly the website we wanted.",
  },
  {
    image: "/assets/png/Andrew-killing.png",
    name: "Andrew Killing",
    role: "DIRECTOR, THORNEY PARK GOLF CLUB",
    text: "Visualytes helped recover our ROI and generate annual revenue in just a couple of months.",
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
    text: "Cannot recommend highly enough, fantastic team and all the support we could need.",
  },
  {
    image: "/assets/jpg/sanket_t.jpg",
    name: "Sanket Tamboli",
    role: "DIRECTOR, FACTORY FRESH",
    text: "Great to work with the team. They provide proper guidance and unique solutions.",
  },
  {
    image: "/assets/png/Ram_kallyan.png",
    name: "Dr. Ram Kalyan",
    role: "STATION MANAGER, UNITY101",
    text: "I want to thank you and your team for your excellent service and constant support.",
  },
];

const testimonials = [
  ...originalTestimonials,
  ...originalTestimonials.slice(0, 3),
];

export default function TestimonialsSection() {
  const [activeDot, setActiveDot] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
      }),
    ]
  );

  const updateDots = useCallback(() => {
    if (!emblaApi) return;

    const index = emblaApi.selectedScrollSnap();
    setActiveDot(Math.floor(index / 3));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
  
    requestAnimationFrame(() => {
      setActiveDot(Math.floor(emblaApi.selectedScrollSnap() / 3));
    });
  
    emblaApi.on("select", updateDots);
  
    return () => {
      emblaApi.off("select", updateDots);
    };
  }, [emblaApi, updateDots]);

  return (
    <section className="relative overflow-hidden bg-[#1f2732]">
      <div className="relative z-10 mx-auto max-w-[2000px] px-6">
        {/* Top Line */}
        <div className="mb-10 flex justify-center">
          <div className="h-25 w-[5px] bg-white" />
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="
                  flex-[0_0_100%]
                  md:flex-[0_0_50%]
                  xl:flex-[0_0_33.333%]
                  pt-[150px]
                  pb-10
                "
              >
                <div className="text-center">
                  <div className="relative mx-auto mb-[-110px] w-fit -translate-y-[150px]">
                    <div className="relative h-[90px] w-[90px] overflow-hidden rounded-full border-[5px] border-[#dedfe1] bg-white">
                     <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="90px"
                      className="object-cover"
                    />
                    </div>

                    <span className="absolute right-[-5px] top-[52px] font-['Vidaloka'] text-[120px] leading-none text-[#ff497c]">
                      ”
                    </span>
                  </div>

                  <h3 className="mt-2 text-[22px] font-semibold text-white">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-[13px] font-bold uppercase tracking-[3px] text-[#ff497c]">
                    {item.role}
                  </p>

                  <p className="mx-auto mt-6 max-w-[750px] px-5 text-[18px] italic leading-[36px] text-[#8d94a5]">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-4">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              onClick={() => {
                emblaApi?.scrollTo(dot * 3);
                setActiveDot(dot);
              }}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                activeDot === dot ? "bg-[#ff497c]" : "bg-white"
              }`}
            />
          ))}
        </div>

        {/* Bottom Line */}
        <div className="mt-5 mb-18 flex justify-center">
          <div className="h-25 w-[5px] bg-white" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <div className="absolute -bottom-[30px] left-0 h-[60px] w-1/2 skew-y-[3deg] bg-white" />
        <div className="absolute -bottom-[30px] right-0 h-[60px] w-1/2 -skew-y-[3deg] bg-white" />
      </div>
    </section>
  );
}