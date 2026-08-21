"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import profile from "@/content/profile.json";

export default function ProfilePhoto() {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse offset values (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 180, mass: 0.6 };

  // Idle: 0deg flat.
  // Hovered: Exact Scale AI horizontal 3D tilt (-22deg Y, 4deg X, -2deg Z)
  const targetRotateX = isHovered ? 4 : 0;
  const targetRotateY = isHovered ? -22 : 0;
  const targetRotateZ = isHovered ? -2 : 0;

  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], [targetRotateX + 3, targetRotateX - 3]);
  const rawRotateY = useTransform(mouseX, [-0.5, 0.5], [targetRotateY - 4, targetRotateY + 4]);
  const rawRotateZ = useTransform(mouseX, [-0.5, 0.5], [targetRotateZ - 1.5, targetRotateZ + 1.5]);

  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const rotateZ = useSpring(rawRotateZ, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!profile.photo) return null;

  return (
    <figure className="scale-portrait-viewport">
      <m.div
        ref={cardRef}
        className={`scale-portrait-stack ${isHovered ? "is-hovered" : "is-idle"}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          reduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                rotateZ,
                transformStyle: "preserve-3d",
              }
        }
      >
        {/* ========================================================================= */}
        {/* LAYER 4: BACK-MOST OUTPUT GLASS PLATE (Right-Shifted Classifications)     */}
        {/* ========================================================================= */}
        <div className="scale-portrait-sheet sheet-back-output" aria-hidden="true">
          <svg className="portrait-svg-canvas" viewBox="0 0 420 520" fill="none">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="416" height="516" rx="26" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" />

            {/* Binary output classifications (Exact Scale AI vertical column) */}
            <text x="390" y="90" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="end">0111</text>
            <text x="390" y="200" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="end">10</text>
            <text x="390" y="315" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="end">0100</text>
            <text x="390" y="430" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="end">01</text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 3: MIDDLE-BACK GLASS PLATE (Flowing Splines, Pointers & Numbers)    */}
        {/* ========================================================================= */}
        <div className="scale-portrait-sheet sheet-middle-splines" aria-hidden="true">
          <svg className="portrait-svg-canvas" viewBox="0 0 420 520" fill="none" stroke="currentColor">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="416" height="516" rx="26" strokeWidth="1.4" strokeOpacity="0.65" />

            {/* Flowing Neural Spline Pathways */}
            <g strokeWidth="1.6" strokeOpacity="0.95" fill="none">
              {/* Spline 1 (Top to 0111) */}
              <path className="scale-spline-anim s-flow-1" d="M 160 90 C 220 60, 270 130, 320 90 S 370 90, 390 90" />
              {/* Spline 2 (Upper-Middle to 10) */}
              <path className="scale-spline-anim s-flow-2" d="M 160 195 C 230 155, 275 240, 325 200 S 370 200, 390 200" />
              {/* Spline 3 (Lower-Middle to 0100) */}
              <path className="scale-spline-anim s-flow-3" d="M 160 310 C 220 355, 280 265, 330 315 S 370 315, 390 315" strokeWidth="1.9" />
              {/* Spline 4 (Bottom to 01) */}
              <path className="scale-spline-anim s-flow-4" d="M 160 425 C 230 465, 280 385, 330 430 S 370 430, 390 430" />

              {/* Cross-branching flow */}
              <path d="M 230 155 C 270 210, 295 260, 330 315" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
            </g>

            {/* Directional Triangles & Nodes on Spline Paths */}
            <polygon points="230,80 236,83 230,86" fill="currentColor" />
            <polygon points="320,87 326,90 320,93" fill="currentColor" />
            <polygon points="235,185 241,188 235,191" fill="currentColor" />
            <polygon points="325,197 331,200 325,203" fill="currentColor" />
            <polygon points="240,325 246,328 240,331" fill="currentColor" />
            <polygon points="330,312 336,315 330,318" fill="currentColor" />
            <polygon points="240,440 246,443 240,446" fill="currentColor" />

            {/* Floating Telemetry Numbers (Scale AI signature) */}
            <text x="185" y="75" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">10</text>
            <text x="275" y="80" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">0111</text>
            <text x="185" y="180" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">01</text>
            <text x="280" y="185" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">1011</text>
            <text x="185" y="295" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">10</text>
            <text x="280" y="300" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">100</text>
            <text x="185" y="410" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">0111</text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: THE REAL PHOTO CARD (Center Layer - Matching Chatbot Size)       */}
        {/* ========================================================================= */}
        <div className="scale-portrait-sheet sheet-photo-center">
          <div className="photo-portrait-inner">
            <Image
              src={profile.photo}
              alt={profile.photoAlt}
              fill
              priority
              unoptimized
              quality={100}
              sizes="(max-width: 860px) 100vw, 850px"
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 1: FRONT GLASS PLATE (Left Contours, Center Focus, Projection Rays) */}
        {/* ========================================================================= */}
        <div className="scale-portrait-sheet sheet-front-contours" aria-hidden="true">
          <svg className="portrait-svg-canvas" viewBox="0 0 420 520" fill="none" stroke="currentColor">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="416" height="516" rx="26" strokeWidth="1.6" strokeOpacity="0.85" />

            {/* Dense Organic Edge Contours on Left */}
            <g strokeWidth="1.3" strokeOpacity="0.8">
              <ellipse cx="25" cy="190" rx="7" ry="15" />
              <ellipse cx="38" cy="250" rx="10" ry="19" />
              <ellipse cx="30" cy="335" rx="9" ry="17" />
              <ellipse cx="50" cy="150" rx="7" ry="12" strokeDasharray="3 2" />
              <ellipse cx="58" cy="230" rx="9" ry="16" />
              <ellipse cx="48" cy="385" rx="8" ry="15" strokeDasharray="4 2" />

              {/* Contours around Subject & Server */}
              <path d="M 85 145 C 100 125, 120 125, 130 145 C 140 170, 145 210, 135 250 C 125 290, 105 335, 90 375" />
              <path d="M 98 160 C 108 145, 118 145, 124 160 C 118 185, 112 225, 122 260 C 112 295, 102 335, 98 380" strokeDasharray="3 2" />
            </g>

            {/* Center Focus Rounded Frame (Scale AI signature) */}
            <rect x="80" y="85" width="245" height="355" rx="20" strokeWidth="1.4" strokeOpacity="0.75" />

            {/* Horizontal Dotted Projection Rays Shooting Across with Triangles */}
            <g strokeWidth="1.1" strokeDasharray="4 4" strokeOpacity="0.5">
              <line x1="25" y1="90" x2="390" y2="90" />
              <line x1="50" y1="195" x2="390" y2="195" />
              <line x1="38" y1="310" x2="390" y2="310" />
              <line x1="30" y1="425" x2="390" y2="425" />

              {/* Directional Triangles along projection rays */}
              <polygon points="55,87 61,90 55,93" fill="currentColor" />
              <polygon points="75,87 81,90 75,93" fill="currentColor" />
              <polygon points="55,192 61,195 55,198" fill="currentColor" />
              <polygon points="75,192 81,195 75,198" fill="currentColor" />
              <polygon points="55,307 61,310 55,313" fill="currentColor" />
              <polygon points="75,307 81,310 75,313" fill="currentColor" />
              <polygon points="55,422 61,425 55,428" fill="currentColor" />
              <polygon points="75,422 81,425 75,428" fill="currentColor" />
            </g>
          </svg>
        </div>
      </m.div>
    </figure>
  );
}
