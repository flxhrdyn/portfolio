import type { MouseEvent } from "react";
import { animate } from "motion";
import type { PortfolioScrollController } from "@/components/MotionProvider";
import { SECTION_NAVIGATION_EVENT } from "@/lib/motion";

export function scrollToAnchor(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  controller?: PortfolioScrollController,
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    !href.startsWith("#")
  ) {
    return;
  }

  const target = document.getElementById(href.slice(1));
  if (!target) return;

  event.preventDefault();
  history.pushState(null, "", href);
  window.dispatchEvent(new CustomEvent(SECTION_NAVIGATION_EVENT, { detail: href.slice(1) }));

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = target.closest<HTMLElement>(".portfolio-main-column");
  const overflowY = root ? getComputedStyle(root).overflowY : "visible";

  if (root && root.scrollHeight > root.clientHeight && ["auto", "scroll"].includes(overflowY)) {
    const scrollMarginTop = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const top = target.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - scrollMarginTop;
    root.scrollTo({ top, behavior: reducedMotion ? "instant" : "smooth" });
    return;
  }

  if (controller) {
    controller.scrollTo(target, { immediate: reducedMotion });
    return;
  }

  const offset = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

  if (reducedMotion) {
    window.scrollTo({ top: targetTop, behavior: "instant" });
    return;
  }

  animate(window.scrollY, targetTop, {
    duration: Math.min(1.2, 0.5 + Math.abs(targetTop - window.scrollY) / 4000),
    ease: [0.16, 1, 0.3, 1],
    onUpdate: (top) => window.scrollTo({ top, behavior: "instant" }),
  });
}
