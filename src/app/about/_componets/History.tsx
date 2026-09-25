import type { AboutContent } from "@/src/lib/page-content/types";

export default function History({ content }: { content: AboutContent["history"] }) {
    return (
        <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto rounded-[2rem]  px-9 py-10 ">
        <div className="flex justify-center">
          <div className="rounded-full border border-orange-300/30 bg-orange-300/10 px-10 py-3">
            <h3 className="text-3xl md:text-5xl font-medium text-orange-300">
              {content.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Welcome Content */}
      <div className="max-w-7xl mx-auto px-2 py-8">
        <div className="space-y-5 text-[20px] font-[400] leading-9 text-slate-300">
          {content.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        </div>
        </section>
    );
}