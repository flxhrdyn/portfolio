"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import profile from "@/content/profile.json";

export default function ProfilePhoto() {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for silky smooth 3D gyroscopic physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    cardRef.current.style.setProperty("--cursor-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--cursor-y", `${e.clientY - rect.top}px`);
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
    <figure className="dgx-scale-stack-container">
      <m.div
        ref={cardRef}
        className={`dgx-scale-stack-card ${isHovered ? "is-hovered" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          reduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
      >
        {/* BACK LAYER 4: LATENT TENSOR MATRIX (Deepest layer: translateZ -75px on hover) */}
        <div className="scale-glass-layer layer-output-matrix" aria-hidden="true">
          <div className="glass-header">
            <span className="glass-dot" />
            <span>03 // OUTPUT LATENT EMBEDDINGS</span>
          </div>
          <svg className="matrix-grid-svg" viewBox="0 0 400 480" fill="none">
            <pattern id="matrixPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="18" y="18" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.25" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#matrixPattern)" />
            {/* Binary data tags */}
            <text x="32" y="100" fill="currentColor" fillOpacity="0.5" fontFamily="monospace" fontSize="10">0111</text>
            <text x="32" y="180" fill="currentColor" fillOpacity="0.5" fontFamily="monospace" fontSize="10">1001</text>
            <text x="32" y="260" fill="currentColor" fillOpacity="0.5" fontFamily="monospace" fontSize="10">0100</text>
            <text x="32" y="340" fill="currentColor" fillOpacity="0.5" fontFamily="monospace" fontSize="10">1101</text>
            <text x="320" y="120" fill="currentColor" fillOpacity="0.5" fontFamily="monospace" fontSize="10">[4096, d_model]</text>
            <text x="320" y="240" fill="currentColor" fillOpacity="0.5" fontFamily="monospace" fontSize="10">softmax(Q·Kᵀ)</text>
            <text x="320" y="360" fill="currentColor" fillOpacity="0.5" fontFamily="monospace" fontSize="10">loss: 0.0142</text>
          </svg>
        </div>

        {/* MIDDLE LAYER 3: ATTENTION & WEIGHT TRAJECTORY (translateZ -38px on hover) */}
        <div className="scale-glass-layer layer-hidden-attention" aria-hidden="true">
          <div className="glass-header">
            <span className="glass-dot" />
            <span>02 // HIDDEN ATTENTION WEIGHTS</span>
          </div>
          <svg className="trajectory-svg" viewBox="0 0 400 480" fill="none" stroke="currentColor">
            {/* Flowing Attention Synapse Curves */}
            <path d="M 30 140 C 120 120, 200 180, 360 160" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.6" />
            <path d="M 30 200 C 140 240, 220 140, 360 220" strokeWidth="1.5" strokeOpacity="0.7" />
            <path d="M 30 280 C 130 260, 240 340, 360 300" strokeWidth="1.2" strokeDasharray="4 2" strokeOpacity="0.6" />
            <path d="M 30 360 C 150 400, 240 320, 360 380" strokeWidth="1.5" strokeOpacity="0.7" />
            
            {/* Diamond Attention Nodes */}
            <polygon points="120,135 125,140 120,145 115,140" fill="currentColor" fillOpacity="0.8" stroke="none" />
            <polygon points="200,165 205,170 200,175 195,170" fill="currentColor" fillOpacity="0.8" stroke="none" />
            <polygon points="220,190 225,195 220,200 215,195" fill="currentColor" fillOpacity="0.8" stroke="none" />
            <polygon points="260,310 265,315 260,320 255,315" fill="currentColor" fillOpacity="0.8" stroke="none" />
            
            {/* Flow Arrows */}
            <path d="M 345 156 L 360 160 L 345 164" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 345 216 L 360 220 L 345 224" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 345 296 L 360 300 L 345 304" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 345 376 L 360 380 L 345 384" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* BASE LAYER 2: THE REAL-WORLD DGX PHOTO (translateZ 0px) */}
        <div className="scale-glass-layer layer-base-photo">
          {/* Specular Mouse Glow */}
          <div className="dgx-specular-glow" />

          <div className="dgx-photo-frame">
            <Image
              src={profile.photo}
              alt={profile.photoAlt}
              fill
              priority
              unoptimized
              quality={100}
              sizes="(max-width: 860px) 100vw, 1200px"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="dgx-bottom-bar">
            <div className="dgx-status-left">
              <span className="dgx-status-indicator" />
              <span className="dgx-status-text">TENSOR COMPUTE READY</span>
            </div>
            <span className="dgx-cluster-id">NVIDIA DGX A100 · 8x SXM4</span>
          </div>
        </div>

        {/* FRONT LAYER 1: INPUT FEATURE EXTRACTION & VISION CONTOURS (translateZ +45px on hover) */}
        <div className="scale-glass-layer layer-input-vision" aria-hidden="true">
          <div className="glass-header">
            <span className="glass-dot" />
            <span>01 // INPUT VISION & EDGE FEATURE MAP</span>
          </div>

          {/* Precision Vision Corner Brackets */}
          <div className="vision-bracket vision-top-left" />
          <div className="vision-bracket vision-top-right" />
          <div className="vision-bracket vision-bottom-left" />
          <div className="vision-bracket vision-bottom-right" />

          {/* Computer Vision Edge Contours & Bounding Vectors */}
          <svg className="vision-contours-svg" viewBox="0 0 400 480" fill="none" stroke="currentColor">
            {/* Edge detection contours around person & DGX rack */}
            <rect x="220" y="80" width="150" height="340" rx="4" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5" />
            <text x="230" y="105" fill="currentColor" fillOpacity="0.8" fontFamily="monospace" fontSize="9">NVIDIA DGX A100</text>
            
            <rect x="70" y="120" width="130" height="280" rx="4" strokeWidth="1" strokeOpacity="0.4" />
            <text x="80" y="145" fill="currentColor" fillOpacity="0.8" fontFamily="monospace" fontSize="9">HUMAN_ENGINEER [0.99]</text>
            
            {/* Crosshairs & Target Points */}
            <circle cx="135" cy="180" r="3" fill="currentColor" fillOpacity="0.8" />
            <line x1="125" y1="180" x2="145" y2="180" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="135" y1="170" x2="135" y2="190" strokeWidth="1" strokeOpacity="0.6" />
          </svg>
        </div>
      </m.div>
    </figure>
  );
}
