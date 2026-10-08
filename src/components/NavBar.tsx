"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { usePortfolioScroll } from "@/components/MotionProvider";
import { scrollToAnchor } from "@/lib/scrollToAnchor";
import { EASE_OUT } from "@/lib/motion";

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
  const reduceMotion = useReducedMotion();
  const scrollController = usePortfolioScroll();
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);

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

  // Header yields the screen while reading down and returns on any upward scroll.
  // Written to a data attribute, not state, so scrolling never re-renders the nav.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    if (menuOpen) {
      nav.dataset.scrollHidden = "false";
      return;
    }
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < 6) return;
      const hide = delta > 0 && y > 160 && !nav.contains(document.activeElement);
      nav.dataset.scrollHidden = String(hide);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    const applyTheme = () => {
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      setTheme(next);
    };
    const viewTransitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };

    if (reduceMotion || !viewTransitionDocument.startViewTransition || !themeButtonRef.current) {
      applyTheme();
      return;
    }

    const rect = themeButtonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const root = document.documentElement;
    root.style.setProperty("--theme-reveal-x", `${x}px`);
    root.style.setProperty("--theme-reveal-y", `${y}px`);
    root.style.setProperty("--theme-reveal-radius", `${radius}px`);

    const transition = viewTransitionDocument.startViewTransition(applyTheme);
    const clearOrigin = () => {
      root.style.removeProperty("--theme-reveal-x");
      root.style.removeProperty("--theme-reveal-y");
      root.style.removeProperty("--theme-reveal-radius");
    };
    // `ready` rejects when the transition is skipped (hidden tab, rapid re-toggle); the theme still applies.
    transition.ready.catch(() => {});
    void transition.finished.then(clearOrigin, clearOrigin);
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    scrollToAnchor(event, href, scrollController);
  };

  const themeButton = (
    <button ref={themeButtonRef} type="button" className="nav-utility nav-theme-control" onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
      <span className="nav-theme-text">{theme === "dark" ? "Light mode" : "Dark mode"}</span>
      <svg className="nav-theme-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {theme === "dark" ? (
          <><circle cx="10" cy="10" r="3.2" /><path d="M10 1.8v2M10 16.2v2M18.2 10h-2M3.8 10h-2m14-5.8-1.4 1.4M5.6 14.4l-1.4 1.4m11.6 0-1.4-1.4M5.6 5.6 4.2 4.2" /></>
        ) : (
          <path d="M17.4 12.2A7 7 0 0 1 7.8 2.6a7.1 7.1 0 1 0 9.6 9.6Z" />
        )}
      </svg>
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
                Ask AI <Arrow />
              </button>
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
              {NAV_LINKS.map((link, index) => (
                <m.a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="nav-menu-section"
                  initial={false}
                  animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.2, delay: index * 0.024, ease: EASE_OUT }}
                >
                  <span>{link.label}</span>
                </m.a>
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
