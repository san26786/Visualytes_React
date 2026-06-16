import Link from "next/link";

interface CTAButtonProps {
  title: string;
  href: string;
  className?: string;
}

export default function CTAButton({
  title,
  href,
  className = "",
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={`
        inline-flex
        h-[82px]
        w-[232px]
        items-center
        justify-center
        rounded-full
        border-[4px]
        border-[#ff4f86]
        bg-white
        px-8
        text-center
        text-[14px]
        font-bold
        uppercase
        tracking-[3px]
        text-[#ff4f86]
        transition-all
        duration-300
        hover:bg-[#ff4f86]
        hover:text-white
        ${className}
      `}
    >
      {title}
    </Link>
  );
}