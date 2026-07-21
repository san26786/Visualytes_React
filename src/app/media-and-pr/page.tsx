import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import MediaCard from "./_componets/MediaCard";
import { mediaNews } from "./_componets/mediaData";
import { BRAND_TEXT } from "@/src/common/components/ui/brand/theme";

export default function MediaPage() {
  return (
    <BrandSubPageShell
      title="Media & PR"
      eyebrow="In The News"
      subtitle="Stories and features highlighting Visualytes' community impact and digital innovation."
    >
      <section className="px-4 pb-24 pt-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className={BRAND_TEXT.sectionTitle}>
              Visualytes{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
                In The News
              </span>
            </h2>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-300/80" />
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-fuchsia-300/80" />
            </div>
          </div>

          <div className="space-y-10">
            {mediaNews.map((item, index) => (
              <MediaCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </BrandSubPageShell>
  );
}
