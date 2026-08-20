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

        <Reveal delay={0.06}>
          <div className="contact-telemetry-card">
            {/* CARD TOP HEADER */}
            <div className="contact-card-header">
              <span className="contact-header-badge">COMMUNICATION CHANNELS</span>
              <span className="contact-status-pill">
                <span className="contact-status-dot" />
                AVAILABLE FOR ROLES
              </span>
            </div>

            {/* CARD INTRO */}
            <div className="contact-hero-wrap">
              <h3 className="contact-hero-title">Let&apos;s build something together.</h3>
              <p className="contact-hero-desc">
                Open for full-time engineering roles, AI consulting, and collaborative research projects.
              </p>
            </div>

            {/* PRECISION TELEMETRY ROWS */}
            <div className="contact-rows-stack">
              {/* ROW 01: EMAIL */}
              <div className="contact-row-item">
                <div className="contact-row-left">
                  <span className="contact-row-num">01</span>
                  <span className="contact-row-label">Email</span>
                </div>

                <div className="contact-row-value">
                  <span className="contact-value-text">{EMAIL}</span>
                </div>

                <div className="contact-row-actions">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`contact-action-btn ${copied ? "copied" : ""}`}
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
                    className="contact-action-btn primary-action"
                  >
                    <span>EMAIL ↗</span>
                  </a>
                </div>
              </div>

              {/* ROW 02: GITHUB */}
              <div className="contact-row-item">
                <div className="contact-row-left">
                  <span className="contact-row-num">02</span>
                  <span className="contact-row-label">GitHub</span>
                </div>

                <div className="contact-row-value">
                  <span className="contact-value-text">github.com/flxhrdyn</span>
                </div>

                <div className="contact-row-actions">
                  <a
                    href="https://github.com/flxhrdyn"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-action-btn"
                  >
                    <span>VISIT ↗</span>
                  </a>
                </div>
              </div>

              {/* ROW 03: LINKEDIN */}
              <div className="contact-row-item">
                <div className="contact-row-left">
                  <span className="contact-row-num">03</span>
                  <span className="contact-row-label">LinkedIn</span>
                </div>

                <div className="contact-row-value">
                  <span className="contact-value-text">linkedin.com/in/flxhrdyn</span>
                </div>

                <div className="contact-row-actions">
                  <a
                    href="https://linkedin.com/in/flxhrdyn"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-action-btn"
                  >
                    <span>CONNECT ↗</span>
                  </a>
                </div>
              </div>

              {/* ROW 04: LOCATION & TIME */}
              <div className="contact-row-item location-row">
                <div className="contact-row-left">
                  <span className="contact-row-num">04</span>
                  <span className="contact-row-label">Location</span>
                </div>

                <div className="contact-row-value">
                  <span className="contact-value-text">Jakarta, Indonesia (UTC+7)</span>
                </div>

                <div className="contact-row-actions">
                  <span className="contact-time-badge">
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

