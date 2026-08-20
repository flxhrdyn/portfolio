"use client";

import { useState } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";
import Modal from "./Modal";
import ResearchPaperBody from "./ResearchPaperBody";
import Reveal from "./Reveal";
import certifications from "@/content/certifications.json";
import writing from "@/content/writing.json";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function CertificationsSection() {
  const [researchOpen, setResearchOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const paper = writing[0];

  if (!paper) return null;

  return (
    <section className="section" id="research">
      {/* Anchor fallback for legacy links */}
      <span id="certifications" style={{ position: "absolute", top: 0, pointerEvents: "none" }} />

      <div className="container">
        <Reveal>
          <h2>Research &amp; Certifications</h2>
          <p style={{ marginBottom: "2.25rem", maxWidth: "60ch" }}>
            Peer-reviewed scientific publications, national competencies, and verified technical credentials.
          </p>
        </Reveal>

        {/* ASYMMETRIC ENGINEERING BENTO */}
        <div className="research-bento-grid">
          {/* LEFT: FEATURED RESEARCH PAPER CARD */}
          <Reveal style={{ height: "100%" }}>
            <article className="research-featured-card">
              <div>
                <div className="research-card-header">
                  <span className="research-type-badge">{paper.kind}</span>
                  <span className="research-journal-tag">{paper.journal} · {paper.volume}</span>
                </div>

                <h3 className="research-paper-title">{paper.title}</h3>
                
                <p className="research-authors-clean">
                  Ulfa Hidayati, Felix Windriyareksa Hardyan, Faizah Rizki Auliawati, et al.
                </p>

                {/* BENCHMARK HIGHLIGHT */}
                <div className="research-metrics-strip">
                  <div className="research-metric-box">
                    <div className="research-metric-value">89%</div>
                    <div className="research-metric-label">Test Accuracy (MobileNetV2)</div>
                  </div>
                  <div className="research-metric-box">
                    <div className="research-metric-value">97%</div>
                    <div className="research-metric-label">Training Convergence</div>
                  </div>
                </div>

                <p className="research-summary-text">
                  Comparative study evaluating end-to-end deep learning architectures (CoralNet, InceptionV3, MobileNetV2) for automated coral reef health classification across Indonesian marine ecosystems.
                </p>
              </div>

              <div className="research-card-footer">
                <button
                  type="button"
                  onClick={() => setResearchOpen(true)}
                  className="research-action-btn primary"
                >
                  Read Abstract &amp; Methods
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                {paper.doi && (
                  <a
                    href={paper.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="research-action-btn secondary"
                  >
                    DOI Publication ↗
                  </a>
                )}
              </div>
            </article>
          </Reveal>

          {/* RIGHT: VERIFIED CERTIFICATIONS STACK (VERCEL / SCALE AI STYLE) */}
          <Reveal delay={0.06} style={{ height: "100%" }}>
            <div className="certs-stack-container">
              <div className="certs-stack-header">
                <span className="certs-header-badge">VERIFIED CERTIFICATIONS</span>
                <span className="certs-count-pill">{certifications.length} Credentials</span>
              </div>

              {reduceMotion ? (
                <div className="certs-list-stack">
                  {certifications.map((cert) => (
                    <a
                      key={cert.code}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-stack-item"
                    >
                      <div className="cert-item-info">
                        <h4 className="cert-item-title">{cert.title}</h4>
                        <div className="cert-item-meta">
                          <span className="cert-issuer-name">{cert.issuer}</span>
                          <span className="cert-meta-divider">•</span>
                          <span className="cert-date-text">{cert.date}</span>
                        </div>
                      </div>

                      <div className="cert-item-right">
                        <span className="cert-type-pill">{cert.badge}</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cert-arrow-icon">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <m.div
                  className="certs-list-stack"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={containerVariants}
                >
                  {certifications.map((cert) => (
                    <m.a
                      key={cert.code}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-stack-item"
                      variants={itemVariants}
                    >
                      <div className="cert-item-info">
                        <h4 className="cert-item-title">{cert.title}</h4>
                        <div className="cert-item-meta">
                          <span className="cert-issuer-name">{cert.issuer}</span>
                          <span className="cert-meta-divider">•</span>
                          <span className="cert-date-text">{cert.date}</span>
                        </div>
                      </div>

                      <div className="cert-item-right">
                        <span className="cert-type-pill">{cert.badge}</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cert-arrow-icon">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </m.a>
                  ))}
                </m.div>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* RESEARCH PAPER ABSTRACT MODAL */}
      <Modal
        id="research-modal"
        title="Peer-Reviewed Research Abstract &amp; Architecture"
        isOpen={researchOpen}
        onClose={() => setResearchOpen(false)}
      >
        <div className="modal-section">
          <div className="meta-mono" style={{ color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
            {paper.journal} • {paper.volume}
          </div>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "var(--text-primary)", lineHeight: 1.35 }}>
            {paper.title}
          </h3>
          <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", marginBottom: "1rem" }}>
            {paper.issn}
          </div>
        </div>

        <ResearchPaperBody paper={paper} />

        <div className="modal-section" style={{ paddingTop: "0.85rem", borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
            DOI: 10.23960/jitet.v13i3.6591
          </span>
          <a
            href={paper.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            style={{ fontSize: "0.85rem", fontWeight: 600 }}
          >
            Direct Journal Access ↗
          </a>
        </div>
      </Modal>
    </section>
  );
}
