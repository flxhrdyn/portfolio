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
