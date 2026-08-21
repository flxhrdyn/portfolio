"use client";

import { useState } from "react";
import Image from "next/image";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import profile from "@/content/profile.json";

export default function ProfilePhoto() {
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  if (!profile.photo) return null;

  return (
    <figure
      className="cv-portrait-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

      {/* Computer Vision Object Detection Bounding Box */}
      <div className={`cv-bounding-box ${isHovered ? "is-active" : ""}`} aria-hidden="true">
        {/* 4 Cybernetic Corner Reticles */}
        <span className="cv-reticle cv-reticle-tl">┌</span>
        <span className="cv-reticle cv-reticle-tr">┐</span>
        <span className="cv-reticle cv-reticle-bl">└</span>
        <span className="cv-reticle cv-reticle-br">┘</span>

        {/* Top-Left Detection Tag */}
        <div className="cv-detection-tag">
          <span className="cv-status-indicator" />
          <span className="cv-tag-text">AI_ENGINEER // CONF: 99.8%</span>
        </div>

        {/* Subtle Center Optical Crosshair */}
        <div className="cv-crosshair" />

        {/* Bottom Coordinates Readout */}
        <div className="cv-coord-tag">
          <span>OBJ_ID: FLX // BBOX: [14, 18, 92, 94]</span>
        </div>
      </div>

      {/* Interactive Micro Bio Card (Reveals on Hover / Focus) */}
      <AnimatePresence>
        {isHovered && (
          <m.div
            className="cv-bio-card"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cv-bio-header">
              <span className="cv-bio-name">Felix Windriyareksa Hardyan</span>
              <span className="cv-bio-role">AI Engineer &amp; Data Scientist</span>
            </div>

            <div className="cv-bio-divider" />

            <div className="cv-bio-details">
              <div className="cv-bio-row">
                <span className="cv-bio-key">FOCUS</span>
                <span className="cv-bio-val">GenAI &middot; Machine Learning &middot; Data Science</span>
              </div>
              <div className="cv-bio-row">
                <span className="cv-bio-key">BASE</span>
                <span className="cv-bio-val">Indonesia (UTC+7)</span>
              </div>
              <div className="cv-bio-row">
                <span className="cv-bio-key">STATUS</span>
                <span className="cv-bio-val cv-status-active">Available for Work &amp; Collab</span>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </figure>
  );
}
