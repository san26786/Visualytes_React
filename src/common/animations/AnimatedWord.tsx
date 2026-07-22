"use client";

import clsx from "clsx";

interface AnimatedWordProps {
  word: string;
  className?: string;
}

export default function AnimatedWord({
  word,
  className,
}: AnimatedWordProps) {
  return (
    <span
      data-word
      className={clsx(
        "fantasy-word",
        "inline-block",
        "will-change-[transform,filter,opacity]",
        "transform-gpu",
        "select-none",
        className
      )}
    >
      {word}
      <span className="inline-block w-[0.28em]" />
    </span>
  );
}