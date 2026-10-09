"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { usePortfolioScroll } from "@/components/MotionProvider";
import { scrollToAnchor } from "@/lib/scrollToAnchor";
import { MaskLine } from "../DirectionShared";

// Same rise curve and distance as the section reveals (directions.css `data-r="rise"`).
const RISE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DRAW_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

// Two hairlines draw the frame first, the name sets word by word onto it, supporting pieces follow in reading order.
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 1, ease: RISE_EASE, opacity: { delay, duration: 0.8, ease: RISE_EASE } },
  }),
};

const focus: Variants = {
  hidden: { opacity: 0, scale: 1.04, filter: "blur(12px)" },
  show: (delay: number) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay, duration: 1.2, ease: RISE_EASE },
  }),
};

const drawX: Variants = {
  hidden: { scaleX: 0 },
  show: (delay: number) => ({ scaleX: 1, transition: { delay, duration: 1, ease: DRAW_EASE } }),
};

const NAME_START = 0.3;
const NAME_STEP = 0.1;

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
  const ref = useRef<HTMLElement>(null);
  const words = name.split(" ");
  const supportStart = NAME_START + words.length * NAME_STEP + 0.25;

  // Exit: the name recedes while the portrait trails behind, handing the page to Projects.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <m.section
      ref={ref}
      className="direction-hero d1-synthesis-hero"
      id="hero"
      data-motion-sequence="d1-hero"
      initial={reduceMotion ? false : "hidden"}
      animate="show"
    >
      <m.span className="d1-hero-rule" aria-hidden="true" variants={drawX} custom={0} />
      <m.div
        className="d1-synthesis-col-left"
        style={reduceMotion ? undefined : { opacity: titleOpacity, scale: titleScale, transformOrigin: "left bottom" }}
      >
        <m.p className="direction-overline" variants={item} custom={0.15}>{role}</m.p>
        <h1 className="d1-synthesis-title">
          {words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <MaskLine className="d1-hero-word" delay={NAME_START + index * NAME_STEP}>{word}</MaskLine>
              {index < words.length - 1 ? " " : null}
            </span>
          ))}
        </h1>
      </m.div>
      <m.div className="d1-synthesis-col-right" style={reduceMotion ? undefined : { y: portraitY }}>
        <m.div className="direction-image d1-synthesis-portrait" variants={focus} custom={supportStart}>
          <Image
            src={photo}
            alt={photoAlt}
            fill
            sizes="(max-width: 909px) 200px, (max-width: 1272px) 22vw, 280px"
            unoptimized
            priority
          />
        </m.div>
        <m.div className="d1-synthesis-about" variants={item} custom={supportStart + 0.12}>
          <p>{tagline}</p>
        </m.div>
      </m.div>
      <m.span className="d1-hero-rule" aria-hidden="true" variants={drawX} custom={0.14} />
      <m.a
        className="d1-synthesis-hero-cta"
        href="#contact"
        onClick={(event) => scrollToAnchor(event, "#contact", controller)}
        variants={item}
        custom={supportStart + 0.24}
      >
        <span>Get in touch</span>
      </m.a>
    </m.section>
  );
}
