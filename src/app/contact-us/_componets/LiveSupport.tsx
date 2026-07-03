"use client";

import Link from "next/link";

export default function LiveSupport() {
  return (
    <section className="relative overflow-hidden bg-[#f5f6f8] lg:bg-[url('/assets/jpg/bg_3.jpg')] lg:bg-cover lg:bg-right bg-no-repeat">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="grid min-h-[610px] grid-cols-1 items-center lg:grid-cols-2">
          {/* Left Content */}
          <div className="mx-auto max-w-[470px] py-16 text-center lg:mx-0 lg:py-24 lg:text-left">
            <h2 className="text-[40px] font-medium leading-none text-[#1f2732] sm:text-[44px] lg:text-[48px]">
              Live Support
            </h2>

            <p className="mt-8 text-[16px] leading-[1.9] text-[#7f7f7f]">
              Do you need any urgent help from us regarding any of our
              service? Our Dedicated support team is available for you.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-[18px] sm:text-[20px] lg:justify-start lg:text-[24px]">
              <span className="font-medium text-[#232b39]">
                Call Us Now:
              </span>

              <span className="font-light text-[#ff5d7d]">
                023 8097 0305
              </span>

              <span className="font-light text-[#8a8a8a]">
                or...
              </span>
            </div>

            <Link
              href="https://api.whatsapp.com/send?phone=447913027482&text=Hi,."
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-10 inline-flex h-[70px] items-center justify-center rounded-full border-[4px] border-[#01e675] px-8 text-center text-[14px] font-bold uppercase tracking-[3px] text-[#111] transition-all duration-300 hover:bg-[#01e675] hover:text-white sm:h-[76px] sm:px-12 lg:mx-0 lg:h-[82px] lg:px-14 lg:text-[16px] lg:tracking-[4px]"
            >
              Start Whatsapp Chat Now!
            </Link>

            <p className="mt-10 text-[15px] leading-8 text-[#7f7f7f] sm:text-[16px] lg:mt-14 lg:leading-[2]">
              You must have Whatsapp Desktop App to chat via Computer and
              Whatsapp mobile app to chat via mobile.
            </p>
          </div>

          {/* Right Side (Desktop Only) */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}