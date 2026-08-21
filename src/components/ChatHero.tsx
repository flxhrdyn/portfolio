"use client";

import Link from "next/link";
import { m, useReducedMotion, type Variants } from "motion/react";
import ChatWidget from "./ChatWidget";
import SynapticMeshCanvas from "./SynapticMeshCanvas";

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

          <m.div variants={item} className="hero-actions" style={{ marginTop: "1.5rem" }}>
            <Link href="/portfolio" className="btn-pill btn-pill-primary">
              <span>View Full Portfolio</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <a href="https://github.com/flxhrdyn" target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill-secondary">
              <span>GitHub</span>
            </a>
          </m.div>
        </div>

        <m.div variants={item} className="chat-widget-col">
          <ChatWidget />
        </m.div>
      </m.header>
    </div>
  );
}
