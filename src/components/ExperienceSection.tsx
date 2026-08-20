"use client";

import { m, useReducedMotion } from "motion/react";
import experience from "@/content/experience.json";
import CompanyLogo from "./CompanyLogo";
import Reveal from "./Reveal";

// Single entry in the log manifest
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

  const inner = (
    <div className="exp-log-entry">
      <div className="exp-log-date" aria-label={`Date: ${date}`}>
        {date}
      </div>
      <div className="exp-log-content">
        <div className="exp-log-title">{title}</div>
        <div className="exp-log-company">
          <CompanyLogo src={logo} company={company} />
          <span>{company}</span>
        </div>
        {statLabel && (
          <div className="exp-log-stat">{statLabel}</div>
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
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
            Professional roles, research experience, and academic background.
          </p>
        </Reveal>

        {/* WORK EXPERIENCE BLOCK */}
        <div className="exp-block">
          <div className="exp-block-label">Work Experience</div>
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
        <div className="exp-block" style={{ marginTop: "3.5rem" }}>
          <div className="exp-block-label">Education</div>
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
