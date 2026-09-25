"use client";

import Image from "next/image";

import { buildContactCards } from "./contactCards";
import { useSiteData } from "./SiteDataProvider";

/** Call / Write / Visit strip above the footer. Content comes from Admin > Contact Content. */
export default function AboveFooter() {
  const { contact } = useSiteData();
  const items = buildContactCards(contact);

  return (
    <section className="relative overflow-visible">
      <div className="flex justify-center">
        <Image src="/assets/png/vertical_line3.png" alt="" width={20} height={120} className="h-auto h-[94px] w-[4px]" />
      </div>

      <div className="mx-auto max-w-[1170px] px-[15px] py-[85px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16">
          {items.map((item) => (
            <div key={item.icon} className="teaser-card text-center">
              {/* Icon Circle */}
              <div className="teaser-icon mx-auto flex h-[163px] w-[163px] items-center justify-center rounded-full border-[4px] border-white bg-transparent p-[4px]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white transition-all duration-500 ease-in-out">
                  <i
                    className={item.icon}
                    style={{
                      fontSize: "65px",
                      color: item.color,
                      lineHeight: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-[29px] mb-[17px] text-[24px] font-medium text-white">{item.title}</h3>

              {/* Content */}
              <div className="text-[15px] leading-[30px] font-light text-slate-300">{item.content}</div>
            </div>
          ))}
        </div>

        {/* Vertical Decoration */}
        <div className="mt-[60px] flex justify-center">
          <Image src="/assets/png/vertical_line3.png" alt="" width={20} height={120} className="h-auto h-[94px] w-[4px]" />
        </div>
      </div>
    </section>
  );
}
