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
          <svg className="portrait-svg-canvas" viewBox="0 0 350 440" fill="none">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="346" height="436" rx="24" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" />

            {/* Binary output classifications */}
            <text x="325" y="75" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10" fontWeight="600" textAnchor="end">0111</text>
            <text x="325" y="170" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10" fontWeight="600" textAnchor="end">10</text>
            <text x="325" y="265" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10" fontWeight="600" textAnchor="end">0100</text>
            <text x="325" y="365" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10" fontWeight="600" textAnchor="end">01</text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 3: MIDDLE-BACK GLASS PLATE (Flowing Splines, Pointers & Numbers)    */}
        {/* ========================================================================= */}
        <div className="scale-portrait-sheet sheet-middle-splines" aria-hidden="true">
          <svg className="portrait-svg-canvas" viewBox="0 0 350 440" fill="none" stroke="currentColor">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="346" height="436" rx="24" strokeWidth="1.4" strokeOpacity="0.65" />

            {/* Flowing Neural Spline Pathways */}
            <g strokeWidth="1.6" strokeOpacity="0.95" fill="none">
              <path className="scale-spline-anim s-flow-1" d="M 130 75 C 180 50, 220 110, 260 75 S 305 75, 325 75" />
              <path className="scale-spline-anim s-flow-2" d="M 130 165 C 190 130, 225 200, 265 170 S 305 170, 325 170" />
              <path className="scale-spline-anim s-flow-3" d="M 130 260 C 180 300, 230 225, 270 265 S 305 265, 325 265" strokeWidth="1.9" />
              <path className="scale-spline-anim s-flow-4" d="M 130 360 C 190 395, 230 325, 270 365 S 305 365, 325 365" />
              <path d="M 190 130 C 220 180, 245 220, 270 265" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
            </g>

            {/* Directional Triangles & Nodes on Spline Paths */}
            <polygon points="190,67 196,70 190,73" fill="currentColor" />
            <polygon points="260,72 266,75 260,78" fill="currentColor" />
            <polygon points="195,155 201,158 195,161" fill="currentColor" />
            <polygon points="265,167 271,170 265,173" fill="currentColor" />
            <polygon points="200,275 206,278 200,281" fill="currentColor" />
            <polygon points="270,262 276,265 270,268" fill="currentColor" />
            <polygon points="200,375 206,378 200,381" fill="currentColor" />

            {/* Floating Telemetry Numbers */}
            <text x="150" y="62" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8" stroke="none">10</text>
            <text x="225" y="67" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8" stroke="none">0111</text>
            <text x="150" y="152" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8" stroke="none">01</text>
            <text x="230" y="157" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8" stroke="none">1011</text>
            <text x="150" y="250" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8" stroke="none">10</text>
            <text x="230" y="255" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8" stroke="none">100</text>
            <text x="150" y="348" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8" stroke="none">0111</text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: THE REAL PHOTO CARD (Center Layer - Symmetrical Height)          */}
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
              sizes="(max-width: 860px) 100vw, 750px"
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 1: FRONT GLASS PLATE (Left Contours, Center Focus, Projection Rays) */}
        {/* ========================================================================= */}
        <div className="scale-portrait-sheet sheet-front-contours" aria-hidden="true">
          <svg className="portrait-svg-canvas" viewBox="0 0 350 440" fill="none" stroke="currentColor">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="346" height="436" rx="24" strokeWidth="1.6" strokeOpacity="0.85" />

            {/* Dense Organic Edge Contours on Left */}
            <g strokeWidth="1.3" strokeOpacity="0.8">
              <ellipse cx="20" cy="160" rx="6" ry="13" />
              <ellipse cx="30" cy="215" rx="8" ry="16" />
              <ellipse cx="25" cy="285" rx="7" ry="14" />
              <ellipse cx="40" cy="125" rx="6" ry="10" strokeDasharray="3 2" />
              <ellipse cx="46" cy="195" rx="7" ry="14" />
              <ellipse cx="38" cy="330" rx="6" ry="12" strokeDasharray="4 2" />

              {/* Contours around Subject & Server */}
              <path d="M 70 120 C 85 105, 100 105, 110 120 C 118 145, 122 175, 114 210 C 105 245, 88 285, 75 320" />
              <path d="M 80 135 C 90 120, 98 120, 104 135 C 98 155, 94 190, 102 220 C 94 250, 85 285, 82 325" strokeDasharray="3 2" />
            </g>

            {/* Center Focus Rounded Frame */}
            <rect x="65" y="70" width="205" height="300" rx="18" strokeWidth="1.4" strokeOpacity="0.75" />

            {/* Horizontal Dotted Projection Rays Shooting Across with Triangles */}
            <g strokeWidth="1.1" strokeDasharray="4 4" strokeOpacity="0.5">
              <line x1="20" y1="75" x2="325" y2="75" />
              <line x1="40" y1="165" x2="325" y2="165" />
              <line x1="30" y1="260" x2="325" y2="260" />
              <line x1="25" y1="360" x2="325" y2="360" />

              <polygon points="45,72 51,75 45,78" fill="currentColor" />
              <polygon points="62,72 68,75 62,78" fill="currentColor" />
              <polygon points="45,162 51,165 45,168" fill="currentColor" />
              <polygon points="62,162 68,165 62,168" fill="currentColor" />
              <polygon points="45,257 51,260 45,263" fill="currentColor" />
              <polygon points="62,257 68,260 62,263" fill="currentColor" />
              <polygon points="45,357 51,360 45,363" fill="currentColor" />
              <polygon points="62,357 68,360 62,363" fill="currentColor" />
            </g>
          </svg>
        </div>
      </m.div>
    </figure>
  );
}
