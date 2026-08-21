"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import profile from "@/content/profile.json";

export default function ProfilePhoto() {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth 3D gyro tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 190, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, 6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-28, -14]), springConfig);
  const rotateZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 0]), springConfig);

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
    <figure className="scale-isometric-viewport">
      <m.div
        ref={cardRef}
        className={`scale-isometric-stack ${isHovered ? "is-hovered" : ""}`}
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
        {/* LAYER 4: OUTPUT EMBEDDINGS GLASS (Deep Back Layer) */}
        <div className="iso-glass-sheet iso-sheet-output" aria-hidden="true">
          <div className="sheet-header">
            <span className="sheet-dot" />
            <span>03 // OUTPUT LATENT EMBEDDINGS</span>
          </div>
          <svg className="sheet-svg" viewBox="0 0 440 280" fill="none">
            {/* Binary tags and matrix points */}
            <text x="360" y="60" fill="currentColor" fillOpacity="0.75" fontFamily="monospace" fontSize="9">0111</text>
            <text x="360" y="110" fill="currentColor" fillOpacity="0.75" fontFamily="monospace" fontSize="9">1001</text>
            <text x="360" y="160" fill="currentColor" fillOpacity="0.75" fontFamily="monospace" fontSize="9">0100</text>
            <text x="360" y="210" fill="currentColor" fillOpacity="0.75" fontFamily="monospace" fontSize="9">1101</text>
            <text x="360" y="250" fill="currentColor" fillOpacity="0.75" fontFamily="monospace" fontSize="9">0010</text>
            
            {/* Output diamond nodes */}
            {[55, 105, 155, 205, 245].map((y, idx) => (
              <polygon
                key={idx}
                points={`340,${y - 5} 345,${y} 340,${y + 5} 335,${y}`}
                fill="currentColor"
                fillOpacity="0.8"
                stroke="currentColor"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>

        {/* LAYER 3: HIDDEN ATTENTION WEIGHTS & SPLINES (Middle-Back Layer) */}
        <div className="iso-glass-sheet iso-sheet-hidden" aria-hidden="true">
          <div className="sheet-header">
            <span className="sheet-dot" />
            <span>02 // HIDDEN ATTENTION SPLINES</span>
          </div>
          <svg className="sheet-svg" viewBox="0 0 440 280" fill="none" stroke="currentColor">
            {/* Scale AI signature flowing neural spline paths */}
            <path d="M 20 50 C 120 30, 200 90, 340 55" strokeWidth="1.6" strokeOpacity="0.85" />
            <path d="M 20 95 C 100 130, 220 70, 340 105" strokeWidth="1.8" strokeOpacity="0.9" />
            <path d="M 20 145 C 140 190, 200 110, 340 155" strokeWidth="2.0" strokeOpacity="0.95" />
            <path d="M 20 195 C 110 160, 220 230, 340 205" strokeWidth="1.8" strokeOpacity="0.9" />
            <path d="M 20 240 C 150 270, 220 210, 340 245" strokeWidth="1.6" strokeOpacity="0.85" />

            {/* Diamond Attention Nodes along splines */}
            {[[110, 42], [210, 85], [120, 115], [230, 135], [150, 175], [250, 215], [160, 245]].map(([x, y], idx) => (
              <g key={idx}>
                <polygon
                  points={`${x},${y - 5} ${x + 5},${y} ${x},${y + 5} ${x - 5},${y}`}
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="currentColor"
                  fillOpacity="0.9"
                />
                <path d={`M ${x + 6} ${y - 3} L ${x + 10} ${y} L ${x + 6} ${y + 3}`} strokeWidth="1.2" strokeLinecap="round" />
              </g>
            ))}
          </svg>
        </div>

        {/* LAYER 2: THE REAL-WORLD DGX PHOTO (Center Vivid Layer) */}
        <div className="iso-glass-sheet iso-sheet-photo">
          <div className="iso-photo-container">
            <Image
              src={profile.photo}
              alt={profile.photoAlt}
              fill
              priority
              unoptimized
              quality={100}
              sizes="(max-width: 860px) 100vw, 1200px"
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
            />
          </div>
          <div className="iso-photo-footer">
            <div className="telemetry-tag">
              <span className="telemetry-dot" />
              <span>NVIDIA DGX A100 (8x SXM4)</span>
            </div>
            <span className="telemetry-spec">COMPUTE ONLINE // 640GB</span>
          </div>
        </div>

        {/* LAYER 1: INPUT VISION CONTOURS & BOUNDING BOX (Front-Left Layer) */}
        <div className="iso-glass-sheet iso-sheet-input" aria-hidden="true">
          <div className="sheet-header">
            <span className="sheet-dot" />
            <span>01 // INPUT FEATURE EXTRACTION</span>
          </div>
          <svg className="sheet-svg" viewBox="0 0 440 280" fill="none" stroke="currentColor">
            {/* Vision Corner Brackets */}
            <path d="M 12 24 L 12 12 L 24 12" strokeWidth="2" strokeOpacity="0.9" />
            <path d="M 428 24 L 428 12 L 416 12" strokeWidth="2" strokeOpacity="0.9" />
            <path d="M 12 256 L 12 268 L 24 268" strokeWidth="2" strokeOpacity="0.9" />
            <path d="M 428 256 L 428 268 L 416 268" strokeWidth="2" strokeOpacity="0.9" />

            {/* Edge detection contour around person & DGX rack */}
            <rect x="230" y="55" width="165" height="200" rx="4" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.8" />
            <text x="240" y="75" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="8.5">[DGX_A100_CLUSTER]</text>

            <rect x="75" y="70" width="120" height="185" rx="4" strokeWidth="1.2" strokeOpacity="0.75" />
            <text x="85" y="90" fill="currentColor" fillOpacity="0.9" fontFamily="monospace" fontSize="8.5">[AI_ENGINEER]</text>

            {/* Orthogonal projection rays shooting through stack */}
            <line x1="80" y1="95" x2="340" y2="95" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.45" />
            <line x1="80" y1="145" x2="340" y2="145" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.45" />
            <line x1="80" y1="195" x2="340" y2="195" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.45" />
          </svg>
        </div>
      </m.div>
    </figure>
  );
}
