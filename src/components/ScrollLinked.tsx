"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll-linked entrance for large blocks.
 *
 * The element stays tied to its own position in the viewport rather than firing
 * once: it keeps resolving while the reader scrolls, and reverses on the way
 * back. Reserved for whole blocks (a stage, a log, a panel) — individual cards
 * are deliberately left still, the way the reference does it.
 *
 * The range ends while the element is still well inside the viewport, so a block
 * near the bottom of the document still reaches a resolved state at max scroll.
 */
export default function ScrollLinked({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.98", "start 0.72"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [28, 0]);

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ ...style, opacity, y, willChange: "transform, opacity" }}
    >
      {children}
    </m.div>
  );
}
