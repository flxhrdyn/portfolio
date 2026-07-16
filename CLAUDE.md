# Portfolio Website

AI/ML Engineer & Data Scientist personal portfolio.
Design spec: `docs/superpowers/specs/2026-07-14-portfolio-website-design.md`.

## Stack

- Next.js (App Router) + Tailwind CSS
- Content (projects, research writing) as local MDX/JSON files - no CMS, no database
- Hosting: Vercel

## Structure

- Nav: Home / Projects / Experience / Research & Writing / About / Contact
- Home is a one-page scroll (hero, chat widget, GitHub calendar, project highlights,
  experience/skills/about previews, contact) with anchor-link nav
- `/projects/[slug]` and `/research/[slug]` are standalone detail pages for deep-linking
- Project detail pages follow a case-study format: problem, experiment process
  (including failed attempts and metric progression), result, stack, demo/repo links

## Conventions

- No CMS/database - all content lives in the repo as MDX/JSON, edited via git
- Demo embedding (iframe) vs screenshot+link is decided per-project depending on whether
  a live deploy exists
- Chat widget ("Ask my portfolio") is additive on Home, not a replacement for standard nav -
  keep pages crawlable and usable without JS-driven chat
