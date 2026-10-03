"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "span" | "p" | "div" | "h3" | "h4";
}

export default function ScrambleText({
  text,
  className,
  delay = 0,
  duration = 700,
  as: Component = "span",
}: ScrambleTextProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [displayText, setDisplayText] = useState(text);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || reduceMotion) return;
    hasAnimated.current = true;

    let timeoutId: NodeJS.Timeout;
    let frameId: number;

    timeoutId = setTimeout(() => {
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const resolvedChars = Math.floor(progress * text.length);

        let result = "";
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          if (char === " " || char === "/" || char === "·" || char === "-" || char === ".") {
            result += char;
          } else if (i < resolvedChars) {
            result += char;
          } else {
            result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplayText(result);

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setDisplayText(text);
        }
      };

      frameId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [inView, text, delay, duration, reduceMotion]);

  return (
    <Component ref={ref as any} className={className}>
      {displayText}
    </Component>
  );
}
