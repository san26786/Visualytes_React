import Image from "next/image";
import { founder } from "./data";

export default function Founder() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-[42px] font-medium text-center mb-12">
          Visualytes Limited
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div className="flex justify-center">
            <Image
              src={founder.image}
              alt={founder.name}
              width={450}
              height={500}
              className="object-contain"
            />
          </div>

          <div>

            <h3 className="text-[36px] font-medium uppercase">
              {founder.name}
            </h3>

            <p className="uppercase text-[#7f7f7f] tracking-widest mt-6 text-[16px] font-light">
              {founder.role}
            </p>

            <p className="text-[#7f7f7f] leading-9 mt-8 text-lg text-[16px] font-light">
              {founder.description}
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}