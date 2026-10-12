'use client';

import { createElement, type CSSProperties, type ElementType, type ReactNode } from 'react';

type RevealState = 'hidden' | 'in' | 'instant';

/**
 * Directional reveal: content animates in while scrolling down, appears as-is when
 * reached scrolling up, and re-arms once it has left through the bottom edge so the
 * next pass down plays it again. State lives in `data-reveal`; CSS owns the motion.
 */
export function Reveal({
  as = 'div',
  className,
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & Partial<Record<`data-${string}`, string>>) {
  return createElement(as, { ref: observeReveal, className, style, 'data-reveal': 'hidden', ...rest }, children);
}

// Scroll speed at reveal time compresses the stagger: a fast pass should not leave
// half-revealed rows behind it. Pace 1 is the authored timing, 0.35 the floor.
let lastY = 0;
let lastTime = 0;
let velocity = 0;
let tracking = false;
// Blocks at the very end of the page can never clear the bottom band, so reaching the end plays them.
const pageEndChecks = new Set<() => void>();

function trackScrollSpeed() {
  if (tracking || typeof window === 'undefined') return;
  tracking = true;
  lastY = window.scrollY;
  lastTime = performance.now();
  window.addEventListener('scroll', () => {
    const now = performance.now();
    const elapsed = Math.max(now - lastTime, 1);
    const instant = Math.abs(window.scrollY - lastY) / elapsed;
    velocity = velocity * 0.6 + instant * 0.4;
    lastY = window.scrollY;
    lastTime = now;
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) pageEndChecks.forEach((check) => check());
  }, { passive: true });
}

function currentPace() {
  const speed = performance.now() - lastTime > 200 ? 0 : velocity;
  return Math.min(1, Math.max(0.35, 1 - (speed - 0.3) * 0.5));
}

function observeReveal(el: HTMLElement | null) {
  if (!el) return;
  trackScrollSpeed();
  const set = (state: RevealState) => {
    if (state === 'in') el.style.setProperty('--rv-pace', currentPace().toFixed(2));
    el.dataset.reveal = state;
  };
  set('hidden');

  // Plays once the element clears the bottom 15% band, so every block starts its
  // motion at the same point on screen regardless of its height.
  const enter = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting || el.dataset.reveal !== 'hidden') return;
    set(entry.boundingClientRect.top > 0 ? 'in' : 'instant');
  }, { rootMargin: '0px 0px -15% 0px' });

  // Re-arms only after leaving through the bottom edge, never while still visible.
  const exit = new IntersectionObserver(([entry]) => {
    const viewBottom = entry.rootBounds?.bottom ?? window.innerHeight;
    if (!entry.isIntersecting && entry.boundingClientRect.top >= viewBottom) set('hidden');
  });
  const playAtPageEnd = () => {
    if (el.dataset.reveal === 'hidden' && el.getBoundingClientRect().top < window.innerHeight) set('in');
  };
  pageEndChecks.add(playAtPageEnd);

  enter.observe(el);
  exit.observe(el);
  return () => {
    enter.disconnect();
    exit.disconnect();
    pageEndChecks.delete(playAtPageEnd);
  };
}
