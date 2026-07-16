import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function NotFound() {
  return (
    <>
      <NavBar variant="chat" />
      <main
        style={{
          minHeight: "60vh",
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
          404
        </p>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)" }}>
          Page not found
        </h1>
        <p style={{ color: "var(--text-secondary)", maxWidth: "32ch" }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          style={{ color: "var(--accent-text)", textDecoration: "underline", fontWeight: 600 }}
        >
          Back to home
        </Link>
      </main>
    </>
  );
}
