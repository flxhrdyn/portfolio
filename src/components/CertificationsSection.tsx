"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import Modal from "./Modal";
import ResearchPaperBody from "./ResearchPaperBody";
import Reveal from "./Reveal";
import certifications from "@/content/certifications.json";
import writing from "@/content/writing.json";

function CertLogo({ logo, code, color, issuer }: { logo: string; code: string; color: string; issuer: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        style={{
          background: `${color}1a`,
          color,
          fontWeight: 800,
          fontSize: "0.7rem",
          fontFamily: "var(--font-mono)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: 10,
          border: "1px solid var(--border-color)",
          flexShrink: 0,
        }}
      >
        {code}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo}
      alt={`${issuer} logo`}
      width={40}
      height={40}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ width: 40, height: 40, borderRadius: 10, border: "1px solid var(--border-color)", objectFit: "contain", flexShrink: 0, background: "#fff" }}
    />
  );
}

export default function CertificationsSection() {
  const [index, setIndex] = useState(0);
  const [researchOpen, setResearchOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const hoveringRef = useRef(false);
  const paper = writing[0];

  const total = certifications.length;
  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      if (!hoveringRef.current) setIndex((i) => (i + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total, paused]);

  const active = certifications[index];

  if (!paper) return null;

  return (
    <section className="section" id="certifications">
      <div className="container">
        <Reveal>
          <h2>Accomplishments &amp; Research</h2>
          <p style={{ marginBottom: "2rem" }}>
            Published research, certifications, and key milestones.
          </p>
        </Reveal>

        <div className="grid-two-column">
          <Reveal style={{ height: "100%" }}>
            <button
              type="button"
              className="cert-publication-card"
              onClick={() => setResearchOpen(true)}
              style={{ cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}
            >
              <div>
                <div className="meta-mono">{paper.kind}</div>
                <h3 style={{ marginBottom: "0.75rem", fontSize: "1.25rem", color: "var(--text-primary)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", lineHeight: 1.3 }}>
                  <span>{paper.title}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0, color: "var(--accent-text)" }}>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </h3>
                <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "1rem" }}>{paper.summary}</p>
              </div>
              <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "1rem", gap: "1rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", alignItems: "center" }}>
                  <span className="badge badge-accent">{paper.tags[0]}</span>
                  {paper.tags.slice(1).map((t) => (
                    <span key={t} className="badge">
                      {t}
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--accent-text)", fontWeight: 700, letterSpacing: "0.05em" }}>
                  READ ABSTRACT
                </span>
              </div>
            </button>
          </Reveal>

          <Reveal delay={0.08} style={{ height: "100%" }}>
          <div
            className="cert-publication-card carousel-card-wrapper"
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", position: "relative", overflow: "hidden" }}
            onMouseEnter={() => (hoveringRef.current = true)}
            onMouseLeave={() => (hoveringRef.current = false)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active.code}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <CertLogo logo={active.logo} code={active.code} color={active.color} issuer={active.issuer} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ margin: 0, fontSize: "1.1rem", color: "var(--text-primary)", fontWeight: 700, lineHeight: 1.3 }}>{active.title}</h4>
                    <p style={{ margin: "0.3rem 0 0 0", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      {active.issuer} • {active.date}
                    </p>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--border-color)", marginTop: "1rem", paddingTop: "1rem" }}>
                  <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {active.description}
                  </p>
                  {active.url && (
                    <a
                      href={active.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      style={{ marginTop: "0.75rem", fontSize: "0.78rem" }}
                    >
                      Verify Certificate
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                  )}
                </div>
              </m.div>
            </AnimatePresence>

            <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                {certifications.map((cert, i) => (
                  <button
                    key={cert.code}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to ${cert.title}`}
                    aria-current={i === index}
                    className="carousel-dot-btn"
                    style={{
                      color: i === index ? "var(--accent-color)" : "var(--text-secondary)",
                      opacity: i === index ? 1 : 0.35,
                    }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
                <m.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Resume auto-advance" : "Pause auto-advance"}
                  aria-pressed={paused}
                  className="carousel-nav-btn"
                >
                  {paused ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  )}
                </m.button>
                <m.button whileTap={{ scale: 0.9 }} onClick={prev} aria-label="Previous certification" className="carousel-nav-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </m.button>
                <m.button whileTap={{ scale: 0.9 }} onClick={next} aria-label="Next certification" className="carousel-nav-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </m.button>
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </div>

      <Modal id="research-modal" title="Research Paper Abstract & Details" isOpen={researchOpen} onClose={() => setResearchOpen(false)}>
        <div className="modal-section">
          <div className="meta-mono">{paper.kind}</div>
          <h3 style={{ fontSize: "1.3rem", marginBottom: "0.75rem", color: "var(--text-primary)" }}>{paper.title}</h3>
        </div>
        <ResearchPaperBody paper={paper} />
        <div className="modal-section" style={{ paddingTop: "0.5rem", borderTop: "1px solid var(--border-color)" }}>
          <a href={paper.doi} target="_blank" rel="noopener noreferrer" className="project-link">
            View full research paper
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </Modal>
    </section>
  );
}
