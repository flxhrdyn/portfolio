export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p className="footer-text">© {new Date().getFullYear()} FLXHRDYN • AI ENGINEER</p>
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
