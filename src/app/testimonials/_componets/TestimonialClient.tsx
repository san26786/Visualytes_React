"use client";

import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import TestimonialCard from "../_componets/TestimonialCard";
import { useEffect, useState } from "react";

interface ApiTestimonial {
  id: string;
  image: string;
  name: string;
  designation: string;
  company: string | null;
  review: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TestimonialClient() {
  const [testimonials, setTestimonials] = useState<ApiTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/admin/testimonials", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const data: ApiTestimonial[] = await response.json();

        const activeTestimonials = data
          .filter((item) => item.isActive)
          .sort((a, b) => a.sortOrder - b.sortOrder);

        setTestimonials(activeTestimonials);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
        setError("Unable to load testimonials.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <BrandSubPageShell
      title="Testimonials"
      eyebrow="Client Voices"
      subtitle="Real stories from businesses who trusted Visualytes to transform their digital presence."
    >
      <section className="px-4 pb-24 pt-4">
        <div className="mx-auto max-w-7xl">

          {loading && (
            <div className="py-12 text-center">
              <p className="text-gray-500">Loading testimonials...</p>
            </div>
          )}

          {!loading && error && (
            <div className="py-12 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!loading && !error && testimonials.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                No testimonials available.
              </p>
            </div>
          )}

          {!loading && !error && testimonials.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
              {testimonials.map((item, index) => (
                <TestimonialCard
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  designation={item.designation}
                  company={item.company ?? undefined}
                  content={item.review}
                  index={index}
                />
              ))}
            </div>
          )}

        </div>
      </section>
    </BrandSubPageShell>
  );
}