import VerticalLine from "@/src/common/icons/VerticalLine";
import ServicesGrid from "./ServicesGrid";
import VerticalLineBig from "@/src/common/icons/VerticalLineBIg";

export default function CaseStudy() {
    return (
      <section className="w-full bg-white ">
        <div className="max-w-7xl mx-auto px-4">
  
        <h3 className="text-center text-4xl md:text-6xl lg:text-[42px] font-medium text-[#1f2732] mb-10 normal-case mt-10">
  Few Selected Case Studies
</h3>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">            {/* LEFT */}
            <a
              href="https://www.visualytes.com/projects/studio-creatives-2/"
              target="_blank"
              className="group relative h-[500px] overflow-hidden border-[0.2px] border-black"
            >
              <div
                className="absolute inset-0 bg-cover bg-top transition-all duration-[30000ms] ease-linear group-hover:bg-bottom"
                style={{
                  backgroundImage:
                    "url('/assets/webp/scfullpagess.png.bv.webp')",
                }}
              />
  
              {/* overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
  
              {/* icon */}
              {/* <div className="absolute bottom-5 right-5 text-white text-xl opacity-0 group-hover:opacity-100 transition">
                ⬆
              </div> */}
            </a>
  
            {/* RIGHT */}
            <a
              href="https://www.visualytes.com/projects/thorney-park-golf-club/"
              target="_blank"
              className="group relative h-[500px] overflow-hidden border-[0.2px] border-black"
            >
              <div
                className="absolute inset-0 bg-cover bg-top transition-all duration-[30000ms] ease-linear group-hover:bg-bottom"
                style={{
                  backgroundImage:
                    "url('/assets/webp/tparksshome.png.bv.webp')",
                }}
              />
  
              {/* overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
  
              {/* icon */}
              {/* <div className="absolute bottom-5 right-5 text-white text-xl opacity-0 group-hover:opacity-100 transition">
                ⬆
              </div> */}
            </a>
  
          </div>
        </div>
        <section className="">
      <div className="max-w-[980px] mx-auto px-[15px] text-center">
        
        <div className="flex justify-center mb-[25px] mt-[150px]">
          <VerticalLine variant="pink" />
        </div>

       

        <div className="h-[35px]" />

        <p className="text-[#7f7f7f] text-[16px] leading-[30px] font-light text-center max-w-[1028px] mx-auto mb-5">
  Visualytes is not just another IT agency on the Internet; we work with a different approach to your requirement, 99/100 times we are able to exceed our client's expectations. About the one time, well we over-exceeded them.
</p>

        

        <div className="h-[35px]" />

        <h2 className="text-[#1f2732] text-[32px] md:text-[32px] leading-[1.15] font-medium">
        Wish to know us better? Take a look at the video
         
        </h2>

        <div className="h-[35px]" />

        <p className="text-[#7f7f7f] text-[16px] leading-[30px] font-light">
        We don&apos;t say we are different—we just understand the individual needs of B2B and B2C businesses better.


        </p>

        <p className="mt-4 text-[#7f7f7f] text-[16px] leading-[30px] font-light">
        Leverage our expertise to strategize web development, brand messaging, content marketing effectively
        and improve your B2B client conversion rate.
        </p>

     

      
   {/* <CTAButton
      title="Other Services"
      href="/our-services"
    /> */}
       

      </div>
      <div className="flex justify-center">
      <div className="justify-center mb-[5px] mt-[50px]">
      <VerticalLine variant="pink" />
          <VerticalLineBig variant="pink" />
        </div>
        </div>
        
    </section>
      </section>
    );
  }