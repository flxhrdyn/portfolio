"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { EASE_OUT, DUR, VIEWPORT } from "@/lib/motion";

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Reveal({
  children,
  delay = 0,
  className,
  style,
  /**
   * Override the shared trigger inset. Elements that can never sit 80px inside the
   * viewport — anything pinned to the end of the document — need a 0 inset, or they
   * stay hidden forever.
   */
  viewportMargin = VIEWPORT.margin,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  viewportMargin?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: VIEWPORT.once, margin: viewportMargin }}
      variants={revealVariants}
      transition={{ duration: DUR.entrance, delay, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  );
}
