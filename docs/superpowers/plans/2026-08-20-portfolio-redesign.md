# Portfolio Redesign Implementation Plan: The Engineering Console

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the high-craft "Engineering Console" portfolio layout combining Vercel's asymmetric Bento rhythm, Groq's dense technical datasheets, and Antigravity's display confidence while maintaining 100% Zero-Hue monochrome compliance and authentic factual copy.

**Architecture:** A Dual-First Hub architecture (`/` for Interactive AI Assistant, `/portfolio` for Full Structured Portfolio). The portfolio page begins with a Display Hero and 3-Metric Highlight Strip, transitions to an Asymmetric Bento Projects Grid with tabbed Demo/Specs/Code views, and continues through circuit timeline, skills matrix, research publication reader, and contact modules.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Motion (`motion/react`), CSS Custom Properties (Zero-Hue Chroma-0 Design System), WebM/WebP/SVG optimized media assets.

## Global Constraints

- **Design System:** Strict Zero-Hue Monochrome (`DESIGN.md`). Chroma-0 pitch black (`#0a0a0c`), panel gray (`#131316`), card gray (`#17171b`), 1px hairlines (`#26272b`), pure white contrast (`#ffffff`).
- **No AI Slop:** No gradient text, no neon glows, no rainbow rings, no floating particle orbs, no fake metrics.
- **Copywriting & Facts:** 100% preservation of all factual personal details, PT Astra Visteon Indonesia experience, HPC-UG responsibilities, BNSP certification, and research publications.
- **Asset Formats:** Use WebP for images, WebM for demo videos, and SVG for logos.

---

## Tasks

### Task 1: Highlight Metrics Strip Component & Global Tokens

**Files:**
- Create: `src/components/TelemetryStrip.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/portfolio/page.tsx`

- [x] **Step 1: Create `src/components/TelemetryStrip.tsx`**
  Implement the 3-column metric strip with `2+ Yrs` (AI/ML Experience), `10+` (AI Projects Built), and `BNSP` (Certified Data Scientist) using `Geist Mono Bold` tabular figures (`tnum`).
- [x] **Step 2: Add CSS rules for `.telemetry-*` in `src/app/globals.css`**
  Add styles for `.telemetry-section`, `.telemetry-grid`, `.telemetry-cell`, `.telemetry-index`, `.telemetry-value`, `.telemetry-label`, and responsive media query ($< 768\text{px}$).
- [x] **Step 3: Mount `<TelemetryStrip />` in `src/app/portfolio/page.tsx`**
  Insert `<TelemetryStrip />` directly below `<PortfolioHero />`.
- [x] **Step 4: Verify Next.js build**
  Run `npm run build` to confirm clean compilation and zero TypeScript errors.
- [x] **Step 5: Commit changes**
  Commit as `feat(portfolio): add highlight metrics strip component`.

---

### Task 2: Asymmetric Bento Grid & Tab Switcher in Projects Section

**Files:**
- Modify: `src/components/ProjectsSection.tsx`
- Modify: `src/app/globals.css`

- [x] **Step 1: Upgrade `ProjectsSection.tsx` to Bento Grid**
  - Add terminal window chrome header (`● ● ●` + `invenio-rag-pipeline.py`).
  - Add interactive tab switcher state (`preview` | `specs` | `code`).
  - Embed high-res screenshot & video player for InvenioAI (`/projects/invenioai-ui.webp` & `/projects/invenioai_demo.webm`).
  - Add Groq-style technical parameter datasheet table for InvenioAI (*Dense+Sparse Hybrid, Qdrant BM42, FlashRank Cross-Encoder, 4-Step CoT, Semantic Cache, Docker/Azure*).
  - Add syntax-highlighted Python snippet for the hybrid retrieval pipeline.
  - Add high-res screenshot for LUCIAN (`/projects/lucian-classify.webp`) and full uncropped video demo in case study modal (`/projects/lucian_demo.webm`).
  - Maintain archive project modal and GitHub Heatmap.
- [x] **Step 2: Add CSS rules for Bento components in `src/app/globals.css`**
  Add styles for `.bento-featured-card`, `.bento-terminal-header`, `.bento-tab-btn`, `.bento-media-pane`, `.specs-table`, `.specs-row`, `.project-card-video`.
- [x] **Step 3: Verify Next.js build & Design Detector**
  Run `npm run build` and mechanical detector to verify zero defects.
- [x] **Step 4: Commit changes**
  Commit as `feat(projects): upgrade to asymmetric bento grid with tab switcher and video demos`.

---

### Task 3: Polish Landing Page Hero & AI Assistant Console

**Files:**
- Modify: `src/components/ChatHero.tsx`

- [x] **Step 1: Add direct navigation CTA in `ChatHero.tsx`**
  Add high-contrast button pair: `[ View Full Portfolio → ]` (`/portfolio`) and `[ GitHub ]` (`https://github.com/flxhrdyn`) under the hero description.
- [x] **Step 2: Verify responsive behavior on mobile and desktop**
  Ensure layout stacks cleanly on mobile with no viewport clipping.
- [x] **Step 3: Commit changes**
  Commit as `feat(chat): add direct portfolio navigation actions to landing hero`.

---

### Task 4: Section Breadcrumbs & Layout Consistency

**Files:**
- Modify: `src/components/ProjectsSection.tsx`
- Modify: `src/components/ExperienceSection.tsx`
- Modify: `src/components/SkillsSection.tsx`
- Modify: `src/components/CertificationsSection.tsx`
- Modify: `src/components/ContactSection.tsx`
- Modify: `src/app/globals.css`

- [x] **Step 1: Add standardized section eyebrows**
  - `01 // PROJECTS`
  - `02 // EXPERIENCE`
  - `03 // SKILLS`
  - `04 // CERTIFICATIONS & RESEARCH`
  - `05 // CONTACT`
- [x] **Step 2: Clean and verify headings**
  Ensure headings are clean, straightforward, and recruiter-friendly (*"Featured Projects"*, *"Experience & Education"*, *"Skills & Capabilities"*, *"Certifications & Research"*, *"Get in Touch"*).
- [x] **Step 3: Commit changes**
  Commit as `feat(portfolio): standardize section hierarchy and recruiter-friendly breadcrumbs`.

---

### Task 5: End-to-End Verification & Final Polish

- [x] **Step 1: Run mechanical design detector**
  Execute `node C:\Users\Felix\.gemini\config\skills\impeccable\scripts/detect.mjs --json` on all modified files.
- [x] **Step 2: Run full production build**
  Execute `npm run build` and ensure all static pages generate in $< 2\text{s}$ with 0 errors.
- [x] **Step 3: Commit and summarize implementation**
  Push all finalized commits to `feat/portfolio-redesign-init`.
