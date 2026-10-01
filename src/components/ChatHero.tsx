"use client";

import Link from "next/link";
import { m, useReducedMotion, type Variants } from "motion/react";
import { useSyncExternalStore } from "react";
import ChatWidget from "./ChatWidget";
import { EASE_OUT as SCALE_AI_EASE } from "@/lib/motion";

const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
    },
  },
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: SCALE_AI_EASE,
    },
  },
};

export default function ChatHero() {
  const reduceMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);

  return (
    <div className="hero-wrapper chat-hero-wrapper">
      <m.header
        className="container chat-hero-content"
        initial={hydrated && reduceMotion ? false : "hidden"}
        animate="show"
        variants={container}
      >
        <div className="hero-text-col">
          <div className="hero-title-group">
            <m.div className="hero-eyebrow" variants={textReveal}>
              <span>ACTIVE // AI ENGINEER &amp; DATA SCIENTIST</span>
            </m.div>
            <m.h1 className="hero-title" variants={textReveal}>Felix Windriyareksa Hardyan</m.h1>
            <m.p className="hero-description" variants={textReveal}>
              Building production-grade AI systems, from Data Science to GenAI.
            </m.p>
          </div>

          <m.div variants={textReveal} className="hero-actions">
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

        <m.div variants={textReveal} className="chat-widget-col">
          <ChatWidget />
        </m.div>
      </m.header>
    </div>
  );
}
