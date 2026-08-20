# Design Spec: Skills & Capabilities — Synaptic Architecture Grid

**Date:** 2026-08-20  
**Author:** flxhrdyn / Antigravity Impeccable  
**Status:** Approved for Implementation  
**Aesthetic References:** Groq Spec Sheet & Scale AI Synaptic Flow  
**Rule:** 100% preserve existing categories and items from `content/skills.json`

---

## 1. Objective & Content Integrity

Redesign the **Skills & Capabilities** section with a bold, high-craft **Synaptic Grid Architecture** inspired by Groq and Scale AI, while preserving all existing technical items from `content/skills.json` verbatim:

### Categories & Content:
1. **AI & Machine Learning (9 items)**:
   - *Advanced RAG*, *AI Agents*, *Deep Learning*, *Computer Vision*, *Natural Language Processing*, *LLMs & GenAI*, *Prompt Engineering*, *PEFT & QLoRA*, *Anomaly Detection*.
2. **ML Frameworks & Libraries (9 items)**:
   - *PyTorch*, *TensorFlow*, *scikit-learn*, *LangChain*, *Pydantic AI*, *LlamaIndex & LlamaParse*, *Qdrant*, *FAISS*, *Hugging Face*.
3. **Languages & Backend (9 items)**:
   - *Python*, *SQL*, *TypeScript*, *FastAPI*, *Pandas*, *NumPy*, *REST APIs*, *React*, *Git & GitHub*.
4. **Cloud & MLOps (6 items)**:
   - *Docker*, *Microsoft Azure*, *Google Cloud (GCP)*, *MLOps Pipelines*, *CI/CD*, *NVIDIA DGX Systems*.
5. **Languages & Bio (2 items)**:
   - *Bahasa Indonesia (Native)*, *English (Professional, TOEFL: 650)*.

---

## 2. Layout & Visual Architecture

### 4-Column Synaptic Grid (Desktop: 4 columns / 2x2 grid, Mobile: 1 column):
- Clean, structured card containers with flat background (`var(--bg-card)`), hairline border (`border: 1px solid var(--border-color)`), and crisp corners (`border-radius: var(--radius-md)`).
- **Column Header**:
  - Category name in bold typography (`font-size: 1.05rem`, `font-weight: 700`).
  - Monospace item counter tag (e.g. `[ 09 ]` / `[ 06 ]`) on the right.
  - Hairline divider below header.

### Interactive Skill Chips with Embedded SVG Icons:
- Each item is styled as an interactive chip containing:
  - SVG monochrome icon for matching tech items (PyTorch, TensorFlow, Docker, Python, Qdrant, etc.) or bespoke neural node icon for concepts (RAG, Agents, CV).
  - Item name in clear typography (`font-size: 0.85rem`, `font-weight: 600`).
- **Hover Micro-Motion**:
  - `transform: translateY(-2px) scale(1.02)`.
  - Border transition to high-contrast `var(--text-primary)`.
  - Background transition to `var(--bg-secondary)`.

### Bottom Languages & Bio Bar:
- Structured horizontal spec bar displaying bilingual proficiency.
