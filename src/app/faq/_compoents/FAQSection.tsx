"use client";

import { useState } from "react";
import { Pencil, Plus, Minus } from "lucide-react";
import { faqs } from "./data";
import PageBanner from "@/src/common/components/layouts/PageBanner";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
    <PageBanner title="FAQ"/>
    {/* <section className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const active = open === index;

            return (
                <div
                key={index}
                className={`overflow-hidden transition-all duration-300 ${
                  active ? "rounded-[40px]" : "rounded-full"
                }`}
              >
                <button
                  onClick={() => setOpen(active ? null : index)}
                  className={`flex w-full items-center justify-between px-8 py-6 text-left transition-colors duration-300 ${
                    active
                      ? "rounded-t-[40px] bg-[#5d374b]"
                      : "rounded-full bg-[#212833] hover:bg-[#2b3340]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Pencil size={14} className="text-[#ff497c]" />
              
                    <span className="text-[13px] font-bold uppercase tracking-[3px] text-white">
                      {item.question}
                    </span>
                  </div>
              
                  {active ? (
                    <Minus size={18} className="text-white" />
                  ) : (
                    <Plus size={18} className="text-white" />
                  )}
                </button>
              
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="rounded-b-[40px] bg-[#5d374b] px-8 pb-8 pt-3 text-[15px] leading-8 text-white/90 whitespace-pre-line">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section> */}

    <section className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="space-y-5">
          {faqs.map((item, index) => {
            const active = open === index;

            return (
              <div key={index}>
                {/* Header */}
                <button
                  onClick={() => setOpen(active ? -1 : index)}
                  className={`flex w-full items-center justify-between rounded-full px-8 py-6 transition-all duration-300 ${
                    active
                      ? "bg-[#ff497c]"
                      : "bg-[#212833] hover:bg-[#ff497c]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Pencil
                      size={13}
                      className="fill-[#ff497c] text-white"
                    />

                    <span className="text-[13px] font-bold uppercase tracking-[3px] text-white">
                      {item.question}
                    </span>
                  </div>

                  {active ? (
                    <Minus size={15} className="text-white" />
                  ) : (
                    <Plus size={15} className="text-white" />
                  )}
                </button>

                {/* Body */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    active
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 py-4">
                    <p className="text-[17px] leading-10 text-[#8b8b8b] whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    <section
  className="relative w-full bg-cover bg-top bg-no-repeat py-[150px]"
  style={{
    backgroundImage: "url('/assets/jpg/bg_2.jpg')",
  }}
>
  <div className="absolute inset-0 " />

  <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 text-center">
    <h2 className="text-[42px] font-light leading-tight text-black md:text-[52px]">
      Any Unanswered Questions?
    </h2>

    <div className="mt-10 flex justify-center">
  <a
    href="/contact-us"
    className="mt-5 flex h-[82px] min-w-[255px] items-center justify-center rounded-full border-2 border-[#ff497c] bg-[#ff497c] px-14 text-[13px] font-bold uppercase tracking-[3px] text-white transition-all duration-300 hover:bg-transparent hover:text-white hover:border-[#ff497c]"
  >
    CONTACT US
  </a>
</div>
  </div>
</section>
  </>
  );
}