import dynamic from "next/dynamic";
import ChatWidget from "./ChatWidget";

const ParticlesCanvas = dynamic(() => import("./ParticlesCanvas"));

export default function ChatHero() {
  return (
    <div className="hero-wrapper" style={{ minHeight: "calc(100vh - 4.5rem)", display: "flex", alignItems: "center" }}>
      <ParticlesCanvas />

      <div className="ambient-auras">
        <div className="aura aura-1" />
        <div className="aura aura-2" />
      </div>

      <header className="container hero-content" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
        <div className="hero-title-group" style={{ marginBottom: "0.75rem" }}>
          <div className="hero-subtitle" style={{ marginBottom: "0.25rem" }}>
            PERSONAL PORTFOLIO
          </div>
          <h1 className="hero-title" style={{ fontSize: "2.5rem", marginBottom: "0.15rem" }}>
            Felix Windriyareksa Hardyan
          </h1>
          <p style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.15rem", marginBottom: "0.4rem" }}>
            AI Engineer &amp; Data Scientist
          </p>
          <p className="hero-description" style={{ marginBottom: "1rem", fontSize: "1rem" }}>
            Building production-grade AI systems, from Data Science to GenAI.
          </p>
        </div>

        <ChatWidget />

        <div style={{ marginTop: "1.5rem" }}>
          <a href="/portfolio/" className="portfolio-text-link" style={{ textDecoration: "none" }}>
            <span>Prefer to browse? Enter the full portfolio &rarr;</span>
          </a>
        </div>
      </header>
    </div>
  );
}
