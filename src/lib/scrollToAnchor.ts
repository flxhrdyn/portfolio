export function scrollToAnchor(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const id = href.slice(1);
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  history.pushState(null, "", href);
  // The hero's continuously-repainting particle canvas starves the browser's
  // scroll-behavior:smooth interpolation, so a CSS-smooth jump can silently stall a few
  // pixels in. Scroll instantly instead of trusting the (globally smooth) default.
  target.scrollIntoView({ behavior: "instant", block: "start" });
}
