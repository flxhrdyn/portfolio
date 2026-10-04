"use client";

import { useEffect, useRef } from "react";

const RAMP = " .'`,:-=+*#%@";
const ALPHA_BUCKETS = 6;

function fieldValue(x: number, y: number, t: number) {
  const a = Math.sin(x * 0.045 + t * 0.16) + Math.sin(y * 0.05 - t * 0.12) + Math.sin((x - y) * 0.03 + t * 0.07);
  const b = Math.sin(x * 0.13 - t * 0.34) + Math.sin(y * 0.11 + t * 0.27);
  const c = Math.sin(x * 0.29 + y * 0.24 + t * 0.85) + Math.sin((x + y) * 0.34 - t * 1.05);
  return (a * 0.42 + b * 0.34 + c * 0.24) / 5 + 0.5;
}

export interface GlyphTideProps {
  cellSize?: number;
  className?: string;
  speed?: number;
  startDelay?: number;
}

/** ASCII plasma with a pointer warp, reusable buffers, and no React frame updates. */
export function GlyphTide({ cellSize = 12, className = "", speed = 1, startDelay = 0 }: GlyphTideProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const root = canvas.parentElement ?? canvas;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const size = Math.max(6, cellSize);
    let fg = "";
    const atlas = document.createElement("canvas");
    const atlasCtx = atlas.getContext("2d");
    let glyphWidth = 0;
    let glyphHeight = 0;
    let rasterScale = 1;
    let cellW = size;
    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    let chars = new Uint8Array(0);
    let alphaLevels = new Uint8Array(0);
    let ax = new Float64Array(0);
    let ay = new Float64Array(0);
    let axy = new Float64Array(0);
    let bx = new Float64Array(0);
    let by = new Float64Array(0);
    let cxy = new Float64Array(0);
    const buckets: number[][] = Array.from({ length: ALPHA_BUCKETS }, () => []);
    const cursor = { x: -1e5, y: -1e5, tx: -1e5, ty: -1e5, energy: 0 };
    let ready = false;
    let disposed = false;
    let visible = true;
    let raf = 0;
    let last = 0;
    let t = 0;
    let scrollIdleAt = 0;
    const animationReadyAt = performance.now() + startDelay;

    const buildAtlas = () => {
      if (!atlasCtx || !glyphWidth) return;
      atlas.width = glyphWidth * RAMP.length;
      atlas.height = glyphHeight;
      atlasCtx.font = ctx.font;
      atlasCtx.setTransform(rasterScale, 0, 0, rasterScale, 0, 0);
      atlasCtx.textAlign = "center";
      atlasCtx.textBaseline = "middle";
      atlasCtx.fillStyle = fg;
      for (let i = 1; i < RAMP.length; i++) {
        atlasCtx.fillText(RAMP[i], (i * glyphWidth + glyphWidth / 2) / rasterScale, glyphHeight / rasterScale / 2);
      }
    };

    const draw = () => {
      if (!cols || !rows) return;
      for (const bucket of buckets) bucket.length = 0;
      const rowOff = rows - 1;
      for (let x = 0; x < cols; x++) {
        ax[x] = Math.sin(x * 0.045 + t * 0.16);
        bx[x] = Math.sin(x * 0.13 - t * 0.34);
      }
      for (let y = 0; y < rows; y++) {
        ay[y] = Math.sin(y * 0.05 - t * 0.12);
        by[y] = Math.sin(y * 0.11 + t * 0.27);
      }
      for (let n = 0; n < cols + rows - 1; n++) {
        axy[n] = Math.sin((n - rowOff) * 0.03 + t * 0.07);
        cxy[n] = Math.sin(n * 0.34 - t * 1.05);
      }
      for (let y = 0, i = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++, i++) {
          const dx = x - cursor.x / cellW;
          const dy = y - cursor.y / size;
          const distanceSquared = dx * dx + dy * dy;
          let value: number;
          if (cursor.energy > 0.002 && distanceSquared < 486) {
            const push = cursor.energy * Math.exp(-distanceSquared / 81) * 3.2;
            const distance = Math.sqrt(distanceSquared) || 1e-4;
            value = fieldValue(x + dx / distance * push, y + dy / distance * push, t);
          } else {
            const a = ax[x] + ay[y] + axy[x - y + rowOff];
            const b = bx[x] + by[y];
            const c = Math.sin(x * 0.29 + y * 0.24 + t * 0.85) + cxy[x + y];
            value = (a * 0.42 + b * 0.34 + c * 0.24) / 5 + 0.5;
          }
          const lum = Math.pow(Math.max(0, Math.min(1, value)), 1.6);
          const nextChar = Math.floor(lum * (RAMP.length - 1));
          const nextAlpha = Math.min(ALPHA_BUCKETS - 1, Math.floor(lum * ALPHA_BUCKETS));
          if (chars[i] !== nextChar || alphaLevels[i] !== nextAlpha) {
            ctx.clearRect(x * cellW, y * size, cellW, size);
            chars[i] = nextChar;
            alphaLevels[i] = nextAlpha;
            if (nextChar) buckets[nextAlpha].push(i);
          }
        }
      }
      ctx.fillStyle = fg;
      for (let b = 0; b < ALPHA_BUCKETS; b++) {
        ctx.globalAlpha = 0.18 + b / (ALPHA_BUCKETS - 1) * 0.82;
        for (const i of buckets[b]) {
          const x = i % cols;
          ctx.drawImage(atlas, chars[i] * glyphWidth, 0, glyphWidth, glyphHeight, x * cellW, Math.floor(i / cols) * size, cellW, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (cols && rect.width === width && rect.height === height) return;
      width = rect.width;
      height = rect.height;
      if (width < 2 || height < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      rasterScale = dpr;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const style = getComputedStyle(canvas);
      fg = style.color;
      ctx.font = `${size}px ${style.fontFamily}`;
      cellW = Math.max(4, ctx.measureText("MMMMMMMMMM").width / 10);
      glyphWidth = Math.ceil(cellW * dpr);
      glyphHeight = Math.ceil(size * dpr);
      buildAtlas();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      cols = Math.max(1, Math.ceil(width / cellW));
      rows = Math.max(1, Math.ceil(height / size));
      chars = new Uint8Array(cols * rows);
      chars.fill(255);
      alphaLevels = new Uint8Array(cols * rows);
      ax = new Float64Array(cols);
      bx = new Float64Array(cols);
      ay = new Float64Array(rows);
      by = new Float64Array(rows);
      axy = new Float64Array(cols + rows - 1);
      cxy = new Float64Array(cols + rows - 1);
      draw();
    };

    const loop = (now: number) => {
      raf = 0;
      if (disposed || document.hidden || !visible || motionQuery.matches) return;
      if (now < Math.max(scrollIdleAt, animationReadyAt)) { last = now; raf = requestAnimationFrame(loop); return; }
      const elapsed = last ? now - last : 1000 / 30;
      if (elapsed >= 1000 / 30) {
        const dt = Math.min(0.1, elapsed / 1000);
        last = now;
        t += dt * speed;
        cursor.x += (cursor.tx - cursor.x) * 0.28;
        cursor.y += (cursor.ty - cursor.y) * 0.28;
        cursor.energy *= Math.exp(-dt / 1.3);
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    const syncPlayback = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      if (!ready || disposed) return;
      if (motionQuery.matches) draw();
      else if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const onPointer = (event: PointerEvent) => {
      if (motionQuery.matches || event.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (cursor.tx > -1e4) {
        cursor.energy = Math.min(1, cursor.energy + Math.hypot(x - cursor.tx, y - cursor.ty) * 0.0036);
      } else {
        cursor.x = x;
        cursor.y = y;
      }
      cursor.tx = x;
      cursor.ty = y;
    };
    const onLeave = () => { cursor.tx = cursor.x; cursor.ty = cursor.y; };
    const onScroll = () => {
      scrollIdleAt = performance.now() + 160;
      const rect = root.getBoundingClientRect();
      const uncovered = !root.classList.contains("portfolio-hero-wrapper") || window.scrollY < root.offsetHeight;
      const next = rect.bottom > 0 && rect.top < window.innerHeight && uncovered;
      if (next !== visible) { visible = next; syncPlayback(); }
    };
    const themeObserver = new MutationObserver(() => {
      fg = getComputedStyle(canvas).color;
      if (ready) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "style"] });
    const resizeObserver = new ResizeObserver(() => { if (ready) resize(); });
    resizeObserver.observe(root);
    document.fonts.ready.then(() => {
      if (disposed) return;
      ready = true;
      resize();
      onScroll();
      syncPlayback();
    });
    root.addEventListener("pointermove", onPointer);
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", syncPlayback);
    motionQuery.addEventListener("change", syncPlayback);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      root.removeEventListener("pointermove", onPointer);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", syncPlayback);
      motionQuery.removeEventListener("change", syncPlayback);
    };
  }, [cellSize, speed, startDelay]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`glyph-tide ${className}`} />;
}

export default GlyphTide;
