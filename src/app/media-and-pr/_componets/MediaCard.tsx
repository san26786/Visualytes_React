import Image from "next/image";
import { MediaNews } from "./mediaData";

interface Props {
  item: MediaNews;
}

export default function MediaCard({ item }: Props) {
  return (
    <section className="pb-14 border-b border-gray-200 mb-14">
      <div className="grid lg:grid-cols-2 gap-10 items-start">

        <div>
          <Image
            src={item.image}
            alt={item.title}
            width={700}
            height={900}
            className="w-full object-cover"
          />
        </div>

        <div>

          <div className="flex items-start gap-4 mb-8">
            <span className="w-2 h-12 bg-[#ff497c] mt-1"></span>

            <h2 className="text-[24px] leading-[1.05] font-medium text-[#222]">
              <a
                href={item.link}
                target="_blank"
                className="hover:text-[#ff497c] transition"
              >
                {item.title}
              </a>
            </h2>
          </div>

          <div className="space-y-8">

            {item.content.map((text, index) => (
              <p
                key={index}
                className="italic text-[20px] font-light leading-[1.7] text-[#1f2732]"
              >
                {text}
              </p>
            ))}

          </div>

        </div>
      </div>

      <blockquote className="relative italic text-[28px] leading-[1.8] text-[#1f2732] border-l-4 border-[#ff497c] pl-8 mt-12">

        {item.quote.map((q, i) => (
          <p key={i} className="mb-4 max-w-7xl text-[20px]">
            {q}
          </p>
        ))}
      </blockquote>

        <div className="flex justify-end mt-10">
          <div className="text-right font-light">

            <p className="text-[#7f7f7f] text-[16px]">
              Published By : {item.publisher}
            </p>

            <p className="text-[#7f7f7f] text-[16px]">
              Publish Date : {item.publishDate}
            </p>

          </div>
        </div>
    </section>
  );
}