"use client";

import Image from "next/image";
import { founder } from "./data";
import {
  BRAND_TEXT,
} from "@/src/common/components/ui/brand/theme";

export default function Founder() {
  return (
    <section className=" pb-12 pt-4">
      <div className="mx-auto max-w-6xl">
        
         <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
         <div className="flex justify-center">
            <Image
              src={founder.image}
              alt={founder.name}
              width={450}
              height={500}
              className="object-contain"
            />
          </div>


            <div className="px-8 pb-10 pt-6 lg:px-12 lg:py-12">
              <p className={BRAND_TEXT.sectionEyebrow}>Founder</p>
              <h2 className={`mt-3 ${BRAND_TEXT.sectionTitle}`}>
                {founder.name}
              </h2>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                {founder.role}
              </p>
              <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400" />
              <p className={`mt-6 ${BRAND_TEXT.sectionBody}`}>
                {founder.description}
              </p>
            </div>
          </div>
      </div>
    </section>
  );
}
