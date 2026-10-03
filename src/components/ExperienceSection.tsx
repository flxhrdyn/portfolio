"use client";

import { useId, useState } from "react";
import { AnimatePresence, m, useReducedMotion, type Variants } from "motion/react";
import experience from "@/content/experience.json";
import CompanyLogo from "./CompanyLogo";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// Each row's top rule draws across first, then the row's text unmasks in sync like an inked ledger entry.
const ruleVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.85, ease: EASE_OUT } },
};

const textVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.25 } },
};

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
    <m.li className="exp-row" variants={reduceMotion ? undefined : listVariants}>
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
              +
            </span>
          </button>
        ) : (
          <div className="exp-row-head exp-row-head-static">{summary}</div>
        )}

        <AnimatePresence initial={false}>
          {open && (
            <m.div
              id={panelId}
              className="exp-row-panel"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <ul className="exp-row-details">
                {details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </m.li>
  );
}

function ExpGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="exp-group">
      <p className="subsection-title">{label}</p>
      <m.ul
        className="exp-rows"
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={VIEWPORT}
        variants={listVariants}
      >
        {children}
      </m.ul>
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
