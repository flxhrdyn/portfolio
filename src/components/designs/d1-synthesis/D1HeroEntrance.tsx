"use client";

import Image from "next/image";
import { m, useReducedMotion, type Variants } from "motion/react";
import { usePortfolioScroll } from "@/components/MotionProvider";
import { scrollToAnchor } from "@/lib/scrollToAnchor";
import { MaskLine } from "../DirectionShared";

// Same rise curve and distance as the section reveals (directions.css `data-r="rise"`).
const RISE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// The name leads; supporting pieces follow once its mask is mostly open, in reading order.
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 1, ease: RISE_EASE, opacity: { delay, duration: 0.8, ease: RISE_EASE } },
  }),
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
    >
      <div className="d1-synthesis-col-left">
        <m.p className="direction-overline" variants={item} custom={0}>{role}</m.p>
        <h1 className="d1-synthesis-title"><MaskLine delay={0.08}>{name}</MaskLine></h1>
      </div>
      <div className="d1-synthesis-col-right">
        <m.div className="direction-image d1-synthesis-portrait" variants={item} custom={0.55}>
          <Image
            src={photo}
            alt={photoAlt}
            fill
            sizes="(max-width: 909px) 200px, (max-width: 1272px) 22vw, 280px"
            unoptimized
            priority
          />
        </m.div>
        <m.div className="d1-synthesis-about" variants={item} custom={0.65}>
          <p>{tagline}</p>
        </m.div>
      </div>
      <m.a
        className="d1-synthesis-hero-cta"
        href="#contact"
        onClick={(event) => scrollToAnchor(event, "#contact", controller)}
        variants={item}
        custom={0.75}
      >
        <span>Get in touch</span>
      </m.a>
    </m.section>
  );
}
