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
        second: "2-digit",
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
          <p style={{ marginBottom: "2.25rem", maxWidth: "60ch" }}>
            Interested in working together or discussing a project? Feel free to reach out.
          </p>
        </Reveal>

        {/* ASYMMETRIC SPLIT BENTO GRID (60% / 40%) */}
        <Reveal delay={0.06}>
          <div className="contact-bento-grid">
            {/* LEFT CARD (60%): MAIN INVITATION & DIRECT DISPATCH */}
            <div className="contact-main-card">
              <div className="contact-card-header">
                <span className="contact-header-badge">COMMUNICATION</span>
                <span className="contact-status-pill">
                  <span className="contact-status-dot" />
                  AVAILABLE FOR WORK
                </span>
              </div>

              <div className="contact-main-body">
                <h3 className="contact-main-title">Let&apos;s build something together.</h3>
                <p className="contact-main-desc">
                  Open for full-time engineering roles, AI architecture consulting, and collaborative research projects.
                </p>

                {/* DIRECT EMAIL DISPATCH BOX */}
                <div className="contact-email-box">
                  <div className="contact-email-meta">
                    <span className="contact-email-label">DIRECT EMAIL</span>
                    <span className="contact-email-address">{EMAIL}</span>
                  </div>

                  <div className="contact-email-actions">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className={`contact-btn-copy ${copied ? "copied" : ""}`}
                      aria-label="Copy email address"
                    >
                      {copied ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>COPIED</span>
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                          <span>COPY</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${EMAIL}`}
                      className="contact-btn-mail"
                    >
                      <span>SEND EMAIL ↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE STACK (40%): 3 MODULAR TILES */}
            <div className="contact-side-stack">
              {/* TILE 01: GITHUB */}
              <a
                href="https://github.com/flxhrdyn"
                target="_blank"
                rel="noreferrer"
                className="contact-mini-tile"
              >
                <div className="contact-tile-left">
                  <span className="contact-tile-num">01</span>
                  <div className="contact-tile-info">
                    <span className="contact-tile-name">GitHub</span>
                    <span className="contact-tile-sub">github.com/flxhrdyn</span>
                  </div>
                </div>
                <div className="contact-tile-right">
                  <span className="contact-tile-btn">VISIT ↗</span>
                </div>
              </a>

              {/* TILE 02: LINKEDIN */}
              <a
                href="https://linkedin.com/in/flxhrdyn"
                target="_blank"
                rel="noreferrer"
                className="contact-mini-tile"
              >
                <div className="contact-tile-left">
                  <span className="contact-tile-num">02</span>
                  <div className="contact-tile-info">
                    <span className="contact-tile-name">LinkedIn</span>
                    <span className="contact-tile-sub">linkedin.com/in/flxhrdyn</span>
                  </div>
                </div>
                <div className="contact-tile-right">
                  <span className="contact-tile-btn">CONNECT ↗</span>
                </div>
              </a>

              {/* TILE 03: LOCATION & REAL-TIME CLOCK */}
              <div className="contact-mini-tile location-tile">
                <div className="contact-tile-left">
                  <span className="contact-tile-num">03</span>
                  <div className="contact-tile-info">
                    <span className="contact-tile-name">Location</span>
                    <span className="contact-tile-sub">Jakarta, Indonesia (UTC+7)</span>
                  </div>
                </div>
                <div className="contact-tile-right">
                  <span className="contact-tile-time">
                    {wibTime ? `${wibTime} WIB` : "UTC+7"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


