# Vercel-Dominant Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "Google Antigravity clone" visual system in `src/app/globals.css` and
`src/app/layout.tsx` with the Signal Console system defined in `DESIGN.md` (Vercel ~60% /
Antigravity ~25% / LangGraph ~15%), following
`docs/superpowers/specs/2026-07-22-vercel-redesign-design.md`.

**Architecture:** Token-first CSS migration in `src/app/globals.css` plus a font swap in
`src/app/layout.tsx`. No routing, data-fetching, or chat-logic changes. Two structural
exceptions scoped to their own phases: `ProjectsSection.tsx` featured-card split (Phase 3) and
`content/projects.json` gaining a `featured: boolean` field (Phase 3).

**Tech Stack:** Next.js (App Router), TypeScript, plain CSS custom properties in
`globals.css` (no Tailwind/CSS-in-JS for these tokens), `geist` npm package for fonts.

## Global Constraints

- Every phase ends with `npm run dev` manual check: light mode, dark mode, desktop, mobile
  (768px breakpoint) — before moving to the next phase.
- `npx tsc --noEmit` must show no errors after any `.tsx` change (Phase 2, 3).
- Every task ends with a commit (Conventional Commits style, per project guidelines).
- Do not touch chat widget logic, timeline/GitHub-calendar/modal/contact/footer structure —
  token-only restyle for those (Phase 5).
- Do not rework `.skill-pill` per-brand hover colors (Python/TypeScript/Docker/etc.) — explicit
  exception in the spec's Non-Goals.
- Do not add the Vercel tabbed-code-block component — out of scope for this redesign.

---

### Task 1: Install Geist fonts, wire into `layout.tsx`

**Files:**
- Modify: `package.json` (add `geist` dependency)
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `--font-geist-sans`, `--font-geist-mono` CSS variables, replacing the current
  `next/font/google` Inter/JetBrains Mono setup — consumed by Task 2's `globals.css` edits.

- [ ] **Step 1:** `npm install geist`
- [ ] **Step 2:** In `src/app/layout.tsx`, replace the `Inter`/`JetBrains_Mono` imports from
  `next/font/google` with `GeistSans` from `geist/font/sans` and `GeistMono` from
  `geist/font/mono`. Keep the existing `variable` CSS var names (`--font-geist-sans`,
  `--font-geist-mono`) so `globals.css` needs no selector changes, only value changes.
