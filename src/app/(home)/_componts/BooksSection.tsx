"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

import VerticalLine from "@/src/common/icons/VerticalLine";

const certificates = [
  "/assets/jpg/0001-scaled.jpg",
  "/assets/jpg/0002-scaled.jpg",
];

export default function BooksSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const autoplay = useCallback(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    const cleanup = autoplay();
    return cleanup;
  }, [autoplay]);

  return (
    <section className="relative overflow-hidden bg-[#f4f4f5] py-24">
      {/* Top Shape */}
      <div
        className="
          absolute top-0 left-0 z-10 h-0 w-full
          before:absolute before:-top-[30px] before:left-0
          before:h-[60px] before:w-1/2
          before:skew-y-[3deg]
          before:bg-white
          before:content-['']
          after:absolute after:-top-[30px] after:right-0
          after:h-[60px] after:w-1/2
          after:-skew-y-[3deg]
          after:bg-white
          after:content-['']
        "
      />

      <div className="relative z-10 mx-auto mb-18 max-w-7xl px-5">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Corporate Profile */}
          <div className="flex flex-col items-center">
            <div className="h-[520px] w-[360px] overflow-hidden border border-[#333]">
              <Image
                src="/assets/png/corportae-profile.png"
                alt="Corporate Profile"
                width={360}
                height={520}
                className="h-full w-full object-cover"
              />
            </div>

            <Link
              href="https://www.visualytes.com/#downloadcorporateprofie"
              target="_blank"
              className="mt-7 flex h-[82px] min-w-[255px] items-center justify-center rounded-full border-2 border-[#ff497c] bg-[#ff497c] px-14 text-[13px] font-bold uppercase tracking-[3px] text-white transition-all duration-300 hover:border-[#ff497c] hover:bg-white hover:text-black"
            >
              Download Profile
            </Link>
          </div>

          {/* Certificate Slider */}
          <div className="flex flex-col items-center">
            <div
              className="w-[360px] overflow-hidden"
              ref={emblaRef}
            >
              <div className="flex">
                {certificates.map((img, i) => (
                  <div
                    key={i}
                    className="min-w-full flex-[0_0_100%]"
                  >
                    <div className="h-[520px] w-[360px] overflow-hidden border border-[#333]">
                      <Image
                        src={img}
                        alt={`Certificate ${i + 1}`}
                        width={360}
                        height={520}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="https://www.visualytes.com/#Enquiry"
              target="_blank"
              className="mt-7 flex h-[82px] min-w-[255px] items-center justify-center rounded-full border-2 border-[#ff497c] bg-[#ff497c] px-14 text-[13px] font-bold uppercase tracking-[3px] text-white transition-all duration-300 hover:border-[#ff497c] hover:bg-white hover:text-black"
            >
              Our Certificate
            </Link>
          </div>

          {/* Brochure */}
          <div className="flex flex-col items-center">
            <div className="h-[520px] w-[360px] overflow-hidden border-[3px] border-[#333]">
              <Image
                src="/assets/png/broucehr-profile.png"
                alt="Brochure"
                width={360}
                height={520}
                className="h-full w-full object-cover"
              />
            </div>

            <Link
              href="https://www.visualytes.com/#downloadbroucher"
              target="_blank"
              className="mt-7 flex h-[82px] min-w-[255px] items-center justify-center rounded-full border-2 border-[#ff497c] bg-[#ff497c] px-14 text-[13px] font-bold uppercase tracking-[3px] text-white transition-all duration-300 hover:border-[#ff497c] hover:bg-white hover:text-black"
            >
              Download Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2">
        <VerticalLine variant="pink" />
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <div className="absolute -bottom-[30px] left-0 h-[60px] w-1/2 skew-y-[3deg] bg-[#232b38]" />
        <div className="absolute -bottom-[30px] right-0 h-[60px] w-1/2 -skew-y-[3deg] bg-[#232b38]" />
      </div>
    </section>
  );
}