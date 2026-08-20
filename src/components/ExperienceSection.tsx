"use client";

import { m, useReducedMotion } from "motion/react";
import experience from "@/content/experience.json";
import CompanyLogo from "./CompanyLogo";
import Reveal, { revealVariants } from "./Reveal";

const ROLE_METRICS: Record<string, string[]> = {
  "PT Astra Visteon Indonesia": ["150K+ Records Analyzed", "0% → 60% Recall Boost", "Python • SQL • FastAPI"],
  "HPC Universitas Gunadarma (HPC-UG)": ["NVIDIA DGX A100 & DGX-1", "Qwen3-8B Fine-Tuning", "89% Research Accuracy"],
  "Universitas Gunadarma": ["GenAI & LLM Training", "International Academic Faculty", "Prompt Engineering"],
  "Lembaga Pengembangan Komputerisasi Universitas Gunadarma (LePKom)": ["200+ Engineers Mentored", "End-to-End ML Architecture", "Code Review & Assessment"],
};

function TimelineItemReveal({ delay, children }: { delay: number; children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className="timeline-circuit-item">{children}</div>;
  }

  return (
    <m.div
      className="timeline-circuit-item"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={revealVariants}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}

export default function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal>
          <h2>Experience &amp; Education</h2>
          <p style={{ marginBottom: "2.5rem" }}>
            Production engineering roles, high-performance computing lab experience, and academic background.
          </p>
        </Reveal>

        <div className="exp-layout-grid">
          {/* WORK EXPERIENCE COLUMN WITH CIRCUIT TIMELINE */}
          <div className="exp-column">
            <div className="exp-column-header">
              <div className="exp-column-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>Work Experience</span>
              </div>
              <span className="exp-count-badge">{experience.work.length} Roles</span>
            </div>

            <div className="timeline-circuit">
              {experience.work.map((item, i) => {
                const chips = ROLE_METRICS[item.company] || [];
                return (
                  <TimelineItemReveal key={item.title} delay={Math.min(i, 4) * 0.08}>
                    <div className="timeline-circuit-node" aria-hidden="true" />
                    <div className="timeline-circuit-content">
                      <div className="exp-card-header">
                        <div className="exp-card-main">
                          <span className="exp-card-title">{item.title}</span>
                          <div className="exp-card-company-row">
                            <CompanyLogo src={item.logo} company={item.company} />
                            <span className="exp-card-company">{item.company}</span>
                          </div>
                        </div>
                        <span className="exp-card-date">{item.date}</span>
                      </div>

                      {chips.length > 0 && (
                        <div className="exp-chips-row" aria-label="Key telemetry and technical stack">
                          {chips.map((chip) => (
                            <span key={chip} className="exp-chip">
                              <span className="exp-chip-dot" aria-hidden="true" />
                              {chip}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="exp-card-body">
                        <ul className="exp-bullet-list">
                          {item.highlights.map((h) => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TimelineItemReveal>
                );
              })}
            </div>
          </div>

          {/* EDUCATION & ACADEMIC COLUMN WITH CIRCUIT TIMELINE */}
          <div className="exp-column">
            <div className="exp-column-header">
              <div className="exp-column-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                </svg>
                <span>Education &amp; Honors</span>
              </div>
              <span className="exp-count-badge">{experience.education.length} Programs</span>
            </div>

            <div className="timeline-circuit">
              {experience.education.map((item, i) => (
                <TimelineItemReveal key={item.title} delay={Math.min(i, 4) * 0.08}>
                  <div className="timeline-circuit-node" aria-hidden="true" />
                  <div className="timeline-circuit-content">
                    <div className="exp-card-header">
                      <div className="exp-card-main">
                        <span className="exp-card-title">{item.title}</span>
                        <div className="exp-card-company-row">
                          <CompanyLogo src={item.logo} company={item.company} />
                          <span className="exp-card-company">{item.company}</span>
                        </div>
                      </div>
                      <span className="exp-card-date">{item.date}</span>
                    </div>

                    <div className="exp-credential-badge">
                      <span className="exp-credential-dot" aria-hidden="true" />
                      <span>{item.statLabel}</span>
                    </div>

                    <div className="exp-card-body">
                      <p className="exp-edu-description">{item.description}</p>
                    </div>
                  </div>
                </TimelineItemReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
