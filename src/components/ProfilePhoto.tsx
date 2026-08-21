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
          <svg className="portrait-svg-canvas" viewBox="0 0 380 500" fill="none">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="376" height="496" rx="26" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" />

            {/* Binary output classifications (Exact Scale AI vertical column) */}
            <text x="350" y="85" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10.5" fontWeight="600" textAnchor="end">0111</text>
            <text x="350" y="190" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10.5" fontWeight="600" textAnchor="end">10</text>
            <text x="350" y="300" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10.5" fontWeight="600" textAnchor="end">0100</text>
            <text x="350" y="410" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10.5" fontWeight="600" textAnchor="end">01</text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 3: MIDDLE-BACK GLASS PLATE (Flowing Splines, Pointers & Numbers)    */}
        {/* ========================================================================= */}
        <div className="scale-portrait-sheet sheet-middle-splines" aria-hidden="true">
          <svg className="portrait-svg-canvas" viewBox="0 0 380 500" fill="none" stroke="currentColor">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="376" height="496" rx="26" strokeWidth="1.4" strokeOpacity="0.65" />

            {/* Flowing Neural Spline Pathways */}
            <g strokeWidth="1.6" strokeOpacity="0.95" fill="none">
              {/* Spline 1 (Top to 0111) */}
              <path className="scale-spline-anim s-flow-1" d="M 140 85 C 190 60, 240 120, 285 85 S 330 85, 350 85" />
              {/* Spline 2 (Upper-Middle to 10) */}
              <path className="scale-spline-anim s-flow-2" d="M 140 185 C 200 150, 240 230, 290 190 S 330 190, 350 190" />
              {/* Spline 3 (Lower-Middle to 0100) */}
              <path className="scale-spline-anim s-flow-3" d="M 140 295 C 190 340, 250 250, 295 300 S 330 300, 350 300" strokeWidth="1.9" />
              {/* Spline 4 (Bottom to 01) */}
              <path className="scale-spline-anim s-flow-4" d="M 140 405 C 200 445, 250 370, 295 410 S 330 410, 350 410" />

              {/* Cross-branching flow */}
              <path d="M 200 150 C 240 200, 260 250, 295 300" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
            </g>

            {/* Directional Triangles & Nodes on Spline Paths */}
            <polygon points="205,75 211,78 205,81" fill="currentColor" />
            <polygon points="285,82 291,85 285,88" fill="currentColor" />
            <polygon points="210,175 216,178 210,181" fill="currentColor" />
            <polygon points="290,187 296,190 290,193" fill="currentColor" />
            <polygon points="215,310 221,313 215,316" fill="currentColor" />
            <polygon points="295,297 301,300 295,303" fill="currentColor" />
            <polygon points="215,420 221,423 215,426" fill="currentColor" />

            {/* Floating Telemetry Numbers (Scale AI signature) */}
            <text x="165" y="70" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">10</text>
            <text x="245" y="75" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">0111</text>
            <text x="165" y="170" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">01</text>
            <text x="250" y="175" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">1011</text>
            <text x="165" y="280" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">10</text>
            <text x="250" y="285" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">100</text>
            <text x="165" y="390" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">0111</text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: THE REAL PHOTO CARD (Center Layer - Portrait)                    */}
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
              sizes="(max-width: 860px) 100vw, 800px"
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 1: FRONT GLASS PLATE (Left Contours, Center Focus, Projection Rays) */}
        {/* ========================================================================= */}
        <div className="scale-portrait-sheet sheet-front-contours" aria-hidden="true">
          <svg className="portrait-svg-canvas" viewBox="0 0 380 500" fill="none" stroke="currentColor">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="376" height="496" rx="26" strokeWidth="1.6" strokeOpacity="0.85" />

            {/* Dense Organic Edge Contours on Left */}
            <g strokeWidth="1.3" strokeOpacity="0.8">
              <ellipse cx="20" cy="180" rx="6" ry="14" />
              <ellipse cx="32" cy="240" rx="9" ry="18" />
              <ellipse cx="25" cy="320" rx="8" ry="16" />
              <ellipse cx="45" cy="140" rx="6" ry="11" strokeDasharray="3 2" />
              <ellipse cx="52" cy="220" rx="8" ry="15" />
              <ellipse cx="42" cy="370" rx="7" ry="14" strokeDasharray="4 2" />

              {/* Contours around Subject & Server */}
              <path d="M 75 140 C 90 120, 110 120, 120 140 C 130 165, 135 200, 125 240 C 115 280, 95 320, 80 360" />
              <path d="M 88 155 C 98 140, 108 140, 114 155 C 108 180, 102 215, 112 250 C 102 285, 92 320, 88 365" strokeDasharray="3 2" />
            </g>

            {/* Center Focus Rounded Frame (Scale AI signature) */}
            <rect x="70" y="80" width="220" height="340" rx="20" strokeWidth="1.4" strokeOpacity="0.75" />

            {/* Horizontal Dotted Projection Rays Shooting Across with Triangles */}
            <g strokeWidth="1.1" strokeDasharray="4 4" strokeOpacity="0.5">
              <line x1="20" y1="85" x2="350" y2="85" />
              <line x1="45" y1="185" x2="350" y2="185" />
              <line x1="32" y1="295" x2="350" y2="295" />
              <line x1="25" y1="405" x2="350" y2="405" />

              {/* Directional Triangles along projection rays */}
              <polygon points="50,82 56,85 50,88" fill="currentColor" />
              <polygon points="68,82 74,85 68,88" fill="currentColor" />
              <polygon points="50,182 56,185 50,188" fill="currentColor" />
              <polygon points="68,182 74,185 68,188" fill="currentColor" />
              <polygon points="50,292 56,295 50,298" fill="currentColor" />
              <polygon points="68,292 74,295 68,298" fill="currentColor" />
              <polygon points="50,402 56,405 50,408" fill="currentColor" />
              <polygon points="68,402 74,405 68,408" fill="currentColor" />
            </g>
          </svg>
        </div>
      </m.div>
    </figure>
  );
}
