import Link from "next/link";

interface BreadcrumbHeroProps {
  title: string;
}

export default function BreadcrumbHero({
  title,
}: BreadcrumbHeroProps) {
  return (
    <section className="relative h-[214px] overflow-visible bg-[#f7f7f7]">
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px,#000 1px,transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <h1 className="mb-4 font-poppins text-[60px] font-medium leading-none text-[#333]">
          {title}
        </h1>

        <ol className="flex items-center text-[12px] font-semibold uppercase">
          <li>
            <Link
              href="/"
              className="text-[rgb(255,73,124)] transition-colors"
            >
              Home
            </Link>
          </li>

          <li className="mx-6 text-[#333]">•</li>

          <li className="text-[#333]">{title}</li>
        </ol>
      </div>

      {/* Thin Curved Divider */}
     

      {/* Bottom Shape */}
      <svg
        className="absolute bottom-0 left-0 h-[65px] w-full"
        viewBox="0 0 1920 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,30 C480,100 1440,100 1920,30 L1920,120 L0,120 Z"
          fill="#fff"
        />
      </svg>
    </section>
  );
}