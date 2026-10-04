"use client";

import { m, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { scrollTransition } from "@/lib/scroll-motion";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

/**
 * One-shot entrance for large blocks (a featured project, a panel, a log).
 *
 * Plays once to completion when the block enters view. An earlier version tied
 * opacity and offset to scroll position, which left blocks half-faded and
 * subpixel-shifted (blurry text) whenever the reader stopped mid-range.
 */
export default function BlockReveal({
  children,
  className,
  style,
  from = "up",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Entry direction: rise from below, slide in from either side, or settle from a slight zoom-out. */
  from?: "up" | "left" | "right" | "scale";
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const hidden = {
    opacity: 0,
    y: from === "up" ? 28 : 0,
    x: from === "left" ? -36 : from === "right" ? 36 : 0,
    scale: from === "scale" ? 0.96 : 1,
  };

  return (
    <m.div
      className={className}
      style={style}
      initial={hidden}
      whileInView="show"
      variants={{ show: () => ({ opacity: 1, x: 0, y: 0, scale: 1, transition: scrollTransition({ duration: 0.8, ease: EASE_OUT }) }) }}
      viewport={VIEWPORT}
    >
      {children}
    </m.div>
  );
}
