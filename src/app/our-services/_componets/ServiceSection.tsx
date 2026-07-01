"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

interface ServiceSectionProps {
  title: string;
  intro: string;
  description: string[];
  image: string;
  topDescription:string[];
  bullets: string[];
  bottomTitle?: string;
  bottomDescription: string;
  reverse?: boolean;
}

export default function ServiceSection({
  title,
  intro,
  description,
  image,
  topDescription,
  bullets,
  bottomTitle,
  bottomDescription,
  reverse = false,
}: ServiceSectionProps) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-3 max-w-6xl">

        <div
          className={`grid lg:grid-cols-2 gap-16 items-start${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Left */}
          <ScrollReveal direction="right">
            <div>
              <h2 className="text-[24px] font-medium mb-6">
                {title}
              </h2>

              <p className="text-lg leading-8 text-[#7f7f7f] mb-6 font-light">
                {intro}
              </p>

              {description.map((item, index) => (
                <p
                  key={index}
                  className="text-[#7f7f7f] leading-8 mb-4 font-light"
                >
                  {item}
                </p>
              ))}
            </div>
          </ScrollReveal>

          {/* Right */}
          {/* Right */}
<ScrollReveal direction="left" delay={0.21}>
  <div className="flex justify-end">
    <div className="relative w-[540px] h-[360px]">
      <Image
        src={image}
        alt={title}
        fill
        sizes="540px"
        className="object-contain"
      />
    </div>
  </div>
</ScrollReveal>
        </div>

        {/* Bottom */}

        <ScrollReveal direction="up" delay={0.42}>
          <div className="mt-8">
          {topDescription.map((text, index) => (
  <p key={index} className="text-[#7f7f7f] leading-8 mb-6 font-extralight">
    {text}
  </p>
))}
            {bottomTitle && (
              <h3 className="text-2xl font-semibold mb-6 text-[#7f7f7f]">
                {bottomTitle}
              </h3>
            )}

            <ul className="space-y-3 mb-8 mt-8  text-[#1f2732] font-extralight">
              {bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3"
                >
                  <span className="mt-2 h-2 w-2 rounded-full bg-pink-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="leading-8 text-[#7f7f7f] font-extralight">
              {bottomDescription}
            </p>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}