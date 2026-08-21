"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import profile from "@/content/profile.json";

export default function ProfilePhoto() {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [laserKey, setLaserKey] = useState(0);

  // Motion values for ultra-smooth spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    cardRef.current.style.setProperty("--cursor-x", `${(e.clientX - rect.left)}px`);
    cardRef.current.style.setProperty("--cursor-y", `${(e.clientY - rect.top)}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setLaserKey((prev) => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!profile.photo) return null;

  return (
    <figure className="dgx-hud-perspective-container">
      <m.div
        ref={cardRef}
        className={`dgx-hud-card ${isHovered ? "is-hovered" : ""}`}
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
        {/* Vercel Specular Backlight / Mouse Glow */}
        <div className="dgx-specular-glow" />

        {/* Computer Vision Corner Brackets */}
        <div className="vision-bracket vision-top-left" />
        <div className="vision-bracket vision-top-right" />
        <div className="vision-bracket vision-bottom-left" />
        <div className="vision-bracket vision-bottom-right" />

        {/* Top Floating Hardware Telemetry Tag */}
        <div className="dgx-floating-tag">
          <span className="dgx-tag-dot" />
          <span>COMPUTE // NVIDIA DGX A100 (8x SXM4)</span>
        </div>

        {/* Photo Container */}
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

          {/* Inference Laser Sweep on Hover */}
          <div key={laserKey} className="dgx-laser-sweep" />
        </div>

        {/* Bottom Hardware Status Bar */}
        <div className="dgx-bottom-bar">
          <div className="dgx-status-left">
            <span className="dgx-status-indicator" />
            <span className="dgx-status-text">TENSOR COMPUTE READY</span>
          </div>
          <span className="dgx-cluster-id">ID: CLUSTER-A100-01</span>
        </div>
      </m.div>
    </figure>
  );
}
