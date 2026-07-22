"use client";

import {
  useMemo,
  useRef,
  type ElementType,
} from "react";
import clsx from "clsx";

import AnimatedWord from "./AnimatedWord";
import { splitText } from "./SplitText";
import useTextReveal from "./useTextReveal";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: ElementType;
}

export default function AnimatedText({
  text,
  className,
  as: Component = "div",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  const words = useMemo(
    () => splitText(text),
    [text]
  );

  useTextReveal({
    trigger: containerRef,
  });

  return (
    <Component
      ref={containerRef}
      className={clsx(
        "relative flex flex-wrap justify-center",
        className
      )}
    >
      {words.map((item) => (
        <AnimatedWord
          key={item.id}
          word={item.word}
        />
      ))}
    </Component>
  );
}