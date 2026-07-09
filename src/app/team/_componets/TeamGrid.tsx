import Image from "next/image";
import { team } from "./data";

export default function TeamGrid() {
  return (
    <section className="py-7 mb-9">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-[42px] font-medium text-center text-[#1f2732]">
          Our Team
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {team.map((item, index) => (
            <div
              key={index}
              className="text-center "
            >
              <Image
                src={item.image}
                alt=""
                width={400}
                height={400}
                className="mx-auto"
              />

              <p className="font-semibold text-center  uppercase text-[#7f7f7f] text-[16px] ">
                {item.role}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}