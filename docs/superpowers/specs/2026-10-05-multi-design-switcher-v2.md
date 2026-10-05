# Spec: Multi-Design Switcher & 5 Premium Awwwards-Level Directions

**Date:** 2026-10-05  
**Status:** Approved  
**Author:** Felix & Claude Code  
**Branch:** `feat/design-switcher-v2`  

---

## 1. Overview & Objective

Build an interactive multi-design portfolio system where 5 distinct, premium design directions can be experienced seamlessly via an integrated switcher in the navigation bar.

**Core Positioning:**
Personal portfolio for an **AI Engineer & Data Scientist**. The website itself is built with **elite agency-grade web development and UI/UX design craft** (benchmarked against Awwwards SOTD winners like Cristiana Araujo, 2xA, Givelet, and Studio Merge). The primary professional identity remains strictly **AI Engineer & Data Scientist**; the website's execution, composition, typography, and interaction design serve as living proof of high-level web dev and aesthetic standards.

All 5 directions deliver agency-grade craft: disciplined typography, generous whitespace, confident composition, and tactile UI details. Zero cheap terminal gimmicks (no UNIX paths, no bracketed fluff, no fake console clocks or status tags), zero fake product widgets, and no pretentious buzzwords. Content strictly showcases real AI/ML systems and research. Copywriting is direct, honest, and instantly scannable for engineering recruiters, tech leads, and collaborators.

---

## 2. The 5 Curated Design Directions (Direct Reference Mappings)

Each direction translates specific verified references while maintaining content parity across the portfolio (Hero, Projects, Experience/Education, Skills, Research, Contact).

### Direction 1: Japanese / Swiss Editorial Ledger
- **Primary Reference:** `tacto-inc.com` + `Archive for Hans Sleutelaar (Awwwards)`
- **Visual Character:** Light-weight oversized headings (`say hello`, `unlock`), full-width 1px hairline rules, warm monochrome base (`#f7f7f5` / `#111113`), arrow navigation index (`↘`).
- **Layout:** Three-up index under hero, dated chronological ledgers with hairline dividers, address-style single-letter footer blocks (`A`, `T`, `S`).
- **Signature Interaction:** 1px rule draw intro, quiet underline transitions, zero decorative noise.

### Direction 2: Architectural Frame & Asymmetric Posters
- **Primary Reference:** `2xa.studio (Awwwards SOTD)` + `Studio Merge`
- **Visual Character:** Inset canvas frame (viewport gutter border), bold architectural structure, confident display headings composed with expansive whitespace.
- **Layout:** Minimal top identity bar, full-width high-impact hero composition, asymmetric project grid featuring prominent case-study showcase blocks without decorative clock or telemetry gimmicks.
- **Signature Interaction:** Crisp rectangular highlight states, grid-aligned structural transitions.

### Direction 3: Modular Precision Matrix
- **Primary Reference:** `typesafe.ai` + `Grids (Awwwards)`
- **Visual Character:** Clean data-first presentation, high-contrast monochrome surfaces, visible modular hairline grid lines (horizontal & vertical) without faux-terminal window decoration.
- **Layout:** Precision technical matrix, real performance metric strips (LUCIAN, InvenioAI), structured empirical benchmark tables, and rigorous data ledgers.
- **Signature Interaction:** Precision data bars, strict hairline grid alignment.

### Direction 4: Swiss Quiet Inline
- **Primary Reference:** `matthieugivelet.com (Awwwards Nominee)` + `Cristiana Araujo Portfolio`
- **Visual Character:** Centered layout, inline portrait badge integrated into the typography, generous Swiss proportions, zero bracket gimmicks.
- **Layout:** 3-column splits (clean category label left, indented indexed paragraph center, arrow action link right), ultra-spacious vertical whitespace.
- **Signature Interaction:** Slow-settle reveals, generous vertical whitespace, deliberate long-eased transitions.

### Direction 5: Kinetic Minimal Desk & Dock
- **Primary Reference:** `rifqisakha.my.id` + `Avec Anni`
- **Visual Character:** High-contrast pure monochrome, tactile project drawers, clean section pacing, zero UNIX/terminal path gimmicks.
- **Layout:** Floating minimal bottom dock navigation, hairline rows with expandable interactive drawers for inspecting AI systems, instant preview on hover/touch.
- **Signature Interaction:** Smooth drawer accordion, tactile button states, refined floating dock.

---

## 3. Architecture & Global Switcher System

### 3.1 Design State Management
- **Single Source of Truth:** `src/config/design.ts`
  ```ts
  export type DesignVersion = 'd1' | 'd2' | 'd3' | 'd4' | 'd5';
  export const DEFAULT_DESIGN: DesignVersion = 'd1';
  ```
- **Runtime Resolution:**
  1. URL Query Param: `?v=d1` to `?v=d5` (for instant previewing & sharing links).
  2. Local Storage / Session state (when user toggles on navbar switcher).
  3. Fallback: `DEFAULT_DESIGN` from remote/repo config.

### 3.2 Persistent Nav Switcher
- A subtle, high-craft switcher pill is embedded into the navigation bar across all 5 designs:
  `[ STYLE: 01 · 02 · 03 · 04 · 05 ]`
- Seamless transition between layouts without page reloads or broken state.

### 3.3 Data Layer Parity
All 5 designs consume the exact same content data source (`src/data/*` and `content/*`):
- Projects & case studies with quantitative impact.
- Roles, companies, and timelines.
- Core technical competencies (AI/ML, Full-stack, UI/UX).
- Peer-reviewed research paper & DOI link.
- Contact endpoints and real-time status.

---

## 4. Copywriting & Content Standards

- **Tone:** Grounded, concise, clear, and professional.
- **Rule:** Never use self-aggrandizing hype or AI buzzwords ("revolutionary", "10x", "visionary").
- **Recruiter Scan Priority:** Problem -> Solution -> Architecture -> Measurable Outcome.

---

## 5. Implementation Phases

1. **Config & Switcher Foundation:** Create `src/config/design.ts` and global context/wrapper.
2. **Refine Design 1 (Tacto / Swiss Ledger):** High-craft implementation with complete content.
3. **Refine Design 2 (2xA Architectural Frame):** Inset canvas & asymmetric typography grid.
4. **Refine Design 3 (Typesafe Proof Sheet):** Scientific data matrix & architecture node layout.
5. **Refine Design 4 (Givelet Swiss Inline):** Integrated headline portrait & 3-column split.
6. **Refine Design 5 (Rifqi Kinetic Workspace):** Path labels, tactile drawer rows, bottom dock.
7. **Verification & Audit:** Check mobile responsiveness, keyboard accessibility, clean zero-lint errors.
