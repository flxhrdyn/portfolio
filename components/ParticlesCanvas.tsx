"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COLORS = ["#ea4335", "#4285f4", "#fbbc05", "#34a853", "#9c27b0"];

class Particle {
  x = 0;
  y = 0;
  size = 0;
  speedX = 0;
  speedY = 0;
  color = PARTICLE_COLORS[0];
  opacity = 0.3;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.reset();
    this.y = Math.random() * canvas.height;
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = this.canvas.height + Math.random() * 20;
    this.size = Math.random() * 3 + 2;
    this.speedY = -(Math.random() * 0.4 + 0.15);
    this.speedX = Math.random() * 0.2 - 0.1;
    this.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    this.opacity = Math.random() * 0.4 + 0.15;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y < -10) this.reset();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.size, this.size * 2, 1);
    ctx.fill();
    ctx.restore();
  }
}

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 65 }, () => new Particle(canvas));
    let frameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      frameId = requestAnimationFrame(animate);
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      frameId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas id="particles-canvas" ref={canvasRef} />;
}
