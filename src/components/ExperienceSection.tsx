"use client";

import { m, useReducedMotion } from "motion/react";
import experience from "@/content/experience.json";
import Reveal, { revealVariants } from "./Reveal";

function TimelineReveal({ delay, children }: { delay: number; children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className="timeline-item">{children}</div>;
  }

  return (
    <m.div
      className="timeline-item"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={revealVariants}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
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
            Professional roles, research experience, and academic background.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "3rem" }}>
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--text-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-color)" }}>
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              Work Experience
            </h3>
            <div className="timeline">
              {experience.work.map((item, i) => (
                <TimelineReveal key={item.title} delay={Math.min(i, 4) * 0.1}>
                  <div className="timeline-dot" />
                  <div className="timeline-header">
                    <div>
                      <span className="timeline-title" style={{ display: "block", fontSize: "1.1rem" }}>
                        {item.title}
                      </span>
                      <span className="timeline-company">{item.company}</span>
                    </div>
                    <span className="timeline-date">{item.date}</span>
                  </div>
                  <div className="timeline-body">
                    <ul>
                      {item.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </TimelineReveal>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--text-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-color)" }}>
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
              </svg>
              Education
            </h3>
            <div className="timeline">
              {experience.education.map((item, i) => (
                <TimelineReveal key={item.title} delay={Math.min(i, 4) * 0.1}>
                  <div className="timeline-dot" style={{ borderColor: item.accentColor }} />
                  <div className="timeline-header">
                    <div>
                      <span className="timeline-title" style={{ display: "block", fontSize: "1.1rem" }}>
                        {item.title}
                      </span>
                      <span className="timeline-company">{item.company}</span>
                    </div>
                    <span className="timeline-date">{item.date}</span>
                  </div>
                  <div className="timeline-body">
                    <p style={{ fontWeight: 700, color: item.statColor, marginTop: "0.25rem", fontFamily: "var(--font-mono)", fontSize: "0.88rem" }}>
                      {item.statLabel}
                    </p>
                    <p style={{ marginTop: "0.35rem" }}>{item.description}</p>
                  </div>
                </TimelineReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
