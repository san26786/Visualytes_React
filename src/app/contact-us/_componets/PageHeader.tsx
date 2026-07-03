"use client";


import { items } from "@/src/common/components/layouts/AboveFooter";
import PageBanner from "@/src/common/components/layouts/PageBanner";

export default function PageHeader() {


  return (
    <>
      <PageBanner title="Contact Us" />
  <section>
        <div className="mx-auto max-w-[1170px] px-[15px] pb-[85px] pt-7">
          <div className="grid grid-cols-1 md:grid-cols-3 ">
            {items.map((item) => (
              <div key={item.title} className="teaser-card text-center">
                {/* Icon Circle */}
                <div className="teaser-icon mx-auto flex h-[153px] w-[163px] items-center justify-center rounded-full border-[4px] border-white bg-transparent p-[4px]">
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
                <h3 className=" mb-[17px] text-[24px] font-medium leading-[24px] text-[#1f2732]">
                  {item.title}
                </h3>
  
                {/* Content */}
                <div className="text-[15px] leading-[30px] font-light text-[#7f7f7f]">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        
        </div>
      </section>
     
    </>
  );
}