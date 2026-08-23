"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        {/* ROW 1: Brand / Role & Quick Action Links */}
        <div className="footer-grid-row">
          <p className="footer-text">© {new Date().getFullYear()} FLXHRDYN • AI ENGINEER</p>
          <div className="footer-links">
            <a
              href="https://github.com/flxhrdyn/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-item"
            >
              <span>Source</span>
              <span className="footer-link-arrow">↗</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-item"
            >
              <span>Resume</span>
              <span className="footer-link-arrow">↗</span>
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="footer-link-item footer-back-to-top"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <span className="footer-top-arrow">↑</span>
            </button>
          </div>
        </div>

        {/* ROW 2: Tech Stack & Location Tag */}
        <div className="footer-grid-row">
          <p className="footer-tech-stack">
            Built with Next.js 16 · TypeScript · Tailwind CSS · Motion · Groq GPT-OSS-120B
          </p>
          <span className="footer-location-tag">
            Jakarta, Indonesia (UTC +7)
          </span>
        </div>
      </div>
    </footer>
  );
}
