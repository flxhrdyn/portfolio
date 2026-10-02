"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion, type Variants } from "motion/react";
import Modal from "./Modal";
import ResearchPaperBody from "./ResearchPaperBody";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import certifications from "@/content/certifications.json";
import writing from "@/content/writing.json";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

// Test-set accuracy from the paper, best first.
const BENCHMARK = [
  { model: "MobileNetV2", score: 89.6 },
  { model: "CoralNet", score: 88.8 },
  { model: "InceptionV3", score: 84.8 },
];

const FEATURED_CERTS = 4;

const barsVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const barVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease: EASE_OUT } },
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

function CertRow({ cert }: { cert: (typeof certifications)[number] }) {
  return (
    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-row">
      <span className="cert-row-title">{cert.title}</span>
      <span className="cert-row-meta">
        {cert.issuer} · {cert.date}
      </span>
      <span className="cert-row-arrow" aria-hidden="true">&#8599;</span>
    </a>
  );
}

export default function CertificationsSection() {
  const [researchOpen, setResearchOpen] = useState(false);
  const [showAllCerts, setShowAllCerts] = useState(false);
  const reduceMotion = useReducedMotion();
  const paper = writing[0];

  if (!paper) return null;

  const featuredCerts = certifications.slice(0, FEATURED_CERTS);
  const moreCerts = certifications.slice(FEATURED_CERTS);
  const best = BENCHMARK[0].score;

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

        <article className="paper">
          <Reveal>
            <p className="paper-meta">
              Peer-reviewed · {paper.journal.split(" (")[0]} · {paper.volume}
            </p>
            <h3 className="paper-title">{paper.title}</h3>
            <p className="paper-summary">{paper.summary}</p>
            <div className="paper-links">
              <button type="button" className="project-link" onClick={() => setResearchOpen(true)}>
                Read abstract &rarr;
              </button>
              {paper.doi && (
                <a href={paper.doi} target="_blank" rel="noopener noreferrer" className="project-link project-link-muted">
                  Paper &#8599;
                </a>
              )}
            </div>
          </Reveal>

          <figure className="paper-bench">
            <figcaption className="paper-bench-caption">Test accuracy</figcaption>
            <m.ul
              className="paper-bench-rows"
              initial={reduceMotion ? false : "hidden"}
              whileInView="show"
              viewport={VIEWPORT}
              variants={barsVariants}
            >
              {BENCHMARK.map((row) => (
                <li key={row.model} className="paper-bench-row" data-best={row.score === best}>
                  <span className="paper-bench-model">{row.model}</span>
                  <span className="paper-bench-track">
                    <m.span
                      className="paper-bench-fill"
                      style={{ width: `${row.score}%` }}
                      variants={reduceMotion ? undefined : barVariants}
                    />
                  </span>
                  <span className="paper-bench-score">{row.score.toFixed(1)}%</span>
                </li>
              ))}
            </m.ul>
          </figure>
        </article>

        <div className="certs">
          <h3 className="subsection-title">Certifications</h3>
          <m.ul
            className="cert-rows"
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={VIEWPORT}
            variants={listVariants}
          >
            {featuredCerts.map((cert) => (
              <m.li key={cert.code} variants={reduceMotion ? undefined : rowVariants}>
                <CertRow cert={cert} />
              </m.li>
            ))}
          </m.ul>

          <AnimatePresence initial={false}>
            {showAllCerts && (
              <m.ul
                id="more-certs"
                className="cert-rows cert-rows-more"
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
              >
                {moreCerts.map((cert) => (
                  <li key={cert.code}>
                    <CertRow cert={cert} />
                  </li>
                ))}
              </m.ul>
            )}
          </AnimatePresence>

          {moreCerts.length > 0 && (
            <button
              type="button"
              className="certs-toggle"
              aria-expanded={showAllCerts}
              aria-controls="more-certs"
              onClick={() => setShowAllCerts((v) => !v)}
            >
              {showAllCerts ? "Show fewer" : `View all ${certifications.length} certifications`}
              <span className="certs-toggle-icon" data-open={showAllCerts} aria-hidden="true">+</span>
            </button>
          )}
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
