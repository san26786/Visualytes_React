import PageBanner from "@/src/common/components/layouts/PageBanner";
import MediaCard from "./_componets/MediaCard";
import { mediaNews } from "./_componets/mediaData";


export default function MediaPage() {
  return (
    <main className="bg-white">
<PageBanner title="Media And PR"/>

      <section className="pt-14">
        <div className="max-w-[1320px] mx-auto px-6">

          <h1 className="text-center text-[42px] font-medium text-[#222] mb-20">
            Visualytes In News
          </h1>

          {mediaNews.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}

        </div>

      </section>

    </main>
  );
}