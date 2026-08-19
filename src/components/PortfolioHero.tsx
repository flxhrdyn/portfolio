"use client";

import ProfilePhoto from "./ProfilePhoto";
import Reveal from "./Reveal";
import { scrollToAnchor } from "@/lib/scrollToAnchor";

export default function PortfolioHero() {
  return (
    <div id="about" className="hero-wrapper">
      <header className="container hero-content">
        <div className="hero-text-col">
          <Reveal className="hero-title-group">
            <div className="hero-eyebrow">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </svg>
              <span>AI ENGINEER &amp; DATA SCIENTIST</span>
            </div>
            <h1 className="hero-title">Felix Windriyareksa Hardyan</h1>
            <p className="hero-description">
              Building production AI systems across GenAI, NLP, and Computer Vision. From RAG pipelines and AI agents to deep learning models, shipped end-to-end.
            </p>
          </Reveal>

          <Reveal className="hero-actions" delay={0.15}>
            <a href="#projects" className="btn-pill btn-pill-primary" onClick={(e) => scrollToAnchor(e, "#projects")}>
              <span>Explore Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#contact" className="btn-pill btn-pill-secondary" onClick={(e) => scrollToAnchor(e, "#contact")}>
              <span>Get in Touch</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ProfilePhoto />
        </Reveal>
      </header>
    </div>
  );
}
