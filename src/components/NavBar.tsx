"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { scrollToAnchor } from "@/lib/scrollToAnchor";

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#research", label: "Research & Certs" },
  { href: "#contact", label: "Contact" },
];

interface NavBarProps {
  variant?: "chat" | "portfolio";
  onAskAI?: (trigger: HTMLButtonElement) => void;
  chatOpen?: boolean;
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}
    </svg>
  );
}

export default function NavBar({ variant = "portfolio", onAskAI, chatOpen = false }: NavBarProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    scrollToAnchor(event, href);
  };

  const themeButton = (
    <button type="button" className="nav-utility nav-theme-control" onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
      <span className="nav-theme-swatch" aria-hidden="true" />
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );

  return (
    <nav ref={navRef} className={`navbar navbar-${variant} navbar-minimal`} id="top-nav" aria-label="Main navigation">
      <div className="nav-container">
        <Link href="/" className="nav-brand" aria-label="flxhrdyn home">
          <svg
            aria-hidden="true"
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
        <div className="nav-minimal-actions">
          {variant === "portfolio" ? (
            <>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-utility nav-resume-link" aria-label="Resume PDF (opens in a new tab)">
                <span>Resume</span><Arrow diagonal />
              </a>
              <button type="button" className="nav-ask-link" aria-label="Ask AI" aria-expanded={chatOpen}
                aria-controls="portfolio-chat-panel" onClick={(event) => { setMenuOpen(false); onAskAI?.(event.currentTarget); }}>
                Ask AI <Arrow diagonal />
              </button>
              <span className="nav-action-divider" aria-hidden="true" />
              <button ref={menuButtonRef} type="button" className={`nav-menu-trigger${menuOpen ? " is-open" : ""}`}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen} aria-controls="nav-section-menu" onClick={() => setMenuOpen((open) => !open)}>
                Menu
                <svg className="nav-menu-mark" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
                  <path d="M2 7h10" />
                  <path className="nav-menu-mark-vertical" d="M7 2v10" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-utility">Resume <Arrow diagonal /></a>
              {themeButton}
            </>
          )}
        </div>
        {variant === "portfolio" && (
          <div ref={menuRef} id="nav-section-menu" className="nav-menu-panel" hidden={!menuOpen}>
            <div className="nav-menu-sections">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} onClick={(event) => handleNavClick(event, link.href)} className="nav-menu-section">
                  <span>{link.label}</span><Arrow />
                </a>
              ))}
            </div>
            <div className="nav-menu-footer">
              {themeButton}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
