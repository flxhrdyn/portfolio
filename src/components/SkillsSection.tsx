"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import skills from "@/content/skills.json";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

const columnVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

const pad = (n: number) => String(n).padStart(2, "0");

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

        <div className="skill-table">
          {categoryGroups.map((group) => (
            <m.div
              key={group.category}
              className="skill-col"
              initial={reduceMotion ? false : "hidden"}
              whileInView="show"
              viewport={VIEWPORT}
              variants={columnVariants}
            >
              <h3 className="skill-col-title">
                {group.category}
                <span className="skill-col-count">{pad(group.items.length)}</span>
              </h3>
              <ol className="skill-col-list">
                {group.items.map((item, i) => (
                  <m.li key={item} className="skill-row" variants={rowVariants}>
                    <span className="skill-row-num">{pad(i + 1)}</span>
                    <span className="skill-row-name">{item}</span>
                  </m.li>
                ))}
              </ol>
            </m.div>
          ))}
        </div>

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
