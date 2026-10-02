import { animate } from "motion";

export function scrollToAnchor(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const id = href.slice(1);
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  history.pushState(null, "", href);

  const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const to = target.getBoundingClientRect().top + window.scrollY - offset;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: to, behavior: "instant" });
    return;
  }

  // Driven by JS rather than CSS smooth scrolling so the glide has the same easing as
  // the rest of the site's motion and cannot stall on a busy main thread.
  animate(window.scrollY, to, {
    duration: Math.min(1.2, 0.5 + Math.abs(to - window.scrollY) / 4000),
    ease: [0.16, 1, 0.3, 1],
    onUpdate: (y) => window.scrollTo({ top: y, behavior: "instant" }),
  });
}
