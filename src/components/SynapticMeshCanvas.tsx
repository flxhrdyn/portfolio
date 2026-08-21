"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface SynapticMeshCanvasProps {
  className?: string;
}

interface DistilledNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  activation: number;
}

interface GentlePulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

export default function SynapticMeshCanvas({ className }: SynapticMeshCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initNodes();
    };

    window.addEventListener("resize", handleResize);

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      if (!mouse.active) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      }
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

    interface WanderingNode {
      x: number;
      y: number;
      angle: number;
      speed: number;
      angleDelta: number;
      radius: number;
      activation: number;
    }

    let nodes: WanderingNode[] = [];
    let pulses: GentlePulse[] = [];

    const initNodes = () => {
      nodes = [];
      pulses = [];

      // Stratified Grid-Jitter Distribution: guarantees completely balanced coverage
      // across the entire screen (left margin, center, and right margin alike)
      const cols = Math.max(7, Math.floor(width / 150));
      const rows = Math.max(5, Math.floor(height / 140));
      const cellW = width / cols;
      const cellH = height / rows;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          // 1 node per grid cell with random offset
          const x = c * cellW + Math.random() * cellW;
          const y = r * cellH + Math.random() * cellH;
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.06 + Math.random() * 0.08;

          nodes.push({
            x,
            y,
            angle,
            speed,
            angleDelta: (Math.random() - 0.5) * 0.015,
            radius: Math.random() < 0.25 ? 1.8 : 1.2,
            activation: 0,
          });
        }
      }
    };

    initNodes();

    const mouseRadius = 180;
    const mouseRadiusSq = mouseRadius * mouseRadius;
    const connectionDist = 160; // Generous connection reach so all areas form rich networks
    const connectionDistSq = connectionDist * connectionDist;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.09;
        mouse.y += (mouse.targetY - mouse.y) * 0.09;
      }

      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      // Refined soft gray palette: calm, architectural, non-distracting
      const grayRgb = isDark ? "156, 163, 175" : "120, 125, 135";

      // 1. SUBTLE AMBIENT MOUSE VAPOR GLOW
      if (mouse.active) {
        const glowRadius = 260;
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
        glow.addColorStop(0, `rgba(${grayRgb}, ${isDark ? 0.035 : 0.025})`);
        glow.addColorStop(0.6, `rgba(${grayRgb}, ${isDark ? 0.01 : 0.006})`);
        glow.addColorStop(1, `rgba(${grayRgb}, 0)`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. UPDATE NODES (Organic wandering without magnetic bunching)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Smoothly evolve angle for continuous random organic wandering
        n.angle += n.angleDelta;
        if (Math.random() < 0.015) {
          n.angleDelta = (Math.random() - 0.5) * 0.02;
        }

        n.x += Math.cos(n.angle) * n.speed;
        n.y += Math.sin(n.angle) * n.speed;

        // Wrap around boundaries smoothly
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // Light up activation when cursor is near, but DO NOT pull nodes to prevent clumping
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadiusSq) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / mouseRadius;
            n.activation = Math.min(1, n.activation + factor * 0.1);
          } else {
            n.activation *= 0.95;
          }
        } else {
          n.activation *= 0.95;
        }
      }

      // 3. DRAW BALANCED SYNAPSE CONNECTIONS (Uniform across entire canvas)
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            const distRatio = 1 - dist / connectionDist;
            const activation = Math.max(n1.activation, n2.activation);

            // Rich, balanced baseline alpha across all areas (left, center, right)
            const baseAlpha = isDark ? 0.085 : 0.075;
            const alpha = baseAlpha * distRatio + activation * 0.22;

            if (alpha > 0.01) {
              ctx.strokeStyle = `rgba(${grayRgb}, ${Math.min(0.4, alpha)})`;
              ctx.lineWidth = 0.7;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();

              // Rare calm signal pulses near active mouse
              if (activation > 0.4 && pulses.length < 6 && Math.random() < 0.008) {
                pulses.push({
                  fromIndex: i,
                  toIndex: j,
                  progress: 0,
                  speed: 0.014,
                });
              }
            }
          }
        }
      }

      // 4. DRAW CALM SIGNAL PULSES
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const from = nodes[pulse.fromIndex];
        const to = nodes[pulse.toIndex];
        if (!from || !to) {
          pulses.splice(p, 1);
          continue;
        }

        const px = from.x + (to.x - from.x) * pulse.progress;
        const py = from.y + (to.y - from.y) * pulse.progress;

        ctx.fillStyle = `rgba(${grayRgb}, 0.65)`;
        ctx.beginPath();
        ctx.arc(px, py, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. DRAW MUTED GRAY NEURON NODES
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const baseAlpha = isDark ? 0.32 : 0.28;
        const activeAlpha = baseAlpha + n.activation * 0.45;

        // Soft halo on hover
        if (n.activation > 0.08) {
          ctx.fillStyle = `rgba(${grayRgb}, ${n.activation * 0.09})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Crisp central pinpoint
        ctx.fillStyle = `rgba(${grayRgb}, ${Math.min(0.9, activeAlpha)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + n.activation * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

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
