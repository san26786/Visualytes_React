"use client";


function Divider({ white = false }: { white?: boolean }) {
  return (
    <div className="flex items-center justify-center mt-8 mb-10">
      <div
        className={`w-9 h-[2px] ${white ? "bg-white" : "bg-[#0699b8]"}`}
      />
      <div
        className={`mx-2 w-3 h-3 rounded-full border-2 ${
          white ? "border-white" : "border-[#0699b8]"
        }`}
      />
      <div
        className={`w-9 h-[2px] ${white ? "bg-white" : "bg-[#0699b8]"}`}
      />
    </div>
  );
}

export default function BestDesignSection() {
  return (
    <section className="w-full">
      <div className="grid lg:grid-cols-2">

        {/* LEFT */}
        <div className="bg-[#0797B5] min-h-[520px] flex items-center justify-end">
          <div className="w-full max-w-[560px] px-12 text-right">

            <h2 className="text-[48px] font-semibold text-white">
              Best Design
            </h2>

            <div className="flex justify-end">
              <Divider white />
            </div>

            <p className="text-[18px] leading-[2.1] text-white font-serif">
              Design begins from research of needs of your target audience.
              The second step is prototyping and testing. This ensures that
              you get not just a pretty picture, but the finished product
              which fulfills your purposes.
            </p>

          </div>
        </div>


        {/* RIGHT */}
        <div className="relative overflow-hidden bg-[#fafafa] min-h-[520px] flex items-center">

          {/* Background Shapes */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">

            <div className="absolute top-10 left-24 w-12 h-12 rotate-45 border-2 border-gray-300"></div>

            <div className="absolute top-10 right-32 w-14 h-14 rotate-45 border-2 border-gray-300"></div>

            <div className="absolute top-32 left-1/3 w-12 h-12 border-2 border-gray-300 rounded-xl rotate-12"></div>

            <div className="absolute top-20 right-16 w-12 h-12 rounded-full border-2 border-gray-300"></div>

            <div className="absolute bottom-20 right-20 text-6xl font-light text-gray-300">
              +
            </div>

            <div className="absolute bottom-20 left-28 w-10 h-10 rotate-45 border-2 border-gray-300"></div>

            <div className="absolute top-44 right-56 h-12 border border-gray-300 rotate-25"></div>

          </div>


          <div className="relative w-full max-w-[560px] px-12">

        

            <h2 className="text-[48px] font-semibold text-[#0699b8]">
              Best Codes
            </h2>

            <div className="flex justify-start">
              <Divider />
            </div>

            <p className="text-[18px] leading-[2.1] text-[#14498b] font-serif">
              Our lead engineer will develop an individual structure of your
              project, which will serve you for many years and support
              scalability and your future needs. Our code is a high quality
              and safety standards.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}