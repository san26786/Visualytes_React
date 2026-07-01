import Image from "next/image";

interface VerticalLineProps {
  variant?: "black" | "pink";
  className?: string;
}

export default function VerticalLine({
  variant = "black",
  className = "",
}: VerticalLineProps) {
  return (
    <Image
      src={
        variant === "pink"
          ? "/assets/png/vertical_line_pink.png"
          : "/assets/png/vertical_line3.png"
      }
      alt=""
      width={20} // Replace with the actual image width
      height={200} // Replace with the actual image height
      className={className}
    />
  );
}