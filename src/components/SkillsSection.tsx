"use client";

import { scrollVariants } from "@/lib/scroll-motion";

import { m, useReducedMotion, type Variants } from "motion/react";
import skills from "@/content/skills.json";
import Reveal from "./Reveal";
import { TECH_ICONS, getSkillIconKey } from "./techStackIcons";
import WordReveal from "./WordReveal";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

const SKILL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const tableVariants: Variants = scrollVariants({
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
});

const columnVariants: Variants = scrollVariants({
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
});

// Vertical column dividers scale from top to bottom
const columnRuleVariants: Variants = scrollVariants({
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.85, ease: SKILL_EASE } },
});

const columnTitleVariants: Variants = scrollVariants({
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: SKILL_EASE } },
});

const rowVariants: Variants = scrollVariants({
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
});

const rowRuleVariants: Variants = scrollVariants({
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.65, ease: SKILL_EASE } },
});

const rowContentVariants: Variants = scrollVariants({
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: SKILL_EASE } },
});

const languagesContainerVariants: Variants = scrollVariants({
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
});

const languagesRuleVariants: Variants = scrollVariants({
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: SKILL_EASE } },
});

const languageItemVariants: Variants = scrollVariants({
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: SKILL_EASE } },
});

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
              <m.span className="skill-col-rule" aria-hidden="true" variants={reduceMotion ? undefined : columnRuleVariants} />
              <div>
                <m.h3 className="skill-col-title" variants={reduceMotion ? undefined : columnTitleVariants}>
                  {group.category}
                  <span className="skill-col-count">{pad(group.items.length)}</span>
                </m.h3>
                <ol className="skill-col-list">
                  {group.items.map((item, i) => (
                    <m.li key={item} className="skill-row" variants={reduceMotion ? undefined : rowVariants}>
                      <m.span className="skill-row-rule" aria-hidden="true" variants={reduceMotion ? undefined : rowRuleVariants} />
                      <m.span className="skill-row-num" variants={reduceMotion ? undefined : rowContentVariants}>{pad(i + 1)}</m.span>
                      <m.span style={{ display: "inline-flex", alignItems: "center" }} variants={reduceMotion ? undefined : rowContentVariants}>
                        <SkillIcon name={item} />
                      </m.span>
                      <m.span className="skill-row-name" variants={reduceMotion ? undefined : rowContentVariants}>{item}</m.span>
                    </m.li>
                  ))}
                </ol>
              </div>
            </m.div>
          ))}
        </m.div>

        {languageGroup && (
          <m.div
            className="skill-languages"
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={VIEWPORT}
            variants={languagesContainerVariants}
          >
            <m.span className="skill-languages-rule" aria-hidden="true" variants={reduceMotion ? undefined : languagesRuleVariants} />
            <m.span className="skill-languages-label" variants={reduceMotion ? undefined : languageItemVariants}>Languages</m.span>
            {languageGroup.items.map((item) => (
              <m.span key={item} variants={reduceMotion ? undefined : languageItemVariants}>{item}</m.span>
            ))}
          </m.div>
        )}
      </div>
    </section>
  );
}
