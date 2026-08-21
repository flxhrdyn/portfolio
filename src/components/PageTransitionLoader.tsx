"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 380);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const getRouteLabel = () => {
    if (pathname === "/portfolio") return "SWITCHING TO // TECHNICAL PORTFOLIO";
    if (pathname === "/") return "INITIALIZING // AI AGENT CONSOLE";
    return "NAVIGATING // SYSTEM READY";
  };

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <m.div
          key="route-loader"
          className="route-transition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Top 2px Laser Sweep Beam */}
          <div className="route-laser-beam">
            <div className="route-laser-glow" />
          </div>

          {/* Center Micro Telemetry Flash */}
          <div className="route-telemetry-badge">
            <span className="telemetry-spark">✦</span>
            <span className="telemetry-text">{getRouteLabel()}</span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
