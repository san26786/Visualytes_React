export default function Map() {
    return (
        <>
        <section className="bg-white py-14 ">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="flex justify-center mt-7">
          <div className="border border-gray-400 rounded-full px-15 py-3">
            <h3 className="text-3xl md:text-5xl font-medium text-[#784191]">
            Our Worldwide Client
            </h3>
          </div>
        </div>

        {/* Space */}
        <div className="mt-12" />

        {/* Google Map */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl overflow-hidden rounded-md shadow-md">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=15qxFWocQB9ofmfG6kdLbdek8_OhOxDc&ehbc=2E312F&ll=19.216640857924432,66.18511710000004&z=3"
              width="100%"
              height="650"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </div>
        </div>

      </div>
    </section>

 



        <section className="bg-white py-14 pb-10 mb-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="flex justify-center">
          <div className="border border-gray-400 rounded-full px-15 py-3">
            <h3 className="text-3xl md:text-5xl font-medium text-[#F57C00]">
            Our Global Presence
            </h3>
          </div>
        </div>

        {/* Space */}
        <div className="mt-12"></div>

        {/* Google Map */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl overflow-hidden rounded-sm shadow-md">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1LGI3xDqlFI294WYO_3PCn1rm8JYmsTJj"
              className="w-full h-[350px] md:h-[500px] lg:h-[600px] border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
        </>
    );
}