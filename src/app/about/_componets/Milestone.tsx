import Image from "next/image";

export default function Milestone() {
    return (
        <>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-center mt-7">
          <div className="border border-gray-400 rounded-full px-15 py-3">
            <h3 className="text-3xl md:text-5xl font-medium text-[#784191]">
            Our Milestone
            </h3>
          </div>
        </div>
        <Image
        src="/assets/png/our_milestone.png"
        width={1600}
        height={1600}
        alt="our milestone"
        className='object-contain '
        />
        <div className="flex justify-center">
          <div className="border border-gray-400 rounded-full px-15 py-3">
            <h3 className="text-3xl md:text-5xl font-medium text-[#7658A0]">
            What Separates us From Our Competition?
            </h3>
          </div>
        </div>
        <div className="space-y-5 text-[#7f7f7f] text-[20px] font-[400] leading-9 mt-7 mb-7">
        <p>Visualytes brings perfection, high quality deliveries and  premium level service to web-apps, computer software and digital marketing while helping clients to fulfill all their IT needs under one roof.</p>
        </div>
        <div className="flex justify-center">
          <div className="border border-gray-400 rounded-full px-15 py-3">
            <h3 className="text-3xl md:text-5xl font-medium text-[#F57C00]">
            Why Choose Us?
            </h3>
          </div>
        </div>
        <div className="space-y-5 text-[#7f7f7f] text-[20px] font-[400] leading-9 mt-7 mb-7 text-center">
        <p>Visualytes Limited is the renowned IT company, which has marked its flagship in 7 countries with 1000+ projects successfully accomplished.</p></div>
        </div>
       </>
    );
}