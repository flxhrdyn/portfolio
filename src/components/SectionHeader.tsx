"use client";

import { m, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

export default function SectionHeader({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <header className="section-header">
      <m.span
        className="section-header-rule"
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.1, ease: EASE_OUT }}
      />
      <Reveal>
        <p className="section-header-meta">
          <span>{index}</span>
          <span>{label}</span>
        </p>
      </Reveal>
      <div>
        <WordReveal text={title} className="section-header-title" />
        <Reveal delay={0.12}>
          <p className="section-header-desc">{description}</p>
        </Reveal>
      </div>
    </header>
  );
}
