"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import ProfilePhoto from "./ProfilePhoto";
import WordReveal from "./WordReveal";
import { scrollToAnchor } from "@/lib/scrollToAnchor";
import { EASE_OUT, DUR, LIST_STAGGER } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: LIST_STAGGER, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.entrance, ease: EASE_OUT } },
};

// Negative final inset keeps the CV overlay labels that sit outside the photo edge visible.
const photoItem: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
  show: {
    opacity: 1,
    clipPath: "inset(-20% -20% -20% -20%)",
    transition: { duration: 1, ease: EASE_OUT, delay: 0.15 },
  },
};

export default function PortfolioHero() {
  const reduceMotion = useReducedMotion();

  return (
    <div id="about" className="hero-wrapper portfolio-hero-wrapper">
      <m.header
        className="container portfolio-hero-content"
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "show"}
        variants={container}
      >
        <div className="hero-name-col">
          <WordReveal as="h1" className="hero-title" text="Felix Windriyareksa Hardyan" immediate delay={0.06} />
        </div>

        <m.div variants={photoItem} className="hero-photo-col">
          <ProfilePhoto />
        </m.div>

        <m.div className="hero-foot" variants={item}>
          <p className="hero-description">Building production-grade AI systems, from Data Science to GenAI.</p>
          <a href="#contact" className="btn-pill btn-pill-primary" onClick={(e) => scrollToAnchor(e, "#contact")}>
            <span>Get in Touch</span>
          </a>
        </m.div>
      </m.header>
    </div>
  );
}
