export default function Map() {
    return (
        <>
        <section className="bg-transparent py-14 ">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="flex justify-center mt-7">
          <div className="rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-10 py-3">
            <h3 className="text-3xl md:text-5xl font-medium text-fuchsia-300">
            Our Worldwide Client
            </h3>
          </div>
        </div>

        {/* Space */}
        <div className="mt-12" />

        {/* Google Map */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
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

 



        <section className="bg-transparent py-14 pb-10 mb-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="flex justify-center">
          <div className="rounded-full border border-orange-300/30 bg-orange-300/10 px-10 py-3">
            <h3 className="text-3xl md:text-5xl font-medium text-orange-300">
            Our Global Presence
            </h3>
          </div>
        </div>

        {/* Space */}
        <div className="mt-12"></div>

        {/* Google Map */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
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