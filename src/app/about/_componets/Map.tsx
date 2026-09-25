import type { AboutContent } from "@/src/lib/page-content/types";

export default function Map({ content }: { content: AboutContent["maps"] }) {
    return (
        <>
        <section className="bg-transparent py-14 ">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="flex justify-center mt-7">
          <div className="rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-10 py-3">
            <h3 className="text-3xl md:text-5xl font-medium text-fuchsia-300">
            {content.clientTitle}
            </h3>
          </div>
        </div>

        {/* Space */}
        <div className="mt-12" />

        {/* Google Map */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <iframe
              src={content.clientMapUrl}
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
            {content.presenceTitle}
            </h3>
          </div>
        </div>

        {/* Space */}
        <div className="mt-12"></div>

        {/* Google Map */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <iframe
              src={content.presenceMapUrl}
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