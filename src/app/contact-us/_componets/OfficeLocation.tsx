"use client";

export default function OfficeLocation() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}
        <h2 className="text-center text-[36px] font-medium text-[#2F3640] leading-tight mb-8">
  Our UK Office Locations
</h2>

        {/* Google Map */}
        <div className="overflow-hidden shadow-lg">
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