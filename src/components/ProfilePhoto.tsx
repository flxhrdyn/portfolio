"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import profile from "@/content/profile.json";

// Keep in sync with the .cv-bounding-box percentages in globals.css
const BOX = { top: 0.15, left: 0.07, width: 0.335, height: 0.82 };
const CARD_WIDTH = 160;
const CARD_HEIGHT = 168;
const CARD_GAP = 18;

export default function ProfilePhoto() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [boxHovered, setBoxHovered] = useState(false);
  const [cardPos, setCardPos] = useState({ top: 0, left: 0 });

  if (!profile.photo) return null;

  // Position locks to where the cursor entered the box and holds until it leaves —
  // re-entering picks a fresh spot instead of tracking every move.
  const handleBoxMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const top = Math.min(Math.max(y - CARD_HEIGHT / 2, 8), rect.height - CARD_HEIGHT - 8);
    const left = Math.min(Math.max(x + CARD_GAP, 8), rect.width - CARD_WIDTH - 8);
    setCardPos({ top, left });
    setBoxHovered(true);
  };

  return (
    <figure
      ref={containerRef}
      className="cv-portrait-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      aria-label="Felix Windriyareksa Hardyan | AI Engineer & Data Scientist"
    >
      {/* Authentic High-Res Specimen Photo */}
      <div className="cv-photo-wrapper">
        <Image
          src={profile.photo}
          alt={profile.photoAlt}
          fill
          priority
          unoptimized
          quality={100}
          sizes="(max-width: 860px) 100vw, 560px"
          className="cv-photo-img"
        />
      </div>

      {/* Detection Bounding Box (reticle corners match PageTransitionLoader) */}
      <div
        className={`cv-bounding-box ${isHovered ? "is-active" : ""}`}
        onMouseEnter={handleBoxMouseEnter}
        onMouseLeave={() => setBoxHovered(false)}
        style={{
          top: `${BOX.top * 100}%`,
          left: `${BOX.left * 100}%`,
          width: `${BOX.width * 100}%`,
          height: `${BOX.height * 100}%`,
        }}
      >
        <span className="reticle-corner reticle-tl" aria-hidden="true" />
        <span className="reticle-corner reticle-tr" aria-hidden="true" />
        <span className="reticle-corner reticle-bl" aria-hidden="true" />
        <span className="reticle-corner reticle-br" aria-hidden="true" />

        <div className="cv-detection-tag" aria-hidden="true">
          <span className="cv-tag-text">AI ENGINEER // 0.98</span>
        </div>
      </div>

      {/* Compact Bio Tooltip — only while the cursor is inside the bounding box */}
      <AnimatePresence>
        {boxHovered && (
          <m.div
            className="cv-bio-card"
            style={reduceMotion ? undefined : { left: cardPos.left, top: cardPos.top }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="cv-bio-name">Felix Windriyareksa Hardyan</span>
            <span className="cv-bio-role">AI Engineer &amp; Data Scientist</span>

            <div className="cv-bio-details">
              <div className="cv-bio-row">
                <span className="cv-bio-key">Focus</span>
                <span className="cv-bio-val">GenAI &middot; ML &middot; Data Science</span>
              </div>
              <div className="cv-bio-row">
                <span className="cv-bio-key">Base</span>
                <span className="cv-bio-val">Indonesia (UTC+7)</span>
              </div>
              <div className="cv-bio-row">
                <span className="cv-bio-key">Status</span>
                <span className="cv-bio-val cv-status-active">Available for work</span>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </figure>
  );
}
