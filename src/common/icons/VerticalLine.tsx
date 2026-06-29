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
      <img
        src={
          variant === "pink"
            ? "/assets/png/vertical_line_pink.png"
            : "/assets/png/vertical_line3.png"
        }
        alt=""
        className={className}
      />
    );
  }