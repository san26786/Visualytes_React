import { testimonials } from "./_componets/data";
import TestimonialCard from "./_componets/TestimonialCard";
import PageBanner from "@/src/common/components/layouts/PageBanner";


export default function TestimonialsPage() {
  return (
    <>
      <PageBanner title="Testimonials" />
    <section className="py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20">
          {testimonials.map((item) => (
            <TestimonialCard
              key={item.id}
              image={item.image}
              name={item.name}
              designation={item.designation}
              company={item.company}
              content={item.review}
            />
          ))}
        </div>
      </div>
    </section>

    </>
  );
}