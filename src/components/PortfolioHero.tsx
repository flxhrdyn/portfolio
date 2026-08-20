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
              Building production-grade AI systems, from Data Science to GenAI.
            </p>
          </Reveal>

          <Reveal className="hero-actions" delay={0.15}>
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
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ProfilePhoto />
        </Reveal>
      </header>
    </div>
  );
}
