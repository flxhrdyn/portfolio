"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import skills from "@/content/skills.json";
import Reveal from "./Reveal";
import { TECH_ICONS, getSkillIconKey } from "./techStackIcons";
import WordReveal from "./WordReveal";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

// Column rules draw top to bottom; that is the section's one standout motion, text only fades.
const tableVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const columnVariants: Variants = {
  hidden: {},
  show: {},
};

const ruleVariants: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.9, ease: EASE_OUT } },
};

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.2 } },
};

const pad = (n: number) => String(n).padStart(2, "0");

function SkillIcon({ name }: { name: string }) {
  const icon = TECH_ICONS[getSkillIconKey(name)] || TECH_ICONS.neural;
  return (
    <svg className="skill-row-icon" viewBox={icon.viewBox} fill="currentColor" aria-hidden="true">
      <path d={icon.path} fillRule={icon.fillRule ?? "evenodd"} clipRule={icon.fillRule ?? "evenodd"} />
    </svg>
  );
}

export default function SkillsSection() {
  const reduceMotion = useReducedMotion();
  const categoryGroups = skills.filter((group) => group.category !== "Languages & Bio");
  const languageGroup = skills.find((group) => group.category === "Languages & Bio");

  return (
    <section className="section" id="skills">
      <div className="container">
        <WordReveal text="Skills & Capabilities" />
        <Reveal delay={0.12}>
          <p style={{ marginBottom: "2.25rem", maxWidth: "60ch" }}>
            Core concepts, frameworks, and infrastructure I work with across the AI engineering lifecycle.
          </p>
        </Reveal>

        <m.div
          className="skill-table"
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={VIEWPORT}
          variants={tableVariants}
        >
          {categoryGroups.map((group) => (
            <m.div
              key={group.category}
              className="skill-col"
              variants={columnVariants}
            >
              <m.span className="skill-col-rule" aria-hidden="true" variants={ruleVariants} />
              <m.div variants={contentVariants}>
                <h3 className="skill-col-title">
                  {group.category}
                  <span className="skill-col-count">{pad(group.items.length)}</span>
                </h3>
                <ol className="skill-col-list">
                  {group.items.map((item, i) => (
                    <li key={item} className="skill-row">
                      <span className="skill-row-num">{pad(i + 1)}</span>
                      <SkillIcon name={item} />
                      <span className="skill-row-name">{item}</span>
                    </li>
                  ))}
                </ol>
              </m.div>
            </m.div>
          ))}
        </m.div>

        {languageGroup && (
          <p className="skill-languages">
            <span className="skill-languages-label">Languages</span>
            {languageGroup.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}
