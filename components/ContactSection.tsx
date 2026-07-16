import EmailReveal from "./EmailReveal";

export default function ContactSection() {
  return (
    <section className="section" id="contact" style={{ paddingBottom: "6rem" }}>
      <div className="container">
        <div className="contact-card">
          <h2 style={{ borderBottom: "none", paddingBottom: 0, textAlign: "center", marginBottom: "0.75rem" }}>Get in Touch</h2>
          <p className="contact-text">Have an interesting project, job, or consultation requirement? Let's build something robust together.</p>

          <EmailReveal />

          <div className="contact-links">
            <a href="https://github.com/flxhrdyn" target="_blank" rel="noreferrer" className="social-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/flxhrdyn" target="_blank" rel="noreferrer" className="social-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
