import BrandServiceSection from "@/src/app/our-services/_componets/BrandServiceSection";
import BrandArchiveShell from "@/src/common/components/ui/brand/BrandArchiveShell";
export const metadata = {
  title: "Software Testing, Quality Assurance Services | Visualytes",
  description:
    "Visualytes provides managed software testing and Quality Assurance services to ensure consistent software quality and reliable customer experiences.",
  keywords: [
    "software testing services",
    "quality assurance services",
    "QA testing company",
    "software testing company",
    "managed testing services",
    "software quality assurance",
    "Visualytes QA services",
  ],
  openGraph: {
    title: "Software Testing, Quality Assurance Services | Visualytes",
    description:
      "Visualytes provides managed software testing and Quality Assurance services to ensure consistent software quality and reliable customer experiences.",
    url: "https://www.visualytes.com/services/software-testing",
    siteName: "Visualytes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Testing, Quality Assurance Services | Visualytes",
    description:
      "Visualytes provides managed software testing and Quality Assurance services to ensure consistent software quality and reliable customer experiences.",
  },
};
export default function Page() {
  return (
    <BrandArchiveShell
      title="Quality"
      titleAccent="Assurance"
      eyebrow=""
      subtitle="To beat your competition, make good quality your mission."
      breadcrumbs={[
        { label: "Services", href: "/our-services" },
        { label: "Quality Assurance" },
      ]}
    >
      <BrandServiceSection
        title="To beat your competition, make good quality your mission"
        intro=""
        description={[
          "A glitch in the mobile app or a website can be embarrassing. Fortunately, our experienced team with a strong quality assurance ability can detect the flaws at the early stage.",
          "Proper quality assurance (QA) will help your company avoid costly oversights, broken website features, and just plain embarrassing errors. Each business will have its own QA process, but there are key steps that every QA process should have. We put together 6 easy steps to help you better understand the QA process and keep your website in check.",
        ]}
        image="/assets/jpg/quality-assurance-service.jpg"
        topDescription={[
          "1. Content",
          "Make sure your content speaks to your audience. You want to use the right words and tone to convey the most effective messaging possible. Consider these questions to help refine your content:",
          "2. Design",
          "Not only do you want your website design to look good and match your brand, but you also want the user experience to be top-notch. Make sure that your content and images flow well together and that it’s easy for your audience to ask questions, find services, and simply browse your website as a whole.",
          "3. Functionality",
          "While most of your functionality depends on your design choices, it’s important to separate this section and treat it as its own. If your website doesn’t function properly, your bounce percentage will rise dramatically, and you’ll lose prospects’ interest.",
          "4. Security",
          "Security is crucial to protecting your information. The Internet leaves many sites vulnerable to hackers who may want to shut down your site and/or take the valuable information coded into it. Make sure that your team can thoroughly assess the security of your website when doing your quality assurance check.",
          "5. SEO",
          "You need traffic coming to your website—make sure you’re accurately researching and creating the right SEO strategy for your business.",
          "6. Forms",
          "Without proper forms on your website, users cannot submit information or questions, which can be frustrating at best. And at the worst, you won’t receive any submissions or leads, driving business down substantially.",
        ]}
        bullets={[]}
        bottomDescription=""
      />
    </BrandArchiveShell>
  );
}
