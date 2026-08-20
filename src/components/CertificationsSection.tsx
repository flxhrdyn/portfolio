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
          {/* LEFT: FEATURED RESEARCH PAPER CARD (SCALE AI BENCHMARK STYLE) */}
          <Reveal style={{ height: "100%" }}>
            <article className="research-featured-card">
              <div>
                <div className="research-card-header">
                  <span className="research-type-badge">{paper.kind}</span>
                  <span className="research-journal-tag">{paper.journal} · {paper.volume}</span>
                </div>

                <h3 className="research-paper-title">{paper.title}</h3>
                
                <p className="research-authors-clean">
                  Ulfa H., Felix W. Hardyan, Faizah R., Ali A., Fanka A., Mario M.
                </p>

                {/* SCALE AI / DEEPMIND STYLE TRAINING CONVERGENCE LINE CHART */}
                <div className="research-chart-card">
                  <div className="chart-card-header">
                    <div className="chart-header-left">
                      <span className="chart-title">MODEL CONVERGENCE CURVE</span>
                      <span className="chart-subtitle">MobileNetV2 · 50 Epochs</span>
                    </div>
                    <div className="chart-legend">
                      <span className="legend-item train">
                        <span className="legend-line solid" />
                        Train Acc (97%)
                      </span>
                      <span className="legend-item val">
                        <span className="legend-line dashed" />
                        Val Acc (89%)
                      </span>
                    </div>
                  </div>

                  {/* HIGH-PRECISION CONVERGENCE SVG CHART */}
                  <div className="chart-svg-wrap">
                    <svg
                      viewBox="0 0 460 115"
                      className="research-svg-chart"
                      preserveAspectRatio="none"
                      aria-label="MobileNetV2 Training and Validation Accuracy Curve"
                    >
                      <defs>
                        <linearGradient id="trainGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--text-primary)" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="var(--text-primary)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines */}
                      <line x1="40" y1="20" x2="450" y2="20" stroke="var(--border-color)" strokeDasharray="3 3" opacity="0.4" />
                      <line x1="40" y1="55" x2="450" y2="55" stroke="var(--border-color)" strokeDasharray="3 3" opacity="0.4" />
                      <line x1="40" y1="90" x2="450" y2="90" stroke="var(--border-color)" strokeDasharray="3 3" opacity="0.4" />

                      {/* Y-Axis Labels */}
                      <text x="32" y="24" textAnchor="end" className="chart-axis-text">100%</text>
                      <text x="32" y="59" textAnchor="end" className="chart-axis-text">80%</text>
                      <text x="32" y="94" textAnchor="end" className="chart-axis-text">60%</text>

                      {/* Train Area Fill */}
                      <path
                        d="M 40 88 C 100 80, 160 38, 260 28 C 340 22, 400 18, 450 16 L 450 95 L 40 95 Z"
                        fill="url(#trainGrad)"
                      />

                      {/* Validation Curve (Dashed) */}
                      <path
                        d="M 40 92 C 100 86, 170 54, 260 44 C 330 38, 390 34, 450 33"
                        fill="none"
                        stroke="var(--text-secondary)"
                        strokeWidth="1.8"
                        strokeDasharray="4 4"
                        opacity="0.85"
                      />

                      {/* Training Curve (Solid High-Contrast) */}
                      <path
                        d="M 40 88 C 100 80, 160 38, 260 28 C 340 22, 400 18, 450 16"
                        fill="none"
                        stroke="var(--text-primary)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />

                      {/* Optimal Checkpoint Dot */}
                      <circle cx="450" cy="33" r="3.5" fill="var(--bg-card)" stroke="var(--text-primary)" strokeWidth="2" />
                      <circle cx="450" cy="16" r="3.5" fill="var(--text-primary)" />
                    </svg>
                  </div>
                </div>

                <p className="research-summary-text">
                  Evaluated deep learning vision models for automated coral reef health diagnostics. MobileNetV2 achieved 89% validation accuracy, outperforming InceptionV3 (84%) and CoralNet baseline (78%) while reducing manual feature extraction latency.
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

          {/* RIGHT: VERIFIED CERTIFICATIONS LEDGER (SCALE AI / VERCEL STYLE) */}
          <Reveal delay={0.06} style={{ height: "100%" }}>
            <div className="certs-stack-container">
              <div className="certs-stack-header">
                <span className="certs-header-badge">VERIFIED CERTIFICATIONS</span>
                <span className="certs-count-pill">{certifications.length} Credentials</span>
              </div>

              {reduceMotion ? (
                <div className="certs-list-stack">
                  {certifications.map((cert, i) => (
                    <a
                      key={cert.code}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-stack-item"
                    >
                      <span className="cert-index-number">{String(i + 1).padStart(2, "0")}</span>
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
                  {certifications.map((cert, i) => (
                    <m.a
                      key={cert.code}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-stack-item"
                      variants={itemVariants}
                    >
                      <span className="cert-index-number">{String(i + 1).padStart(2, "0")}</span>
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
