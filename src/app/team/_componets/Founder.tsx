"use client";

import Image from "next/image";
import { isRemoteImage } from "@/src/lib/page-content/image";
import type { TeamContent } from "@/src/lib/page-content/types";
import {
  BRAND_TEXT,
} from "@/src/common/components/ui/brand/theme";

export default function Founder({ founder }: { founder: TeamContent["founder"] }) {
  return (
    <section className=" pb-12 pt-4">
      <div className="mx-auto max-w-6xl">
        
         <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
         <div className="flex justify-center">
            <Image
              src={founder.image}
              alt={founder.name}
              width={470}
              height={741}
              className="object-contain rounded-2xl"
              unoptimized={isRemoteImage(founder.image)}
            />
          </div>


            <div className="px-8 pb-10 pt-6 lg:px-12 lg:py-12">
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                {founder.role}
              </p>              <h2 className={`mt-3 ${BRAND_TEXT.sectionTitle}`}>
                {founder.name}
              </h2>
             
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
