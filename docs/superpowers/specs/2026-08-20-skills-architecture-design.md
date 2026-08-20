# Design Spec: Skills & Capabilities — Bold Bento Grid with Scale/Groq Craft

**Date:** 2026-08-20  
**Author:** flxhrdyn / Antigravity Impeccable  
**Status:** Approved for Implementation  
**Aesthetic References:** Groq Spec Grids, Scale AI interactive cards, Vercel clean flat architecture

---

## 1. Vision & Copy Principle

The **Skills & Capabilities** section presents Felix's technical toolkit with **bold, high-craft visual design** while keeping the copywriting **grounded, clear, and professional** — zero pretentious buzzwords or confusing labels.

### Copywriting:
- **Heading**: `Skills & Capabilities`
- **Subtitle**: `Technologies, frameworks, and tools I use to build production AI systems.`
- **Categories**:
  1. `AI & Machine Learning` (9 core domains)
  2. `ML Frameworks & Libraries` (9 frameworks & vector engines)
  3. `Languages & Backend` (9 programming languages & backend runtimes)
  4. `Cloud & Infrastructure` (6 deployment, MLOps, and hardware platforms)
  5. `Languages & Communication` (English & Indonesian proficiency bar)

---

## 2. Visual & Layout Architecture

### Bento Grid Layout (2x2 Desktop, 1-col Mobile):
- 4 primary modular cards with clean hairline borders (`border: 1px solid var(--border-color)`), flat surfaces (`background: var(--bg-card)`), and sharp corners (`border-radius: var(--radius-md)`).
- **Category Header**:
  - Number index + Category Title in bold Geist Sans (`1.1rem`, `font-weight: 700`).
  - Subtle count tag in Geist Mono (e.g. `[ 09 ]` or `[ 9 tools ]`) aligned to the right.
  - Hairline separator line beneath the header.

### Skill Pill Grid (Interactive Chips):
- Each skill is rendered inside a structured chip containing:
  - **Custom SVG Logo** (16px, monochrome grayscale at rest, crisp high-contrast on hover).
  - **Tool Name** in clean typography (`font-size: 0.88rem`, `font-weight: 600`).
- **Interactive Micro-Motion (Groq & Scale AI)**:
  - Hover: `transform: translateY(-2px)`, subtle background shift to `var(--bg-secondary)`, border highlight to `var(--text-primary)`.
  - Icon lift: SVG logo scales to `1.08` with a smooth 150ms ease.

### Bottom Metadata Strip (Languages & Bio):
- A minimal full-width footer strip highlighting communication and bilingual proficiency:
  - `Bahasa Indonesia (Native)`
  - `English (Professional · TOEFL: 650)`

---

## 3. Tech Stack & Logos Integration

- Directly integrate SVG logos for all tools: PyTorch, TensorFlow, scikit-learn, LangChain, PydanticAI, LlamaIndex, Qdrant, FAISS, Hugging Face, Python, TypeScript, SQL, FastAPI, Docker, NVIDIA DGX, GCP, Azure, React, Pandas, NumPy, Git.
- Remove redundant standalone carousel marquee to create a unified, intentional presentation.
