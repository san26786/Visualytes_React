"use client";

import { BRAND_SURFACE, BRAND_TEXT } from "@/src/common/components/ui/brand/theme";
import type { ContactContent } from "@/src/lib/contact-page";

export default function OfficeNames({ content }: { content: ContactContent["offices"] }) {
  return (
    <section className="bg-transparent pb-20 pt-14 md:pt-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 text-center">
          <p className={`mb-3 ${BRAND_TEXT.sectionEyebrow}`}>
            {content.badge}
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            {content.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {content.groups.map((office) => (
            <div
              key={office.title}
              className={`${BRAND_SURFACE.mutedGlassCard} p-7`}
            >
              <h2 className="mb-6 text-[30px] font-semibold leading-tight text-white">
                {office.title}
              </h2>

              <ul className="space-y-4">
                {office.locations.map((location) => (
                  <li key={location} className="flex items-center gap-3">
                    <span className="rt-icon2-pin-alt text-cyan-300" />
                    <span className="text-[17px] font-normal leading-snug text-slate-200">
                      {location}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}