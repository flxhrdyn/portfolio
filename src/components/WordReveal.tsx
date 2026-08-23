"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import type { ElementType } from "react";
import { EASE_OUT, DUR, WORD_STAGGER, VIEWPORT } from "@/lib/motion";

/**
 * The headline resolve — this site's one authored motion moment.
 *
 * Every display headline arrives the way this portfolio's own subject matter arrives:
 * an inference resolving. Words land left to right, each starting unresolved (blurred,
 * dimmed, low) and snapping to full confidence, mirroring the confidence-scored
 * detection box in the hero.
 */

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.3em", filter: "blur(7px)" },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: DUR.entrance, ease: EASE_OUT },
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
          <m.span
            key={`${word}-${i}`}
            variants={wordVariants}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </m.span>
        ))}
      </m.span>
    </Tag>
  );
}
