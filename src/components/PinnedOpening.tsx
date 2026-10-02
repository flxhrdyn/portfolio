"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pins the hero and metrics strip together once the strip's bottom edge reaches the
 * bottom of the viewport, so the reader scrolls through both and Featured Projects
 * is the layer that slides over them.
 *
 * Sticky `top` must be negative when the block is taller than the viewport, and CSS
 * cannot reference an element's own height, so it is measured here.
 */
export default function PinnedOpening({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className="pinned-opening">
      {children}
    </div>
  );
}
