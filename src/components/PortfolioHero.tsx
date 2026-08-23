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

const photoItem: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.entrance, ease: EASE_OUT } },
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
        <div className="hero-text-col">
          <div className="hero-title-group">
            <m.div className="hero-eyebrow" variants={item}>
              <span className="telemetry-status-dot" aria-hidden="true" style={{ width: "6px", height: "6px" }} />
              <span>ACTIVE // AI ENGINEER &amp; DATA SCIENTIST</span>
            </m.div>

            <WordReveal as="h1" className="hero-title" text="Felix Windriyareksa Hardyan" immediate delay={0.06} />

            <m.p className="hero-description" variants={item}>
              Building production-grade AI systems, from Data Science to GenAI.
            </m.p>
          </div>

          <m.div className="hero-actions" variants={item}>
            <a href="#projects" className="btn-pill btn-pill-primary" onClick={(e) => scrollToAnchor(e, "#projects")}>
              <span>Explore Projects &darr;</span>
            </a>
            <a href="#contact" className="btn-pill btn-pill-secondary" onClick={(e) => scrollToAnchor(e, "#contact")}>
              <span>Get in Touch</span>
            </a>
          </m.div>
        </div>

        <m.div variants={photoItem} className="hero-photo-col">
          <ProfilePhoto />
        </m.div>
      </m.header>
    </div>
  );
}
