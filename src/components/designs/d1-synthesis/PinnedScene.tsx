"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { motionValue, useMotionValueEvent, useReducedMotion, useScroll, type MotionValue } from "motion/react";

const SceneProgress = createContext<MotionValue<number> | null>(null);

/**
 * Holds its content for at most one extra viewport on wide desktops (see
 * `.d1-pinned-scene` CSS) and exposes scroll progress to descendants. Below that
 * width, or with reduced motion, it is plain document flow.
 */
export function PinnedScene({ name, children }: { name: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (ref.current) ref.current.dataset.progress = value.toFixed(2);
  });
  return (
    <div ref={ref} className="d1-pinned-scene" data-scroll-scene={name}>
      <div className="d1-pinned-scene__inner">
        <SceneProgress.Provider value={scrollYProgress}>{children}</SceneProgress.Provider>
      </div>
    </div>
  );
}

/** Words light up in reading order as the surrounding scene is scrolled. */
export function ScrollLitText({ text }: { text: string }) {
  const progress = useContext(SceneProgress);
  const reduceMotion = useReducedMotion();
  const wordsRef = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  const paint = (value: number) => {
    const spans = wordsRef.current?.children;
    if (!spans) return;
    // Lighting finishes at 80% of the hold so the full title rests before release.
    const lit = (value / 0.8) * spans.length;
    for (let index = 0; index < spans.length; index++) {
      const amount = Math.min(1, Math.max(0, lit - index));
      (spans[index] as HTMLElement).style.opacity = String(DIM + (1 - DIM) * amount);
    }
  };
  useMotionValueEvent(progress ?? IDLE, "change", paint);
  useEffect(() => paint(progress?.get() ?? 0));

  if (!progress || reduceMotion) return <>{text}</>;
  return (
    <span aria-label={text}>
      <span ref={wordsRef} aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} data-lit-word style={{ opacity: DIM }}>
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </span>
  );
}

const DIM = 0.16;
const IDLE = motionValue(0);
