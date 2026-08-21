"use client";

import { useState } from "react";
import Image from "next/image";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import profile from "@/content/profile.json";

export default function ProfilePhoto() {
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  if (!profile.photo) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <figure
      className="cv-portrait-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      aria-label="Felix Windriyareksa Hardyan — AI Engineer & Data Scientist"
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
      <div className={`cv-bounding-box ${isHovered ? "is-active" : ""}`} aria-hidden="true">
        <span className="reticle-corner reticle-tl" />
        <span className="reticle-corner reticle-tr" />
        <span className="reticle-corner reticle-bl" />
        <span className="reticle-corner reticle-br" />

        <div className="cv-detection-tag">
          <span className="cv-status-indicator" />
          <span className="cv-tag-text">AI ENGINEER</span>
        </div>
      </div>

      {/* Compact Bio Tooltip — follows cursor within the frame */}
      <AnimatePresence>
        {isHovered && (
          <m.div
            className="cv-bio-card"
            style={reduceMotion ? undefined : { left: cursor.x, top: cursor.y }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
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
