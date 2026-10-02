"use client";

import { useState, useEffect, useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function Footer() {
  const [wibTime, setWibTime] = useState<string>("");
  const footerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // The footer rises into place as the last stretch of the page scrolls in.
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 120, 0]);

  useEffect(() => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer" ref={footerRef}>
      <m.div className="container footer-content" style={{ y }}>
        {/* ROW 1: Brand / Role & Quick Action Links */}
        <div className="footer-grid-row">
          <p className="footer-text">© {new Date().getFullYear()} FLXHRDYN • AI ENGINEER</p>
          <div className="footer-links">
            <a
              href="https://github.com/flxhrdyn/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-item"
            >
              <span>Source</span>
              <span className="footer-link-arrow">↗</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-item"
            >
              <span>Resume</span>
              <span className="footer-link-arrow">↗</span>
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="footer-link-item footer-back-to-top"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <span className="footer-top-arrow">↑</span>
            </button>
          </div>
        </div>

        {/* ROW 2: Tech Stack & Location with Live Clock */}
        <div className="footer-grid-row">
          <p className="footer-tech-stack">
            Built with Next.js 16 · TypeScript · Tailwind CSS · Motion · Groq GPT-OSS-120B
          </p>
          <span className="footer-location-tag">
            Jakarta (UTC +7){wibTime ? ` ${wibTime} WIB` : ""}
          </span>
        </div>
      </m.div>
    </footer>
  );
}
