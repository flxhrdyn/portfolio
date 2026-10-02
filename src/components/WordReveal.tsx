"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import type { ElementType } from "react";
import { EASE_OUT, DUR, WORD_STAGGER, VIEWPORT } from "@/lib/motion";

/**
 * Headings use a short, low-distance reveal that keeps the text readable throughout.
 */

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

export default function WordReveal({
  text,
  as: Tag = "h2",
  className,
  /** Seconds of delay before the first word lands. */
  delay = 0,
  /** Animate on mount rather than when scrolled into view. */
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: WORD_STAGGER, delayChildren: delay } },
  };

  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: VIEWPORT };

  return (
    <Tag className={className}>
      {/* The split words are decorative markup; assistive tech reads the intact string. */}
      <span className="sr-only">{text}</span>
      <m.span
        aria-hidden="true"
        initial="hidden"
        variants={containerVariants}
        {...trigger}
        style={{ display: "inline" }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            // Generous padding keeps glyph ascenders and descenders (g, j, p, q, y) inside the mask.
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              padding: "0.08em 0.1em 0.28em",
              margin: "-0.08em -0.1em -0.28em",
            }}
          >
            <m.span
              variants={wordVariants}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </m.span>
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