- [ ] **Step 3:** `npx tsc --noEmit` — no errors. `npm run dev`, confirm body/heading text
  visibly renders in Geist Sans (distinct from Inter's default look) and any mono text
  (badges/labels) renders in Geist Mono.
- [ ] **Step 4:** Commit: `feat(design): swap Inter/JetBrains Mono for Geist Sans/Mono`

---

### Task 2: Replace color tokens, flatten shadows, unify radius tokens

**Files:**
- Modify: `src/app/globals.css` (`:root`, `[data-theme="dark"]` blocks; `--card-shadow` usages
  at lines ~29, ~54, ~572, ~848 and any other `box-shadow: var(--card-shadow)` call sites)

**Interfaces:**
- Produces: `--radius-sm` (6px), `--radius-md` (8px), `--radius-lg` (12px), `--radius-full`
  (9999px) as new custom properties — consumed by every later phase's radius edits.
- Consumes: `DESIGN.md` frontmatter `colors` block as the literal source of truth for every
  hex value (light and dark) — copy values directly from there, do not retype by hand.

- [ ] **Step 1:** In `:root`, replace every color custom property with the DESIGN.md
  frontmatter `colors.*-light` values (bg-primary, bg-secondary, bg-card, text-primary,
  text-secondary, border-color, signal-cobalt + hover/muted/text variants).
- [ ] **Step 2:** In `[data-theme="dark"]`, replace with the frontmatter's non-`-light` dark
  values.
- [ ] **Step 3:** Add `--radius-sm: 6px; --radius-md: 8px; --radius-lg: 12px; --radius-full:
  9999px;` to `:root` (radius tokens are theme-independent).
- [ ] **Step 4:** Remove `--card-shadow` from both `:root` and `[data-theme="dark"]`. Change
  every `box-shadow: var(--card-shadow)` call site to `box-shadow: none`, **except** the
  `.modal-card` rule (Task 8), which stays elevated per the Flat-By-Default Rule's one
  exception.
- [ ] **Step 5:** `npm run dev` — confirm background/text/border colors switch correctly on
  theme toggle in both light and dark; no shadow visible on cards at rest (any remaining shadow
  belongs to `.modal-card`, unchanged until Task 8).
- [ ] **Step 6:** Commit: `feat(design): replace color tokens with Signal Console palette, flatten shadows`

---

### Task 3: Remove dead Google-brand CSS

**Files:**
- Modify: `src/app/globals.css` (`.logo-dot`, `.dot-red/blue/yellow/green`,
  `.logo-brand-accent` around line 240)

**Interfaces:**
- Consumes: nothing (confirmed zero JSX references via grep in the spec's Current State).

- [ ] **Step 1:** Grep `src/components` for `logo-dot`, `dot-red`, `dot-blue`, `dot-yellow`,
  `dot-green`, `logo-brand-accent` to reconfirm zero usages before deleting.
- [ ] **Step 2:** Delete the matching CSS rules from `globals.css`.
- [ ] **Step 3:** `npm run dev` — nav/logo area renders unchanged (these rules were already
  dead).
- [ ] **Step 4:** Commit: `chore(design): remove dead Google-dot-logo CSS`

---

### Task 4: Nav restyle to new tokens

**Files:**
- Modify: `src/app/globals.css` (`.navbar` ~line 197, `[data-theme="dark"] .navbar` ~line 208,
  `.nav-container`, `.nav-link`)

**Interfaces:**
- Consumes: color/radius tokens from Task 2.

- [ ] **Step 1:** Update `.navbar` background to Panel token at 85% opacity, keep existing
  `backdrop-filter: blur(...)` (functional blur is explicitly kept per DESIGN.md).
  Bottom border becomes `1px solid var(--border-color)` (Seam/Hairline).
- [ ] **Step 2:** Update `.nav-link` colors: Muted Signal/Muted Ink at rest, Signal
  White/Ink on hover and active state. No underline until hover; confirm no permanent
  underline rule exists.
- [ ] **Step 3:** `npm run dev` — nav renders correctly scrolled and at top, both themes,
  desktop and mobile.
- [ ] **Step 4:** Commit: `feat(design): restyle nav to Signal Console tokens`

---

### Task 5: Remove ambient auras from hero

**Files:**
- Modify: `src/app/globals.css` (`.ambient-auras`, `.aura`, `.aura-1`, `.aura-2` ~line 328)
- Modify: whichever hero component renders `<div className="ambient-auras">` (locate via grep
  on `ambient-auras` in `src/components`)

**Interfaces:**
- Produces: hero section with no ambient background decoration — flat per DESIGN.md's
  rejection of the old aura pattern.

- [ ] **Step 1:** Grep `src/components` for `ambient-auras` to find the JSX call site.
- [ ] **Step 2:** Remove the `<div className="ambient-auras">...</div>` markup and its CSS
  rules.
- [ ] **Step 3:** `npm run dev` — hero renders flat, no red/blue radial glow behind headline,
  both themes.
- [ ] **Step 4:** Commit: `feat(design): remove ambient multi-color aura from hero`

---

### Task 6: Chat widget — "Portfolio Console" restyle

**Files:**
- Modify: `src/app/globals.css` (`@keyframes rainbowGlow`, `.chat-card-container::before`,
  `.chat-header` ~576, `.chat-header-status` ~585, `.status-dot` ~594)

**Interfaces:**
- Produces: chat widget matching DESIGN.md's "Portfolio Console" signature-component spec —
  Card bg, 1px Seam border, 12px radius, Geist Mono header, solid Signal Cobalt status dot.

- [ ] **Step 1:** Delete `@keyframes rainbowGlow` and the `.chat-card-container::before` rule
  (the pulsing rainbow ring).
- [ ] **Step 2:** Update `.chat-header` to Geist Mono font, Card background, `--radius-lg`
  (12px) on the container, `1px solid var(--border-color)`.
- [ ] **Step 3:** Update `.status-dot` from green (`#34a853`) to solid `var(--signal-cobalt)`,
  `border-radius: var(--radius-full)`, no pulse animation.
- [ ] **Step 4:** `npm run dev` — chat widget shows solid cobalt dot, no rainbow ring, mono
  header text, both themes.
- [ ] **Step 5:** Commit: `feat(design): restyle chat widget as Portfolio Console per DESIGN.md`

---

### Task 7: Projects grid — featured split + badge cleanup

**Files:**
- Modify: `content/projects.json` (add `featured: boolean` to at least one entry)
- Modify: `src/components/ProjectsSection.tsx` (category-color map at lines ~14-16; render
  logic for featured vs. grid items)
- Modify: `src/app/globals.css` (`.projects-grid` ~804, `.project-card` ~811, remove
  `.badge-google-blue/red/yellow/green` ~152-196, add new `.project-featured` rule)

**Interfaces:**
- Consumes: `featured` field added to `content/projects.json`.
- Produces: `.project-featured` CSS class — a wide card rendered above `.projects-grid`, using
  DESIGN.md's `.badge`/`.badge-accent` components instead of the four Google hues.

- [ ] **Step 1:** Add `"featured": true` to one project entry in `content/projects.json`
  (pick the strongest project for this).
- [ ] **Step 2:** In `ProjectsSection.tsx`, split render: filter the featured project out of
  the main list, render it first in a wide `.project-featured` block (larger image/demo,
  longer description, tech-stack badges), then render the remainder into the existing
  `.projects-grid`.
- [ ] **Step 3:** Replace the `badge-google-*` category-color map with a single `.badge` /
  `.badge-accent` class per DESIGN.md Chips/Badges component — category no longer
  color-coded, text-only.
- [ ] **Step 4:** Remove `.badge-google-blue/red/yellow/green` CSS rules from `globals.css`.
- [ ] **Step 5:** Add `.project-featured` CSS: Card background, `--radius-md`, no shadow,
  wide/row layout per spec.
- [ ] **Step 6:** Restyle `.project-card` to flat tokens (no shadow, `--radius-md`,
  `1px solid var(--border-color)`).
- [ ] **Step 7:** `npx tsc --noEmit`, `npm run dev` — featured project renders distinctly
  above the grid, remaining projects render as before minus color-coded badges, both themes,
  mobile breakpoint.
- [ ] **Step 8:** Re-run Playwright e2e tests if any cover `ProjectsSection` selectors.
- [ ] **Step 9:** Commit: `feat(projects): split featured project card, replace Google-hue badges with token badges`

---

### Task 8: Skills grid — bento restructure

**Files:**
- Modify: `src/app/globals.css` (`.skills-grid` ~1293, `.skill-category` ~1338,
  `.skill-category-title` ~1348)

**Interfaces:**
- Consumes: actual skill category count/weight from `content/` at implementation time (spec
  leaves exact spans undetermined by design).

- [ ] **Step 1:** Read current skill category data to determine category count and relative
  weight (number of skills per category).
- [ ] **Step 2:** Redesign `.skills-grid` column/row spans so heavier categories occupy more
  grid area — bento pattern, not uniform equal-size cards.
- [ ] **Step 3:** Restyle `.skill-category` to flat: `1px solid var(--border-color)`, no
  shadow, `--radius-md`.
- [ ] **Step 4:** Leave `.skill-pill` brand-hover colors untouched (explicit exception).
- [ ] **Step 5:** `npm run dev` — bento layout renders correctly desktop and the existing
  mobile stacked fallback (~1325), both themes.
- [ ] **Step 6:** Re-run Playwright e2e tests if any cover `SkillsSection` selectors.
- [ ] **Step 7:** Commit: `feat(skills): restructure skills grid as flat bento layout`

---

### Task 9: Token-only restyle of remaining sections

**Files:**
- Modify: `src/app/globals.css` (`.timeline*`, `.github-contrib-card` and derivatives,
  `.modal-*`, `.contact-card` ~1607, `.footer*`, `.archive-table*`)

**Interfaces:**
- Consumes: color/radius tokens from Task 2. `.modal-card` (~1716) is the one surface that
  keeps a shadow — do not flatten it, per the Flat-By-Default Rule's explicit exception.

- [ ] **Step 1:** Restyle `.timeline*` rules to new border/color tokens, no shadow.
- [ ] **Step 2:** Restyle `.github-contrib-card` and derivatives to new tokens, no shadow.
- [ ] **Step 3:** Restyle `.modal-card` to new color/border tokens, `--radius-lg`, **keep**
  its box-shadow (the sole permitted elevated surface).
- [ ] **Step 4:** Restyle `.contact-card`, `.footer*`, `.archive-table*` to new tokens, no
  shadow.
- [ ] **Step 5:** `npm run dev` — every remaining section renders with new tokens, both
  themes, desktop and mobile.
- [ ] **Step 6:** Commit: `feat(design): apply Signal Console tokens to timeline, GitHub calendar, modal, contact, footer`

---

### Task 10: Final cleanup pass and contrast verification

**Files:**
- Read-only grep across `src/` (no planned file list — driven by findings)

**Interfaces:**
- Consumes: nothing new. Verifies Tasks 1-9 left no dangling references.

- [ ] **Step 1:** Grep the full `src/` tree for `badge-google-`, `aura`, `logo-dot`, `dot-red`,
  `dot-blue`, `dot-yellow`, `dot-green`, `rainbowGlow` — must return zero matches in `.tsx`/
  `.css` files.
- [ ] **Step 2:** Manually verify WCAG AA (≥4.5:1) contrast for body text and placeholder text
  against their backgrounds in both themes — spot-check the pairs DESIGN.md defines (Signal
  White/Muted Signal on Void/Panel/Card; Ink/Muted Ink on Paper/Paper Panel). Confirm the
  existing `prefers-reduced-motion: reduce` block at the end of `globals.css` still applies
  (no new keyframes were added in this redesign, so no new coverage needed).
- [ ] **Step 3:** `npm run dev` full pass: light + dark, desktop + mobile 768px, every section
  from nav through footer.
- [ ] **Step 4:** Commit: `chore(design): final cleanup pass, verify no dead Google-brand CSS remains`

## Testing / QA

- Every task: `npm run dev`, manual check light/dark × desktop/mobile (768px).
- `.tsx`-touching tasks (7, 8): `npx tsc --noEmit` must show no errors.
- Tasks 7 and 8 (structural changes): re-run Playwright e2e if selectors for
  `ProjectsSection`/`SkillsSection` are covered.
- Task 10: full-tree grep for every removed class/keyframe name, plus a manual WCAG AA
  contrast spot-check.

## Open Questions / Risks

- Exact skills-grid span values are decided at Task 8 implementation time from live
  `content/` data, not fixed in this plan.
- The `featured` project pick (Task 7, Step 1) needs a decision — pick the strongest
  available project unless the user specifies one.
