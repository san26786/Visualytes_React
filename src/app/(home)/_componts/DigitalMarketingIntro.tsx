import VerticalLine from "@/src/common/icons/VerticalLine";
import ServicesGrid from "./ServicesGrid";

const DigitalMarketingIntro = () => {
  return (
    <section className="">
      <div className="max-w-[780px] mx-auto px-[15px] text-center">
        
        <div className="flex justify-center mb-[35px]">
                     <VerticalLine variant="pink" className="h-[94px] w-[4px]"/>
        </div>

        <h2 className="text-[#1f2732] text-[32px] md:text-[32px] leading-[1.15] font-medium">
          We are the most effective Web Designing and
          <br />
          Digital Marketing Company
        </h2>

        <div className="h-[35px]" />

        <p className="text-[#7f7f7f] text-[16px] leading-[30px] font-light">
          Getting online is easy. Succeeding online is a different story.
          You&apos;ll need more than just a beautiful website to stand out these
          days. Online marketing solutions are essential to implement in your
          business. Conversion-based web design, coupled with a lead generating
          marketing plan, will make your online success inevitable.
        </p>

        <p className="mt-4 text-[#7f7f7f] text-[16px] leading-[30px] font-light">
          We are your Digital Partners in website development, mobile app,
          design, branding, and marketing. Trillions of websites on the
          Internet, and yet there is enough room for disruption in your niche.
        </p>

        <div className="h-[35px]" />

        <h2 className="text-[#1f2732] text-[32px] md:text-[32px] leading-[1.15] font-medium">
          The question is — Are you Ready to
          <br />
          Disrupt the Digital Space?
        </h2>

        <div className="h-[35px]" />

        <p className="text-[#7f7f7f] text-[16px] leading-[30px] font-light">
          Generating just enough revenue is everybody&apos;s cup of tea. However, it
          takes strategy, planning, knowledge of the latest technology, and
          hands on experience to make a mark.
        </p>

        <p className="mt-4 text-[#7f7f7f] text-[16px] leading-[30px] font-light">
          Get on board with our team of professional web-wizards to accelerate
          the pace of your business.
        </p>

        <div className="flex justify-center my-[35px]">
                     <VerticalLine variant="pink" className="h-[94px] w-[4px]"/>
        </div>

        <button
  className="
    text-center
    mt-5
    justify-center
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
  Get Started
</button>
   {/* <CTAButton
      title="Other Services"
      href="/our-services"
    /> */}
        <div className="flex justify-center mt-[35px]">
                     <VerticalLine variant="pink" className="h-[94px] w-[4px]"/>
        </div>

      </div>
      <div className="animate-[fadeInUp_1s_both]">
     < ServicesGrid/>
     </div>
    </section>
  );
};

export default DigitalMarketingIntro;