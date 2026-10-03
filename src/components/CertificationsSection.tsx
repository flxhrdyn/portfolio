"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { m, useInView, useReducedMotion, type Variants } from "motion/react";
import Modal from "./Modal";
import ResearchPaperBody from "./ResearchPaperBody";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import ScrambleText from "./ScrambleText";
import certifications from "@/content/certifications.json";
import writing from "@/content/writing.json";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

const researchCardVariants: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.2 },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

const certsCardVariants: Variants = {
  hidden: { clipPath: "inset(50% 0% 50% 0%)", opacity: 0.2 },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 0.85, ease: EASE_OUT, delay: 0.15 },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const certItemVariants: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: EASE_OUT,
    },
  },
};

// Test-set accuracy from the paper.
const TEST_SCORES = {
  "mobilenet-v2": { score: "89.60%", val: 89.6 },
  "coralnet-baseline": { score: "88.80%", val: 88.8 },
  "inception-v3": { score: "84.80%", val: 84.8 },
} as const;

const MODEL_ROWS = [
  { id: "mobilenet-v2", rank: 1, colorClass: "rank-1" },
  { id: "coralnet-baseline", rank: 2, colorClass: "rank-2" },
  { id: "inception-v3", rank: 3, colorClass: "rank-3" },
] as const;

function LeaderboardBarRow({
  model,
  data,
  inView,
}: {
  model: (typeof MODEL_ROWS)[number];
  data: { score: string; val: number };
  inView: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [displayScore, setDisplayScore] = useState(reduceMotion ? data.score : "0.00%");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || reduceMotion) return;
    hasAnimated.current = true;

    const duration = 1200;
    const delay = model.rank * 140;
    let frameId: number;

    const timeout = setTimeout(() => {
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = (ease * data.val).toFixed(2);
        setDisplayScore(`${currentVal}%`);

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setDisplayScore(data.score);
        }
      };

      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameId);
    };
  }, [inView, data, model.rank, reduceMotion]);

  return (
    <div className="leaderboard-row">
      <div className="leaderboard-row-content">
        <div className="leaderboard-meta-top">
          <div className="leaderboard-model-info">
            <span className="leaderboard-model-name">
              <ScrambleText text={model.id} delay={0.15 + model.rank * 0.12} duration={500} />
            </span>
          </div>
          <span className="leaderboard-score-val">{displayScore}</span>
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
                duration: 1.2,
                delay: 0.15 + (model.rank * 140) / 1000,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const ITEMS_PER_PAGE = 4;
const AUTO_ROTATE_MS = 4000;

export default function CertificationsSection() {
  const [researchOpen, setResearchOpen] = useState(false);
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
          <m.div
            style={{ height: "100%" }}
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={VIEWPORT}
            variants={researchCardVariants}
          >
            <article className="research-featured-card">
              <div className="research-card-body">
                <p className="research-journal-tag">
                  <ScrambleText text={`JITET · ${paper.volume}`} duration={600} />
                </p>

                <h3 className="research-paper-title">{paper.title}</h3>

                <p className="research-authors-clean">
                  Ulfa H., <strong>Felix W. Hardyan</strong>, Faizah R., Ali A., Fanka A., Mario M.
                </p>

                <div className="telemetry-benchmark-section" ref={leaderboardRef}>
                  <div className="leaderboard-rows">
                    {MODEL_ROWS.map((model) => (
                      <LeaderboardBarRow
                        key={model.id}
                        model={model}
                        data={TEST_SCORES[model.id]}
                        inView={inView}
                      />
                    ))}
                  </div>
                  <p className="research-benchmark-caption">Test accuracy</p>
                </div>
              </div>

              <div className="research-card-footer">
                <button
                  type="button"
                  onClick={() => setResearchOpen(true)}
                  className="research-action-btn primary"
                >
                  Read abstract <span className="research-action-arrow" aria-hidden="true">→</span>
                </button>

                {paper.doi && (
                  <a
                    href={paper.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="research-action-btn secondary"
                  >
                    Paper on DOI ↗
                  </a>
                )}
              </div>
            </article>
          </m.div>

          {/* RIGHT: VERIFIED CERTIFICATIONS LEDGER (AUTO-ROTATING, INFINITE NAV) */}
          <m.div
            style={{ height: "100%" }}
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={VIEWPORT}
            variants={certsCardVariants}
          >
            <div
              className="certs-stack-container"
              onMouseEnter={() => { hoveredRef.current = true; }}
              onMouseLeave={() => { hoveredRef.current = false; }}
            >
              <div className="certs-stack-header">
                <span className="certs-header-badge">VERIFIED CERTIFICATIONS</span>
              </div>

              {reduceMotion ? (
                <div className="certs-list-stack">
                  {paginatedCerts.map((cert) => (
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
                  {paginatedCerts.map((cert) => (
                    <m.a
                      key={cert.code}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-stack-item"
                      variants={certItemVariants}
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
                <span className="certs-page-info">{certifications.length} certifications</span>

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
          </m.div>
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
