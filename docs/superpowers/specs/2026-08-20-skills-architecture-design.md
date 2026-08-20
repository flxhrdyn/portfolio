# Design Spec: Skills & Capabilities — Layered AI Architecture Stack

**Date:** 2026-08-20  
**Author:** flxhrdyn / Antigravity Impeccable  
**Status:** Approved for Implementation  
**Creative Influences:** Scale AI (scale.com), Groq, Vercel Engineering Console

---

## 1. Overview & Vision

Redesign the **Skills & Capabilities** section from a generic box-grid with an unlinked logo ticker into an **authoritative Layered AI Infrastructure Stack**.

Rather than displaying arbitrary lists of keywords, the portfolio models Felix's technical depth as a full-spectrum **Production AI Stack** spanning 4 architectural layers:

1. **LAYER 04 // AGENTIC & INFERENCE SYSTEMS** — RAG Pipelines, AI Agents, Fine-Tuning, Computer Vision, NLP.
2. **LAYER 03 // VECTOR & RETRIEVAL INFRASTRUCTURE** — Vector DBs, Embedding Engines, Document Parsers, Semantic Search.
3. **LAYER 02 // CORE ML & MODEL OPTIMIZATION** — Deep Learning Frameworks, Training, Evaluation, scikit-learn.
4. **LAYER 01 // COMPUTE & PRODUCTION RUNTIME** — NVIDIA DGX Systems, Docker, MLOps, FastAPI, Cloud Infrastructure.

---

## 2. Component Architecture

### `src/components/SkillsSection.tsx`
- Replaces `.skills-grid` and `.tech-carousel` with `.skills-stack`.
- Renders 4 stacked architectural layer cards with `motion/react` staggered reveal animations.
- Each layer contains:
  - **Layer Header**: Monospace layer identifier (`LAYER 04 // AGENTIC SYSTEMS`), domain descriptor, and active telemetry badge `[ 05 TOOLS ]`.
  - **Tool Chips Grid**: High-density interactive chips containing:
    - Dedicated SVG logo (16px, monochrome with hover activation).
    - Tool Name (Geist Sans 600).
    - Technical Context Tag (Geist Mono 500, e.g. `Vector DB`, `RAG Core`, `DGX A100`).
  - **Footer Metadata Bar**: Monospace language proficiency badge (*Bahasa Indonesia Native & English Professional TOEFL: 650*).

---

## 3. Motion & Animation Design (Scale AI Inspired)

### Staggered Spring Layer Assembly
- When scrolled into view, each Layer card enters with a vertical offset and precision spring curve (`ease: [0.16, 1, 0.3, 1]`, duration: `0.45s`).
- Chips inside each layer cascade into view using `staggerChildren: 0.035s`.

### Interactive Chip Micro-Motion
- **Hover / Focus**:
  - Chip transforms `translateY(-2px) scale(1.02)`.
  - Border highlights from `var(--border-color)` to `var(--text-primary)` with zero blur/drop-shadow.
  - SVG logo shifts from `opacity: 0.75` to `opacity: 1` with a clean SVG stroke/fill transition.

### Ambient Telemetry Scan Line
- A subtle, discrete hairline scan effect at the top border of active layers, evoking Scale AI's live telemetry sensors.

---

## 4. Design System & Token Alignment

- **Colors**: Strictly monochrome high-contrast (Zero-Hue Rule). Background `var(--bg-card)` on `var(--border-color)` with `var(--bg-secondary)` hover states.
- **Typography**:
  - Layer Headings: `var(--font-mono)`, `0.8rem`, `font-weight: 700`, uppercase.
  - Tool Labels: `var(--font-sans)`, `0.9rem`, `font-weight: 600`.
  - Context Tags: `var(--font-mono)`, `0.72rem`, `font-weight: 500`, muted.
- **Measure**: Full container width with compact internal gap.
- **Accessibility**: Full `prefers-reduced-motion` bypass, semantic DOM tags, keyboard focus rings.
