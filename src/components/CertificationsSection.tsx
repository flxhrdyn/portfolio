"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Modal from "./Modal";
import ResearchPaperBody from "./ResearchPaperBody";
import certifications from "@/content/certifications.json";
import writing from "@/content/writing.json";

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
          Peer-reviewed scientific contributions, professional certifications, and technical milestones.
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
                READ CASE STUDY
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span className="meta-mono" style={{ margin: 0 }}>
                  PROFESSIONAL CERTIFICATIONS
                </span>
                <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                  <button onClick={prev} aria-label="Previous certification" className="carousel-nav-btn" style={{ background: "none", border: "1px solid var(--border-color)", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", minWidth: 28, textAlign: "center" }}>
                    {index + 1}/{total}
                  </span>
                  <button onClick={next} aria-label="Next certification" className="carousel-nav-btn" style={{ background: "none", border: "1px solid var(--border-color)", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>

              <div style={{ position: "relative", height: 130, marginTop: "1rem", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", height: "100%" }}>
                  <div
                    style={{
                      background: `${active.color}1a`,
                      color: active.color,
                      fontWeight: 800,
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-mono)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      border: "1px solid var(--border-color)",
                      flexShrink: 0,
                    }}
                  >
                    {active.code}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "1.05rem", color: "var(--text-primary)", fontWeight: 700, lineHeight: 1.3 }}>{active.title}</h4>
                    <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      {active.issuer} • {active.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
              <span className="badge">{active.badge}</span>
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
          <Link href={`/writing/${paper.slug}`} className="project-link">
            View full research page
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </Modal>
    </section>
  );
}
