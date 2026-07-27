import BrandServiceSection from "@/src/app/our-services/_componets/BrandServiceSection";
import BrandArchiveShell from "@/src/common/components/ui/brand/BrandArchiveShell";
export const metadata = {
  title: "Application Maintenance & Support Services | Visualytes",
  description:
    "Visualytes provides expert application maintenance and support services to help businesses continuously develop, improve, and expand their digital solutions.",
  keywords: [
    "application maintenance services",
    "application support services",
    "software maintenance company",
    "application management services",
    "IT support services",
    "software support solutions",
    "Visualytes services",
  ],
  openGraph: {
    title: "Application Maintenance & Support Services | Visualytes",
    description:
      "Visualytes provides expert application maintenance and support services to help businesses continuously develop, improve, and expand their digital solutions.",
    siteName: "Visualytes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Application Maintenance & Support Services | Visualytes",
    description:
      "Visualytes provides expert application maintenance and support services to help businesses continuously develop, improve, and expand their digital solutions.",
  },
};
export default function Page() {
  return (
    <BrandArchiveShell
      title="Maintenance &"
      titleAccent="Support"
      eyebrow="Services"
      subtitle="Maintain your product with our experts — keeping your digital presence secure, fast, and always online."
      breadcrumbs={[
        { label: "Services", href: "/our-services" },
        { label: "Maintenance & Support" },
      ]}
    >
      <BrandServiceSection
        title="Maintain your product with our experts"
        intro=""
        description={[
          "Development to us is only a part of our scope; our main task is to support your app or website from the outside and take it to the level that you desire for.",
          "We are a website maintenance services company, helping businesses across the globe improve the performance and security of their websites. Whether you’re looking for a monthly, hourly, or after-hours website maintenance plan, Visualytes provides the experience and expertise your company demands.",
        ]}
        image="/assets/png/Maintainance-&-Support.png"
        topDescription={[
          "With every online search, 50 percent of users discover a new company, product, or service. They visit your website, explore your products, browse your services, and get a first impression of your business. That first impression can make or break your company’s next sale.",
          "For businesses today, this fact makes website maintenance a top priority.",
        ]}
        bullets={[]}
        bottomDescription=""
      />
    </BrandArchiveShell>
  );
}

