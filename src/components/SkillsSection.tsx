"use client";

import { m, useReducedMotion } from "motion/react";
import skills from "@/content/skills.json";
import { TECH_ICONS, getSkillIconKey } from "./techStackIcons";
import Reveal, { revealVariants } from "./Reveal";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "AI & Machine Learning": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="spec-cat-icon">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
    </svg>
  ),
  "ML Frameworks & Libraries": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="spec-cat-icon">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    </svg>
  ),
  "Languages & Backend": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="spec-cat-icon">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  ),
  "Cloud & MLOps": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="spec-cat-icon">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    </svg>
  ),
  "Languages & Bio": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="spec-cat-icon">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
};

function SkillBrandIcon({ name }: { name: string }) {
  const iconKey = getSkillIconKey(name);
  const iconData = TECH_ICONS[iconKey] || TECH_ICONS.neural;

  return (
    <svg
      className="spec-skill-icon"
      viewBox={iconData.viewBox}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={iconData.path} fillRule="evenodd" clipRule="evenodd" />
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
        <Reveal>
          <h2>Skills &amp; Capabilities</h2>
          <p style={{ marginBottom: "2rem", maxWidth: "60ch" }}>
            Technologies, frameworks, and infrastructure I work with across the AI engineering lifecycle.
          </p>
        </Reveal>

        {/* CLEAN SPEC MATRIX LIST */}
        <div className="spec-matrix-table">
          {categoryGroups.map((group, i) => {
            const content = (
              <div className="spec-matrix-row">
                <div className="spec-matrix-category">
                  {CATEGORY_ICONS[group.category]}
                  <span className="spec-matrix-category-name">{group.category}</span>
                </div>
                <div className="spec-matrix-items">
                  {group.items.map((item) => (
                    <span key={item} className="spec-matrix-tag">
                      <SkillBrandIcon name={item} />
                      <span className="spec-matrix-tag-text">{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            );

            if (reduceMotion) {
              return (
                <div key={group.category} className="spec-matrix-row-wrap">
                  {content}
                </div>
              );
            }

            return (
              <m.div
                key={group.category}
                className="spec-matrix-row-wrap"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={revealVariants}
                transition={{
                  duration: 0.45,
                  delay: Math.min(i, 4) * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {content}
              </m.div>
            );
          })}

          {/* LANGUAGE PROFICIENCY ROW */}
          {languageGroup && (
            <div className="spec-matrix-row spec-matrix-row-footer">
              <div className="spec-matrix-category">
                {CATEGORY_ICONS[languageGroup.category]}
                <span className="spec-matrix-category-name">Languages</span>
              </div>
              <div className="spec-matrix-items">
                {languageGroup.items.map((item) => (
                  <span key={item} className="spec-matrix-lang-tag">
                    <span className="spec-matrix-lang-dot">●</span>
                    <strong className="spec-matrix-lang-name">{item.split(" (")[0]}</strong>{" "}
                    <span className="spec-matrix-lang-level">({item.split(" (")[1]}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
