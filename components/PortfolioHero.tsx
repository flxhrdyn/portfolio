import ParticlesCanvas from "./ParticlesCanvas";

export default function PortfolioHero() {
  return (
    <div className="hero-wrapper">
      <ParticlesCanvas />

      <div className="ambient-auras">
        <div className="aura aura-1" />
        <div className="aura aura-2" />
      </div>

      <header className="container hero-content">
        <div className="hero-title-group">
          <div className="hero-subtitle">PERSONAL PORTFOLIO</div>
          <h1 className="hero-title">Felix Windriyareksa Hardyan</h1>
          <p style={{ fontSize: "1.35rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            AI Engineer &amp; Data Scientist
          </p>
          <p className="hero-description">
            Focused on computer vision, applied NLP, and retrieval-augmented generation. Designing and scaling machine
            learning pipelines and shipping them as production-ready applications.
          </p>
        </div>

        <div className="hero-actions">
          <a href="#projects" className="btn-pill btn-pill-primary">
            <span>Explore Case Studies</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="#contact" className="btn-pill btn-pill-secondary">
            <span>Get in Touch</span>
          </a>
        </div>
      </header>
    </div>
  );
}
