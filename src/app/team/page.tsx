"use client";


import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import Founder from "./_componets/Founder";
import Directors from "./_componets/Directors";
import TeamGrid from "./_componets/TeamGrid";

export default function TeamPage() {
  return (
    <BrandSubPageShell
      title="Our Team"
      eyebrow="The People Behind Visualytes"
      subtitle="Meet the talented professionals who bring creativity, expertise and dedication to every project."
    >
      <Founder />
      <Directors />
      <TeamGrid />
    </BrandSubPageShell>
  );
}
