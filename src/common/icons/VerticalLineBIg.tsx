import Image from "next/image";

interface VerticalLineBigProps {
    variant?: "black" | "pink";
    className?: string;
  }
  
  export default function VerticalLineBig({
    variant = "black",
    className = "",
  }: VerticalLineBigProps) {
    return (
      <img
        src={
          variant === "pink"
            ? "/assets/png/pink_line_big.png"
            : "/assets/png/white_line_big.png"
        }
        alt=""
        className={className}
      />
    );
  }