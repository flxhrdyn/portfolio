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
      // Dense & rich node count (60 - 95 nodes across the canvas)
      const count = Math.min(95, Math.max(60, Math.floor((width * height) / 14000)));

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.08 + Math.random() * 0.12;

        nodes.push({
          x,
          y,
          angle,
          speed,
          angleDelta: (Math.random() - 0.5) * 0.02,
          radius: Math.random() < 0.3 ? 1.7 : 1.1,
          activation: 0,
        });
      }
    };

    initNodes();

    const mouseRadius = 160;
    const mouseRadiusSq = mouseRadius * mouseRadius;
    const connectionDist = 145;
    const connectionDistSq = connectionDist * connectionDist;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.09;
        mouse.y += (mouse.targetY - mouse.y) * 0.09;
      }

      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      // Refined soft gray palette: never competes with pure white text or dark background
      const grayRgb = isDark ? "156, 163, 175" : "120, 125, 135";

      // 1. SUBTLE AMBIENT MOUSE VAPOR GLOW
      if (mouse.active) {
        const glowRadius = 240;
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
        glow.addColorStop(0, `rgba(${grayRgb}, ${isDark ? 0.035 : 0.025})`);
        glow.addColorStop(0.6, `rgba(${grayRgb}, ${isDark ? 0.01 : 0.006})`);
        glow.addColorStop(1, `rgba(${grayRgb}, 0)`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. UPDATE NODES (Organic dynamic wandering — forms ever-changing random topologies)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Smoothly evolve angle for continuous random wandering
        n.angle += n.angleDelta;
        if (Math.random() < 0.02) {
          n.angleDelta = (Math.random() - 0.5) * 0.025;
        }

        n.x += Math.cos(n.angle) * n.speed;
        n.y += Math.sin(n.angle) * n.speed;

        // Wrap around boundaries
        if (n.x < -15) n.x = width + 15;
        if (n.x > width + 15) n.x = -15;
        if (n.y < -15) n.y = height + 15;
        if (n.y > height + 15) n.y = -15;

        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadiusSq) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / mouseRadius;
            n.activation = Math.min(1, n.activation + factor * 0.08);

            // Subtle magnetic pull
            n.x += dx * 0.004 * factor;
            n.y += dy * 0.004 * factor;
          } else {
            n.activation *= 0.94;
          }
        } else {
          n.activation *= 0.94;
        }
      }

      // 3. DRAW DENSE YET NON-DISTRACTING SYNAPSE CONNECTIONS (Muted soft gray)
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

            // Soft gray baseline alpha
            const baseAlpha = isDark ? 0.045 : 0.04;
            const alpha = baseAlpha * distRatio + activation * 0.18;

            if (alpha > 0.008) {
              ctx.strokeStyle = `rgba(${grayRgb}, ${Math.min(0.35, alpha)})`;
              ctx.lineWidth = 0.65;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();

              // Calm signal pulses near active mouse
              if (activation > 0.35 && pulses.length < 6 && Math.random() < 0.008) {
                pulses.push({
                  fromIndex: i,
                  toIndex: j,
                  progress: 0,
                  speed: 0.015,
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

        ctx.fillStyle = `rgba(${grayRgb}, 0.6)`;
        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. DRAW MUTED GRAY NEURON NODES
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const baseAlpha = isDark ? 0.25 : 0.22;
        const activeAlpha = baseAlpha + n.activation * 0.45;

        // Soft halo on hover
        if (n.activation > 0.08) {
          ctx.fillStyle = `rgba(${grayRgb}, ${n.activation * 0.08})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Crisp central pinpoint in soft gray
        ctx.fillStyle = `rgba(${grayRgb}, ${Math.min(0.85, activeAlpha)})`;
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
