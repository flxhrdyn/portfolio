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

  // Idle: 0deg flat. Hovered: smoothly rotates left to -28deg Y and 12deg X
  const targetRotateX = isHovered ? 14 : 0;
  const targetRotateY = isHovered ? -28 : 0;
  const targetRotateZ = isHovered ? -3 : 0;

  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], [targetRotateX + 5, targetRotateX - 5]);
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
    <figure className="scale-hero-stage">
      <m.div
        ref={cardRef}
        className={`scale-3d-stack ${isHovered ? "is-hovered" : "is-idle"}`}
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
        {/* LAYER 4: OUTPUT EMBEDDINGS GLASS SHEET (Extends to back-right on hover)   */}
        {/* ========================================================================= */}
        <div className="scale-sheet sheet-back-4" aria-hidden="true">
          <svg className="sheet-canvas-svg" viewBox="0 0 540 340" fill="none">
            <rect x="2" y="2" width="536" height="336" rx="24" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />

            {/* Binary output classifications */}
            <text x="495" y="72" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9.5" textAnchor="end">010</text>
            <text x="495" y="132" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9.5" textAnchor="end">0100</text>
            <text x="495" y="192" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9.5" textAnchor="end">00</text>
            <text x="495" y="252" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9.5" textAnchor="end">0</text>
            <text x="495" y="300" fill="currentColor" fillOpacity="0.85" fontFamily="monospace" fontSize="9.5" textAnchor="end">1111</text>

            <text x="24" y="28" fill="currentColor" fillOpacity="0.45" fontFamily="monospace" fontSize="8">OUTPUT // LATENT TENSOR MATRIX</text>
            <text x="340" y="28" fill="currentColor" fillOpacity="0.45" fontFamily="monospace" fontSize="8">0011</text>
            <text x="430" y="28" fill="currentColor" fillOpacity="0.45" fontFamily="monospace" fontSize="8">1001</text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 3: HIDDEN NEURAL SPLINES & DIAMOND GATES (Extends middle-back)       */}
        {/* ========================================================================= */}
        <div className="scale-sheet sheet-back-3" aria-hidden="true">
          <svg className="sheet-canvas-svg" viewBox="0 0 540 340" fill="none" stroke="currentColor">
            <rect x="2" y="2" width="536" height="336" rx="24" strokeWidth="1.4" strokeOpacity="0.7" />

            {/* Flowing Animated Neural Spline Paths */}
            <path className="neural-animated-spline spline-1" d="M 120 65 C 240 45, 340 110, 470 70" strokeWidth="1.8" strokeOpacity="0.9" />
            <path className="neural-animated-spline spline-2" d="M 120 125 C 220 170, 350 90, 470 130" strokeWidth="2.0" strokeOpacity="0.95" />
            <path className="neural-animated-spline spline-3" d="M 120 185 C 260 235, 330 145, 470 190" strokeWidth="2.2" strokeOpacity="0.95" />
            <path className="neural-animated-spline spline-4" d="M 120 245 C 230 210, 360 290, 470 250" strokeWidth="2.0" strokeOpacity="0.9" />
            <path className="neural-animated-spline spline-5" d="M 120 290 C 270 330, 360 260, 470 298" strokeWidth="1.8" strokeOpacity="0.85" />

            {/* Diamond Gates with subtle pulsing halos */}
            {[
              [240, 52], [350, 95], [470, 70],
              [230, 155], [360, 105], [470, 130],
              [260, 215], [370, 175], [470, 190],
              [250, 225], [380, 275], [470, 250],
              [290, 310], [400, 280], [470, 298]
            ].map(([x, y], idx) => (
              <g key={idx} className="neuron-gate-node">
                <polygon
                  points={`${x},${y - 6} ${x + 6},${y} ${x},${y + 6} ${x - 6},${y}`}
                  strokeWidth="1.4"
                  fill="currentColor"
                  fillOpacity="0.95"
                  stroke="currentColor"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: THE REAL-WORLD DGX PHOTO (Center Base Layer)                     */}
        {/* ========================================================================= */}
        <div className="scale-sheet sheet-photo-2">
          <div className="photo-inner">
            <Image
              src={profile.photo}
              alt={profile.photoAlt}
              fill
              priority
              unoptimized
              quality={100}
              sizes="(max-width: 860px) 100vw, 1200px"
              style={{ objectFit: "cover", objectPosition: "center 22%" }}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 1: FRONT GLASS SHEET (Input Feature Contours & Edge Extraction)     */}
        {/* ========================================================================= */}
        <div className="scale-sheet sheet-front-1" aria-hidden="true">
          <svg className="sheet-canvas-svg" viewBox="0 0 540 340" fill="none" stroke="currentColor">
            <rect x="2" y="2" width="536" height="336" rx="24" strokeWidth="1.6" strokeOpacity="0.85" />

            {/* Organic Topographic & Feature Contours */}
            <g strokeWidth="1.3" strokeOpacity="0.8">
              {/* Contours around Engineer Felix */}
              <path d="M 85 100 C 95 85, 115 85, 125 100 C 135 120, 140 150, 130 180 C 120 210, 100 240, 85 270" />
              <path d="M 95 110 C 105 100, 115 100, 120 110 C 115 130, 110 160, 120 190 C 110 220, 100 250, 95 280" strokeDasharray="3 2" />
              <path d="M 70 140 C 85 130, 110 130, 130 145 C 145 165, 140 210, 125 240 C 110 270, 80 300, 70 320" />
              
              {/* Contours around DGX Server Cluster Racks */}
              <path d="M 210 60 L 330 60 L 330 300 L 210 300 Z" strokeDasharray="5 4" />
              <path d="M 230 80 L 310 80 L 310 280 L 230 280 Z" strokeDasharray="3 3" strokeOpacity="0.5" />
              <path d="M 210 130 L 330 130" strokeDasharray="4 3" />
              <path d="M 210 190 L 330 190" strokeDasharray="4 3" />
              <path d="M 210 250 L 330 250" strokeDasharray="4 3" />

              {/* Organic Feature Contours on Left */}
              <path d="M 25 180 Q 45 160 65 190 T 55 240 T 35 280 T 25 320" />
              <path d="M 35 200 Q 55 185 70 210 T 60 255 T 45 295" strokeDasharray="4 2" />
              <path d="M 15 220 Q 35 205 50 230 T 40 275 T 30 310" />
            </g>

            {/* Orthogonal Dotted Rays Projecting Through To Spline Layer */}
            <g strokeWidth="1.1" strokeDasharray="4 4" strokeOpacity="0.5">
              <line x1="85" y1="100" x2="470" y2="70" />
              <line x1="125" y1="140" x2="470" y2="130" />
              <line x1="210" y1="190" x2="470" y2="190" />
              <line x1="210" y1="250" x2="470" y2="250" />
              <line x1="85" y1="270" x2="470" y2="298" />
            </g>
          </svg>
        </div>
      </m.div>
    </figure>
  );
}
