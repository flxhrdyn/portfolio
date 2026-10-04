"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";

const SECTORS = [
  { num: "01", title: "Projects", desc: "Featured AI systems & production engineering", href: "/#projects" },
  { num: "02", title: "Experience", desc: "Technical leadership & engineering trajectory", href: "/#experience" },
  { num: "03", title: "Skills", desc: "Core stack, ML frameworks & cloud infrastructure", href: "/#skills" },
  { num: "04", title: "Research & Certifications", desc: "Peer-reviewed publications & test benchmarks", href: "/#research" },
  { num: "05", title: "Contact", desc: "Direct inquiries, collaborations & availability", href: "/#contact" },
];

export default function NotFound() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
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
        {/* TOP UTILITY HEADER: PURE IN-CANVAS MINIMALISM (NO STICKY NAVBAR) */}
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

          <div className="notfound-header-actions">
            <button
              type="button"
              className="notfound-theme-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <span className="notfound-theme-swatch" aria-hidden="true" />
              <span className="notfound-theme-label">{theme === "dark" ? "Dark" : "Light"}</span>
            </button>
            <span className="notfound-header-divider" aria-hidden="true" />
            <Link href="/" className="notfound-return-link">
              <span>Return</span>
              <span className="notfound-return-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </header>

        {/* HERO BLOCK: BOLD OVERSPEC TYPOGRAPHY & TELEMETRY */}
        <main id="main-content" className="notfound-body">
          <m.div
            className="notfound-eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="notfound-tag">[ 404 // NOT_FOUND ]</span>
            <span className="notfound-coord">~/latent-space/null</span>
          </m.div>

          <m.div
            className="notfound-headline-wrap"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="notfound-headline">
              Lost in the<br />latent space.
            </h1>
            <p className="notfound-subtext">
              The requested coordinate does not exist or has been shifted outside the active architecture.
              Realign your trajectory below.
            </p>

            <div className="notfound-actions">
              <Link href="/" className="notfound-cta-primary">
                <span>Return to Overview</span>
                <span className="notfound-cta-arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="/#projects" className="notfound-cta-secondary">
                <span>Featured Projects</span>
                <span className="notfound-cta-arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
          </m.div>

          {/* TELEMETRY METRIC STRIP (4-CELL HAIRLINE BENTO) */}
          <m.div
            className="notfound-telemetry-grid"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="notfound-telemetry-cell">
              <span className="notfound-cell-key">STATUS</span>
              <span className="notfound-cell-val">404 // UNRESOLVED</span>
            </div>
            <div className="notfound-telemetry-cell">
              <span className="notfound-cell-key">COORDINATE</span>
              <span className="notfound-cell-val">0x00000000</span>
            </div>
            <div className="notfound-telemetry-cell">
              <span className="notfound-cell-key">SURFACE</span>
              <span className="notfound-cell-val">NON_EUCLIDEAN</span>
            </div>
            <div className="notfound-telemetry-cell">
              <span className="notfound-cell-key">SYSTEM</span>
              <span className="notfound-cell-val">ONLINE</span>
            </div>
          </m.div>

          {/* EDITORIAL RECOVERY SECTOR LEDGER */}
          <m.div
            className="notfound-ledger-wrap"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="notfound-ledger-top">
              <span className="notfound-ledger-title">VALID RECOVERY SECTORS</span>
              <span className="notfound-ledger-badge">05 DESTINATIONS</span>
            </div>

            <div className="notfound-ledger-list">
              {SECTORS.map((sector) => (
                <Link
                  key={sector.num}
                  href={sector.href}
                  className="notfound-ledger-row"
                >
                  <span className="notfound-row-index">{sector.num}</span>
                  <div className="notfound-row-content">
                    <span className="notfound-row-heading">{sector.title}</span>
                    <span className="notfound-row-desc">{sector.desc}</span>
                  </div>
                  <span className="notfound-row-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </m.div>
        </main>

        {/* MINIMALIST BASELINE FOOTER */}
        <footer className="notfound-footer">
          <span className="notfound-footer-copy">© {new Date().getFullYear()} FLXHRDYN • AI ENGINEER</span>
          <span className="notfound-footer-location">JAKARTA (UTC +7)</span>
        </footer>
      </div>
    </div>
  );
}
