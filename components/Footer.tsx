export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="nav-brand">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-color)" }}>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>flxhrdyn</span>
        </div>
        <p className="footer-text">© 2026 Felix Windriyareksa Hardyan. All rights reserved.</p>
      </div>
    </footer>
  );
}
