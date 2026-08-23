/**
 * Shared motion tokens.
 *
 * Every animated surface pulls its easing and duration from here so that scrolling
 * from one section to the next reads as a single system rather than as independent
 * components that each picked their own timing.
 */

/** Exponential ease-out: high initial momentum, long confident deceleration. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Duration ladder, in seconds. Distance and consequence pick the rung. */
export const DUR = {
  /** Immediate feedback: hover, press, toggle. */
  feedback: 0.15,
  /** Routine state change. */
  state: 0.25,
  /** Layout, overlay, or view transition. */
  transition: 0.4,
  /** A deliberately authored entrance. */
  entrance: 0.6,
} as const;

/** Per-word delay of the headline resolve cascade. */
export const WORD_STAGGER = 0.055;

/** Sibling stagger for lists that genuinely appear as a list. */
export const LIST_STAGGER = 0.07;

/** Total sibling delay is capped so a long list never leaves the viewport waiting. */
export const LIST_STAGGER_CAP = 4;

/** Viewport trigger shared by every scroll-triggered entrance. */
export const VIEWPORT = { once: true, margin: "-80px" } as const;
