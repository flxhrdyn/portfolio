"use client";

import { useRef, type ReactNode } from "react";
import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import experience from "@/content/experience.json";
import CompanyLogo from "./CompanyLogo";
import Reveal from "./Reveal";
import ScrollLinked from "./ScrollLinked";
import WordReveal from "./WordReveal";

/**
 * A rail whose fill tracks how far the reader has scrolled through the log.
 * The timeline is the one element here that is continuously bound to scroll
 * position rather than triggered once, so the section reads as a playhead
 * moving through a record instead of a list that popped in.
 */
function TimelineRail({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  if (reduceMotion) {
    return <div className="exp-log-list">{children}</div>;
  }

  return (
    <div className="exp-rail" ref={ref}>
      <div className="exp-rail-track" aria-hidden="true">
        <m.div className="exp-rail-fill" style={{ scaleY: fill }} />
      </div>
      <div className="exp-log-list">{children}</div>
    </div>
  );
}

function LogEntry({
  date,
  title,
  company,
  logo,
  highlights,
  statLabel,
  description,
}: {
  date: string;
  title: string;
  company: string;
  logo: string;
  highlights?: string[];
  statLabel?: string;
  description?: string;
}) {
  const isPresent = date.toLowerCase().includes("present");

  return (
    <ScrollLinked>
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

          {description && <p className="exp-log-desc">{description}</p>}
        </div>
      </div>
    </ScrollLinked>
  );
}

export default function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <WordReveal text="Experience & Education" />
        <Reveal delay={0.12}>
          <p style={{ marginBottom: "2.25rem", maxWidth: "60ch" }}>
            Professional engineering roles, applied AI research, and academic milestones.
          </p>
        </Reveal>

        {/* WORK EXPERIENCE BLOCK */}
        <div className="exp-block">
          <div className="exp-block-header">
            <span className="exp-block-label">Work Experience</span>
            <span className="exp-block-count">[ 04 ROLES ]</span>
          </div>
          <TimelineRail>
            {experience.work.map((item) => (
              <LogEntry
                key={item.title + item.company}
                date={item.date}
                title={item.title}
                company={item.company}
                logo={item.logo}
                highlights={item.highlights}
              />
            ))}
          </TimelineRail>
        </div>

        {/* EDUCATION BLOCK */}
        <div className="exp-block" style={{ marginTop: "3.5rem" }}>
          <div className="exp-block-header">
            <span className="exp-block-label">Education</span>
            <span className="exp-block-count">[ 02 ACADEMIC ]</span>
          </div>
          <TimelineRail>
            {experience.education.map((item) => (
              <LogEntry
                key={item.title + item.company}
                date={item.date}
                title={item.title}
                company={item.company}
                logo={item.logo}
                statLabel={item.statLabel}
                description={item.description}
              />
            ))}
          </TimelineRail>
        </div>
      </div>
    </section>
  );
}
