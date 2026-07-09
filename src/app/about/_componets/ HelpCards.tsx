import Image from "next/image";
import Link from "next/link";
import {
   
    cards
  } from "../_componets/data";
export default function HelpCards() {
    return (
        <>
         <div className="max-w-7xl mx-auto px-6 pt-5">
          <div className="flex justify-center">
            <div className="border border-gray-400 rounded-full px-10 py-3">
              <h3 className="text-3xl md:text-5xl font-medium text-[#BDCF0F]">
              How Can We Help You?
              </h3>
            </div>
          </div>
        </div>
         <section className="py-20 bg-white">
  <div className="mx-auto max-w-[1170px] px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
      {cards.map((card, index) => {
        const imageFirst = index % 2 === 0;

        return (
          <div
            key={card.title}
            className="w-full max-w-[360px] h-[530px] mx-auto bg-[#f5f5f5] overflow-hidden text-center flex flex-col"
          >
            {imageFirst ? (
              <>
                {/* Image */}
                <div className="relative w-full h-[240px]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="h-[290px] px-8 py-7 flex flex-col items-center justify-between">
                  <div>
                    <h3 className="text-[16px] leading-[34px] font-bold text-[#7f7f7f]">
                      {card.title}
                    </h3>

                    <p className="mt-6 text-[16px] leading-[36px] font-light text-[#8b8b8b]">
                      {card.description}
                    </p>
                  </div>

                  <Link
                    href={card.link}
                    className="inline-block text-[18px] font-light text-[#ff4f8b] transition hover:text-[#e63b78]"
                  >
                    Read More
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Content */}
                <div className="h-[290px] px-8 py-7 flex flex-col items-center justify-between">
                  <div>
                    <h3 className="text-[16px] leading-[34px] font-bold text-[#7f7f7f]">
                      {card.title}
                    </h3>

                    <p className="mt-6 text-[16px] leading-[36px] font-light text-[#8b8b8b]">
                      {card.description}
                    </p>
                  </div>

                  <Link
                    href={card.link}
                    className="inline-block text-[18px] font-light text-[#ff4f8b] transition hover:text-[#e63b78]"
                  >
                    Read More
                  </Link>
                </div>

                {/* Image */}
                <div className="relative w-full h-[240px]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  </div>
</section>
        </>
    );
}