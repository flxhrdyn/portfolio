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
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
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

    const maxDist = 135;
    const maxDistSq = maxDist * maxDist;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      const dotColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)";
      const activeDotColor = isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.85)";
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
                const alpha = (1 - Math.sqrt(dMouseSq) / maxDist) * 0.4;
                ctx.strokeStyle = `${lineColor} ${alpha})`;
                ctx.lineWidth = 0.85;
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
            size = 1.2 + proximity * 1.8;
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
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
