"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";

interface MetricItem {
  type: "count" | "scramble";
  targetNum?: number;
  suffix?: string;
  prefix?: string;
  rawText?: string;
  label: string;
  sublabel: string;
}

const METRICS: MetricItem[] = [
  {
    type: "count",
    targetNum: 2,
    suffix: "+ Yrs",
    label: "AI/ML Experience",
    sublabel: "Industry & research lab track record",
  },
  {
    type: "count",
    targetNum: 10,
    suffix: "+",
    label: "AI Projects Built",
    sublabel: "GenAI, RAG, Vision & Predictive ML",
  },
  {
    type: "scramble",
    rawText: "BNSP",
    label: "Certified Data Scientist",
    sublabel: "National professional certification",
  },
];

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

function AnimatedMetricValue({ metric, inView }: { metric: MetricItem; inView: boolean }) {
  const reduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(() => {
    if (metric.type === "count") return `${metric.targetNum}${metric.suffix || ""}`;
    return metric.rawText || "";
  });

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || reduceMotion) return;
    hasAnimated.current = true;

    if (metric.type === "count" && typeof metric.targetNum === "number") {
      const target = metric.targetNum;
      const duration = 1000;
      const startTime = performance.now();
      let frameId: number;

      const animateCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.round(ease * target);

        setDisplayText(`${current}${metric.suffix || ""}`);

        if (progress < 1) {
          frameId = requestAnimationFrame(animateCount);
        } else {
          setDisplayText(`${target}${metric.suffix || ""}`);
        }
      };

      frameId = requestAnimationFrame(animateCount);
      return () => cancelAnimationFrame(frameId);
    } else if (metric.type === "scramble" && metric.rawText) {
      const target = metric.rawText;
      const duration = 800;
      const startTime = performance.now();

      const animateScramble = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const charsResolved = Math.floor(progress * target.length);

        let output = "";
        for (let i = 0; i < target.length; i++) {
          if (i < charsResolved) {
            output += target[i];
          } else {
            output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }

        setDisplayText(output);

        if (progress < 1) {
          requestAnimationFrame(animateScramble);
        } else {
          setDisplayText(target);
        }
      };

      requestAnimationFrame(animateScramble);
    }
  }, [inView, metric, reduceMotion]);

  return <div className="telemetry-value">{displayText}</div>;
}

export default function TelemetryStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-20px" });

  return (
    <section className="telemetry-section" aria-label="Engineering telemetry and verified metrics" ref={containerRef}>
      <div className="container">
        <Reveal>
          <div className="telemetry-grid">
            {METRICS.map((metric, index) => (
              <div key={metric.label} className="telemetry-cell">
                <div className="telemetry-index">
                  <span>HIGHLIGHT 0{index + 1}</span>
                </div>
                <AnimatedMetricValue metric={metric} inView={inView} />
                <div className="telemetry-label">{metric.label}</div>
                <div className="telemetry-sublabel">{metric.sublabel}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
