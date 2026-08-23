"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-left">
          <span className="footer-brand">
            <span className="footer-name">Felix Hardyan</span>
            <span className="footer-sep">•</span>
            <span className="footer-year">© {new Date().getFullYear()}</span>
          </span>
          <span className="footer-sep">•</span>
          <span className="footer-stack">
            Built with Next.js, Tailwind CSS & Motion
          </span>
        </div>

        <div className="footer-right">
          <span className="footer-location">Jakarta, ID</span>
          <span className="footer-sep">•</span>
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
      </div>
    </footer>
  );
}
