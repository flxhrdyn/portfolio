/* eslint-disable @next/next/no-img-element -- static design mockups, not production pages */
import {
  CERTS, CERT_PAGES, CONTACT, EDUCATION, EMAIL, FEATURED, FOOTER, HEATMAP, INTRO, LANGUAGES, METRICS, NAME,
  PAPER, PAPER_ACCURACY, PHOTO, PROJECTS, PAPER_PROOF, ROLES, SECTIONS, SKILLS, isCurrent,
} from "./data";

const short = (title: string) => title.split(": ")[0];
const subtitle = (title: string) => title.split(": ").slice(1).join(": ");
const year = (date: string) => date.match(/\d{4}/g)?.at(-1) ?? "";
const ALL_PROJECTS = [FEATURED, ...PROJECTS];
const CERT_TOTAL = CERT_PAGES * 4;

function Arrow({ dir = "diag" }: { dir?: "diag" | "down" | "right" | "left" }) {
  const d = { diag: "M4 12 12 4M6 4h6v6", down: "M8 3v10M4 9l4 4 4-4", right: "M3 8h10M9 4l4 4-4 4", left: "M13 8H3M7 4 3 8l4 4" }[dir];
  return (
    <svg className="arw" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Heatmap() {
  return (
    <div className="heat" aria-label="GitHub contribution calendar">
      {HEATMAP.map((l, i) => <i key={i} data-l={l} />)}
    </div>
  );
}

function Pager() {
  return (
    <div className="pager">
      <span aria-label="Previous page"><Arrow dir="left" /></span>
      <span>1 / {CERT_PAGES}</span>
      <span aria-label="Next page"><Arrow dir="right" /></span>
    </div>
  );
}

const ASK_PROMPTS = ["What is InvenioAI?", "Which models has Felix trained?", "Is Felix open to work?"];

/* The portfolio's "Ask my portfolio" chat, restyled per direction through the variant class. */
function AskAI({ variant }: { variant: string }) {
  return (
    <section className={`ask ask-${variant}`} aria-label="Ask AI">
      <div className="ask-copy">
        <h2>Ask my portfolio</h2>
        <p>An AI assistant that answers questions about my projects, experience, and skills, using only what is on this site.</p>
      </div>
      <div className="ask-box">
        <div className="ask-thread">
          <p className="ask-q">What is InvenioAI?</p>
          <p className="ask-a">InvenioAI is a RAG system for asking questions about PDF documents. It finds the relevant passages, reranks them, and answers with the sources.</p>
        </div>
        <div className="ask-input">
          <span>Ask anything about my work</span>
          <Arrow dir="right" />
        </div>
        <div className="ask-chips">
          {ASK_PROMPTS.map((q) => <span key={q}>{q}</span>)}
        </div>
      </div>
    </section>
  );
}

/* V4 - 2xa.studio: dark frame around a white canvas, stretched mono caps, giant sans over a field of text, dense columns */
export function V4Computation() {
  const field = ALL_PROJECTS.map((p) => p.summary).join(" ").repeat(2);
  return (
    <div className="v4">
      <header className="v4-bar">
        <span>FLXHRDYN</span>
        <span>AI ENGINEER &amp; DATA SCIENTIST</span>
        <span className="v4-spacer" />
        <span>PROJECTS ({ALL_PROJECTS.length})</span>
        <span>EXPERIENCE</span>
        <span>RESEARCH</span>
        <span>ASK AI</span>
        <span>RESUME</span>
      </header>
      <div className="v4-canvas">
        <section className="v4-hero">
          <p className="v4-field" aria-hidden="true">{field}</p>
          <h1>
            <span style={{ gridArea: "1 / 1" }}>AI</span>
            <span style={{ gridArea: "2 / 2" }}>Engineer</span>
            <span style={{ gridArea: "3 / 1" }}>&amp; Data</span>
            <span style={{ gridArea: "4 / 2" }}>Scientist</span>
          </h1>
          <div className="v4-intro">
            <img src={PHOTO} alt="Felix at the NVIDIA DGX A100" />
            <div>
              <p className="v4-name">{NAME.toUpperCase()}</p>
              <p>{INTRO}</p>
              <span className="v4-link">GET IN TOUCH <Arrow /></span>
            </div>
          </div>
        </section>

        <section className="v4-metrics">
          {METRICS.map((m) => (
            <div key={m.label}>
              <b>{m.value}</b>
              <span>{m.label.toUpperCase()}</span>
            </div>
          ))}
        </section>

        <section className="v4-sec">
          <div className="v4-head">
            <h2>Featured<br />Projects</h2>
            <p>{SECTIONS.projects.lede}</p>
            <span className="v4-link">VIEW ALL PROJECTS <Arrow /></span>
          </div>
          <div className="v4-grid">
            {ALL_PROJECTS.map((p, i) => (
              <figure key={p.slug} className={i === 0 ? "is-wide" : ""}>
                <img src={p.image} alt="" />
                <figcaption>
                  <span>{short(p.title).toUpperCase()}</span>
                  <span>{p.tags.join(", ").toUpperCase()}</span>
                </figcaption>
                {i === 0 && <p>{p.summary}</p>}
                {i === 0 && <span className="v4-link">CASE STUDY <Arrow /></span>}
              </figure>
            ))}
            <div className="more">
              <span>View all projects</span>
              <b>See the full list <Arrow /></b>
            </div>
          </div>
        </section>

        <section className="v4-sec">
          <div className="v4-label"><span>GITHUB</span><span>{SECTIONS.github.lede.toUpperCase()}</span><span>@FLXHRDYN <Arrow /></span></div>
          <Heatmap />
        </section>

        <section className="v4-sec">
          <div className="v4-head">
            <h2>Experience<br />&amp; Education</h2>
            <p>{SECTIONS.experience.lede}</p>
          </div>
          <div className="v4-table">
            <div className="v4-th"><span>DATE</span><span>ROLE</span><span>ORGANIZATION</span><span>FOCUS</span></div>
            {ROLES.map((r) => (
              <div key={r.title + r.company} className="v4-tr">
                <span>{r.date.toUpperCase()} {isCurrent(r.date) && <i className="dot" />}</span>
                <b>{r.title}</b>
                <span>{r.company}</span>
                <span>{r.headline}</span>
              </div>
            ))}
            {EDUCATION.map((e) => (
              <div key={e.title} className="v4-tr">
                <span>{e.date.toUpperCase()}</span>
                <b>{e.title}</b>
                <span>{e.company}</span>
                <span>{e.statLabel}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="v4-sec">
          <div className="v4-head">
            <h2>Skills &amp;<br />Capabilities</h2>
            <p>{SECTIONS.skills.lede}</p>
          </div>
          <div className="v4-cols">
            {SKILLS.map((s) => (
              <div key={s.category}>
                <h3>{s.category.toUpperCase()}</h3>
                {s.items.map((it) => <p key={it}>{it}</p>)}
              </div>
            ))}
          </div>
          <p className="v4-langs">LANGUAGES: {LANGUAGES.join(" / ").toUpperCase()}</p>
        </section>

        <section className="v4-sec">
          <div className="v4-head">
            <h2>Research &amp;<br />Certifications</h2>
            <p>{SECTIONS.research.lede}</p>
          </div>
          <div className="v4-paper">
            <b>{PAPER_ACCURACY}</b>
            <div>
              <span>{PAPER.kind.toUpperCase()} / {PAPER.journal.toUpperCase()}</span>
              <h3>{PAPER.title}</h3>
              <p>{PAPER.summary}</p>
              <span className="v4-link">READ PAPER <Arrow /></span>
            </div>
          </div>
          <div className="v4-certs">
            {CERTS.map((c) => (
              <div key={c.title}>
                <span>{c.badge.toUpperCase()} / {c.date.toUpperCase()}</span>
                <b>{c.title}</b>
                <p>{c.issuer}</p>
              </div>
            ))}
            <Pager />
          </div>
        </section>

        <AskAI variant="v4" />

        <section className="v4-contact">
          <span className="v4-status"><i className="dot" /> {CONTACT.status.toUpperCase()}</span>
          <h2>{CONTACT.title}</h2>
          <p>{CONTACT.lede}</p>
          <div className="v4-links">
            <span>{EMAIL.toUpperCase()}</span>
            {CONTACT.links.map((l) => <span key={l.label}>{l.label.toUpperCase()} <Arrow /></span>)}
          </div>
        </section>
      </div>
      <footer className="v4-bar">
        <span>{FOOTER.text}</span>
        <span className="v4-spacer" />
        {FOOTER.links.map((l) => <span key={l}>{l.toUpperCase()}</span>)}
      </footer>
    </div>
  );
}

/* V5 - matthieugivelet.com: Swiss quiet, centered name with the photo inside it, bracket labels, three-column splits */
export function V5Inline() {
  return (
    <div className="v5">
      <header className="v5-top">
        <span>©flxhrdyn</span>
        <nav>
          <span>Projects<sup>({ALL_PROJECTS.length})</sup></span>
          <span>Experience<sup>({ROLES.length})</sup></span>
          <span>Research<sup>({CERT_TOTAL})</sup></span>
          <span>Ask AI</span>
        </nav>
        <span>Resume</span>
      </header>

      <section className="v5-hero">
        <h1>Fel<img src={PHOTO} alt="" />ix</h1>
        <p>AI Engineer &amp; Data Scientist<br />Jakarta, Indonesia</p>
      </section>

      <section className="v5-split">
        <span>[ About ]</span>
        <p><small>01</small>{INTRO}</p>
        <span className="v5-right">Get in touch <Arrow /></span>
      </section>

      <section className="v5-metrics">
        {METRICS.map((m, i) => (
          <div key={m.label}>
            <small>0{i + 1}</small>
            <b>{m.value}</b>
            <span>{m.label}</span>
          </div>
        ))}
      </section>

      <section className="v5-works">
        <div className="v5-split v5-head">
          <span>[ {SECTIONS.projects.title} ]</span>
          <p>{SECTIONS.projects.lede}</p>
          <span className="v5-right">View all projects <Arrow /></span>
        </div>
        <figure className="v5-feature">
          <img src={FEATURED.image} alt="" />
          <figcaption>
            <small>01</small>
            <div>
              <b>{short(FEATURED.title)}</b>
              <p>{FEATURED.summary}</p>
            </div>
            <span>Case study <Arrow /></span>
          </figcaption>
        </figure>
        <div className="v5-grid">
          {PROJECTS.map((p, i) => (
            <figure key={p.slug}>
              <img src={p.image} alt="" />
              <figcaption>
                <span><small>0{i + 2}</small> {short(p.title)}</span>
                <span>{subtitle(p.title)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="v5-split">
        <span>[ {SECTIONS.github.title} ]</span>
        <div className="v5-stack">
          <p>{SECTIONS.github.lede}</p>
          <Heatmap />
        </div>
        <span className="v5-right">@flxhrdyn <Arrow /></span>
      </section>

      <section className="v5-split">
        <span>[ Experience ]</span>
        <div className="v5-rows">
          {ROLES.map((r) => (
            <article key={r.title + r.company}>
              <small>{year(r.date)}{isCurrent(r.date) && <i className="dot" />}</small>
              <div>
                <b>{r.title}</b>
                <span>{r.company}</span>
              </div>
              <p>{r.headline}</p>
            </article>
          ))}
        </div>
        <span className="v5-right">{ROLES.length} roles</span>
      </section>

      <section className="v5-split">
        <span>[ Education ]</span>
        <div className="v5-rows">
          {EDUCATION.map((e) => (
            <article key={e.title}>
              <small>{year(e.date)}</small>
              <div>
                <b>{e.title}</b>
                <span>{e.company}</span>
              </div>
              <p>{e.statLabel}</p>
            </article>
          ))}
        </div>
        <span />
      </section>

      <section className="v5-split">
        <span>[ Skills ]</span>
        <div className="v5-skills">
          {[...SKILLS, { category: "Languages", items: LANGUAGES }].map((s) => (
            <div key={s.category}>
              <b>{s.category}</b>
              <p>{s.items.join(", ")}</p>
            </div>
          ))}
        </div>
        <span />
      </section>

      <section className="v5-split">
        <span>[ Research ]</span>
        <div className="v5-stack">
          <p className="v5-big">{PAPER_ACCURACY}<small>Test accuracy</small></p>
          <p><b>{PAPER.title}</b>. {PAPER.journal}, {PAPER.volume}.</p>
          <p className="v5-mute">{PAPER.summary}</p>
        </div>
        <span className="v5-right">Read paper <Arrow /></span>
      </section>

      <section className="v5-split">
        <span>[ Certifications ]</span>
        <div className="v5-rows">
          {CERTS.map((c) => (
            <article key={c.title}>
              <small>{year(c.date)}</small>
              <div>
                <b>{c.title}</b>
                <span>{c.issuer}</span>
              </div>
              <p>{c.badge}</p>
            </article>
          ))}
          <Pager />
        </div>
        <span />
      </section>

      <AskAI variant="v5" />

      <section className="v5-contact">
        <span><i className="dot" /> {CONTACT.status}</span>
        <h2>{CONTACT.title}</h2>
        <p>{CONTACT.lede}</p>
      </section>

      <footer className="v5-split v5-foot">
        <span>{FOOTER.text}</span>
        <div>
          <span>[ Contact ]</span>
          <p>{EMAIL}</p>
          {CONTACT.links.map((l) => <p key={l.label}>{l.label} <Arrow /></p>)}
        </div>
        <div>
          <span>[ Index ]</span>
          {FOOTER.links.map((l) => <p key={l}>{l}</p>)}
        </div>
      </footer>
    </div>
  );
}

/* V6 - synthesis: warm paper, light oversized type, arrow index, asymmetric grid, accuracy window, dated ledger, dock */
export function V6Synthesis() {
  const bars = [
    { label: "mobilenet-v2", value: 89.6 },
    { label: "coralnet-baseline", value: 88.8 },
    { label: "inception-v3", value: 84.8 },
  ];
  return (
    <div className="v6">
      <header className="v6-nav">
        <span>flxhrdyn</span>
        <span>Projects</span>
        <span>Experience</span>
        <span>Skills</span>
        <span>Research</span>
        <span>Resume <Arrow /></span>
      </header>

      <section className="v6-hero">
        <h1>Felix Hardyan</h1>
        <p className="v6-lede">AI Engineer &amp; Data Scientist.<br />Based in Jakarta, Indonesia.</p>
        <nav className="v6-index">
          <span><Arrow dir="down" /> Projects <sup>({ALL_PROJECTS.length})</sup></span>
          <span><Arrow dir="down" /> Experience <sup>({ROLES.length})</sup></span>
          <span><Arrow dir="down" /> Research <sup>({CERT_TOTAL})</sup></span>
          <span><Arrow dir="down" /> Contact</span>
        </nav>
      </section>

      <section className="v6-split">
        <span className="v6-label">[ About ]</span>
        <p><small>01</small>{INTRO}</p>
        <span className="v6-pill">Get in touch <Arrow /></span>
      </section>

      <section className="v6-metrics">
        {METRICS.map((m) => (
          <div key={m.label}><b>{m.value}</b><span>{m.label}</span></div>
        ))}
      </section>

      <p className="v6-spread">
        {"AI SYSTEMS BUILT FOR REAL USE".split(" ").map((w, i) => (
          <span key={w + i}>{w}</span>
        ))}
      </p>

      <section className="v6-work">
        <div className="v6-head">
          <h2>{SECTIONS.projects.title}</h2>
          <p>{SECTIONS.projects.lede}</p>
          <span className="v6-pill">View all projects <Arrow /></span>
        </div>
        <div className="v6-grid">
          {ALL_PROJECTS.map((p, i) => (
            <figure key={p.slug} className={i === 0 ? "is-wide" : ""}>
              <img src={p.image} alt="" />
              <figcaption>
                <small>0{i + 1}</small>
                <b>{short(p.title)}</b>
                <span>{p.tags.slice(0, 2).join(" / ")}</span>
              </figcaption>
              {i === 0 && <p>{p.summary}</p>}
            </figure>
          ))}
          <div className="more">
            <span>View all projects</span>
            <b>See the full list <Arrow /></b>
          </div>
        </div>
      </section>

      <section className="v6-github">
        <div className="v6-head">
          <h2>{SECTIONS.github.title}</h2>
          <p>{SECTIONS.github.lede}</p>
        </div>
        <Heatmap />
      </section>

      <section className="v6-interlude">
        <img src={PHOTO} alt="" />
        <p>NVIDIA DGX A100, HPC Universitas Gunadarma</p>
      </section>

      <section className="v6-ledger">
        <div className="v6-head">
          <h2>{SECTIONS.experience.title}</h2>
          <p>{SECTIONS.experience.lede}</p>
        </div>
        {[...ROLES.map((r) => ({ ...r, note: r.headline })), ...EDUCATION.map((e) => ({ ...e, note: e.statLabel }))].map((r) => (
          <article key={r.title + r.company}>
            <span>{r.date}{isCurrent(r.date) && <i className="dot" />}</span>
            <div>
              <h3>{r.title}</h3>
              <p>{r.company}</p>
            </div>
            <p>{r.note}</p>
          </article>
        ))}
      </section>

      <section className="v6-skills">
        <div className="v6-head">
          <h2>{SECTIONS.skills.title}</h2>
          <p>{SECTIONS.skills.lede}</p>
        </div>
        <div className="v6-skill-grid">
          {[...SKILLS, { category: "Languages", items: LANGUAGES }].map((s) => (
            <div key={s.category}>
              <span className="v6-label">[ {s.category} ]</span>
              <p>{s.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="v6-research">
        <div className="v6-head">
          <h2>{SECTIONS.research.title}</h2>
          <p>{SECTIONS.research.lede}</p>
        </div>
        <div className="v6-proof">
          <div className="v6-window">
            <div className="v6-titlebar"><span>Coral reef classification</span><span>Test accuracy</span></div>
            {bars.map((b) => (
              <div key={b.label} className="v6-bar">
                <span>{b.label}</span>
                <i><em style={{ width: `${b.value}%` }} /></i>
                <b>{b.value.toFixed(2)}%</b>
              </div>
            ))}
          </div>
          <div className="v6-numbers">
            {PAPER_PROOF.map((p) => (
              <div key={p.label}><b>{p.value}</b><span>{p.label}</span></div>
            ))}
          </div>
        </div>
        <div className="v6-paper">
          <span className="v6-label">[ {PAPER.kind} ]</span>
          <div>
            <h3>{PAPER.title}</h3>
            <p>{PAPER.journal}, {PAPER.volume}. {PAPER.summary}</p>
          </div>
          <span className="v6-pill">Read paper <Arrow /></span>
        </div>
        <div className="v6-certs">
          {CERTS.map((c) => (
            <div key={c.title}>
              <span className="v6-label">{c.badge} / {c.date}</span>
              <b>{c.title}</b>
              <p>{c.issuer}</p>
            </div>
          ))}
          <Pager />
        </div>
      </section>

      <AskAI variant="v6" />

      <footer className="v6-foot">
        <span className="v6-label"><i className="dot" /> {CONTACT.status}</span>
        <p className="v6-hello">{CONTACT.title}</p>
        <div className="v6-address">
          <span>E</span>
          <p>{EMAIL}</p>
          <span>L</span>
          <p>{CONTACT.links.map((l) => l.label).join(", ")}</p>
          <span>N</span>
          <p>{CONTACT.lede}</p>
        </div>
        <div className="v6-legal">
          <span>{FOOTER.text}</span>
          <span>{FOOTER.links.join("   ")}</span>
        </div>
      </footer>

      <nav className="v6-dock" aria-label="Mockup dock">
        <span className="is-on">Home</span>
        <span>Projects</span>
        <span>Experience</span>
        <span>Research</span>
        <span>Ask AI</span>
      </nav>
    </div>
  );
}

/* V7 - synthesis of V4-V6: Givelet's calm splits and inline-photo name, 2xA's dark frame, mono caps and
   one-wide-tile grid, V6's warm paper, light type, ledger and dock. Ask AI is the one inverted band. */
export function V7Synthesis() {
  return (
    <div className="v7">
      <div className="v7-canvas">
        <header className="v7-top">
          <span className="v7-logo">flxhrdyn</span>
          <nav>
            <span>Projects<sup>{ALL_PROJECTS.length}</sup></span>
            <span>Experience<sup>{ROLES.length}</sup></span>
            <span>Skills</span>
            <span>Research<sup>{CERT_TOTAL}</sup></span>
          </nav>
          <span className="v7-cap">Resume <Arrow /></span>
        </header>

        <section className="v7-hero">
          <h1><span className="v7-name">Fel<img src={PHOTO} alt="" />ix</span> Hardyan</h1>
          <div className="v7-cols">
            <span className="v7-cap">[ AI Engineer &amp; Data Scientist ]</span>
            <p>{INTRO}</p>
            <span className="v7-pill">Get in touch <Arrow /></span>
          </div>
        </section>

        <section className="v7-metrics">
          {METRICS.map((m) => (
            <div key={m.label}><b>{m.value}</b><span className="v7-cap">{m.label}</span></div>
          ))}
        </section>

        <section className="v7-sec">
          <div className="v7-cols">
            <span className="v7-cap">[ {SECTIONS.projects.title} ]</span>
            <h2>{SECTIONS.projects.lede}</h2>
            <span className="v7-cap v7-r">View all ({ALL_PROJECTS.length}) <Arrow /></span>
          </div>
          <div className="v7-grid">
            {ALL_PROJECTS.map((p, i) => (
              <figure key={p.slug} className={i === 0 ? "is-wide" : ""}>
                <img src={p.image} alt="" />
                <figcaption>
                  <b>{short(p.title)}</b>
                  <span>{subtitle(p.title)}</span>
                </figcaption>
                {i === 0 && <p>{p.summary}</p>}
                {i === 0 && <span className="v7-cap">Case study <Arrow /></span>}
              </figure>
            ))}
            <div className="more">
              <span>View all projects</span>
              <b>See the full list <Arrow /></b>
            </div>
          </div>
        </section>

        <section className="v7-sec">
          <div className="v7-cols">
            <span className="v7-cap">[ {SECTIONS.github.title} ]</span>
            <h2>{SECTIONS.github.lede}</h2>
            <span className="v7-cap v7-r">@flxhrdyn <Arrow /></span>
          </div>
          <Heatmap />
        </section>

        <section className="v7-sec">
          <div className="v7-cols">
            <span className="v7-cap">[ {SECTIONS.experience.title} ]</span>
            <h2>{SECTIONS.experience.lede}</h2>
            <span />
          </div>
          <div className="v7-ledger">
            {ROLES.map((r) => (
              <article key={r.title + r.company}>
                <span className="v7-cap">{r.date}{isCurrent(r.date) && <i className="dot" />}</span>
                <div><h3>{r.title}</h3><p>{r.company}</p></div>
                <p>{r.headline}</p>
              </article>
            ))}
            {EDUCATION.map((e) => (
              <article key={e.title}>
                <span className="v7-cap">{e.date}</span>
                <div><h3>{e.title}</h3><p>{e.company}</p></div>
                <p>{e.statLabel}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="v7-sec">
          <div className="v7-cols">
            <span className="v7-cap">[ {SECTIONS.skills.title} ]</span>
            <h2>{SECTIONS.skills.lede}</h2>
            <span />
          </div>
          <div className="v7-skills">
            {[...SKILLS, { category: "Languages", items: LANGUAGES }].map((s) => (
              <div key={s.category}>
                <span className="v7-cap">{s.category}</span>
                {s.items.map((it) => <p key={it}>{it}</p>)}
              </div>
            ))}
          </div>
        </section>

        <section className="v7-sec">
          <div className="v7-cols">
            <span className="v7-cap">[ {SECTIONS.research.title} ]</span>
            <h2>{SECTIONS.research.lede}</h2>
            <span />
          </div>
          <div className="v7-paper">
            <p className="v7-big">{PAPER_ACCURACY}</p>
            <div>
              <span className="v7-cap">{PAPER.kind} / Test accuracy</span>
              <h3>{PAPER.title}</h3>
              <p>{PAPER.summary}</p>
              <span className="v7-pill">Read paper <Arrow /></span>
            </div>
          </div>
          <div className="v7-certs">
            {CERTS.map((c) => (
              <div key={c.title}>
                <span className="v7-cap">{c.badge} / {c.date}</span>
                <b>{c.title}</b>
                <p>{c.issuer}</p>
              </div>
            ))}
            <Pager />
          </div>
        </section>

        <AskAI variant="v7" />

        <section className="v7-contact">
          <span className="v7-cap"><i className="dot" /> {CONTACT.status}</span>
          <h2>{CONTACT.title}</h2>
          <div className="v7-cols">
            <span className="v7-cap">[ Contact ]</span>
            <p>{CONTACT.lede}</p>
            <div className="v7-address">
              <p>{EMAIL}</p>
              {CONTACT.links.map((l) => <p key={l.label}>{l.label} <Arrow /></p>)}
            </div>
          </div>
        </section>

        <footer className="v7-foot v7-cap">
          <span>{FOOTER.text}</span>
          <span>{FOOTER.links.join("   ")}</span>
        </footer>
      </div>

      <nav className="v7-dock" aria-label="Mockup dock">
        <span className="is-on">Home</span>
        <span>Projects</span>
        <span>Research</span>
        <span>Ask AI</span>
      </nav>
    </div>
  );
}
