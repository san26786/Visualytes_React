import Image from "next/image";
import { features } from "./data";

export default function HexagonCrads() {
    return (
        <>
          <section className="py-5 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        {/* Heading */}
       

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
  {features.map((item) => (
    <div
      key={item.title}
      className="relative w-[293px] h-[486px] mx-auto"
    >
       <div className="absolute inset-0 flex items-center justify-center -translate-y-[155px] z-50">
  <h3 className="w-[170px] text-center text-[24px] font-medium leading-[30px] text-[#252b37]">
    {item.title}
  </h3>
</div>
      {/* White Card */}
      <div className="absolute top-[80px] left-0 w-full h-[406px]  bg-white rounded-sm"></div>
     
      {/* Hexagon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
        <div className="relative w-[610px] h-[485px] z-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
          />

          {/* Title Inside Hexagon */}
        
        </div>
      </div>

      {/* Colored Line */}
      <div
        className="absolute top-[205px] left-1/2 -translate-x-1/2 h-[4px] w-[100px]"
        style={{ backgroundColor: item.line }}
      />

      {/* Description */}
      <div className="absolute top-[245px] left-0 w-full px-6 z-30">
        <p className="text-center text-[18px] leading-[30px] font-semibold text-[#111]">
          {item.description}
        </p>
      </div>
    </div>
  ))}
</div>

        {/* Bottom Content */}
        <div className="mt-20 space-y-8 text-[20px] leading-[38px] text-[#7f7f7f] font-light">
          <p>
            There are many website and IT companies out there, but Visualytes
            Ltd is in a unique position: a company that in a previous
            incarnation has been trusted by some of the largest banks,
            charities and retail businesses in the world, which is now focusing
            that experience solely on the needs and interests of SMEs.
          </p>

          <p>
            With extensive contacts throughout the world, we have backing which
            ensures the stability of our services. We’re not going anywhere
            (except forwards), and you can rely on us to offer a stable,
            long-lasting service for as long as you need us.
          </p>

          <p>
            We offer all the services you’ll require under one roof, and what
            we have now is just the start. Every day, we’re searching,
            experimenting, innovating and learning in our quest to develop more
            and better solutions for SMEs. We’re forever moving ahead to
            challenge ourselves and create the future — your future, as
            entrepreneurs.
          </p>

          <p>
            “All innovation begins with creative ideas.” We at Visualytes Ltd
            are brimming over with creative ideas, and we’re dedicated to
            applying those ideas to providing ongoing services for SMEs at a
            reasonable cost. So that you as an entrepreneur can concentrate on
            what you do best — turning your business into one that’s even more
            successful and profitable than it already is.
          </p>
        </div>
      </div>
    </section>

    </>
    );
}