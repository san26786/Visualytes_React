"use client";

import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import type { TeamContent } from "@/src/lib/page-content/types";
import Founder from "./_componets/Founder";
import Directors from "./_componets/Directors";
import TeamGrid from "./_componets/TeamGrid";

export default function TeamClient({ content }: { content: TeamContent }) {
  return (
    <BrandSubPageShell title={content.header.title} eyebrow={content.header.eyebrow} subtitle={content.header.subtitle}>
      <Founder founder={content.founder} />
      <Directors content={content.directors} />
      <TeamGrid content={content.team} />
    </BrandSubPageShell>
  );
}
