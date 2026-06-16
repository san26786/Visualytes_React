import Link from "next/link";

interface UnhoverButtonProps {
  title: string;
  href: string;
  className?: string;
}

export default function UnhoverButton({
  title,
  href,
  className = "",
}: UnhoverButtonProps) {
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
        bg-[#ff4f86]
        px-8
        text-center
        text-[14px]
        font-bold
        uppercase
        tracking-[3px]
        text-white
           hover:bg-white
        hover:text-[#ff4f86]
        ${className}
      `}
    >
      {title}
    </Link>
  );
}