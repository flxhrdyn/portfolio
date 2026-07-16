"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "1rem",
        padding: "2rem",
      }}
    >
      <p style={{ fontFamily: "var(--font-mono)", color: "var(--accent-text)", fontSize: "0.9rem" }}>
        Error
      </p>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)" }}>
        Something went wrong
      </h1>
      <p style={{ color: "var(--text-secondary)", maxWidth: "32ch" }}>
        An unexpected error occurred while rendering this page.
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          color: "var(--accent-text)",
          textDecoration: "underline",
          fontWeight: 600,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Try again
      </button>
    </main>
  );
}
