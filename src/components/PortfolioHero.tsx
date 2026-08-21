"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import ProfilePhoto from "./ProfilePhoto";
import { scrollToAnchor } from "@/lib/scrollToAnchor";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
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

            <m.h1 className="hero-title" variants={item}>
              Felix Windriyareksa Hardyan
            </m.h1>

            <m.p className="hero-description" variants={item}>
              Building production-grade AI systems, from Data Science to GenAI.
            </m.p>
          </div>

          <m.div className="hero-actions" variants={item}>
            <a href="/resume.pdf" download className="btn-pill btn-pill-primary">
              <span>Download Resume (PDF)</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
            <a href="#contact" className="btn-pill btn-pill-secondary" onClick={(e) => scrollToAnchor(e, "#contact")}>
              <span>Get in Touch</span>
            </a>
          </m.div>

          <m.div variants={item} className="hero-metrics-rail">
            <div className="metric-rail-item">
              <span className="metric-rail-value">2+ Yrs</span>
              <span className="metric-rail-label">AI Industry Exp</span>
            </div>
            <div className="metric-rail-divider" aria-hidden="true" />
            <div className="metric-rail-item">
              <span className="metric-rail-value">10+</span>
              <span className="metric-rail-label">AI Systems Built</span>
            </div>
            <div className="metric-rail-divider" aria-hidden="true" />
            <div className="metric-rail-item">
              <span className="metric-rail-value">BNSP</span>
              <span className="metric-rail-label">Certified Data Scientist</span>
            </div>
          </m.div>
        </div>

        <m.div variants={item} className="hero-photo-col">
          <ProfilePhoto />
        </m.div>
      </m.header>
    </div>
  );
}
