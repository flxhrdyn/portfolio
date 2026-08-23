"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* TOP BAR: Clean label + Back to top */}
        <div className="footer-top-bar">
          <span className="footer-brand-tag">PORTFOLIO</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <span className="footer-top-arrow">↑</span>
          </button>
        </div>

        {/* GIANT BOLD DISPLAY TEXT (GROQ / SCALE AI STYLE) */}
        <div className="footer-giant-title-wrap">
          <span className="footer-giant-title">FLXHRDYN</span>
        </div>

        {/* BOTTOM BAR: Clear, honest metadata */}
        <div className="footer-bottom-bar">
          <span className="footer-meta-item">
            © {new Date().getFullYear()} Felix Hardyan
          </span>
          <span className="footer-meta-item footer-stack-text">
            Built with Next.js, Tailwind CSS & Motion
          </span>
          <span className="footer-meta-item">
            Jakarta, Indonesia
          </span>
        </div>
      </div>
    </footer>
  );
}
