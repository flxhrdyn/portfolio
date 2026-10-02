"use client";

import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";
import ProfilePhoto from "./ProfilePhoto";
import { scrollToAnchor } from "@/lib/scrollToAnchor";
import { EASE_OUT, DUR, LIST_STAGGER, WORD_STAGGER } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: LIST_STAGGER * 1.6, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.entrance, ease: EASE_OUT } },
};

// Same word-by-word rise as the contact headline, so the page opens and closes alike.
const line: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: WORD_STAGGER * 1.6 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "100%" },
  show: { opacity: 1, y: "0%", transition: { duration: 0.6, ease: EASE_OUT } },
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
    const onScroll = () => {
      const height = wrapperRef.current?.offsetHeight ?? 0;
      setCovered(window.scrollY > height * 2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          <span className="hero-line">
            <m.span className="hero-line-inner" variants={line}>
              <Word>AI</Word>
              <m.span className="hero-inline-photo" variants={photo}>
                <ProfilePhoto />
              </m.span>
              <Word>Engineer</Word>
            </m.span>
          </span>
          <span className="hero-line">
            <m.span className="hero-line-inner" variants={line}>
              <Word>&amp;</Word>
              <Word>Data</Word>
              <Word>Scientist</Word>
            </m.span>
          </span>
        </h1>

        <m.p className="hero-description" variants={item}>
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
          </a>
        </m.div>
      </m.header>
    </div>
  );
}
