"use client";

import { m, useReducedMotion } from "motion/react";
import experience from "@/content/experience.json";
import CompanyLogo from "./CompanyLogo";
import Reveal from "./Reveal";

function LogEntry({
  delay,
  date,
  title,
  company,
  logo,
  highlights,
  statLabel,
  description,
}: {
  delay: number;
  date: string;
  title: string;
  company: string;
  logo: string;
  highlights?: string[];
  statLabel?: string;
  description?: string;
}) {
  const reduceMotion = useReducedMotion();
  const isPresent = date.toLowerCase().includes("present");

  const inner = (
    <div className="exp-log-entry">
      <div className="exp-log-meta">
        <div className="exp-log-date">
          {isPresent && <span className="exp-live-indicator" title="Current Role" />}
          <span>{date}</span>
        </div>
      </div>

      <div className="exp-log-content">
        <div className="exp-log-header">
          <div className="exp-log-title">{title}</div>
          <div className="exp-log-company">
            <CompanyLogo src={logo} company={company} />
            <span className="exp-company-name">{company}</span>
          </div>
        </div>

        {statLabel && (
          <div className="exp-stat-badge">
            <span className="exp-stat-dot" />
            <span>{statLabel}</span>
          </div>
        )}

        {highlights && highlights.length > 0 && (
          <ul className="exp-log-bullets">
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        {description && (
          <p className="exp-log-desc">{description}</p>
        )}
      </div>
    </div>
  );

  if (reduceMotion) return inner;

  return (
    <m.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {inner}
    </m.div>
  );
}

export default function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal>
          <h2>Experience &amp; Education</h2>
          <p style={{ marginBottom: "3rem", maxWidth: "55ch" }}>
            Professional engineering roles, applied AI research, and academic milestones.
          </p>
        </Reveal>

        {/* WORK EXPERIENCE BLOCK */}
        <div className="exp-block">
          <div className="exp-block-header">
            <span className="exp-block-label">Work Experience</span>
            <span className="exp-block-count">[ 04 ROLES ]</span>
          </div>
          <div className="exp-log-list">
            {experience.work.map((item, i) => (
              <LogEntry
                key={item.title + item.company}
                delay={Math.min(i, 4) * 0.08}
                date={item.date}
                title={item.title}
                company={item.company}
                logo={item.logo}
                highlights={item.highlights}
              />
            ))}
          </div>
        </div>

        {/* EDUCATION BLOCK */}
        <div className="exp-block" style={{ marginTop: "4rem" }}>
          <div className="exp-block-header">
            <span className="exp-block-label">Education</span>
            <span className="exp-block-count">[ 02 CREDENTIALS ]</span>
          </div>
          <div className="exp-log-list">
            {experience.education.map((item, i) => (
              <LogEntry
                key={item.title + item.company}
                delay={Math.min(i, 4) * 0.08}
                date={item.date}
                title={item.title}
                company={item.company}
                logo={item.logo}
                statLabel={item.statLabel}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
