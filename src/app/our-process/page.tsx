"use client";

import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import ProcessSection from "./_components/ProcessSection";

export default function OurProcessPage() {
  return (
    <BrandSubPageShell
      title="Our Process"
      eyebrow="How We Work"
      subtitle="From strategy to launch and beyond — a proven four-step process that delivers results."
    >
      <ProcessSection />
    </BrandSubPageShell>
  );
}
