"use client";

import Image from "next/image";
import { m, useReducedMotion, type Variants } from "motion/react";
import { usePortfolioScroll } from "@/components/MotionProvider";
import { DUR, EASE_OUT } from "@/lib/motion";
import { scrollToAnchor } from "@/lib/scrollToAnchor";
import { MaskLine } from "../DirectionShared";

const sequence: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.entrance, ease: EASE_OUT } },
};

export function D1HeroEntrance({
  role,
  name,
  photo,
  photoAlt,
  tagline,
}: {
  role: string;
  name: string;
  photo: string;
  photoAlt: string;
  tagline: string;
}) {
  const reduceMotion = useReducedMotion();
  const controller = usePortfolioScroll();

  return (
    <m.section
      className="direction-hero d1-synthesis-hero"
      id="hero"
      data-motion-sequence="d1-hero"
      initial={reduceMotion ? false : "hidden"}
      animate="show"
      variants={sequence}
    >
      <m.div className="d1-synthesis-col-left" variants={group}>
        <m.p className="direction-overline" variants={item}>{role}</m.p>
        <h1 className="d1-synthesis-title"><MaskLine delay={0.12}>{name}</MaskLine></h1>
      </m.div>
      <m.div className="d1-synthesis-col-right" variants={group}>
        <m.div className="direction-image d1-synthesis-portrait" variants={item}>
          <Image
            src={photo}
            alt={photoAlt}
            fill
            sizes="(max-width: 909px) 200px, (max-width: 1272px) 22vw, 280px"
            unoptimized
            priority
          />
        </m.div>
        <m.div className="d1-synthesis-about" variants={item}>
          <p>{tagline}</p>
        </m.div>
      </m.div>
      <m.a
        className="d1-synthesis-hero-cta"
        href="#contact"
        onClick={(event) => scrollToAnchor(event, "#contact", controller)}
        variants={item}
      >
        <span>Get in touch</span>
      </m.a>
    </m.section>
  );
}
