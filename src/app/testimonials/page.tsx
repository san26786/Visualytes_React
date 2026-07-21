import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import { testimonials } from "./_componets/data";
import TestimonialCard from "./_componets/TestimonialCard";

export default function TestimonialsPage() {
  return (
    <BrandSubPageShell
      title="Testimonials"
      eyebrow="Client Voices"
      subtitle="Real stories from businesses who trusted Visualytes to transform their digital presence."
    >
      <section className="px-4 pb-24 pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {testimonials.map((item, index) => (
              <TestimonialCard
                key={item.id}
                image={item.image}
                name={item.name}
                designation={item.designation}
                company={item.company}
                content={item.review}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </BrandSubPageShell>
  );
}
