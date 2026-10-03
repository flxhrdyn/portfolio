"use client";

import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";
import ProfilePhoto from "./ProfilePhoto";
import { scrollToAnchor } from "@/lib/scrollToAnchor";
import { EASE_OUT, DUR, LIST_STAGGER } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: LIST_STAGGER * 1.6, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.entrance, ease: EASE_OUT } },
};

// Description slides in from the left - different rhythm from the headline wipe.
const slideIn: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

// Headline lines wipe open with a horizontal clip-path mask - the focal entrance.
const line: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const clipReveal: Variants = {
  hidden: { clipPath: "inset(-0.4em 100% -0.4em 0)" },
  show: {
    clipPath: "inset(-0.4em 0% -0.4em 0)",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

// Words inside each line stagger after the clip opens.
const word: Variants = {
  hidden: { opacity: 0, y: "40%" },
  show: { opacity: 1, y: "0%", transition: { duration: 0.5, ease: EASE_OUT } },
};

function Word({ children }: { children: string }) {
  return (
    <span className="hero-word">
      <m.span className="hero-word-inner" variants={word}>
        {children}
      </m.span>
    </span>
  );
}

// Photo opens from a thin slit, like a detection window locking on.
const photo: Variants = {
  hidden: { width: 0, opacity: 0 },
  show: { width: "auto", opacity: 1, transition: { duration: 0.9, ease: EASE_OUT, delay: 0.5 } },
};

export default function PortfolioHero() {
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [covered, setCovered] = useState(false);

  // The sticky hero keeps painting under the sections that slide over it, and Chrome leaks
  // slivers of its masked headline through. Hide it once it is fully covered.
  useEffect(() => {
    let cachedHeight = wrapperRef.current?.offsetHeight ?? 0;
    const updateHeight = () => {
      cachedHeight = wrapperRef.current?.offsetHeight ?? 0;
    };
    window.addEventListener("resize", updateHeight);

    const onScroll = () => {
      setCovered(window.scrollY > cachedHeight * 2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      id="about"
      ref={wrapperRef}
      className="hero-wrapper portfolio-hero-wrapper"
      style={covered ? { visibility: "hidden" } : undefined}
    >
      <m.header
        className="container hero-stage"
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "show"}
        variants={container}
      >
        <m.p className="hero-name" variants={item}>
          Felix Windriyareksa Hardyan
        </m.p>

        <h1 className="hero-headline">
          <m.span className="hero-line" variants={clipReveal}>
            <m.span className="hero-line-inner" variants={line}>
              <Word>AI</Word>
              <m.span className="hero-inline-photo" variants={photo}>
                <ProfilePhoto />
              </m.span>
              <Word>Engineer</Word>
            </m.span>
          </m.span>
          <m.span className="hero-line" variants={clipReveal}>
            <m.span className="hero-line-inner" variants={line}>
              <Word>&amp;</Word>
              <Word>Data</Word>
              <Word>Scientist</Word>
            </m.span>
          </m.span>
        </h1>

        <m.p className="hero-description" variants={slideIn}>
          AI/ML Engineer building production RAG systems, deep learning architectures, and industrial data pipelines.
        </m.p>

        <m.div className="hero-actions" variants={item}>
          <a
            href="#contact"
            className="typesafe-cta"
            onClick={(e) => scrollToAnchor(e, "#contact")}
            title="Get in touch with Felix"
          >
            Get in touch
            <svg className="typesafe-cta-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </m.div>
      </m.header>
    </div>
  );
}
