import VerticalLine from "@/src/common/icons/VerticalLine";
import VerticalLineBig from "@/src/common/icons/VerticalLineBIg";
import Image from "next/image";
const services = [
    {
      title: "Website Designing",
      icon: "/assets/webp/service_icon_1.png.bv.webp",
      description:
        "Our creative web designers can read between the colours. Let the website design talk to your customers directly.",
    },
    {
      title: "Digital Marketing",
      icon: "/assets/webp/service_icon_1.png.bv.webp",
      description:
        "At Story Design, the performance marketing services are led by a team of professional digital marketers.",
    },
    {
      title: "Mobile App Development",
      icon: "/assets/webp/service_icon_1.png.bv.webp",
      description:
        "Launch a beast of a business in the app store and turn all the spotlight on your mobile app.",
    },
    {
      title: "Corporate Branding",
      icon: "/assets/webp/service_icon_1.png.bv.webp",
      description:
        "The first impression is indeed the last one, and that is where your business logo and branding strategy help.",
    },
    {
      title: "Bespoke Software",
      icon: "/assets/webp/service_icon_3-1.png.bv_resized_mobile.png.bv.webp",
      description:
        "Do you have a business model in mind? Let's get it in the market with the best possible development.",
    },
    {
      title: "Website Hosting Services",
      icon: "/assets/webp/service_icon_3-1.png.bv_resized_mobile.png.bv.webp",
      description:
        "Get reliable hosting services with advanced features to drive high traffic.",
    },
  ];
const ServicesGrid = () => {
  return (
    <section className="py-10">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        
        <h2 className="text-center text-[#1f2732] text-[46px] leading-[56px] font-medium mb-10">
          Service We Offer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10  ">
          {services.map((service) => (
            <div
              key={service.title}
              className="text-center  flex flex-col items-center"
            >
              {/* Icon */}
              <div className="mb-10">
                <div className="w-[170px] h-[160px] rounded-full   flex items-center justify-center">
                  <div className="w-[126px] h-[126px] rounded-full  flex items-center justify-center">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={238}
                      height={248}
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[#1f2732] text-[20px] leading-[32px] font-medium mb-[18px]">
                {service.title}
              </h3>

              {/* Description */}
              <p className="max-w-[320px] text-[#7f7f7f] text-[16px] leading-[30px] font-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center my-[35px]">
        <VerticalLineBig variant="pink" />
        
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
  Other Services
</button>
</div>
        </div>
       
        
      
    </section>
  );
};

export default ServicesGrid;