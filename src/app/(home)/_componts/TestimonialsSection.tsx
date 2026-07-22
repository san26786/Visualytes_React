"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { motion } from "framer-motion";
import HomeSection from "./shared/HomeSection";
import { BRAND_HOVER, BRAND_SURFACE } from "@/src/common/components/ui/brand/theme";

const originalTestimonials = [
  {
    image: "/assets/png/no-image.png",
    name: "Andrew Bridges",
    role: "Director, South Coast Clearance Services Ltd",
    text: "The website is beautifully done! Everything that needed attention has been addressed with great care. I'm really pleased with the progress so far.",
  },
  {
    image: "/assets/png/foto-trendz-owner.png",
    name: "Mark Vella",
    role: "Foto Trendz Owner",
    text: "I was introduced to Visualytes by a friend. I had a website produced by them. To say I am pleased with the website and their customer service is an understatement.",
  },
  {
    image: "/assets/png/julie-1.png",
    name: "Julie Freeman",
    role: "Reeds Central Ltd Owner",
    text: "Fabulous service from start to finish. They were extremely patient with us and produced exactly the website we wanted.",
  },
  {
    image: "/assets/png/Andrew-killing.png",
    name: "Andrew Killing",
    role: "Director, Thorney Park Golf Club",
    text: "Visualytes helped recover our ROI and generate annual revenue in just a couple of months.",
  },
  {
    image: "/assets/png/Matthew-Potter.png",
    name: "Matthew Potter",
    role: "PGA Professional",
    text: "The new website is so much easier to update. I couldn't recommend them enough.",
  },
  {
    image: "/assets/png/helleo-1.png",
    name: "Hellen Ohwofasa",
    role: "Director, 3D Pro Lashes",
    text: "Highly professional services, solution oriented and always willing to go the extra mile.",
  },
  {
    image: "/assets/jpg/gurd_s.jpg",
    name: "Gurd Singh",
    role: "Director, Lamoda",
    text: "Cannot recommend highly enough, fantastic team and all the support we could need.",
  },
  {
    image: "/assets/jpg/sanket_t.jpg",
    name: "Sanket Tamboli",
    role: "Director, Factory Fresh",
    text: "Great to work with the team. They provide proper guidance and unique solutions.",
  },
  {
    image: "/assets/png/Ram_kallyan.png",
    name: "Dr. Ram Kalyan",
    role: "Station Manager, Unity101",
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
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const updateDots = useCallback(() => {
    if (!emblaApi) return;
    setActiveDot(Math.floor(emblaApi.selectedScrollSnap() / 3));
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
    <section className="relative overflow-hidden py-10">
      <div className="" />

      <HomeSection
        eyebrow="Client Love"
        title="What Our"
        highlight="Clients Say"
        subtitle="Real feedback from businesses we've helped grow online."
        className="relative z-10"
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] px-4 pt-8 pb-4 md:flex-[0_0_50%] xl:flex-[0_0_33.333%]"
              >
                <motion.article
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative mx-2 p-8 text-center ${BRAND_SURFACE.glassCard} ${BRAND_HOVER.card}`}
                >
                  <div className="relative mx-auto mb-6 w-fit">
                    <div className="relative h-[80px] w-[80px] overflow-hidden rounded-full border-2 border-cyan-300/40 bg-slate-900">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        loading="lazy"
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute -right-2 -top-2 text-4xl text-fuchsia-400">
                      &rdquo;
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                    {item.role}
                  </p>
                  <p className="mx-auto mt-4 max-w-sm text-sm italic leading-7 text-slate-300">
                    {item.text}
                  </p>
                </motion.article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              onClick={() => {
                emblaApi?.scrollTo(dot * 3);
                setActiveDot(dot);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeDot === dot
                  ? "w-8 bg-gradient-to-r from-cyan-400 to-fuchsia-400"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </HomeSection>
    </section>
  );
}
