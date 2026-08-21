"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import profile from "@/content/profile.json";

export default function ProfilePhoto() {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 180, mass: 0.6 };

  // Idle: 0deg flat. Hovered: smoothly tilts leftward to -26deg Y, 14deg X
  const targetRotateX = isHovered ? 14 : 0;
  const targetRotateY = isHovered ? -26 : 0;
  const targetRotateZ = isHovered ? -3 : 0;

  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], [targetRotateX + 6, targetRotateX - 6]);
  const rawRotateY = useTransform(mouseX, [-0.5, 0.5], [targetRotateY - 6, targetRotateY + 6]);
  const rawRotateZ = useTransform(mouseX, [-0.5, 0.5], [targetRotateZ - 2, targetRotateZ + 2]);

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
        {/* LAYER 4: BACK-MOST GLASS PLATE (Output Classifications Matrix)            */}
        {/* ========================================================================= */}
        <div className="scale-portrait-sheet sheet-back-4" aria-hidden="true">
          <svg className="sheet-svg-canvas" viewBox="0 0 400 520" fill="none">
            {/* Rounded Glass Boundary */}
            <rect x="2" y="2" width="396" height="516" rx="28" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.45" />

            {/* Binary output classifications */}
            <text x="365" y="90" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10.5" fontWeight="600" textAnchor="end">1000</text>
            <text x="365" y="180" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10.5" fontWeight="600" textAnchor="end">100</text>
            <text x="365" y="270" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10.5" fontWeight="600" textAnchor="end">0100</text>
            <text x="365" y="360" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10.5" fontWeight="600" textAnchor="end">0010</text>
            <text x="365" y="440" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="10.5" fontWeight="600" textAnchor="end">1111</text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 3: MIDDLE-BACK GLASS PLATE (Neural Spline Streams & Diamond Gates)   */}
        {/* ========================================================================= */}
        <div className="scale-portrait-sheet sheet-back-3" aria-hidden="true">
          <svg className="sheet-svg-canvas" viewBox="0 0 400 520" fill="none" stroke="currentColor">
            {/* Rounded Glass Boundary */}
            <rect x="2" y="2" width="396" height="516" rx="28" strokeWidth="1.4" strokeOpacity="0.65" />

            {/* Flowing Neural Spline Streams */}
            <g strokeWidth="1.8" strokeOpacity="0.95" fill="none">
              <path className="spline-flow-stream flow-1" d="M 80 85 C 180 50, 260 120, 365 90" />
              <path className="spline-flow-stream flow-2" d="M 80 175 C 160 220, 270 130, 365 180" />
              <path className="spline-flow-stream flow-3" d="M 80 265 C 190 310, 270 210, 365 270" strokeWidth="2.1" />
              <path className="spline-flow-stream flow-4" d="M 80 355 C 170 310, 280 410, 365 360" />
              <path className="spline-flow-stream flow-5" d="M 80 435 C 200 480, 280 390, 365 440" />

              {/* Inter-layer cross branching */}
              <path d="M 170 120 C 230 180, 290 230, 365 270" strokeWidth="1.1" strokeDasharray="3 3" strokeOpacity="0.6" />
              <path d="M 190 330 C 250 270, 300 330, 365 360" strokeWidth="1.1" strokeDasharray="3 3" strokeOpacity="0.6" />
            </g>

            {/* Diamond Neuron Gates */}
            {[
              [180, 70], [270, 110], [365, 90],
              [160, 200], [280, 150], [365, 180],
              [190, 290], [270, 235], [365, 270],
              [170, 335], [280, 390], [365, 360],
              [200, 460], [290, 410], [365, 440]
            ].map(([x, y], idx) => (
              <g key={idx} className="gate-diamond-pulse">
                <polygon
                  points={`${x},${y - 6} ${x + 6},${y} ${x},${y + 6} ${x - 6},${y}`}
                  strokeWidth="1.4"
                  fill="currentColor"
                  fillOpacity="0.95"
                />
              </g>
            ))}

            {/* Floating Telemetry Numbers */}
            <text x="215" y="95" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">0110</text>
            <text x="295" y="165" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">110</text>
            <text x="295" y="255" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">1000</text>
            <text x="295" y="345" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="8.5" stroke="none">100</text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: THE REAL-WORLD DGX PHOTO (Center Portrait Card)                  */}
        {/* ========================================================================= */}
        <div className="scale-portrait-sheet sheet-photo-2">
          <div className="portrait-photo-inner">
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
        {/* LAYER 1: FRONT GLASS PLATE (Input Contours & Projection Rays)             */}
        {/* ========================================================================= */}
        <div className="scale-portrait-sheet sheet-front-1" aria-hidden="true">
          <svg className="sheet-svg-canvas" viewBox="0 0 400 520" fill="none" stroke="currentColor">
            {/* Rounded Glass Boundary */}
            <rect x="2" y="2" width="396" height="516" rx="28" strokeWidth="1.6" strokeOpacity="0.85" />

            {/* Organic Edge Contours on Left */}
            <g strokeWidth="1.2" strokeOpacity="0.8">
              {/* Feature Contour Islands */}
              <ellipse cx="24" cy="180" rx="8" ry="16" />
              <ellipse cx="38" cy="240" rx="12" ry="22" />
              <ellipse cx="30" cy="320" rx="10" ry="18" />
              <ellipse cx="50" cy="150" rx="7" ry="12" strokeDasharray="3 2" />
              <ellipse cx="62" cy="380" rx="11" ry="18" strokeDasharray="4 2" />

              {/* Contours around Engineer Felix */}
              <path d="M 80 140 C 95 120, 120 120, 135 140 C 145 170, 150 210, 140 260 C 130 300, 105 340, 85 390" />
              <path d="M 95 155 C 105 140, 118 140, 126 155 C 120 185, 114 225, 126 265 C 114 305, 102 345, 95 395" strokeDasharray="3 2" />

              {/* Server Rack Bounding Contours */}
              <rect x="180" y="90" width="160" height="360" rx="6" strokeDasharray="5 4" />
              <rect x="195" y="120" width="130" height="300" rx="4" strokeDasharray="3 3" strokeOpacity="0.5" />
            </g>

            {/* Horizontal Dotted Projection Rays Shooting Across to Output Layer */}
            <g strokeWidth="1.1" strokeDasharray="4 4" strokeOpacity="0.5">
              <line x1="24" y1="85" x2="365" y2="90" />
              <line x1="50" y1="175" x2="365" y2="180" />
              <line x1="38" y1="265" x2="365" y2="270" />
              <line x1="30" y1="355" x2="365" y2="360" />
              <line x1="62" y1="435" x2="365" y2="440" />

              {/* Directional Triangles */}
              <polygon points="120,82 126,85 120,88" fill="currentColor" />
              <polygon points="120,172 126,175 120,178" fill="currentColor" />
              <polygon points="120,262 126,265 120,268" fill="currentColor" />
              <polygon points="120,352 126,355 120,358" fill="currentColor" />
              <polygon points="120,432 126,435 120,438" fill="currentColor" />
            </g>
          </svg>
        </div>
      </m.div>
    </figure>
  );
}
