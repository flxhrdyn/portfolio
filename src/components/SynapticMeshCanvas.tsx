"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface SynapticMeshCanvasProps {
  className?: string;
}

interface NeuronNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isHub: boolean;
  activation: number; // 0 to 1
  pulseTimer: number;
}

interface SynapsePulse {
  fromNode: number;
  toNode: number;
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
      initNetwork();
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

    let nodes: NeuronNode[] = [];
    let pulses: SynapsePulse[] = [];

    const initNetwork = () => {
      nodes = [];
      pulses = [];
      // Calculate node count based on screen area (approx 1 node per 12000px^2)
      const count = Math.min(85, Math.max(35, Math.floor((width * height) / 14000)));

      for (let i = 0; i < count; i++) {
        const isHub = i % 5 === 0;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: isHub ? Math.random() * 1.5 + 2.5 : Math.random() * 1.0 + 1.2,
          isHub,
          activation: 0,
          pulseTimer: Math.random() * 100,
        });
      }
    };

    initNetwork();

    const maxConnectionDist = 160;
    const maxConnectionDistSq = maxConnectionDist * maxConnectionDist;
    const mouseExcitationDist = 180;
    const mouseExcitationDistSq = mouseExcitationDist * mouseExcitationDist;

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      const baseLineAlpha = isDark ? 0.08 : 0.07;
      const baseDotAlpha = isDark ? 0.25 : 0.22;
      const primaryRgb = isDark ? "255, 255, 255" : "0, 0, 0";

      // 1. Update nodes position & activation
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Wrap around boundaries
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // Mouse proximity excitation
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseExcitationDistSq) {
            const proximity = 1 - Math.sqrt(distSq) / mouseExcitationDist;
            n.activation = Math.max(n.activation, proximity * 1.0);
          }
        }

        // Decay activation
        n.activation *= 0.94;
        if (n.activation < 0.01) n.activation = 0;

        // Periodic autonomous pulse firing for hubs
        n.pulseTimer += 1;
        if (n.pulseTimer > 180 && Math.random() < 0.02) {
          n.pulseTimer = 0;
          n.activation = Math.max(n.activation, 0.7);
        }
      }

      // 2. Draw Synaptic Connections & Spawn Pulses
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectionDistSq) {
            const dist = Math.sqrt(distSq);
            const distRatio = 1 - dist / maxConnectionDist;
            const combinedActivation = Math.max(n1.activation, n2.activation);

            const alpha = baseLineAlpha * distRatio + combinedActivation * 0.45;
            ctx.strokeStyle = `rgba(${primaryRgb}, ${Math.min(0.85, alpha)})`;
            ctx.lineWidth = 0.6 + combinedActivation * 0.7;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            // Trigger pulse if highly activated and under pulse limit
            if (combinedActivation > 0.45 && pulses.length < 24 && Math.random() < 0.015) {
              pulses.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: Math.random() * 0.025 + 0.02,
              });
            }
          }
        }
      }

      // 3. Update & Draw Action Potential Pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const from = nodes[pulse.fromNode];
        const to = nodes[pulse.toNode];
        if (!from || !to) {
          pulses.splice(p, 1);
          continue;
        }

        const px = from.x + (to.x - from.x) * pulse.progress;
        const py = from.y + (to.y - from.y) * pulse.progress;

        // Draw glowing electrical pulse
        ctx.fillStyle = `rgba(${primaryRgb}, 0.95)`;
        ctx.beginPath();
        ctx.arc(px, py, 2.0, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow halo
        ctx.fillStyle = `rgba(${primaryRgb}, 0.25)`;
        ctx.beginPath();
        ctx.arc(px, py, 5.0, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Draw Neurons (Nodes)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const activeMultiplier = n.activation;

        // Outer halo on active neurons
        if (n.isHub || activeMultiplier > 0.1) {
          const haloSize = n.radius * 2.8 + activeMultiplier * 4.5;
          const haloAlpha = (n.isHub ? 0.08 : 0.03) + activeMultiplier * 0.35;
          ctx.fillStyle = `rgba(${primaryRgb}, ${haloAlpha})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, haloSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Inner solid core
        const coreAlpha = baseDotAlpha + activeMultiplier * 0.75;
        ctx.fillStyle = `rgba(${primaryRgb}, ${Math.min(1, coreAlpha)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + activeMultiplier * 0.8, 0, Math.PI * 2);
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
