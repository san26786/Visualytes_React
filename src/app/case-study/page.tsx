import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import CaseStudyGrid from "./_components/CaseStudyGrid";

export default function CaseStudyPage() {
  return (
    <BrandSubPageShell
      title="Case Studies"
      eyebrow="Our Work"
      subtitle="Explore selected projects where strategy, design and development came together to deliver measurable results."
    >
      <CaseStudyGrid />
    </BrandSubPageShell>
  );
}
