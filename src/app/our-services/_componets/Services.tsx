import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Website Designing",
    image:
      "/assets/png/services/Website-designing-600x600.png",
    href: "/archives/services/web-designing",
    description:
      "Our creative web designers can read between the colours. Let the website design talk to your customers directly, while they easily navigate through your sales funnel.",
  },
  {
    title: "Digital Marketing",
    image:
      "/assets/png/services/Digital-header-600x600.jpg",
    href: "/archives/services/digital-marketing",
    description:
      "Performance marketing services are led by a team of professional digital marketers.",
  },
  {
    title: "Mobile App Development",
    image:
      "/assets/png/services/mobile-app-development.jpg-min-600x600.png",
    href: "/archives/services/app-development",
    description:
      "Launch a beast of a business in the app store and turn all the spotlight on your mobile app.",
  },
  {
    title: "Corporate Branding",
    image:
      "/assets/png/services/corporate-branding-min-600x600.png",
    href: "/archives/services/corporate-branding",
    description:
      "The first impression is indeed the last one and branding can boost conversion.",
  },
  {
    title: "Bespoke Software",
    image:
      "/assets/png/services/Bespoke-Software-Development-600x600.png",
    href: "/archives/services/bespoke-software-branding",
    description:
      "Do you have a business model in mind? Let’s get it into the market.",
  },
  {
    title: "Website Hosting Services",
    image:
      "/assets/png/services/website-hosting-services-min-600x600.png",
    href: "/archives/services/hosting-services",
    description:
      "Reliable hosting services with advanced features to drive high traffic.",
  },
  {
    title: "Quality Assurance",
    image:
      "/assets/png/services/Quality-Assurance-min-600x600.png",
    href: "/archives/services/quality-assurance",
    description:
      "Experienced QA team capable of detecting flaws at an early stage.",
  },
  {
    title: "Maintenance & Support",
    image:
      "/assets/png/services/maintenance-and-support-1170x780-min-600x600.png",
    href: "/archives/services/maintenance-and-support",
    description:
      "Support your app or website and take it to the level you desire.",
  },
];

export default function ServicesPage() {
  return (
    <>


      <section className="py-[150px]">
        <div className="mx-auto max-w-[1170px] px-4 ">
          <div className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group overflow-hidden bg-[#f4f4f5]"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    fill
                    src={service.image}
                    alt={service.title}
                    className="object-cover"
                  />

                  {/* White overlay on image */}
                  <div className="absolute inset-0 bg-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />


                  <Link
                    href={service.href}
                    className="absolute inset-0 z-10"
                    aria-label={service.title}
                  />
                </div>

                <div className="px-10 py-8 text-center">
                  <h5 className="mb-4 text-[#337ab7] text-[19px] font-medium hover:text-[#ff497c]">
                    {service.title}
                  </h5>

                  <p className="mb-6 overflow-hidden text-[16px] leading-[30px] font-light text-[#7F7F7F] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                    {service.description}
                  </p>

                  <Link
                    href={service.href}
                    className="inline-block text-[12px] font-bold uppercase tracking-[0.2em] text-[#337ab7]  hover:text-[#ff497c]"
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