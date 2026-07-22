# Product

## Register

brand

## Platform

web

## Users

Primary: technical recruiters and hiring managers screening for AI/ML engineer and data
scientist roles. Secondary: freelance/contract clients evaluating for data/AI project work.
Both arrive to quickly judge competence and decide whether to reach out; both are busy and
scanning, not reading deeply on a first pass.

## Product Purpose

A personal portfolio for an AI/ML Engineer and Data Scientist. It exists to convert a cold
visit into a conversation: recruiters get convinced fast enough to message, clients get
convinced fast enough to inquire about a project. Success is a contact/chat interaction
initiated by a visitor who arrived with no prior context.

## Positioning

Chat-first: instead of asking visitors to read a resume, the portfolio lets them ask it
directly ("Ask my portfolio") and get a direct answer grounded in real project and research
content. That interactive proof-of-competence is the differentiator against static AI/ML
portfolios.

## Conversion & proof

- Primary CTA: engage the "Ask my portfolio" chat widget on the landing page.
- Secondary CTA: explore a project card (opens a modal, links out to its GitHub repo) or
  jump straight to the Contact section on `/portfolio`.
- The line a visitor should remember after 10 seconds: this person builds real, production-
  grade AI/ML systems, and you can verify it by asking instead of taking their word for it.
- Belief ladder: (1) this looks precise and deliberately built, not templated, (2) the
  projects are real and technically substantial, not toy notebooks, (3) the chat widget
  proves depth on demand rather than asserting it, (4) reaching out is low-friction and
  worth doing now.
- Proof on hand: project write-ups in `content/projects.json`, research/writing shown in the
  Accomplishments modal linking out to paper DOIs, GitHub contribution calendar on
  `/portfolio`.

## Brand Personality

Precise, minimal, confident. Restrained rather than decorative; the interface itself should
read as evidence of engineering taste, not just claim it in copy. Confidence shows as clarity
and lack of clutter, not as loud visual noise.

## Anti-references

Avoid the generic 2026 AI-portfolio look: cream/sand/warm-neutral body backgrounds, and
uniform card grids (icon + heading + text, repeated identically per section/project). Any
grid or repeated pattern must be a deliberate structural choice, not a default.

## Design Principles

- Show, don't tell: let the chat widget and real project depth carry the "I'm competent"
  claim instead of adjective-heavy copy.
- Precision over decoration: every visual choice should read as intentional restraint, not
  ornament.
- Scannable first, deep second: a recruiter skimming for 10 seconds and a client reading
  closely both need to reach a clear next action.
- Chat-first is additive: the widget enhances the standard nav/portfolio flow, it never
  replaces crawlable, JS-independent content.

## Accessibility & Inclusion

WCAG AA minimum. Reduced-motion alternative required for every animation (the codebase
already uses `motion` for scroll-reveal animations; each needs a
`prefers-reduced-motion: reduce` fallback).
