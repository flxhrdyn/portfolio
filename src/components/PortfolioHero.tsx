"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import ProfilePhoto from "./ProfilePhoto";
import { scrollToAnchor } from "@/lib/scrollToAnchor";
import { EASE_OUT, DUR, LIST_STAGGER } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: LIST_STAGGER * 1.6, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.entrance, ease: EASE_OUT } },
};

const line: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT } },
};

// Photo opens from a thin slit, like a detection window locking on.
const photo: Variants = {
  hidden: { width: 0, opacity: 0 },
  show: { width: "auto", opacity: 1, transition: { duration: 0.9, ease: EASE_OUT, delay: 0.5 } },
};

export default function PortfolioHero() {
  const reduceMotion = useReducedMotion();

  return (
    <div id="about" className="hero-wrapper portfolio-hero-wrapper">
      <m.header
        className="container hero-stage"
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "show"}
        variants={container}
      >
        <m.p className="hero-name" variants={item}>
          Felix Windriyareksa Hardyan
        </m.p>

        <h1 className="hero-headline">
          <span className="hero-line">
            <m.span className="hero-line-inner" variants={line}>
              AI
              <m.span className="hero-inline-photo" variants={photo}>
                <ProfilePhoto />
              </m.span>
              Engineer
            </m.span>
          </span>
          <span className="hero-line">
            <m.span className="hero-line-inner" variants={line}>
              &amp; Data Scientist
            </m.span>
          </span>
        </h1>

        <m.p className="hero-description" variants={item}>
          Building production-grade AI systems, from Data Science to GenAI.
        </m.p>

        <m.div className="hero-actions" variants={item}>
          <a href="#contact" className="btn-pill btn-pill-primary" onClick={(e) => scrollToAnchor(e, "#contact")}>
            <span>Get in Touch</span>
          </a>
          <a href="#projects" className="btn-pill btn-pill-secondary hero-work-link" onClick={(e) => scrollToAnchor(e, "#projects")}>
            <span>See the work</span>
            <span className="hero-work-arrow" aria-hidden="true">&darr;</span>
          </a>
        </m.div>
      </m.header>
    </div>
  );
}
