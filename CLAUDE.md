# Portfolio Website

AI/ML Engineer & Data Scientist personal portfolio.
Design spec: `docs/superpowers/specs/2026-07-14-portfolio-website-design.md`.

## Stack

- Next.js (App Router) + Tailwind CSS
- Content (projects, research writing) as local MDX/JSON files - no CMS, no database
- Hosting: Vercel

## Structure

- Nav: Projects / Experience / Skills / Accomplishments / Contact (anchor links on `/portfolio`)
- `/` is the chat-first landing page (hero + "Ask my portfolio" widget); `/portfolio` is the
  full one-page scroll (projects, experience, skills, accomplishments/research, GitHub
  calendar, contact)
- Research/writing has no standalone detail page - it's shown in a modal (Accomplishments
  section) that links out to the paper's DOI
- Projects have no standalone detail page - the project card opens a modal preview
  (`content/projects.json`), and "Explore Project" links out to the project's GitHub repo

## Conventions

- No CMS/database - all content lives in the repo as MDX/JSON, edited via git
- Demo embedding (iframe) vs screenshot+link is decided per-project depending on whether
  a live deploy exists
- Chat widget ("Ask my portfolio") is additive on Home, not a replacement for standard nav -
  keep pages crawlable and usable without JS-driven chat

## Design Context

Strategic + visual system defined via `/impeccable init`:

- `PRODUCT.md`: register `brand`, platform `web`. Primary users: recruiters/hiring managers
  and freelance/contract clients, both scanning fast for proof of competence. Positioning:
  chat-first - the portfolio answers questions directly instead of asking visitors to read a
  resume. Personality: precise, minimal, confident.
- `DESIGN.md`: North Star "The Signal Console" - a weighted clone of three references: Vercel
  dominant (~60%, near-black/near-white flat surfaces, pill nav, tabbed code-block component),
  Google Antigravity secondary (~25%, oversized display headline + black-pill CTA pairing),
  LangGraph accent (~15%, mono wordmark-badge + thin Signal-Cobalt line-art, used sparingly).
  Dark-first with a direct Vercel-clone light mode. Fonts: Geist Sans + Geist Mono. Accent:
  Signal Cobalt, solid only - no gradients, no rainbow glow, no Google four-color dot logo.
  Signature component: the "Ask my portfolio" chat widget (Card bg, Seam border, Geist Mono
  header, solid Signal Cobalt status dot).
- Live-mode config: `.impeccable/live/config.json` (targets `src/app/layout.tsx`).
- Pending implementation (not yet done): install `geist` package, wire Geist fonts into
  `src/app/layout.tsx`, rewrite `src/app/globals.css` to replace the legacy
  Google-Antigravity-clone tokens (rainbow glow, Google dot logo, Signal Cobalt gradient
  variant) with the DESIGN.md tokens.
