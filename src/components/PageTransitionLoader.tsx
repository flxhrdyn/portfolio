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

          {/* Groq High-Speed Vertical Laser Scanline */}
          <div className="transition-vertical-laser" aria-hidden="true" />

          {/* Central Tensor HUD */}
          <div className="transition-tensor-hub">
            {/* 3x3 Animated Tensor Matrix Brandmark */}
            <div className="transition-matrix-box">
              <div className="transition-matrix-grid">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <span
                    key={i}
                    className="tensor-node"
                    style={{ animationDelay: `${(i % 3) * 60 + Math.floor(i / 3) * 80}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* Monospace Telemetry Header */}
            <div className="transition-telemetry-block">
              <div className="transition-telemetry-eyebrow">
                <span className="transition-status-dot" />
                <span>GROQ LPUS // ROUTING TENSOR</span>
              </div>
              <div className="transition-telemetry-title">
                {targetLabel}
              </div>
              <div className="transition-telemetry-route">
                <code>TARGET: {targetRoute}</code>
              </div>
            </div>

            {/* 1px High-Speed Progress Laser */}
            <div className="transition-progress-track">
              <div className="transition-progress-bar" />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
