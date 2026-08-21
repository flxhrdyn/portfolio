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

    let nodes: DistilledNode[] = [];
    let pulses: GentlePulse[] = [];

    const initNodes = () => {
      nodes = [];
      pulses = [];
      // Balanced node count: not sparse, but completely free of spiderweb clutter
      const count = Math.min(52, Math.max(34, Math.floor((width * height) / 24000)));

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.05, // Ultra-slow, serene ambient breathing (not distracting)
          vy: (Math.random() - 0.5) * 0.05,
          radius: Math.random() < 0.25 ? 1.6 : 1.1, // Subtle, sharp micro-constellation nodes
          activation: 0,
        });
      }
    };

    initNodes();

    const mouseRadius = 150;
    const mouseRadiusSq = mouseRadius * mouseRadius;
    const connectionDist = 120;
    const connectionDistSq = connectionDist * connectionDist;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }

      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      const primaryRgb = isDark ? "255, 255, 255" : "0, 0, 0";

      // 1. SUBTLE AMBIENT MOUSE VAPOR GLOW
      if (mouse.active) {
        const glowRadius = 220;
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
        glow.addColorStop(0, `rgba(${primaryRgb}, ${isDark ? 0.035 : 0.025})`);
        glow.addColorStop(0.6, `rgba(${primaryRgb}, ${isDark ? 0.01 : 0.006})`);
        glow.addColorStop(1, `rgba(${primaryRgb}, 0)`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. UPDATE NODES (Quiet natural drift)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Gentle wrap around boundaries
        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;

        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadiusSq) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / mouseRadius;
            n.activation = Math.min(1, n.activation + factor * 0.08);

            // Very subtle gravitational lean toward cursor
            n.x += dx * 0.003 * factor;
            n.y += dy * 0.003 * factor;
          } else {
            n.activation *= 0.94;
          }
        } else {
          n.activation *= 0.94;
        }
      }

      // 3. DRAW UNDERSTATED SYNAPSE CONNECTIONS
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

            // Restrained baseline alpha — reads as quiet architectural lines
            const baseAlpha = isDark ? 0.04 : 0.035;
            const alpha = baseAlpha * distRatio + activation * 0.18;

            if (alpha > 0.008) {
              ctx.strokeStyle = `rgba(${primaryRgb}, ${Math.min(0.35, alpha)})`;
              ctx.lineWidth = 0.65;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();

              // Rare, elegant micro-pulse
              if (activation > 0.4 && pulses.length < 5 && Math.random() < 0.008) {
                pulses.push({
                  fromIndex: i,
                  toIndex: j,
                  progress: 0,
                  speed: 0.016,
                });
              }
            }
          }
        }
      }

      // 4. DRAW CALM FIBER MICRO-PULSES
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

        ctx.fillStyle = `rgba(${primaryRgb}, 0.65)`;
        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. DRAW CRISP, ELEGANT NEURON PINS
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const baseAlpha = isDark ? 0.22 : 0.18;
        const activeAlpha = baseAlpha + n.activation * 0.45;

        // Subtle aura on hover
        if (n.activation > 0.1) {
          ctx.fillStyle = `rgba(${primaryRgb}, ${n.activation * 0.08})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Crisp central pinpoint
        ctx.fillStyle = `rgba(${primaryRgb}, ${Math.min(0.85, activeAlpha)})`;
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
