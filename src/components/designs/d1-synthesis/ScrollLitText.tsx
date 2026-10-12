"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

/** Words light up in reading order as the text travels up through the viewport, with no pinning. */
export function ScrollLitText({ text }: { text: string }) {
  const wordsRef = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");
  const { scrollYProgress } = useScroll({ target: wordsRef, offset: ["start 85%", "start 40%"] });

  const paint = (value: number) => {
    const spans = wordsRef.current?.children;
    if (!spans) return;
    const lit = value * spans.length;
    for (let index = 0; index < spans.length; index++) {
      const amount = Math.min(1, Math.max(0, lit - index));
      (spans[index] as HTMLElement).style.opacity = String(DIM + (1 - DIM) * amount);
    }
  };
  useMotionValueEvent(scrollYProgress, "change", paint);
  useEffect(() => paint(scrollYProgress.get()));

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={wordsRef} aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} data-lit-word style={{ opacity: DIM }}>
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </>
  );
}

const DIM = 0.16;
