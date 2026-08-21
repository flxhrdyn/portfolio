"use client";

import Link from "next/link";
import { m, useReducedMotion, type Variants } from "motion/react";
import ChatWidget from "./ChatWidget";
import SynapticMeshCanvas from "./SynapticMeshCanvas";

// Scale AI signature cubic-bezier easing curve: high initial momentum, butter-smooth long deceleration
const SCALE_AI_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: SCALE_AI_EASE,
    },
  },
};

const consoleReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: SCALE_AI_EASE,
      delay: 0.18,
    },
  },
};

export default function ChatHero() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="hero-wrapper chat-hero-wrapper" style={{ minHeight: "calc(100vh - 4.5rem)", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      {/* BACKGROUND INTERACTIVE SYNAPTIC ATTENTION MESH */}
      <SynapticMeshCanvas />

      <m.header
        className="container chat-hero-content"
        style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem", position: "relative", zIndex: 1 }}
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "show"}
        variants={container}
      >
        <div className="hero-text-col">
          <div className="hero-title-group">
            <m.div className="hero-eyebrow" variants={textReveal}>
              <span className="telemetry-status-dot" aria-hidden="true" style={{ width: "6px", height: "6px" }} />
              <span>ACTIVE // AI ENGINEER &amp; DATA SCIENTIST</span>
            </m.div>
            <m.h1 className="hero-title" variants={textReveal}>
              Felix Windriyareksa Hardyan
            </m.h1>
            <m.p className="hero-description" variants={textReveal}>
              Building production-grade AI systems, from Data Science to GenAI.
            </m.p>
          </div>

          <m.div variants={textReveal} className="hero-actions" style={{ marginTop: "1.5rem" }}>
            <Link href="/portfolio" className="btn-pill btn-pill-primary group">
              <span>View Full Portfolio</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
                className="btn-arrow-icon"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <a href="https://github.com/flxhrdyn" target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill-secondary">
              <span>GitHub</span>
            </a>
          </m.div>
        </div>

        <m.div variants={consoleReveal} className="chat-widget-col">
          <ChatWidget />
        </m.div>
      </m.header>
    </div>
  );
}
