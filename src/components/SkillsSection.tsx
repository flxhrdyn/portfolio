"use client";

import { m, useReducedMotion } from "motion/react";
import skills from "@/content/skills.json";
import TechStackCarousel from "./TechStackCarousel";
import Reveal, { revealVariants } from "./Reveal";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "AI & Machine Learning": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
    </svg>
  ),
  "ML Frameworks & Libraries": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    </svg>
  ),
  "Languages & Backend": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  ),
  "Cloud & MLOps": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    </svg>
  ),
  "Languages & Bio": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
};

const BRAND_ITEMS = new Set([
  "Bahasa Indonesia (Native)",
  "English (Professional, TOEFL: 650)",
]);

export default function SkillsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <h2>Skills</h2>
          <p style={{ marginBottom: "2rem" }}>
            Tools, languages, and frameworks I work with.
          </p>
        </Reveal>

        <TechStackCarousel />

        <div className="skills-grid">
          {skills.map((group, i) => {
            const content = (
              <>
                <div className="skill-category-title">
                  {CATEGORY_ICONS[group.category]}
                  <span>{group.category}</span>
                </div>
                <div className="skill-pills">
                  {group.items.map((item) =>
                    BRAND_ITEMS.has(item) ? (
                      <span key={item} className="skill-pill">
                        <strong style={{ color: "var(--accent-text)" }}>{item.split(" (")[0]}</strong> ({item.split(" (")[1]}
                      </span>
                    ) : (
                      <span key={item} className="skill-pill">
                        <span>{item}</span>
                      </span>
                    )
                  )}
                </div>
              </>
            );

            if (reduceMotion) {
              return (
                <div key={group.category} className="skill-category">
                  {content}
                </div>
              );
            }

            return (
              <m.div
                key={group.category}
                className="skill-category"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={revealVariants}
                transition={{ duration: 0.5, delay: Math.min(i, 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {content}
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
