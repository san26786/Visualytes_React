import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function ServicePageBanner({
  title,
  breadcrumbs = [],
}: PageBannerProps) {
  return (
<section className="relative pt-10 sm:pt-0 mt-[80px] sm:mt-[100px] lg:mt-[130px] h-[290px] overflow-hidden">  {/* Background */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/assets/jpg/breadcrumbs.jpg')",
      clipPath: "polygon(0% 0%, 0% 75%, 50% 100%, 100% 75%, 100% 0%)",
    }}
  />

  <div className="relative z-10 flex h-full flex-col items-center justify-center pt-8 sm:pt-10 lg:justify-center lg:pt-0 px-4 text-center max-w-6xl mx-auto  ">
    <h1 className="mb-2 text-[28px] sm:text-[40px] lg:text-[56px] leading-tight font-medium text-[#1f2732]">
      {title}
    </h1>

    <ol className="flex flex-wrap items-center justify-center">
      <li>
        <Link
          href="/"
          className="text-[11px] sm:text-[12px] font-medium uppercase text-[#ff497c] hover:text-[#1f2732]"
        >
          Home
        </Link>
      </li>

      {breadcrumbs.map((item) => (
        <li key={item.label} className="flex items-center">
          <span className="px-3 sm:px-6 lg:px-8 text-[9px] text-[#1f2732]">
            ●
          </span>

          {item.href ? (
            <Link
              href={item.href}
              className="text-[11px] sm:text-[12px] font-medium uppercase text-[#ff497c] hover:text-[#1f2732]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[11px] sm:text-[12px] font-medium uppercase text-[#1f2732]">
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  </div>
</section>
  );
}