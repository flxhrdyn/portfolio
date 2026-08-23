"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { m, useInView, useReducedMotion, type Variants } from "motion/react";
import Modal from "./Modal";
import ResearchPaperBody from "./ResearchPaperBody";
import Reveal from "./Reveal";
import ScrollLinked from "./ScrollLinked";
import WordReveal from "./WordReveal";
import certifications from "@/content/certifications.json";
import writing from "@/content/writing.json";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const BENCHMARK_METRICS = {
  testing: {
    label: "Testing",
    scores: {
      "mobilenet-v2": { score: "89.60%", val: 89.6, badge: "Optimal" },
      "coralnet-baseline": { score: "88.80%", val: 88.8, badge: null },
      "inception-v3": { score: "84.80%", val: 84.8, badge: null },
    },
  },
  validation: {
    label: "Validation",
    scores: {
      "mobilenet-v2": { score: "88.00%", val: 88.0, badge: "Optimal" },
      "coralnet-baseline": { score: "85.60%", val: 85.6, badge: null },
      "inception-v3": { score: "86.40%", val: 86.4, badge: null },
    },
  },
  training: {
    label: "Training",
    scores: {
      "mobilenet-v2": { score: "97.20%", val: 97.2, badge: "Optimal" },
      "coralnet-baseline": { score: "89.10%", val: 89.1, badge: null },
      "inception-v3": { score: "96.90%", val: 96.9, badge: null },
    },
  },
} as const;

const MODEL_ROWS = [
  { id: "mobilenet-v2", rank: 1, colorClass: "rank-1" },
  { id: "coralnet-baseline", rank: 2, colorClass: "rank-2" },
  { id: "inception-v3", rank: 3, colorClass: "rank-3" },
] as const;

const ITEMS_PER_PAGE = 4;
const AUTO_ROTATE_MS = 4000;

