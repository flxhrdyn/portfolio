"use client";

import dynamic from "next/dynamic";
import { m, useReducedMotion, type Variants } from "motion/react";
import ChatWidget from "./ChatWidget";

const ParticlesCanvas = dynamic(() => import("./ParticlesCanvas"));

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function ChatHero() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="hero-wrapper" style={{ minHeight: "calc(100vh - 4.5rem)", display: "flex", alignItems: "center" }}>
      <ParticlesCanvas />

      <div className="ambient-auras">
        <div className="aura aura-1" />
        <div className="aura aura-2" />
      </div>

      <m.header
        className="container hero-content"
        style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "show"}
        variants={container}
      >
        <div className="hero-title-group" style={{ marginBottom: "0.75rem" }}>
          <m.div className="hero-subtitle" style={{ marginBottom: "0.25rem" }} variants={item}>
            PERSONAL PORTFOLIO
          </m.div>
          <m.h1 className="hero-title" style={{ fontSize: "2.5rem", marginBottom: "0.15rem" }} variants={item}>
            Felix Windriyareksa Hardyan
          </m.h1>
          <m.p
            style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.15rem", marginBottom: "0.4rem" }}
            variants={item}
          >
            AI Engineer &amp; Data Scientist
          </m.p>
          <m.p className="hero-description" style={{ marginBottom: "1rem", fontSize: "1rem" }} variants={item}>
            Building production-grade AI systems, from Data Science to GenAI.
          </m.p>
        </div>

        <m.div variants={item}>
          <ChatWidget />
        </m.div>

        <m.div style={{ marginTop: "1.5rem" }} variants={item}>
          <a href="/portfolio/" className="portfolio-text-link" style={{ textDecoration: "none" }}>
            <span>Prefer to browse? Enter the full portfolio &rarr;</span>
          </a>
        </m.div>
      </m.header>
    </div>
  );
}
