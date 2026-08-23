"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence, useReducedMotion, type Variants } from "motion/react";
import Reveal from "./Reveal";

const EMAIL = "felixhardyanwork@gmail.com";

const rowListVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const rowItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ContactSection() {
  const reduceMotion = useReducedMotion();
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
    <section className="contact-finale-section" id="contact">
      <div className="container">
        <div className="contact-minimal-canvas">
          {/* LEFT: MAIN BOLD FINALE CTA */}
          {reduceMotion ? (
            <div className="contact-minimal-left">
              <span className="contact-minimal-availability">
                <span className="availability-dot" />
                Available for opportunities
              </span>

              <h2 className="contact-minimal-headline">
                Let&apos;s build something together.
              </h2>

              <p className="contact-minimal-subtext">
                Feel free to reach out for full-time engineering roles, AI consulting, or casual technical discussions.
              </p>
            </div>
          ) : (
            <m.div
              className="contact-minimal-left"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={rowItemVariants}
            >
              <span className="contact-minimal-availability">
                <span className="availability-dot" />
                Available for opportunities
              </span>

              <h2 className="contact-minimal-headline">
                Let&apos;s build something together.
              </h2>

              <p className="contact-minimal-subtext">
                Feel free to reach out for full-time engineering roles, AI consulting, or casual technical discussions.
              </p>
            </m.div>
          )}

          {/* RIGHT: 4 PARALLEL ROWS WITH STAGGERED MOTION CASCADE */}
          {reduceMotion ? (
            <div className="contact-minimal-right">
              <button
                type="button"
                onClick={handleCopy}
                className="contact-minimal-row contact-email-row"
                title="Click to copy email address"
              >
                <span className="row-left-group">
                  <svg className="row-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span className="row-title">Email</span>
                </span>
                <span className="row-value">
                  <span className="email-text-display">{EMAIL}</span>
                  <span className="email-copy-btn" aria-label={copied ? "Email copied" : "Copy email"}>
                    {copied ? (
                      <span className="copy-icon-wrap copied">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    ) : (
                      <span className="copy-icon-wrap">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      </span>
                    )}
                  </span>
                </span>
              </button>

              <a
                href="https://github.com/flxhrdyn"
                target="_blank"
                rel="noreferrer"
                className="contact-minimal-row"
              >
                <span className="row-left-group">
                  <svg className="row-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  <svg className="row-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  <svg className="row-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="row-title">Location</span>
                </span>
                <span className="row-value">
                  <span>Jakarta</span>
                  <span>(UTC +7)</span>
                  {wibTime ? <span className="row-clock">{wibTime} WIB</span> : null}
                </span>
              </div>
            </div>
          ) : (
            <m.div
              className="contact-minimal-right"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={rowListVariants}
            >
              <m.button
                type="button"
                onClick={handleCopy}
                className="contact-minimal-row contact-email-row"
                title="Click to copy email address"
                variants={rowItemVariants}
              >
                <span className="row-left-group">
                  <svg className="row-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span className="row-title">Email</span>
                </span>
                <span className="row-value">
                  <span className="email-text-display">{EMAIL}</span>
                  <span className="email-copy-btn" aria-label={copied ? "Email copied" : "Copy email"}>
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <m.span
                          key="check"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ duration: 0.16 }}
                          className="copy-icon-wrap copied"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </m.span>
                      ) : (
                        <m.span
                          key="copy"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ duration: 0.16 }}
                          className="copy-icon-wrap"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                        </m.span>
                      )}
                    </AnimatePresence>
                  </span>
                </span>
              </m.button>

              <m.a
                href="https://github.com/flxhrdyn"
                target="_blank"
                rel="noreferrer"
                className="contact-minimal-row"
                variants={rowItemVariants}
              >
                <span className="row-left-group">
                  <svg className="row-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span className="row-title">GitHub</span>
                </span>
                <span className="row-value">
                  <span>flxhrdyn</span>
                  <span className="row-arrow">↗</span>
                </span>
              </m.a>

              <m.a
                href="https://linkedin.com/in/felixhrdyn"
                target="_blank"
                rel="noreferrer"
                className="contact-minimal-row"
                variants={rowItemVariants}
              >
                <span className="row-left-group">
                  <svg className="row-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              </m.a>

              <m.div
                className="contact-minimal-row static-row"
                variants={rowItemVariants}
              >
                <span className="row-left-group">
                  <svg className="row-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="row-title">Location</span>
                </span>
                <span className="row-value">
                  <span>Jakarta</span>
                  <span>(UTC +7)</span>
                  {wibTime ? <span className="row-clock">{wibTime} WIB</span> : null}
                </span>
              </m.div>
            </m.div>
          )}
        </div>
      </div>
    </section>
  );
}






