import Link from "next/link";

interface PageBannerProps {
  title: string;
}

export default function PageBanner({ title }: PageBannerProps) {
  return (
    <section className="relative h-[214px] overflow-visible mt-[130px]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/jpg/breadcrumbs.jpg')",
          clipPath:
            "polygon(0% 0%, 0% 75%, 50% 100%, 100% 75%, 100% 0%)",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 "
        style={{
          clipPath:
            "polygon(0% 0%, 0% 75%, 50% 100%, 100% 75%, 100% 0%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <h1 className="mb-3 text-[56px] leading-none text-[#1f2732]">
          {title}
        </h1>

        <ol className="flex items-center">
          <li>
            <Link
              href="/"
              className="text-[12px] font-medium uppercase text-[#ff497c] transition-colors hover:text-[#1f2732]"
            >
              Home
            </Link>
          </li>

          <li className="px-8 text-[9px]  text-[#1f2732] xl:px-[34px]">    
            ●
          </li>

          <li className="text-[12px] font-medium uppercase text-[#1f2732]">
            {title}
          </li>
        </ol>
      </div>
    </section>
  );
}