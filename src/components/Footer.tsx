"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-left">
          <p className="footer-text">© {new Date().getFullYear()} FLXHRDYN • AI ENGINEER</p>
          <p className="footer-tech-stack">
            Built with Next.js 16 · TypeScript · Tailwind CSS · Motion · Groq GPT-OSS-120B
          </p>
        </div>
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
    </footer>
  );
}
