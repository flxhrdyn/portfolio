"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import AIAsciiCanvas from "@/components/AIAsciiCanvas";

export default function NotFound() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [wibTime, setWibTime] = useState<string>("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current === "dark" ? "dark" : "light");

    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setWibTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <div className="notfound-canvas">
      {/* STATIC AI CODE BACKGROUND WITH HOVER ASCII-ART DECODE EFFECT */}
      <AIAsciiCanvas theme={theme} />

      <div className="notfound-container">
        {/* TOP AGENCY UTILITY HEADER */}
        <header className="notfound-header">
          <Link href="/" className="notfound-brand" aria-label="flxhrdyn home">
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="notfound-brand-icon"
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
            <span className="notfound-brand-name">flxhrdyn</span>
          </Link>

          <div className="notfound-header-meta">
            <button
              type="button"
              className="notfound-theme-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <span className="notfound-theme-swatch" aria-hidden="true" />
              <span className="notfound-theme-label">{theme === "dark" ? "Dark" : "Light"}</span>
            </button>
          </div>
        </header>

        {/* 2xA ASYMMETRICAL DECONSTRUCTED SCATTER STAGE */}
        <main id="main-content" className="notfound-scatter-stage">
          {/* TOP RIGHT: 'page' */}
          <m.div
            className="notfound-scatter-word notfound-scatter-page"
            initial={reduceMotion ? false : { opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="notfound-mega-glyph">page</span>
          </m.div>

          {/* CENTER LEFT: '404' (MONUMENTAL HERO ANCHOR) */}
          <m.div
            className="notfound-scatter-word notfound-scatter-404"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="notfound-mega-glyph">404</span>
          </m.div>

          {/* LOWER MID-LEFT: 'not' */}
          <m.div
            className="notfound-scatter-word notfound-scatter-not"
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="notfound-mega-glyph">not</span>
          </m.div>

          {/* BOTTOM RIGHT: 'found.' + DIRECT RECOVERY LINK */}
          <m.div
            className="notfound-scatter-word notfound-scatter-found"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="notfound-mega-glyph">found.</span>
            <div className="notfound-scatter-action">
              <p className="notfound-scatter-desc">
                Requested coordinates unreachable in latent space.
              </p>
              <Link href="/" className="notfound-scatter-link">
                <span className="notfound-scatter-link-text">Back to home</span>
                <span className="notfound-scatter-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </m.div>
        </main>

        {/* BOTTOM MINIMALIST FOOTER */}
        <footer className="notfound-footer">
          <span className="notfound-footer-copy">
            © {new Date().getFullYear()} FLXHRDYN • AI ENGINEER
          </span>
          <span className="notfound-footer-status">
            JAKARTA (UTC +7){wibTime ? ` ${wibTime} WIB` : ""}
          </span>
        </footer>
      </div>
    </div>
  );
}
