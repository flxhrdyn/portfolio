"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Modal from "./Modal";
import ResearchPaperBody from "./ResearchPaperBody";
import certifications from "@/content/certifications.json";
import writing from "@/content/writing.json";

function CertLogo({ logo, code, color }: { logo: string; code: string; color: string }) {
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
      alt=""
      width={40}
      height={40}
      onError={() => setFailed(true)}
      style={{ width: 40, height: 40, borderRadius: 10, border: "1px solid var(--border-color)", objectFit: "contain", flexShrink: 0, background: "#fff" }}
    />
  );
}

export default function CertificationsSection() {
  const [index, setIndex] = useState(0);
  const [researchOpen, setResearchOpen] = useState(false);
  const hoveringRef = useRef(false);
  const paper = writing[0];

  const total = certifications.length;
  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hoveringRef.current) setIndex((i) => (i + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total]);

  const active = certifications[index];

  if (!paper) return null;

  return (
    <section className="section" id="certifications">
      <div className="container">
        <h2>Accomplishments &amp; Research</h2>
        <p style={{ marginBottom: "2rem" }}>
          Published research, certifications, and key milestones.
        </p>

        <div className="grid-two-column">
          <div
            className="cert-publication-card"
            role="button"
            tabIndex={0}
            onClick={() => setResearchOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setResearchOpen(true);
              }
            }}
            style={{ cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
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
          </div>

          <div
            className="cert-publication-card carousel-card-wrapper"
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "280px", position: "relative", overflow: "hidden" }}
            onMouseEnter={() => (hoveringRef.current = true)}
            onMouseLeave={() => (hoveringRef.current = false)}
          >
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <CertLogo logo={active.logo} code={active.code} color={active.color} />
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
            </div>

            <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                {certifications.map((cert, i) => (
                  <span
                    key={cert.code}
                    onClick={() => setIndex(i)}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      backgroundColor: i === index ? "var(--accent-color)" : "var(--text-secondary)",
                      cursor: "pointer",
                      opacity: i === index ? 1 : 0.35,
                    }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                <button onClick={prev} aria-label="Previous certification" className="carousel-nav-btn" style={{ background: "none", border: "1px solid var(--border-color)", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button onClick={next} aria-label="Next certification" className="carousel-nav-btn" style={{ background: "none", border: "1px solid var(--border-color)", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
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
