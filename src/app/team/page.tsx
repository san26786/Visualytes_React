import Directors from "./_componets/Directors";
import Founder from "./_componets/Founder";
import TeamGrid from "./_componets/TeamGrid";
import PageBanner from "@/src/common/components/layouts/PageBanner";


export default function TeamPage() {
  return (
    <>
             <PageBanner title="Teams" />
       
      <Founder />
      <Directors />
      <TeamGrid />
    </>
  );
}