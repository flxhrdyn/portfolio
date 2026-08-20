"use client";

import { useState, useEffect } from "react";
import Reveal from "./Reveal";

const EMAIL = "felixhardyanwork@gmail.com";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [wibTime, setWibTime] = useState<string>("");

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

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section" id="contact" style={{ paddingBottom: "6rem" }}>
      <div className="container">
        <Reveal>
          <h2>Get in Touch</h2>
        </Reveal>

        {/* ULTRA-MINIMALIST & SPACIOUS CONTACT BOARD */}
        <Reveal delay={0.06}>
          <div className="contact-minimal-canvas">
            {/* LEFT: EDITORIAL INVITATION */}
            <div className="contact-minimal-left">
              <span className="contact-minimal-availability">
                <span className="availability-dot" />
                Available for opportunities
              </span>

              <h3 className="contact-minimal-headline">
                Let&apos;s build something together.
              </h3>

              <p className="contact-minimal-subtext">
                Feel free to reach out for full-time engineering roles, AI consulting, or casual technical discussions.
              </p>

              <div className="contact-minimal-email-row">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="contact-copy-pill"
                  title="Click to copy email address"
                >
                  <span className="contact-pill-email">{EMAIL}</span>
                  <span className="contact-pill-action">
                    {copied ? "Copied!" : "Copy"}
                  </span>
                </button>

                <a
                  href={`mailto:${EMAIL}`}
                  className="contact-email-link"
                  aria-label="Send email directly"
                >
                  Send email ↗
                </a>
              </div>
            </div>

            {/* RIGHT: CLEAN HAIRLINE METADATA LIST WITH LOGOS & ANIMATION */}
            <div className="contact-minimal-right">
              <a
                href="https://github.com/flxhrdyn"
                target="_blank"
                rel="noreferrer"
                className="contact-minimal-row"
              >
                <span className="row-left-group">
                  <svg className="row-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span className="row-title">GitHub</span>
                </span>
                <span className="row-value">
                  <span>flxhrdyn</span>
                  <span className="row-arrow">↗</span>
                </span>
              </a>

              <a
                href="https://linkedin.com/in/felixhrdyn"
                target="_blank"
                rel="noreferrer"
                className="contact-minimal-row"
              >
                <span className="row-left-group">
                  <svg className="row-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="row-title">LinkedIn</span>
                </span>
                <span className="row-value">
                  <span>felixhrdyn</span>
                  <span className="row-arrow">↗</span>
                </span>
              </a>

              <div className="contact-minimal-row static-row">
                <span className="row-left-group">
                  <svg className="row-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="row-title">Location</span>
                </span>
                <span className="row-value">
                  <span>Jakarta</span>
                  {wibTime ? <span className="row-clock">· {wibTime} WIB</span> : null}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}






