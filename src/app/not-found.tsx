"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";

export default function NotFound() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [wibTime, setWibTime] = useState<string>("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
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
      <div className="container notfound-container">
        {/* HEADER */}
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

        {/* BOLD EDITORIAL HERO STAGE */}
        <main id="main-content" className="notfound-bold-stage">
          <div className="notfound-bold-grid">
            {/* MONUMENTAL 404 DISPLAY */}
            <m.div
              className="notfound-num-block"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="notfound-giant-num">404</span>
            </m.div>

            {/* EDITORIAL CONTENT & SINGLE DIRECT RETURN LINK */}
            <m.div
              className="notfound-content-block"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="notfound-badge">[ ERROR // NOT_FOUND ]</span>
              <h1 className="notfound-bold-title">
                Page does
                <br />
                not exist.
              </h1>
              <p className="notfound-bold-desc">
                The requested URL was not found on this server or has been relocated.
              </p>

              <div className="notfound-action-wrap">
                <Link href="/" className="notfound-home-link">
                  <span>Back to home</span>
                  <span className="notfound-home-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </m.div>
          </div>
        </main>

        {/* FOOTER */}
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
