import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Website Designing",
    image:
      "https://www.visualytes.com/wp-content/uploads/2020/08/Website-designing-600x600.png",
    href: "/archives/services/web-designing",
    description:
      "Our creative web designers can read between the colours. Let the website design talk to your customers directly, while they easily navigate through your sales funnel.",
  },
  {
    title: "Digital Marketing",
    image:
      "https://www.visualytes.com/wp-content/uploads/2021/10/Digital-header-600x600.jpg",
    href: "/archives/services/digital-marketing",
    description:
      "Performance marketing services are led by a team of professional digital marketers.",
  },
  {
    title: "Mobile App Development",
    image:
      "https://www.visualytes.com/wp-content/uploads/2021/05/mobile-app-development.jpg-min-600x600.png",
    href: "/archives/services/app-development",
    description:
      "Launch a beast of a business in the app store and turn all the spotlight on your mobile app.",
  },
  {
    title: "Corporate Branding",
    image:
      "https://www.visualytes.com/wp-content/uploads/2021/05/corporate-branding-min-600x600.png",
    href: "/archives/services/corporate-branding",
    description:
      "The first impression is indeed the last one and branding can boost conversion.",
  },
  {
    title: "Bespoke Software",
    image:
      "https://www.visualytes.com/wp-content/uploads/2020/08/Bespoke-Software-Development-600x600.png",
    href: "/archives/services/bespoke-software-branding",
    description:
      "Do you have a business model in mind? Let’s get it into the market.",
  },
  {
    title: "Website Hosting Services",
    image:
      "https://www.visualytes.com/wp-content/uploads/2021/05/website-hosting-services-min-600x600.png",
    href: "/archives/services/hosting-services",
    description:
      "Reliable hosting services with advanced features to drive high traffic.",
  },
  {
    title: "Quality Assurance",
    image:
      "https://www.visualytes.com/wp-content/uploads/2021/05/Quality-Assurance-min-600x600.png",
    href: "/archives/services/quality-assurance",
    description:
      "Experienced QA team capable of detecting flaws at an early stage.",
  },
  {
    title: "Maintenance & Support",
    image:
      "https://www.visualytes.com/wp-content/uploads/2021/05/maintenance-and-support-1170x780-min-600x600.png",
    href: "/archives/services/maintenance-and-support",
    description:
      "Support your app or website and take it to the level you desire.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section
        className="relative py-10 text-white"
        style={{
          backgroundImage: "url('/breadcrumbs.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative mx-auto max-w-[1170px] px-4 text-center">
          <h1 className="text-4xl font-medium md:text-5xl lg:text-[54px]">
            Services
          </h1>

          <nav className="mt-4 text-sm">
            <ol className="flex justify-center gap-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>/</li>
              <li>Services</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="py-[150px]">
        <div className="mx-auto max-w-[1170px] px-4">
          <div className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="overflow-hidden bg-[#f4f4f5]"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    fill
                    src={service.image}
                    alt={service.title}
                    className="object-cover"
                  />
                </div>

                <div className="px-10 py-8 text-center">
                  <h5 className="mb-4 text-[24px] font-medium">
                    {service.title}
                  </h5>

                  <p className="mb-6 text-[16px] leading-[30px] text-[#7f7f7f]">
                    {service.description}
                  </p>

                  <Link
                    href={service.href}
                    className="inline-block text-[12px] font-bold uppercase tracking-[0.2em]"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}