export default function CertificationsSection() {
  const [researchOpen, setResearchOpen] = useState(false);
  const [metricType, setMetricType] = useState<"testing" | "validation" | "training">("testing");
  const [certPage, setCertPage] = useState(0);
  const reduceMotion = useReducedMotion();
  const paper = writing[0];
  const hoveredRef = useRef(false);

  const leaderboardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(leaderboardRef, { once: true, margin: "-40px" });

  const totalPages = Math.ceil(certifications.length / ITEMS_PER_PAGE);
  const paginatedCerts = certifications.slice(
    certPage * ITEMS_PER_PAGE,
    (certPage + 1) * ITEMS_PER_PAGE
  );
  const startIndex = certPage * ITEMS_PER_PAGE;

  const goNext = useCallback(
    () => setCertPage((p) => (p + 1) % totalPages),
    [totalPages]
  );
  const goPrev = useCallback(
    () => setCertPage((p) => (p - 1 + totalPages) % totalPages),
    [totalPages]
  );

  // Auto-rotate — pauses while card is hovered
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      if (!hoveredRef.current) goNext();
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [goNext, reduceMotion]);

  if (!paper) return null;

  const currentScores = BENCHMARK_METRICS[metricType].scores;

  return (
    <section className="section" id="research">
      {/* Anchor fallback for legacy links */}
      <span id="certifications" style={{ position: "absolute", top: 0, pointerEvents: "none" }} />

      <div className="container">
        <WordReveal text="Research & Certifications" />
        <Reveal delay={0.12}>
          <p style={{ marginBottom: "2.25rem", maxWidth: "60ch" }}>
            Academic publications and certifications in AI, machine learning, and data science.
          </p>
        </Reveal>

        {/* ASYMMETRIC ENGINEERING BENTO */}
        <div className="research-bento-grid">
          {/* LEFT: FEATURED RESEARCH PAPER CARD (DISTILLED TELEMETRY) */}
          <ScrollLinked style={{ height: "100%" }}>
            <article className="research-featured-card">
              <div className="research-card-body">
                <div className="research-card-header">
                  <span className="research-type-badge">{paper.kind}</span>
                  <span className="research-journal-tag">JITET · {paper.volume}</span>
                </div>

                <h3 className="research-paper-title">{paper.title}</h3>
                
                <p className="research-authors-clean">
                  Ulfa H., Felix W. Hardyan, Faizah R., Ali A., Fanka A., Mario M.
                </p>

                {/* TELEMETRY BENCHMARK SECTION (GROQ / SCALE AI FLAT INSTRUMENTATION) */}
                <div className="telemetry-benchmark-section" ref={leaderboardRef}>
                  <div className="telemetry-header-row">
                    <span className="telemetry-label">MODEL ACCURACY BENCHMARK</span>

                    <div className="leaderboard-tab-switcher">
                      {(["testing", "validation", "training"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`leaderboard-tab-btn ${metricType === t ? "active" : ""}`}
                          onClick={() => setMetricType(t)}
                        >
                          {metricType === t && !reduceMotion && (
                            <m.span
                              layoutId="activeMetricPill"
                              className="leaderboard-tab-active-pill"
                              transition={{ type: "spring", stiffness: 450, damping: 35 }}
                            />
                          )}
                          <span className="leaderboard-tab-label">
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="leaderboard-rows">
                    {MODEL_ROWS.map((model) => {
                      const data = currentScores[model.id];
                      return (
                        <div key={model.id} className="leaderboard-row">
                          <span className="leaderboard-rank-badge">
                            {String(model.rank).padStart(2, "0")}
                          </span>
                          <div className="leaderboard-row-content">
                            <div className="leaderboard-meta-top">
                              <div className="leaderboard-model-info">
                                <span className="leaderboard-model-name">{model.id}</span>
                                {data.badge && <span className="leaderboard-badge">{data.badge}</span>}
                              </div>
                              {reduceMotion ? (
                                <span className="leaderboard-score-val">{data.score}</span>
                              ) : (
                                <m.span
                                  key={`${model.id}-${data.score}`}
                                  initial={{ opacity: 0, y: -3 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="leaderboard-score-val"
                                >
                                  {data.score}
                                </m.span>
                              )}
                            </div>
                            <div className="leaderboard-bar-track">
                              {reduceMotion ? (
                                <div
                                  className={`leaderboard-bar-fill ${model.colorClass}`}
                                  style={{ width: `${data.val}%` }}
                                />
                              ) : (
                                <m.div
                                  className={`leaderboard-bar-fill ${model.colorClass}`}
                                  initial={{ width: 0 }}
                                  animate={{ width: inView ? `${data.val}%` : 0 }}
                                  transition={{ 
                                    duration: 0.75, 
                                    delay: model.rank * 0.08,
                                    ease: [0.16, 1, 0.3, 1] 
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="research-card-footer">
                <button
                  type="button"
                  onClick={() => setResearchOpen(true)}
                  className="research-action-btn primary"
                >
                  Read Abstract
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
                    Read Paper ↗
                  </a>
                )}
              </div>
            </article>
          </ScrollLinked>

          {/* RIGHT: VERIFIED CERTIFICATIONS LEDGER (AUTO-ROTATING, INFINITE NAV) */}
          <ScrollLinked style={{ height: "100%" }}>
            <div
              className="certs-stack-container"
              onMouseEnter={() => { hoveredRef.current = true; }}
              onMouseLeave={() => { hoveredRef.current = false; }}
            >
              <div className="certs-stack-header">
                <span className="certs-header-badge">VERIFIED CERTIFICATIONS</span>
                <span className="certs-count-pill">{certifications.length} Certs</span>
              </div>

              {reduceMotion ? (
                <div className="certs-list-stack">
                  {paginatedCerts.map((cert, i) => (
                    <a
                      key={cert.code}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-stack-item"
                    >
                      <span className="cert-index-number">
                        {String(startIndex + i + 1).padStart(2, "0")}
                      </span>
                      <div className="cert-item-info">
                        <h4 className="cert-item-title">{cert.title}</h4>
                        <div className="cert-item-meta">
                          <span className="cert-issuer-name">{cert.issuer}</span>
                          <span className="cert-meta-divider">•</span>
                          <span className="cert-date-text">{cert.date}</span>
                        </div>
                      </div>

                      <div className="cert-item-right">
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
                  key={certPage}
                  className="certs-list-stack"
                  initial="hidden"
                  animate="show"
                  variants={containerVariants}
                >
                  {paginatedCerts.map((cert, i) => (
                    <m.a
                      key={cert.code}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-stack-item"
                      variants={itemVariants}
                    >
                      <span className="cert-index-number">
                        {String(startIndex + i + 1).padStart(2, "0")}
                      </span>
                      <div className="cert-item-info">
                        <h4 className="cert-item-title">{cert.title}</h4>
                        <div className="cert-item-meta">
                          <span className="cert-issuer-name">{cert.issuer}</span>
                          <span className="cert-meta-divider">•</span>
                          <span className="cert-date-text">{cert.date}</span>
                        </div>
                      </div>

                      <div className="cert-item-right">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cert-arrow-icon">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </m.a>
                  ))}
                </m.div>
              )}

              {/* FOOTER: infinite ← → nav only */}
              <div className="certs-pagination-footer">
                <span className="certs-page-info">
                  Page {certPage + 1} of {totalPages}
                </span>

                <div className="certs-page-controls">
                  <button
                    type="button"
                    className="certs-page-btn arrow"
                    onClick={goPrev}
                    aria-label="Previous page"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    className="certs-page-btn arrow"
                    onClick={goNext}
                    aria-label="Next page"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </ScrollLinked>
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
