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
          {/* Subtle Geometric Dot Grid */}
          <div className="transition-dot-grid" aria-hidden="true" />

          {/* High-Speed Laser Scan Sweep */}
          <div className="transition-vertical-laser" aria-hidden="true" />

          {/* Top Brand Monogram */}
          <div className="transition-top-brand">
            <div className="transition-brand-mark">
              <span className="transition-brand-brackets">[::]</span>
              <span className="transition-brand-name">flxhrdyn</span>
            </div>
            <div className="transition-brand-tag">
              <span className="transition-status-dot" />
              <span>SYSTEM ROUTING</span>
            </div>
          </div>

          {/* Center Bold Giant Typography & Kinetic Laser */}
          <div className="transition-center-stage">
            <div className="transition-stage-eyebrow">
              SWITCHING CONTEXT // 0x7F
            </div>
            <h2 className="transition-stage-title">
              {targetLabel}
            </h2>
            <div className="transition-stage-route">
              <code>TARGET // {targetRoute}</code>
            </div>

            {/* 1px Hairline Kinetic Laser Progress */}
            <div className="transition-stage-track">
              <div className="transition-stage-bar" />
            </div>
          </div>

          {/* Bottom Precision Telemetry */}
          <div className="transition-bottom-telemetry">
            <span>FELIX WINDIYAREKSA HARDYAN</span>
            <span>&bull;</span>
            <span>PRODUCTION-GRADE AI SYSTEMS</span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
