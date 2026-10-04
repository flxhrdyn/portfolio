"use client";

import { scrollVariants } from "@/lib/scroll-motion";

import { useId, useState } from "react";
import { AnimatePresence, m, useReducedMotion, type Variants } from "motion/react";
import experience from "@/content/experience.json";
import CompanyLogo from "./CompanyLogo";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

const rowVariants: Variants = scrollVariants({
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
});

// Each row's top rule draws across first, then the row's text unmasks in sync like an inked ledger entry.
const ruleVariants: Variants = scrollVariants({
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
});

const textVariants: Variants = scrollVariants({
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 } },
});

function ExpRow({
  date,
  title,
  company,
  logo,
  headline,
  details,
}: {
  date: string;
  title: string;
  company: string;
  logo: string;
  headline: string;
  details: string[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const reduceMotion = useReducedMotion();
  const isPresent = date.toLowerCase().includes("present");
  const expandable = details.length > 0;

  const summary = (
    <>
      <span className="exp-row-date">
        {isPresent && <span className="exp-live-indicator" title="Current role" />}
        {date}
      </span>
      <span className="exp-row-main">
        <span className="exp-row-title">{title}</span>
        <span className="exp-row-company">
          <CompanyLogo src={logo} company={company} />
          {company}
        </span>
        <span className="exp-row-headline">{headline}</span>
      </span>
    </>
  );

  return (
    <m.li
      className="exp-row"
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={rowVariants}
    >
      <m.span className="exp-row-rule" aria-hidden="true" variants={reduceMotion ? undefined : ruleVariants} />
      <m.div variants={reduceMotion ? undefined : textVariants}>
        {expandable ? (
          <button
            type="button"
            className="exp-row-head"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            {summary}
            <span className="exp-row-toggle" aria-hidden="true" data-open={open}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="exp-row-toggle-icon"
              >
                <line x1="6" y1="1.5" x2="6" y2="10.5" />
                <line x1="1.5" y1="6" x2="10.5" y2="6" />
              </svg>
            </span>
          </button>
        ) : (
          <div className="exp-row-head exp-row-head-static">{summary}</div>
        )}

        {expandable && (
          <div
            id={panelId}
            className="exp-row-panel"
            data-open={open}
            aria-hidden={!open}
          >
            <div className="exp-row-panel-inner">
              <span className="exp-row-panel-rule" aria-hidden="true" />
              <ul className="exp-row-details">
                {details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </m.div>
    </m.li>
  );
}

function ExpGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="exp-group">
      <Reveal delay={0.06}>
        <p className="subsection-title">{label}</p>
      </Reveal>
      <ul className="exp-rows">
        {children}
      </ul>
    </div>
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

        <ExpGroup label="Work Experience">
          {experience.work.map((item) => (
            <ExpRow
              key={item.title + item.company}
              date={item.date}
              title={item.title}
              company={item.company}
              logo={item.logo}
              headline={item.headline}
              details={item.highlights}
            />
          ))}
        </ExpGroup>

        <ExpGroup label="Education">
          {experience.education.map((item) => (
            <ExpRow
              key={item.title + item.company}
              date={item.date}
              title={item.title}
              company={item.company}
              logo={item.logo}
              headline={item.statLabel}
              details={[item.description]}
            />
          ))}
        </ExpGroup>
      </div>
    </section>
  );
}
