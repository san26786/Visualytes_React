"use client"
import ServiceSection from "@/src/app/our-services/_componets/ServiceSection";
import ServicePageBanner from "@/src/common/components/layouts/ServicePageBanner";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from 'react'
const testimonials = [
    {
      id: 1,
      image: "/assets/jpg/service_client/face_4.jpg",
      name: "Hilary Stilwell",
      description:
        "This guys are awesome! It is hard to find a web design company who can actually listen and understand what you need. I'm 100% satisfied with this guys.",
    },
    {
      id: 2,
      image: "/assets/jpg/service_client/testimonials1.jpg",
      name: "Josephine B. Anderson",
      description:
        "This guys are awesome! It is hard to find a web design company who can actually understand what you need.",
    },
    {
      id: 3,
      image: "/assets/jpg/service_client/testimonials2.jpg",
      name: "George M. Baty",
      description:
        "I needed more leads for my services. PPC, banners or maybe even brochures. They made an analysis of my existing site.",
    },
    {
      id: 4,
      image: "/assets/jpg/service_client/testimonials3.jpg",
      name: "Jeffrey P. McAllister",
      description:
        "I highly recommend this company for all. I'm very happy with the new redesigned and restructured website.",
    },
  ];
const page = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel(
      {
        loop: true,
        align: "start",
      },
      [
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
        }),
      ]
    );
  
    const onSelect = useCallback(() => {
      if (!emblaApi) return;
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);
  
    useEffect(() => {
      if (!emblaApi) return;
  
      onSelect();
  
      emblaApi.on("select", onSelect);
  
      return () => {
        emblaApi.off("select", onSelect);
      };
    }, [emblaApi, onSelect]);
  
    const scrollTo = (index: number) => {
      emblaApi?.scrollTo(index);
    };
  
    const dots = testimonials.length;
  return (<>
    <ServicePageBanner
  title="Digital Marketing"
  breadcrumbs={[
    {
      label: "Services",
      href: "/archives/services",
    },
    {
      label: "Digital Marketing",
    },
  ]}
/>
<ServiceSection
  title="DIGITAL MARKETING SERVICES "
intro=""
  description={[
    "Every successful digital marketing campaign must be data-driven. With a digital competitive analysis from Visualytes, you'll get a market analysis of your website and three competitors.This provides a clear path to measurably improve your website's SEO and PPC performance and generate more leads and sales.",
  ]}
  image="/assets/png/services/website-hosting-services-min.png"
  topDescription={[]}
  bullets={[
    
   
  ]}

  // bottomTitle="Why Every Business Needs a Website"

  bottomDescription=""

/>
<section className="bg-[#f8f8f8] py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-[36px] font-medium text-[#2b2f38]">
            Testimonials
          </h2>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">

            {testimonials.map((item, index) => (
              <div
                key={index}
                className="
                  flex-[0_0_100%]
                  md:flex-[0_0_50%]
                  lg:flex-[0_0_33.333%]
                  px-6
                "
              >
                <div className="text-center">

                  {/* Avatar */}
                  <div className="relative mx-auto mb-6 w-fit">

                    <div className="relative h-[82px] w-[82px] overflow-hidden rounded-full border-[4px] border-[#ececec] bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="82px"
                        className="object-cover"
                      />
                    </div>

                    {/* Quote */}
                    <span className="absolute bottom-[-18px] right-[-8px] text-[58px] font-bold leading-none text-[#ff4d82]">
                    ”
                    </span>

                  </div>

                  {/* Name */}
                  <h3 className="mb-5 text-[24px] font-medium text-[#2d3138]">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="mx-auto max-w-[330px] text-[16px] italic leading-[2.1] text-[#8c8c8c] font-light">
                    {item.description}
                  </p>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Dots */}
        <div className="mt-14 flex justify-center gap-4">
          {Array.from({ length: dots }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-[10px] w-[10px] rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? "bg-[#ff4d82]"
                  : "bg-[#1f2430]/30"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
</> )
}

export default page