# Dual-Surface Hero Redesign & Seamless Page Transition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform both `/portfolio` and `/` Hero surfaces into high-craft, distinctive AI engineering interfaces with interactive 3D Computer Vision HUD, Synaptic Attention Mesh canvas, and a 350ms top laser route transition.

**Architecture:** A lightweight HTML5 2D Canvas component (`SynapticMeshCanvas.tsx`) generates real-time neural activation synapses on `/`. An interactive 3D perspective card with SVG vision brackets and CSS laser sweep upgrades `/portfolio`. A global route listener (`PageTransitionLoader.tsx`) orchestrates snappy 350ms transitions.

**Tech Stack:** Next.js 16 (App Router), React 19, `motion/react`, HTML5 Canvas API, CSS 3D Transforms, Tailwind CSS / Vanilla CSS Variables.

## Global Constraints

- Preserve exact existing copy text on both Hero surfaces.
- Strictly adhere to zero-hue monochrome tokens (`var(--bg-primary)`, `var(--bg-secondary)`, `var(--border-color)`, `var(--text-primary)`, `var(--text-secondary)`).
- 0px layout shift across all viewport sizes.
- Full support for both Dark Mode and Light Mode.
- Graceful degradation on `prefers-reduced-motion`.

---

### Task 1: Global Page Transition Loader

**Files:**
- Create: `src/components/PageTransitionLoader.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `<PageTransitionLoader />` component mounted in the root layout that listens to pathname changes and fires a 350ms top laser beam + micro telemetry badge.

- [ ] **Step 1: Create `src/components/PageTransitionLoader.tsx`**

```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 380);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const getRouteLabel = () => {
    if (pathname === "/portfolio") return "SWITCHING TO // TECHNICAL PORTFOLIO";
    if (pathname === "/") return "INITIALIZING // AI AGENT CONSOLE";
    return "NAVIGATING // SYSTEM READY";
  };

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <m.div
          key="route-loader"
          className="route-transition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Top 2px Laser Sweep Beam */}
          <div className="route-laser-beam">
            <div className="route-laser-glow" />
          </div>

          {/* Center Micro Telemetry Flash */}
          <div className="route-telemetry-badge">
            <span className="telemetry-spark">✦</span>
            <span className="telemetry-text">{getRouteLabel()}</span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Add CSS styles for `.route-transition-overlay` in `src/app/globals.css`**

```css
/* GLOBAL SNAPPY PAGE TRANSITION LOADER */
.route-transition-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--bg-primary-rgb, 0, 0, 0), 0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.route-laser-beam {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--text-primary), transparent);
  animation: laserSweep 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.route-laser-glow {
  position: absolute;
  top: -2px;
  right: 0;
  width: 60px;
  height: 6px;
  background: var(--text-primary);
  filter: blur(3px);
  border-radius: 9999px;
}

.route-telemetry-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1.1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--text-primary);
  animation: telemetryPulse 0.38s ease-out forwards;
}

@keyframes laserSweep {
  0% { transform: scaleX(0); transform-origin: left; opacity: 0; }
  20% { opacity: 1; }
  100% { transform: scaleX(1); transform-origin: left; opacity: 0.9; }
}

@keyframes telemetryPulse {
  0% { transform: scale(0.94); opacity: 0; }
  30% { transform: scale(1); opacity: 1; }
  85% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.02); opacity: 0; }
}
```

- [ ] **Step 3: Mount `<PageTransitionLoader />` in `src/app/layout.tsx`**

- [ ] **Step 4: Verify route transition works smoothly on client navigation**

- [ ] **Step 5: Commit changes**
```bash
git add src/components/PageTransitionLoader.tsx src/app/layout.tsx src/app/globals.css
git commit -m "feat(navigation): add snappy 350ms route transition loader with laser beam and telemetry badge"
```

---

### Task 2: Landing Page Synaptic Attention Mesh Canvas

**Files:**
- Create: `src/components/SynapticMeshCanvas.tsx`
- Modify: `src/components/ChatHero.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `<SynapticMeshCanvas />` high-performance 60fps HTML5 Canvas background that renders dynamic neural synapse connections around the cursor.

- [ ] **Step 1: Create `src/components/SynapticMeshCanvas.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface SynapticMeshCanvasProps {
  className?: string;
}

