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

          {/* Center Pixel Stage with Corner Reticles */}
          <div className="transition-pixel-stage">
            {/* 4 Corner Geometric Brackets */}
            <span className="reticle-corner reticle-tl" aria-hidden="true" />
            <span className="reticle-corner reticle-tr" aria-hidden="true" />
            <span className="reticle-corner reticle-bl" aria-hidden="true" />
            <span className="reticle-corner reticle-br" aria-hidden="true" />

            {/* Top Logo Brandmark Matching Navbar */}
            <div className="transition-pixel-eyebrow">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
                style={{ color: "var(--text-secondary)", flexShrink: 0 }}
                aria-hidden="true"
              >
                <path d="M5 4H2V20H5" />
                <path d="M19 4H22V20H19" />
                <rect x="7" y="6" width="2.5" height="2.5" fill="currentColor" stroke="none" />
                <rect x="11" y="6" width="2.5" height="2.5" fill="currentColor" stroke="none" opacity="0.3" />
                <rect x="15" y="6" width="2.5" height="2.5" fill="currentColor" stroke="none" />
                
                <rect x="7" y="11" width="2.5" height="2.5" fill="currentColor" stroke="none" opacity="0.3" />
                <rect x="11" y="11" width="2.5" height="2.5" fill="currentColor" stroke="none" />
                <rect x="15" y="11" width="2.5" height="2.5" fill="currentColor" stroke="none" opacity="0.3" />
                
                <rect x="7" y="16" width="2.5" height="2.5" fill="currentColor" stroke="none" />
                <rect x="11" y="16" width="2.5" height="2.5" fill="currentColor" stroke="none" opacity="0.3" />
                <rect x="15" y="16" width="2.5" height="2.5" fill="currentColor" stroke="none" />
              </svg>
              <span className="brand-wordmark" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>flxhrdyn</span>
              <span style={{ opacity: 0.4 }}>//</span>
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.14em" }}>ROUTING</span>
            </div>

            {/* Center Geist Pixel Title */}
            <h1 className="transition-pixel-title">
              {targetLabel}
            </h1>

            {/* Kinetic Segmented Progress Bar */}
            <div className="transition-pixel-track">
              <div className="transition-pixel-bar" />
            </div>

            {/* Micro Route Code */}
            <div className="transition-pixel-route">
              <code>TARGET &rarr; {targetRoute}</code>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
