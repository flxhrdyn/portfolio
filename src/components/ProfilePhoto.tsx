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
  // Hovered: Exact Scale AI perspective (-22deg Y, 4deg X, -2deg Z)
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
    <figure className="scale-exact-viewport">
      <m.div
        ref={cardRef}
        className={`scale-exact-stack ${isHovered ? "is-hovered" : "is-idle"}`}
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
        <div className="scale-exact-sheet sheet-back-output" aria-hidden="true">
          <svg className="exact-sheet-svg" viewBox="0 0 560 280" fill="none">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="556" height="276" rx="26" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" />

            {/* Binary output classifications (Exact Scale AI positions) */}
            <text x="525" y="55" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10.5" fontWeight="600" textAnchor="end">0111</text>
            <text x="525" y="150" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10.5" fontWeight="600" textAnchor="end">10</text>
            <text x="525" y="235" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10.5" fontWeight="600" textAnchor="end">01</text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 3: MIDDLE-BACK GLASS PLATE (Flowing Splines, Pointers & Numbers)    */}
        {/* ========================================================================= */}
        <div className="scale-exact-sheet sheet-middle-splines" aria-hidden="true">
          <svg className="exact-sheet-svg" viewBox="0 0 560 280" fill="none" stroke="currentColor">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="556" height="276" rx="26" strokeWidth="1.4" strokeOpacity="0.65" />

            {/* Flowing Neural Spline Pathways */}
            <g strokeWidth="1.6" strokeOpacity="0.95" fill="none">
              {/* Spline Top to 0111 */}
              <path className="scale-spline-anim s-flow-1" d="M 220 55 C 260 55, 270 95, 305 95 S 390 35, 475 75 S 510 55, 525 55" />
              {/* Spline Middle-Top */}
              <path className="scale-spline-anim s-flow-2" d="M 220 100 C 270 100, 275 140, 310 140 S 370 115, 420 135 S 490 145, 525 150" />
              {/* Spline Middle-Bottom */}
              <path className="scale-spline-anim s-flow-3" d="M 220 160 C 260 160, 280 200, 320 200 S 380 160, 440 185 S 490 155, 525 150" />
              {/* Spline Bottom to 01 */}
              <path className="scale-spline-anim s-flow-4" d="M 220 215 C 280 215, 320 260, 380 240 S 460 255, 525 235" />

              {/* Cross-branching flow */}
              <path d="M 310 140 C 350 180, 400 150, 440 185" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
            </g>

            {/* Directional Triangles & Nodes on Spline Paths */}
            <polygon points="305,92 311,95 305,98" fill="currentColor" />
            <polygon points="310,137 316,140 310,143" fill="currentColor" />
            <polygon points="420,132 426,135 420,138" fill="currentColor" />
            <polygon points="475,72 481,75 475,78" fill="currentColor" />
            <polygon points="380,237 386,240 380,243" fill="currentColor" />

            {/* Floating Telemetry Numbers (Scale AI signature) */}
            <text x="235" y="48" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">10</text>
            <text x="312" y="55" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">10</text>
            <text x="235" y="92" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">0111</text>
            <text x="310" y="100" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">01</text>
            <text x="395" y="95" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">01</text>
            <text x="235" y="152" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">10</text>
            <text x="312" y="155" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">1011</text>
            <text x="395" y="195" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">0111</text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: THE REAL-WORLD DGX PHOTO (Center Layer)                          */}
        {/* ========================================================================= */}
        <div className="scale-exact-sheet sheet-photo-center">
          <div className="photo-landscape-inner">
            <Image
              src={profile.photo}
              alt={profile.photoAlt}
              fill
              priority
              unoptimized
              quality={100}
              sizes="(max-width: 860px) 100vw, 1100px"
              style={{ objectFit: "cover", objectPosition: "center 22%" }}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 1: FRONT GLASS PLATE (Left Contours, Center Focus, Projection Rays) */}
        {/* ========================================================================= */}
        <div className="scale-exact-sheet sheet-front-contours" aria-hidden="true">
          <svg className="exact-sheet-svg" viewBox="0 0 560 280" fill="none" stroke="currentColor">
            {/* Outer Rounded Glass Outline */}
            <rect x="2" y="2" width="556" height="276" rx="26" strokeWidth="1.6" strokeOpacity="0.85" />

            {/* Dense Organic Edge Contours on Left */}
            <g strokeWidth="1.3" strokeOpacity="0.8">
              {/* Feature Contour Islands */}
              <ellipse cx="25" cy="140" rx="6" ry="12" />
              <ellipse cx="38" cy="185" rx="9" ry="16" />
              <ellipse cx="30" cy="230" rx="8" ry="14" />
              <ellipse cx="50" cy="120" rx="6" ry="10" strokeDasharray="3 2" />
              <ellipse cx="65" cy="175" rx="8" ry="14" />
              <ellipse cx="55" cy="225" rx="7" ry="12" strokeDasharray="4 2" />

              {/* Contours around Subject & Server */}
              <path d="M 85 95 C 100 80, 115 80, 125 95 C 135 115, 140 140, 130 170 C 120 195, 105 220, 90 245" />
              <path d="M 98 105 C 108 95, 118 95, 122 105 C 118 125, 114 150, 122 175 C 114 200, 104 225, 98 250" strokeDasharray="3 2" />
            </g>

            {/* Center Focus Rounded Frame (Scale AI signature) */}
            <rect x="195" y="45" width="210" height="190" rx="18" strokeWidth="1.4" strokeOpacity="0.75" />

            {/* Horizontal Dotted Projection Rays Shooting Across with Triangles */}
            <g strokeWidth="1.1" strokeDasharray="4 4" strokeOpacity="0.5">
              <line x1="25" y1="45" x2="525" y2="45" />
              <line x1="50" y1="95" x2="525" y2="95" />
              <line x1="38" y1="145" x2="525" y2="145" />
              <line x1="30" y1="195" x2="525" y2="195" />
              <line x1="55" y1="240" x2="525" y2="240" />

              {/* Directional Triangles along projection rays */}
              <polygon points="75,42 81,45 75,48" fill="currentColor" />
              <polygon points="120,42 126,45 120,48" fill="currentColor" />
              <polygon points="75,92 81,95 75,98" fill="currentColor" />
              <polygon points="135,92 141,95 135,98" fill="currentColor" />
              <polygon points="75,142 81,145 75,148" fill="currentColor" />
              <polygon points="150,142 156,145 150,148" fill="currentColor" />
              <polygon points="75,192 81,195 75,198" fill="currentColor" />
              <polygon points="140,192 146,195 140,198" fill="currentColor" />
              <polygon points="75,237 81,240 75,243" fill="currentColor" />
              <polygon points="130,237 136,240 130,243" fill="currentColor" />
            </g>
          </svg>
        </div>
      </m.div>
    </figure>
  );
}
