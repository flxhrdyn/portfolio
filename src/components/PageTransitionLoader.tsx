"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, m } from "motion/react";

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetLabel, setTargetLabel] = useState("TECHNICAL PORTFOLIO");
  const [targetRoute, setTargetRoute] = useState("/portfolio");

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Only handle internal page transitions between / and /portfolio
      if (
        (href === "/portfolio" || href === "/portfolio/" || href === "/" || href === "/#") &&
        !target.hasAttribute("download") &&
        target.getAttribute("target") !== "_blank"
      ) {
        const cleanHref = href.startsWith("/portfolio") ? "/portfolio" : "/";
        const currentClean = pathname.startsWith("/portfolio") ? "/portfolio" : "/";

        if (cleanHref !== currentClean) {
          e.preventDefault();
          setTargetLabel(cleanHref === "/portfolio" ? "TECHNICAL PORTFOLIO" : "AI AGENT CONSOLE");
          setTargetRoute(cleanHref);
          setIsTransitioning(true);

          setTimeout(() => {
            router.push(cleanHref);
          }, 150);
        }
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname, router]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [pathname, isTransitioning]);

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <m.div
          key="fullscreen-route-loader"
          className="fullscreen-transition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle Background Dot Grid */}
          <div className="transition-dot-grid" aria-hidden="true" />

          {/* Center Title Only */}
          <div className="transition-center-stage">
            <h1 className="transition-center-title">
              {targetLabel}
            </h1>
            <div className="transition-stage-track">
              <div className="transition-stage-bar" />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
