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

function observeReveal(el: HTMLElement | null) {
  if (!el) return;
  const set = (state: RevealState) => { el.dataset.reveal = state; };

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

  enter.observe(el);
  exit.observe(el);
  return () => {
    enter.disconnect();
    exit.disconnect();
  };
}
