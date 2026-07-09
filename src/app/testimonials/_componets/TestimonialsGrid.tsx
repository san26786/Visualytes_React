import TestimonialCard from "./TestimonialCard";

interface Testimonial {
  id: number;
  image: string;
  name: string;
  designation: string;
  company?: string;
  content: string;
}

export default function TestimonialsGrid({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-24 gap-x-16">
          {testimonials.map((item) => (
            <TestimonialCard
              key={item.id}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}