"use client";

import { useState } from "react";

const EMAIL = "felixhardyanwork@gmail.com";

export default function EmailReveal() {
  const [revealed, setRevealed] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy");

  const copy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopyLabel("Copied!");
    setTimeout(() => setCopyLabel("Copy"), 1500);
  };

  return (
    <div className="email-reveal-wrapper">
      {!revealed ? (
        <button className="email-reveal-btn btn-pill btn-pill-primary" onClick={() => setRevealed(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>Reveal Contact Email</span>
        </button>
      ) : (
        <div className="revealed-email-box">
          <span>{EMAIL}</span>
          <button className="copy-btn" onClick={copy}>
            {copyLabel}
          </button>
        </div>
      )}
    </div>
  );
}
