import type { TargetAndTransition, Transition, Variants } from "motion/react";

let speed = 0;
let sampledAt = 0;

/** One passive listener for the page; no React renders on the scroll path. */
export function trackScrollTempo() {
  let previousY = window.scrollY;
  let previousTime = performance.now();
  const onScroll = () => {
    const now = performance.now();
    const elapsed = now - previousTime;
    const delta = Math.abs(window.scrollY - previousY);
    if (elapsed > 0 && delta > 0) {
      const next = delta / Math.max(16, elapsed);
      speed = elapsed > 180 ? next : speed * 0.55 + next * 0.45;
      sampledAt = now;
    }
    previousY = window.scrollY;
    previousTime = now;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

export function scrollTempo() {
  const recent = typeof performance !== "undefined" && performance.now() - sampledAt < 250;
  const velocity = recent ? speed : 0;
  // Keep adaptive timing bounded so consecutive entrances do not overlap for long.
  return 1.35 - Math.min(1, velocity / 2.4) * 0.35;
}

export function scrollTransition(transition: Transition, factor = scrollTempo()): Transition {
  const result: Record<string, unknown> = { ...transition };
  for (const [key, value] of Object.entries(transition)) {
    if (typeof value === "number" && key === "duration") {
      result[key] = value * factor;
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = scrollTransition(value as Transition, factor);
    }
  }
  return result as Transition;
}

/** Resolve timing when an entrance starts, including nested Motion variants. */
export function scrollVariants(variants: Variants): Variants {
  const target = variants.show;
  if (!target) return variants;
  return {
    ...variants,
    show: (custom, current, velocity) => {
      const resolved = typeof target === "function" ? target(custom, current, velocity) : target;
      if (typeof resolved === "string") return resolved;
      return {
        ...resolved,
        transition: scrollTransition(resolved.transition ?? { duration: 0.6 }),
      } as TargetAndTransition;
    },
  };
}
