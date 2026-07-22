"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface Props {
  onComplete: () => void;
}

export default function IntroLoader({
  onComplete,
}: Props) {
  const screen = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const chars = useRef<HTMLSpanElement[]>([]);

  const onCompleteRef = useRef(onComplete);


  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);


  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onCompleteRef.current();
      },
    });


    gsap.set(
      [logo.current, chars.current],
      {
        opacity: 0,
        filter: "blur(10px)",
        x: 24,
        y: 6,
        scale: 0.96,
        transformPerspective: 800,
      }
    );


    tl.to(
      [logo.current, chars.current],
      {
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: {
          each: 0.035,
          from: "center",
        },
        ease: "power4.out",
      }
    )


    .to(
      [logo.current, chars.current],
      {
        scale: 1.03,
        duration: 0.25,
        ease: "power2.out",
      }
    )


    .to(
      [logo.current, chars.current],
      {
        scale: 1,
        duration: 0.2,
        ease: "power2.inOut",
      }
    )


    .to(
      screen.current,
      {
        yPercent: -100,
        duration: 0.5,
        ease: "power4.inOut",
      }
    );


    return () => {
      tl.kill();
    };

  }, []);


  return (
    <div
      ref={screen}
      className="
        fixed inset-0 z-[999999]
        bg-black
        flex items-center justify-center
      "
    >
      <div className="flex flex-col items-center">

        <div
          ref={logo}
          className="
            mb-8
            h-[120px]
            w-[120px]
            flex
            items-center
            justify-center
          "
        >
          <Image
            src="/assets/jpng/footer_logo2.png"
            alt="Visualyte Logo"
            width={200}
            height={150}
            className="h-full w-full object-contain"
            priority
          />
        </div>


        <h1
          className="
            flex
            text-3xl
            md:text-8xl
            font-black
            tracking-[0.35em]
            text-white
            font-perfect
          "
        >
          {"VISUALYTES".split("").map((char, index) => (
            <span
              key={index}
              ref={(el) => {
                if (el) {
                  chars.current[index] = el;
                }
              }}
            >
              {char}
            </span>
          ))}
        </h1>


        <p
          className="
            mt-6
            text-xs
            tracking-[0.5em]
            text-white/40
            uppercase
          "
        >
          Digital Experiences
        </p>

      </div>
    </div>
  );
}