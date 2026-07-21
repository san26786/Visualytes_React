import BrandSubPageShell from "@/src/common/components/ui/brand/BrandSubPageShell";
import FAQSection from "./_compoents/FAQSection";

export default function FAQPage() {
  return (
    <BrandSubPageShell
      title="FAQ"
      eyebrow="Got Questions?"
      subtitle="Find answers to the most common questions about our web design, development and SEO services."
    >
      <FAQSection />
    </BrandSubPageShell>
  );
}
