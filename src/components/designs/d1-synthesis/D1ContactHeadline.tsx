"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MaskLine } from "../DirectionShared";

// Bookends the hero exit: where the name recedes on the way out, the closing line
// advances into place as the final scene fills the viewport.
export function D1ContactHeadline() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <m.h2 ref={ref} id="contact-editorial-heading" style={reduceMotion ? undefined : { scale }}>
      <MaskLine>Let’s talk about</MaskLine>
      <MaskLine delay={0.12}>AI engineering.</MaskLine>
    </m.h2>
  );
}
