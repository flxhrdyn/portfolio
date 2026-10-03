"use client";

import { useState, useEffect, useRef } from "react";
import { m, useInView, useReducedMotion, type Variants } from "motion/react";
import skills from "@/content/skills.json";
import Reveal from "./Reveal";
import { TECH_ICONS, getSkillIconKey } from "./techStackIcons";
import WordReveal from "./WordReveal";
import ScrambleText from "./ScrambleText";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

const tableVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT, staggerChildren: 0.04, delayChildren: 0.15 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

function CategoryCounter({ target, delay = 0 }: { target: number; delay?: number }) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? target : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || reduceMotion) return;
    hasAnimated.current = true;

    const timeout = setTimeout(() => {
      const duration = 800;
      const startTime = performance.now();
      let frameId: number;

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.round(ease * target);
        setCount(current);

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      frameId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [inView, target, delay, reduceMotion]);

  return (
    <span ref={ref} className="skill-col-count">
      {pad(count)}
    </span>
  );
}

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
          {categoryGroups.map((group, colIdx) => (
            <m.div
              key={group.category}
              className="skill-col"
              variants={columnVariants}
            >
              <h3 className="skill-col-title">
                <ScrambleText text={group.category} delay={0.1 + colIdx * 0.1} duration={500} />
                <CategoryCounter target={group.items.length} delay={0.15 + colIdx * 0.1} />
              </h3>
              <ol className="skill-col-list">
                {group.items.map((item, i) => (
                  <m.li key={item} className="skill-row" variants={rowVariants}>
                    <span className="skill-row-num">{pad(i + 1)}</span>
                    <SkillIcon name={item} />
                    <span className="skill-row-name">{item}</span>
                  </m.li>
                ))}
              </ol>
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
