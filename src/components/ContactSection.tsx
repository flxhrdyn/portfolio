"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence, useReducedMotion, type Variants } from "motion/react";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";

const EMAIL = "felixhardyanwork@gmail.com";

const ctaContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const ctaItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

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

  const handleCopy = () => {
    const triggerSuccess = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };

    if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard
        .writeText(EMAIL)
        .then(triggerSuccess)
        .catch(() => {
          fallbackCopy(EMAIL);
        });
    } else {
      fallbackCopy(EMAIL);
    }
  };

  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      textArea.setAttribute("readonly", "");
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textArea);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      // If all copy mechanisms fail, gracefully degrade
    }
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
              variants={ctaContainerVariants}
            >
              <m.span className="contact-minimal-availability" variants={ctaItemVariants}>
                <span className="availability-dot" />
                Available for opportunities
              </m.span>

              <WordReveal
                as="h2"
                className="contact-minimal-headline"
                text="Let's build something together."
              />

              <m.p className="contact-minimal-subtext" variants={ctaItemVariants}>
                Feel free to reach out for full-time engineering roles, AI consulting, or casual technical discussions.
              </m.p>
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

              <a
                href="https://huggingface.co/felixhrdyn"
                target="_blank"
                rel="noreferrer"
                className="contact-minimal-row"
              >
                <span className="row-left-group">
                  <svg className="row-icon" width="20" height="20" viewBox="0 0 95 88" fill="currentColor">
                    <path d="M47.21 76.5a34.75 34.75 0 1 0 0-69.5 34.75 34.75 0 0 0 0 69.5Z" />
                    <path d="M58.5 32.3c1.28.44 1.78 3.06 3.07 2.38a5 5 0 1 0-6.76-2.07c.61 1.15 2.55-.72 3.7-.32ZM34.95 32.3c-1.28.44-1.79 3.06-3.07 2.38a5 5 0 1 1 6.76-2.07c-.61 1.15-2.56-.72-3.7-.32Z" fill="var(--bg-primary)" />
                    <path d="M46.96 56.29c9.83 0 13-8.76 13-13.26 0-2.34-1.57-1.6-4.09-.36-2.33 1.15-5.46 2.74-8.9 2.74-7.19 0-13-6.88-13-2.38s3.16 13.26 13 13.26Z" fill="var(--bg-primary)" />
                    <path d="M38.6 76.69c2.75-4.04 2.55-7.07-1.22-10.84-3.78-3.77-5.98-9.3-5.98-9.3s-.82-3.2-2.69-2.9c-1.87.3-3.24 5.08.68 8.01 3.91 2.93-.78 4.92-2.29 2.17-1.5-2.75-5.62-9.82-7.76-11.18-2.13-1.35-3.63-.6-3.13 2.2.5 2.79 9.43 9.55 8.56 11-.87 1.47-3.93-1.71-3.93-1.71s-9.57-8.71-11.66-6.44c-2.08 2.27 1.59 4.17 6.8 7.33 5.23 3.16 5.64 4 4.9 5.2-.75 1.2-12.28-8.53-13.36-4.4-1.08 4.11 11.77 5.3 10.98 8.15-.8 2.85-9.06-5.38-10.74-2.18-1.7 3.21 11.65 6.98 11.76 7.01 4.3 1.12 15.25 3.49 19.08-2.12Z" />
                    <path d="M56.33 76.69c-2.75-4.04-2.56-7.07 1.22-10.84 3.77-3.77 5.97-9.3 5.97-9.3s.82-3.2 2.7-2.9c1.86.3 3.23 5.08-.68 8.01-3.92 2.93.78 4.92 2.28 2.17 1.51-2.75 5.63-9.82 7.76-11.18 2.13-1.35 3.64-.6 3.13 2.2-.5 2.79-9.42 9.55-8.55 11 .86 1.47 3.92-1.71 3.92-1.71s9.58-8.71 11.66-6.44c2.08 2.27-1.58 4.17-6.8 7.33-5.23 3.16-5.63 4-4.9 5.2.75 1.2 12.28-8.53 13.36-4.4 1.08 4.11-11.76 5.3-10.97 8.15.8 2.85 9.05-5.38 10.74-2.18 1.69 3.21-11.65 6.98-11.76 7.01-4.31 1.12-15.26 3.49-19.08-2.12Z" />
                  </svg>
                  <span className="row-title">Hugging Face</span>
                </span>
                <span className="row-value">
                  <span>felixhrdyn</span>
                  <span className="row-arrow">↗</span>
                </span>
              </a>
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
                          initial={{ scale: 0.3, opacity: 0, rotate: -25 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          exit={{ scale: 0.3, opacity: 0, rotate: 25 }}
                          transition={{ type: "spring", stiffness: 650, damping: 30 }}
                          className="copy-icon-wrap copied"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <m.polyline
                              points="20 6 9 17 4 12"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.14, ease: "easeOut" }}
                            />
                          </svg>
                        </m.span>
                      ) : (
                        <m.span
                          key="copy"
                          initial={{ scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.4, opacity: 0 }}
                          transition={{ duration: 0.12 }}
                          className="copy-icon-wrap"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
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

              <m.a
                href="https://huggingface.co/felixhrdyn"
                target="_blank"
                rel="noreferrer"
                className="contact-minimal-row"
                variants={rowItemVariants}
              >
                <span className="row-left-group">
                  <svg className="row-icon" width="20" height="20" viewBox="0 0 95 88" fill="currentColor">
                    <path d="M47.21 76.5a34.75 34.75 0 1 0 0-69.5 34.75 34.75 0 0 0 0 69.5Z" />
                    <path d="M58.5 32.3c1.28.44 1.78 3.06 3.07 2.38a5 5 0 1 0-6.76-2.07c.61 1.15 2.55-.72 3.7-.32ZM34.95 32.3c-1.28.44-1.79 3.06-3.07 2.38a5 5 0 1 1 6.76-2.07c-.61 1.15-2.56-.72-3.7-.32Z" fill="var(--bg-primary)" />
                    <path d="M46.96 56.29c9.83 0 13-8.76 13-13.26 0-2.34-1.57-1.6-4.09-.36-2.33 1.15-5.46 2.74-8.9 2.74-7.19 0-13-6.88-13-2.38s3.16 13.26 13 13.26Z" fill="var(--bg-primary)" />
                    <path d="M38.6 76.69c2.75-4.04 2.55-7.07-1.22-10.84-3.78-3.77-5.98-9.3-5.98-9.3s-.82-3.2-2.69-2.9c-1.87.3-3.24 5.08.68 8.01 3.91 2.93-.78 4.92-2.29 2.17-1.5-2.75-5.62-9.82-7.76-11.18-2.13-1.35-3.63-.6-3.13 2.2.5 2.79 9.43 9.55 8.56 11-.87 1.47-3.93-1.71-3.93-1.71s-9.57-8.71-11.66-6.44c-2.08 2.27 1.59 4.17 6.8 7.33 5.23 3.16 5.64 4 4.9 5.2-.75 1.2-12.28-8.53-13.36-4.4-1.08 4.11 11.77 5.3 10.98 8.15-.8 2.85-9.06-5.38-10.74-2.18-1.7 3.21 11.65 6.98 11.76 7.01 4.3 1.12 15.25 3.49 19.08-2.12Z" />
                    <path d="M56.33 76.69c-2.75-4.04-2.56-7.07 1.22-10.84 3.77-3.77 5.97-9.3 5.97-9.3s.82-3.2 2.7-2.9c1.86.3 3.23 5.08-.68 8.01-3.92 2.93.78 4.92 2.28 2.17 1.51-2.75 5.63-9.82 7.76-11.18 2.13-1.35 3.64-.6 3.13 2.2-.5 2.79-9.42 9.55-8.55 11 .86 1.47 3.92-1.71 3.92-1.71s9.58-8.71 11.66-6.44c2.08 2.27-1.58 4.17-6.8 7.33-5.23 3.16-5.63 4-4.9 5.2.75 1.2 12.28-8.53 13.36-4.4 1.08 4.11-11.76 5.3-10.97 8.15.8 2.85 9.05-5.38 10.74-2.18 1.69 3.21-11.65 6.98-11.76 7.01-4.31 1.12-15.26 3.49-19.08-2.12Z" />
                  </svg>
                  <span className="row-title">Hugging Face</span>
                </span>
                <span className="row-value">
                  <span>felixhrdyn</span>
                  <span className="row-arrow">↗</span>
                </span>
              </m.a>
            </m.div>
          )}
        </div>
      </div>
    </section>
  );
}






