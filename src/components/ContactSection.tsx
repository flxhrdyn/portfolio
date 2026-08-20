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

            {/* RIGHT: CLEAN HAIRLINE METADATA LIST */}
            <div className="contact-minimal-right">
              <a
                href="https://github.com/flxhrdyn"
                target="_blank"
                rel="noreferrer"
                className="contact-minimal-row"
              >
                <span className="row-title">GitHub</span>
                <span className="row-value">flxhrdyn ↗</span>
              </a>

              <a
                href="https://linkedin.com/in/felixhrdyn"
                target="_blank"
                rel="noreferrer"
                className="contact-minimal-row"
              >
                <span className="row-title">LinkedIn</span>
                <span className="row-value">felixhrdyn ↗</span>
              </a>

              <div className="contact-minimal-row static-row">
                <span className="row-title">Location</span>
                <span className="row-value">
                  Jakarta {wibTime ? `· ${wibTime} WIB` : ""}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}






