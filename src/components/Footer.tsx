export default function Footer() {
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
          <a href="https://github.com/flxhrdyn" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/flxhrdyn" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="mailto:felixhardyanwork@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
