import VerticalLine from "@/src/common/icons/VerticalLine";
import React from "react";

const AppointmentTalk = () => {
  return (
    <div>
      <section className="">
        <div className="max-w-[780px] mx-auto px-[15px] text-center">
          <div className="mt-2 flex justify-center mt-[35px] mb-[35px]">
            <a
              href="https://www.visualytes.com/testimonials"
              target="_blank"
              className=" flex
                h-[82px]
                min-w-[255px]
                items-center
                justify-center
                rounded-full
                border-2
                border-[#ff497c]
                bg-[#ff497c]
                px-14
                text-[13px]
                font-bold
                uppercase
                tracking-[3px]
                text-white
                transition-all
                duration-300
                hover:bg-white
                hover:text-black
                hover:border-[#ff497c] mt-5"
            >
              SEE THE TESTIMONIAL
            </a>
          </div>
          <div className="flex justify-center mb-[35px]">
            <VerticalLine variant="pink" />
          </div>

                  {/* <h2 className="text-[#1f2732] text-[32px] md:text-[32px] leading-[1.15] font-medium">
                Lets Get Started
                Your Project          <br />
                  Digital Marketing Company
                </h2> */}
          <h2 className="text-center text-[#1f2732] text-[46px] leading-[56px] font-medium mb-[35px]">
            Lets Get Started
            <br />
            Your Project
          </h2>
          <div className="h-[35px]" />

          <p className="text-[#7f7f7f] text-[16px] leading-[30px] font-light">
            We’ll help to achieve your goals and to grow business
          </p>

          <div className="flex justify-center my-[35px]">
            <VerticalLine variant="pink" />
          </div>

          <a
            href="https://www.visualytes.com/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            className="
    inline-flex
    items-center
    justify-center
    mt-5
    min-w-[230px]
    h-[80px]
    px-[35px]
    border-[4px]
    border-[#ff497c]
    rounded-full
    bg-transparent
    text-[#1f2732]
    text-[12px]
    font-[700]
    uppercase
    tracking-[2.4px]
    leading-[12px]
    transition-all
    duration-[400ms]
    hover:bg-[#ff497c]
    hover:border-[#ff497c]
    hover:text-white
  "
          >
            Let’s Book Appointment & Talk!
          </a>
                    {/* <CTAButton
                title="Other Services"
                href="/our-services"
              /> */}
          <div className="flex justify-center mt-[35px]">
            <VerticalLine variant="pink" />
          </div>
        
        </div>
      </section>
    </div>
  );
};

export default AppointmentTalk;
