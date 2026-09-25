import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import MediaCard from "../_componets/MediaCard";
import { BRAND_TEXT } from "@/src/common/components/ui/brand/theme";
import type { MediaContent } from "@/src/lib/page-content/types";

export default function MediaprClient({ content }: { content: MediaContent }) {
  return (
    <BrandSubPageShell title={content.header.title} eyebrow={content.header.eyebrow} subtitle={content.header.subtitle}>
      <section className="px-4 pb-24 pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className={BRAND_TEXT.sectionTitle}>
              {content.heading.normal}{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
                {content.heading.highlight}
              </span>
            </h2>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300/80" />
            </div>
          </div>

          <div className="space-y-10">
            {content.items.map((item, index) => (
              <MediaCard key={index} item={{ ...item, id: index + 1 }} index={index} />
            ))}
          </div>
        </div>
      </section>
    </BrandSubPageShell>
  );
}
