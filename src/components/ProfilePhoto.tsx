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
          <svg className="portrait-svg-canvas" viewBox="0 0 440 560" fill="none">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="436" height="556" rx="26" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" />

            {/* Binary output classifications */}
            <text x="410" y="95" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="end">0111</text>
            <text x="410" y="215" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="end">10</text>
            <text x="410" y="340" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="end">0100</text>
            <text x="410" y="465" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="end">01</text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 3: MIDDLE-BACK GLASS PLATE (Flowing Splines, Pointers & Numbers)    */}
        {/* ========================================================================= */}
        <div className="scale-portrait-sheet sheet-middle-splines" aria-hidden="true">
          <svg className="portrait-svg-canvas" viewBox="0 0 440 560" fill="none" stroke="currentColor">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="436" height="556" rx="26" strokeWidth="1.4" strokeOpacity="0.65" />

            {/* Flowing Neural Spline Pathways */}
            <g strokeWidth="1.6" strokeOpacity="0.95" fill="none">
              <path className="scale-spline-anim s-flow-1" d="M 170 95 C 235 65, 285 140, 340 95 S 390 95, 410 95" />
              <path className="scale-spline-anim s-flow-2" d="M 170 210 C 245 165, 290 260, 345 215 S 390 215, 410 215" />
              <path className="scale-spline-anim s-flow-3" d="M 170 335 C 235 385, 295 285, 350 340 S 390 340, 410 340" strokeWidth="1.9" />
              <path className="scale-spline-anim s-flow-4" d="M 170 460 C 245 500, 295 415, 350 465 S 390 465, 410 465" />
              <path d="M 245 165 C 285 225, 310 280, 350 340" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
            </g>

            {/* Directional Triangles & Nodes on Spline Paths */}
            <polygon points="245,85 251,88 245,91" fill="currentColor" />
            <polygon points="340,92 346,95 340,98" fill="currentColor" />
            <polygon points="250,200 256,203 250,206" fill="currentColor" />
            <polygon points="345,212 351,215 345,218" fill="currentColor" />
            <polygon points="255,350 261,353 255,356" fill="currentColor" />
            <polygon points="350,337 356,340 350,343" fill="currentColor" />
            <polygon points="255,475 261,478 255,481" fill="currentColor" />

            {/* Floating Telemetry Numbers */}
            <text x="200" y="80" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">10</text>
            <text x="295" y="85" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">0111</text>
            <text x="200" y="195" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">01</text>
            <text x="300" y="200" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">1011</text>
            <text x="200" y="320" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">10</text>
            <text x="300" y="325" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">100</text>
            <text x="200" y="445" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9" stroke="none">0111</text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: THE REAL PHOTO CARD (Center Layer - Full Tall Size)              */}
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
          <svg className="portrait-svg-canvas" viewBox="0 0 440 560" fill="none" stroke="currentColor">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="436" height="556" rx="26" strokeWidth="1.6" strokeOpacity="0.85" />

            {/* Dense Organic Edge Contours on Left */}
            <g strokeWidth="1.3" strokeOpacity="0.8">
              <ellipse cx="25" cy="205" rx="8" ry="16" />
              <ellipse cx="40" cy="270" rx="11" ry="20" />
              <ellipse cx="32" cy="360" rx="10" ry="18" />
              <ellipse cx="52" cy="160" rx="8" ry="13" strokeDasharray="3 2" />
              <ellipse cx="62" cy="250" rx="10" ry="17" />
              <ellipse cx="50" cy="415" rx="9" ry="16" strokeDasharray="4 2" />

              {/* Contours around Subject & Server */}
              <path d="M 90 155 C 105 135, 128 135, 138 155 C 148 180, 155 225, 145 270 C 135 315, 112 360, 96 405" />
              <path d="M 105 170 C 115 155, 125 155, 132 170 C 125 195, 120 240, 130 280 C 120 320, 110 360, 105 410" strokeDasharray="3 2" />
            </g>

            {/* Center Focus Rounded Frame */}
            <rect x="85" y="90" width="260" height="380" rx="20" strokeWidth="1.4" strokeOpacity="0.75" />

            {/* Horizontal Dotted Projection Rays Shooting Across with Triangles */}
            <g strokeWidth="1.1" strokeDasharray="4 4" strokeOpacity="0.5">
              <line x1="25" y1="95" x2="410" y2="95" />
              <line x1="52" y1="210" x2="410" y2="210" />
              <line x1="40" y1="335" x2="410" y2="335" />
              <line x1="32" y1="460" x2="410" y2="460" />

              <polygon points="60,92 66,95 60,98" fill="currentColor" />
              <polygon points="80,92 86,95 80,98" fill="currentColor" />
              <polygon points="60,207 66,210 60,213" fill="currentColor" />
              <polygon points="80,207 86,210 80,213" fill="currentColor" />
              <polygon points="60,332 66,335 60,338" fill="currentColor" />
              <polygon points="80,332 86,335 80,338" fill="currentColor" />
              <polygon points="60,457 66,460 60,463" fill="currentColor" />
              <polygon points="80,457 86,460 80,463" fill="currentColor" />
            </g>
          </svg>
        </div>
      </m.div>
    </figure>
  );
}
