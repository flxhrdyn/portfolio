/**
 * Shared motion tokens.
 *
 * Every animated surface pulls its easing and duration from here so that scrolling
 * from one section to the next reads as a single system rather than as independent
 * components that each picked their own timing.
 */

/** Exponential ease-out: high initial momentum, long confident deceleration. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Signature reveal curve: slow release, decisive middle, soft landing. Every
 * mask and media reveal uses it so the page reads as one authored system.
 */
export const SHARP_IN_OUT: [number, number, number, number] = [0.75, 0, 0.25, 1];

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

/** Fired by section navigation so its heading can acknowledge the destination. */
export const SECTION_NAVIGATION_EVENT = "portfolio:section-navigation";

/** Sibling stagger for lists that genuinely appear as a list. */
export const LIST_STAGGER = 0.07;

/** Total sibling delay is capped so a long list never leaves the viewport waiting. */
export const LIST_STAGGER_CAP = 4;

/**
 * Media pulls into focus in place: no translation, so it never moves against the
 * scroll direction. Blur lives only on the one image being revealed.
 */
export const FOCUS_REVEAL = {
  hidden: { opacity: 0, scale: 1.04, filter: "blur(10px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)" },
  transition: { duration: 1.2, ease: SHARP_IN_OUT },
} as const;

/** Viewport trigger shared by every scroll-triggered entrance. */
export const VIEWPORT = { once: true, margin: "-80px" } as const;
