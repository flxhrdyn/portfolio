"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { m, useReducedMotion, type Variants } from "motion/react";
import { scrollToAnchor } from "@/lib/scrollToAnchor";
import { EASE_OUT, DUR } from "@/lib/motion";

// Chrome, not content: the bar just fades up. No stagger, nothing to watch.
const navVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.transition, ease: EASE_OUT } },
};

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#research", label: "Research & Certs" },
  { href: "#contact", label: "Contact" },
];

interface NavBarProps {
  variant?: "chat" | "portfolio";
}

export default function NavBar({ variant = "portfolio" }: NavBarProps) {
  const reduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // The theme attribute is set by an inline script before hydration, so it can
    // only be read from the DOM after mount, not derived during render.
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    scrollToAnchor(e, href);
  };

  return (
    <m.nav
      className="navbar"
      id="top-nav"
      variants={navVariants}
      initial={reduceMotion ? undefined : "hidden"}
      animate={reduceMotion ? undefined : "show"}
    >
      <div className="nav-container">
        <Link href="/" className="nav-brand">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            style={{ color: "var(--accent-color)", flexShrink: 0 }}
          >
            {/* Matrix brackets */}
            <path d="M5 4H2V20H5" />
            <path d="M19 4H22V20H19" />
            {/* 3x3 Tensor Data Matrix */}
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
          <span className="brand-wordmark">flxhrdyn</span>
        </Link>

        {variant === "portfolio" && (
          <div className={`nav-links${menuOpen ? " active" : ""}`} id="nav-links">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link" onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", gridColumn: 3, justifySelf: "end" }}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-pill-secondary btn-pill-sm"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
          >
            <span>Resume (PDF)</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>

          {variant === "portfolio" && (
            <Link href="/" className="btn-pill-ask-ai">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
                <path d="M19 1C19.5 2.5 21 4 22.5 4.5C21 5 19.5 6.5 19 8C18.5 6.5 17 5 15.5 4.5C17 4 18.5 2.5 19 1Z" />
                <path d="M5 16C5.5 17.5 7 19 8.5 19.5C7 20 5.5 21.5 5 23C4.5 21.5 3 20 1.5 19.5C3 19 4.5 17.5 5 16Z" />
              </svg>
              <span>Ask AI</span>
            </Link>
          )}

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            suppressHydrationWarning
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {variant === "portfolio" && (
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
    </m.nav>
  );
}
