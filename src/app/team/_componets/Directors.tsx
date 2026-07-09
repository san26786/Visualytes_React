import Image from "next/image";
import { directors } from "./data";

export default function Directors() {
  return (
    <section className="py-7">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-[42px] font-medium text-center mb-7 text-[#1f2732]">
          Meet the Directors
        </h2>

        <div className="flex justify-center">

          {directors.map((item, index) => (
            <div key={index} className="max-w-sm">

              <Image
                src={item.image}
                alt=""
                width={400}
                height={400}
                className=""
              />

              <p className="font-semibold text-center mt-8 uppercase text-[#7f7f7f] text-[16px]">
                {item.role}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}