"use client";

import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import ProcessSection from "../_components/ProcessSection";

export default function ProcessClient() {
  return (
    <BrandSubPageShell
      title="Our Process"
      eyebrow=""
      subtitle="From strategy to launch and beyond — a proven four-step process that delivers results."
    >
      <ProcessSection />
    </BrandSubPageShell>
  );
}
