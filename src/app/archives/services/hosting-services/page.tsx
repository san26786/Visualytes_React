import BrandServiceSection from "@/src/app/our-services/_componets/BrandServiceSection";
import BrandArchiveShell from "@/src/common/components/ui/brand/BrandArchiveShell";
export const metadata = {
  title: "Managed Web Hosting Services in Basingstoke | Visualytes",
  description:
    "Get reliable web hosting services in Basingstoke and London for small to medium businesses, including 99.9% uptime and dedicated support.",
  keywords: [
    "managed web hosting services",
    "web hosting Basingstoke",
    "web hosting London",
    "business website hosting",
    "dedicated hosting support",
    "reliable web hosting",
    "Visualytes hosting services",
  ],
  openGraph: {
    title: "Managed Web Hosting Services in Basingstoke | Visualytes",
    description:
      "Get reliable web hosting services in Basingstoke and London for small to medium businesses, including 99.9% uptime and dedicated support.",
    siteName: "Visualytes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Managed Web Hosting Services in Basingstoke | Visualytes",
    description:
      "Get reliable web hosting services in Basingstoke and London for small to medium businesses, including 99.9% uptime and dedicated support.",
  },
};
export default function Page() {
  return (
    <BrandArchiveShell
      title="Website"
      titleAccent="Hosting"
      eyebrow="Services"
      subtitle="First and fantastic web hosting — reliable, secure, and built to handle high traffic."
      breadcrumbs={[
        { label: "Services", href: "/our-services" },
        { label: "Website Hosting Services" },
      ]}
    >
      <BrandServiceSection
        title="First and Fantastic web hosting."
        intro=""
        description={[
          "Why scan and scroll the Internet for the best hosting services when your trusted partner is here. Get reliable hosting services with advanced features to drive high traffic.",
          "There are four main things you have to look into – and then, you won’t fail to choose correctly. These things are server resources, performance, support, and security.",
        ]}
        image="/assets/jpg/Fastest-Web-Hosting-Services-scaled.jpg"
        topDescription={[
          "1. Server Resources",
          "For you, server resources mean the size your website will be able to be (look for disk space), and the number of visitors it will be able to accommodate (that’s called bandwidth). Some hosting providers will try saving money, putting more websites into one server, dramatically reducing resources given to each client. Should you worry about that?",
          "Depends. For small websites, like blogs and portfolios with a handful of visitors, even the cheapest shared hosting plan will be enough. But if you aim to have a big website with loads of users, go for VPS hosting, or at the very least, a highly-scalable shared hosting plan.",
          "2. Performance",
          "This is pretty self-explanatory. Performance means a fast, reliable website, which means happier visitors, higher Google rankings, and more money. But what is good performance?",
          "In terms of reliability, look for an uptime of 99.9% or even better. A good uptime means that your website will rarely ever go down. When it comes to website speed, the most important metric to follow is the server response time. In our tests, we consider a provider to be fast if the speed is 500ms or less.",
          "3. Customer Support",
          "Imagine your bakery website suffering from problems just before Christmas – or a turkey farm website going down just before Thanksgiving. Sucks, right?",
          "This is why, when choosing a hosting provider, see if it offers 24/7 customer support on one channel – live chat, phone, or email. This way, you can reach help at a moment’s notice and keep your business running.",
          "4. Security Features",
          "Better safe than sorry. Making sure your website’s security is up to the standards will give peace to your mind and longevity for your business. Look for a hosting provider, that makes crucial security features easily accessible.",
          "What are those features? SSL certificate is an absolute must, but also consider anti-malware software, anti-DDoS protection, as well as reliable backup, and restore options to get your website back in case of a disaster.",
        ]}
        bullets={[]}
        bottomDescription=""
      />
    </BrandArchiveShell>
  );
}

