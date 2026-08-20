"use client";

import { useState } from "react";
import Modal from "./Modal";
import ResearchPaperBody from "./ResearchPaperBody";
import Reveal from "./Reveal";
import certifications from "@/content/certifications.json";
import writing from "@/content/writing.json";

function IssuerBadge({ code }: { code: string }) {
  const getLabel = () => {
    switch (code) {
      case "BNSP":
        return "BNSP";
      case "STANF":
        return "STANFORD";
      case "TF_DD":
      case "TF_DV":
        return "DL.AI";
      case "SQL":
        return "SQL";
      default:
        return code;
    }
  };

  return (
    <span className="cert-issuer-monogram" aria-hidden="true">
      {getLabel()}
    </span>
  );
}

export default function CertificationsSection() {
  const [researchOpen, setResearchOpen] = useState(false);
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
              <div className="research-card-header">
                <div className="research-header-badges">
                  <span className="research-type-badge">{paper.kind}</span>
                  <span className="research-journal-tag">{paper.journal}</span>
                </div>
                <span className="research-volume-tag">{paper.volume}</span>
              </div>

              <div className="research-card-body">
                <h3 className="research-paper-title">{paper.title}</h3>
                
                <div className="research-authors-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="research-icon">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="research-authors-text">{paper.authors}</span>
                </div>

                {/* BENCHMARK METRICS STRIP */}
                {paper.stats && (
                  <div className="research-metrics-strip">
                    {paper.stats.map((stat) => (
                      <div key={stat.label} className="research-metric-box">
                        <div className="research-metric-value">{stat.value}</div>
                        <div className="research-metric-label">{stat.label}</div>
                      </div>
                    ))}
                    <div className="research-metric-box">
                      <div className="research-metric-value">3 Classes</div>
                      <div className="research-metric-label">Healthy · Bleached · Dead</div>
                    </div>
                  </div>
                )}

                <p className="research-summary-text">{paper.summary}</p>

                {/* ARCHITECTURE TAGS */}
                {paper.tags && (
                  <div className="research-tags-row">
                    {paper.tags.map((t) => (
                      <span key={t} className="research-spec-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
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
                    View DOI Publication
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                )}
              </div>
            </article>
          </Reveal>

          {/* RIGHT: VERIFIED ACCREDITATIONS STACK */}
          <Reveal delay={0.08} style={{ height: "100%" }}>
            <div className="certs-stack-container">
              <div className="certs-stack-header">
                <div className="certs-stack-title-wrap">
                  <span className="certs-header-badge">VERIFIED ACCREDITATIONS</span>
                  <span className="certs-count-pill">{certifications.length} Credentials</span>
                </div>
              </div>

              <div className="certs-list-stack">
                {certifications.map((cert) => (
                  <a
                    key={cert.code}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-stack-item"
                  >
                    <div className="cert-item-left">
                      <IssuerBadge code={cert.code} />
                      <div className="cert-item-info">
                        <h4 className="cert-item-title">{cert.title}</h4>
                        <div className="cert-item-meta">
                          <span className="cert-issuer-name">{cert.issuer}</span>
                          <span className="cert-meta-divider">•</span>
                          <span className="cert-date-text">{cert.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="cert-item-right">
                      <span className="cert-type-pill">{cert.badge}</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cert-arrow-icon">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
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