export default function SynapticMeshCanvas({ className }: SynapticMeshCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initPoints();
    };

    window.addEventListener("resize", handleResize);

    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    interface Point {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
    }

    let points: Point[] = [];
    const spacing = 44;

    const initPoints = () => {
      points = [];
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          points.push({
            x: c * spacing,
            y: r * spacing,
            baseX: c * spacing,
            baseY: r * spacing,
          });
        }
      }
    };

    initPoints();

    const maxDist = 130;
    const maxDistSq = maxDist * maxDist;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      const dotColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)";
      const activeDotColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)";
      const lineColor = isDark ? "rgba(255, 255, 255," : "rgba(0, 0, 0,";

      // Draw active synaptic connections
      if (mouse.active) {
        for (let i = 0; i < points.length; i++) {
          const p1 = points[i];
          const dxMouse = mouse.x - p1.x;
          const dyMouse = mouse.y - p1.y;
          const dMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

          if (dMouseSq < maxDistSq) {
            for (let j = i + 1; j < points.length; j++) {
              const p2 = points[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const distSq = dx * dx + dy * dy;

              if (distSq < spacing * spacing * 2.2) {
                const alpha = (1 - Math.sqrt(dMouseSq) / maxDist) * 0.45;
                ctx.strokeStyle = `${lineColor} ${alpha})`;
                ctx.lineWidth = 0.9;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      // Draw dots
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        let size = 1.2;
        let fill = dotColor;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const proximity = 1 - Math.sqrt(distSq) / maxDist;
            size = 1.2 + proximity * 1.6;
            fill = activeDotColor;
          }
        }

        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`synaptic-mesh-canvas ${className || ""}`}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
```

- [ ] **Step 2: Integrate `<SynapticMeshCanvas />` in `src/components/ChatHero.tsx`**

- [ ] **Step 3: Verify performance & reactivity on `http://localhost:3000`**

- [ ] **Step 4: Commit changes**
```bash
git add src/components/SynapticMeshCanvas.tsx src/components/ChatHero.tsx src/app/globals.css
git commit -m "feat(hero): integrate interactive synaptic attention mesh canvas for landing page hero"
```

---

### Task 3: Portfolio Scale AI 3D Vision HUD & DGX Compute Monolith

**Files:**
- Modify: `src/components/ProfilePhoto.tsx`
- Modify: `src/components/PortfolioHero.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: Interactive 3D Perspective DGX Compute Monolith with Computer Vision corner brackets `┌ ┐ └ ┘`, 0.6s laser inference sweep, hardware telemetry badge, and Vercel specular back-glow.

- [ ] **Step 1: Upgrade `src/components/ProfilePhoto.tsx` into `DgxComputeHud.tsx` / `ProfilePhoto.tsx`**

```tsx
"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import profile from "@/content/profile.json";

export default function ProfilePhoto() {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [laserKey, setLaserKey] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotate({ x: rotX, y: rotY });
    cardRef.current.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    cardRef.current.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setLaserKey((prev) => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  if (!profile.photo) return null;

  return (
    <div
      className="dgx-hud-perspective-wrapper"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        className={`dgx-hud-card ${isHovered ? "is-hovered" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
      >
        {/* Vercel Specular Backlight / Border Beam */}
        <div className="dgx-specular-glow" />

        {/* Vision Brackets Layer */}
        <div className="vision-bracket vision-top-left" />
        <div className="vision-bracket vision-top-right" />
        <div className="vision-bracket vision-bottom-left" />
        <div className="vision-bracket vision-bottom-right" />

        {/* Top Floating Telemetry Pill */}
        <div className="dgx-floating-tag">
          <span className="dgx-tag-dot" />
          <span>COMPUTE // NVIDIA DGX A100 (8x SXM4)</span>
        </div>

        {/* Real-World DGX Photo */}
        <div className="dgx-photo-inner">
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

          {/* Laser Scan Line Sweep */}
          <div key={laserKey} className="dgx-laser-sweep" />
        </div>

        {/* Bottom Status Bar */}
        <div className="dgx-bottom-bar">
          <div className="dgx-status-left">
            <span className="dgx-status-indicator" />
            <span className="dgx-status-text">TENSOR COMPUTE READY</span>
          </div>
          <span className="dgx-cluster-id">ID: CLUSTER-A100-01</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add CSS rules for DGX 3D HUD & Laser Sweep in `src/app/globals.css`**

- [ ] **Step 3: Update `PortfolioHero.tsx` typography & layout**

- [ ] **Step 4: Verify 3D tilt and laser sweep in browser**

- [ ] **Step 5: Commit changes**
```bash
git add src/components/ProfilePhoto.tsx src/components/PortfolioHero.tsx src/app/globals.css
git commit -m "feat(hero): implement Scale AI 3D vision HUD and DGX compute monolith for portfolio hero"
```

---

### Task 4: End-to-End Visual Verification & Polish

**Files:**
- Test with Playwright automation on both `/` and `/portfolio` in Light and Dark mode.

- [ ] **Step 1: Run TypeScript typecheck**
```bash
npx tsc --noEmit
```

- [ ] **Step 2: Capture screenshots of both Hero surfaces in Light & Dark theme**

- [ ] **Step 3: Test route navigation back and forth between `/` and `/portfolio`**

- [ ] **Step 4: Final commit and push**
```bash
git add -A
git commit -m "chore(release): complete dual-surface hero redesign and snappy route transitions"
git push origin feat/portfolio-redesign-init
```
