"use client";

import { BRAND_SURFACE, BRAND_TEXT } from "@/src/common/components/ui/brand/theme";

export default function OfficeLocation() {
  return (
    <section className="bg-transparent py-14">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-8 text-center">
          <p className={`mb-3 ${BRAND_TEXT.sectionEyebrow}`}>
            Visit Our Team
          </p>
          <h2 className="text-center text-[36px] font-semibold leading-tight text-white">
            Our UK Office Locations
          </h2>
        </div>
        <div className={`overflow-hidden ${BRAND_SURFACE.glassCard}`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2495.84065344242!2d-1.07560262339371!3d51.27725217176194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4874210f505015d3%3A0x528ab05173910cbe!2sVisualytes%20Limited!5e0!3m2!1sen!2sin!4v1741349271312!5m2!1sen!2sin"
            width="100%"
            height="500"
            loading="lazy"
            allowFullScreen
            className="border-0 w-full"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}