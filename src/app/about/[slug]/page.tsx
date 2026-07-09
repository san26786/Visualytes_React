import { notFound } from "next/navigation";
import ServicePageBanner from "@/src/common/components/layouts/ServicePageBanner";
import AboutSection from "../_componets/AboutSection";
import { aboutPages } from "../_componets/data";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const page = aboutPages[slug];

  if (!page) {
    notFound();
  }

  return (
    <>
      <ServicePageBanner
        title={page.bannerTitle}
        breadcrumbs={[
          {
            label: "About",
            href: "/about",
          },
          {
            label: page.bannerTitle,
          },
        ]}
      />

      <AboutSection
        title={page.title}
        intro={page.intro}
        description={page.description}
        image={page.image}
        topDescription={page.topDescription}
        bullets={page.bullets}
        bottomTitle={page.bottomTitle}
        bottomDescription={page.bottomDescription}
      />
    </>
  );
}