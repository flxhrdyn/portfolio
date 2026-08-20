# Portfolio Redesign Specification: The Engineering Console

**Date:** 2026-08-20  
**Status:** Ready for Review  
**Target:** `src/app/portfolio/page.tsx`, `src/app/page.tsx`, `src/app/globals.css`, and related components  
**Design Authority:** `PRODUCT.md` & `DESIGN.md` (Zero-Hue Monochrome Standard)

---

## 1. Overview & North Star

Transform the portfolio from a uniform card-grid layout into a high-craft, asymmetric **Engineering Console** inspired by the best practices of:
1. **Vercel**: Flat-by-default surfaces, 1px hairlines (`#26272b`), angular structural buttons (`4px`), full-pill chips, and asymmetric Bento grids.
2. **Groq**: High-density technical datasheets, monospace tabular parameter tables (`tnum`), and system architecture breakdowns.
3. **Google Antigravity**: Confident display typography (`Geist Sans 700`), generous breathing room between sections, and clean interactive media presentation.

### Core Value Proposition:
* **Unique & Memorable Spatial Rhythm:** No two sections share the same geometry. The layout moves dynamically from **Display Hero** $\to$ **Dense Monospace Telemetry Band** $\to$ **Asymmetric Bento Console** $\to$ **Circuit Timeline** $\to$ **Marquee & Grid Matrix** $\to$ **Split Publication Reader**.
* **Recruiter-First Scannability (5-Second Rule):** A hiring manager or recruiter immediately grasps role, years of experience, number of projects, and national certification without parsing dense jargon.
* **Tech Lead Depth:** An engineering lead can inspect real Python hybrid retrieval pipelines, Grad-CAM explainability, and technical parameter datasheets.
* **100% Anti-AI Slop & Zero-Hue:** No rainbow/neon gradients, no floating particle orbs, no fake metrics, no purple ambient auras. Strict monochrome contrast ($\ge 4.5:1$).
* **Content & Copy Integrity:** 100% preservation of all personal facts, career highlights at PT Astra Visteon Indonesia, research papers, and verified certifications.

---

## 2. Topology & Information Architecture

The website operates on a **Dual-First Hub Model**:

```
                                  ┌──────────────────────────────┐
                                  │      Navbar / Global Nav     │
                                  │  [ Ask AI ] ⇄ [ Full Porto ] │
                                  └──────────────┬───────────────┘
                                                 │
                   ┌─────────────────────────────┴─────────────────────────────┐
                   ▼                                                           ▼
    ┌─────────────────────────────┐                             ┌─────────────────────────────┐
    │     Landing Page (`/`)      │                             │   Full Portfolio (`/portfolio`)
    ├─────────────────────────────┤                             ├─────────────────────────────┤
    │ • Display Headline          │                             │ • Hero Section + Portrait   │
    │ • "View Full Portfolio" CTA │                             │ • 3-Metric Highlight Strip  │
    │ • Interactive AI Assistant  │                             │ • 01 // PROJECTS (Bento)    │
    │   - Quick Answer Chips      │                             │ • 02 // EXPERIENCE          │
    │   - Live LLM Streaming      │                             │ • 03 // SKILLS              │
    │   - Verified Bio Context    │                             │ • 04 // CERTIFICATIONS      │
    │                             │                             │ • 05 // CONTACT             │
    └─────────────────────────────┘                             └─────────────────────────────┘
```

---

## 3. Detailed Section Specifications

### 3.1 Hero Section (`/portfolio`)
* **Layout:** Two-column split on desktop (text + CTAs on left, 4:5 portrait on right), single-column stacked on mobile.
* **Eyebrow:** Monochrome system badge: `● AI ENGINEER & DATA SCIENTIST`.
* **Headline:** Display typography in `Geist Sans 700` (`-0.04em` letter-spacing): `Felix Windriyareksa Hardyan`.
* **Description:** Factual summary of engineering focus: *"Building production-grade AI systems, from Data Science to GenAI."*
* **CTAs:**
  * Primary: `[ Download Resume (PDF) ]` (inverted high-contrast button).
  * Secondary: `[ Get in Touch ]` (hairline-bordered ghost button with link to `#contact`).
* **Portrait:** Modern WebP photo (`/felix_dgx.webp`) framed in an angular container with subtle 1px border.

---

### 3.2 Highlight Metrics Strip (`<TelemetryStrip />`)
* **Position:** Immediately below the Hero section, spanning the full container width.
* **Layout:** 3-column grid (`repeat(3, 1fr)`) with vertical hairline dividers (`#26272b`). Stacks to 1 column on mobile ($< 768\text{px}$).
* **Typography:** `Geist Mono Bold` with tabular figures (`tnum`) for numbers, `Geist Sans` for labels.
* **Metrics (100% Industry Career Highlights):**
  1. `2+ Yrs` — **AI/ML Experience** (*Industry & research lab track record*).
  2. `10+` — **AI Projects Built** (*GenAI, RAG, Vision & Predictive ML*).
  3. `BNSP` — **Certified Data Scientist** (*National professional certification*).

---

### 3.3 Section 01 // PROJECTS (`<ProjectsSection />`)
* **Breadcrumb Tag:** `01 // PROJECTS` (Geist Mono micro-label).
* **Section Title:** `Featured Projects` + concise subhead.
* **Asymmetric Bento Grid Structure:**
  1. **Flagship Project Card (InvenioAI):**
     * Spans full width / 2 columns.
     * **Terminal Chrome Header:** 3 monochrome dots (`● ● ●`) + label `invenio-rag-pipeline.py`.
     * **Interactive 3-Tab Switcher:**
       * `[ 🎬 Demo Video ]`: Embeds `<video src="/projects/invenioai_demo.webm" controls muted playsInline poster="/projects/invenioai.webp" />`.
       * `[ ⚡ Technical Specs ]`: Groq-style technical parameter datasheet:
         * *Architecture:* Dense + Sparse Hybrid Search
         * *Vector Store:* Qdrant (HNSW + BM42)
         * *Reranker:* FlashRank Cross-Encoder
         * *Reasoning:* 4-Step Chain-of-Thought (CoT)
         * *Caching:* Dual-Layer Semantic Cache (Threshold > 0.90)
         * *Deployment:* Docker, Azure Container Apps, HF Spaces
       * `[ 💻 Code Snippet ]`: Syntax-highlighted Python snippet of the hybrid retrieval pipeline.
     * **Content Column:** Title, category tags (`GenAI / RAG`, `FastAPI`, `Streamlit`), factual summary, `[ Read Case Study ]` modal button, and GitHub repo link.
  2. **Sub-Project Bento Cards (LUCIAN & Omnius):**
     * **LUCIAN (Medical Vision):** Embedded demo video player (`/projects/lucian_demo.webm`), Grad-CAM explainability tag, 93.67% accuracy callout, and case-study modal trigger.
     * **Omnius (Media Intelligence):** Architecture tags (`Pydantic AI`, `Groq Cloud Llama 3.3`, `Azure App Service`), SSE streaming badge, and case-study modal trigger.
  3. **Archive Modal Trigger:** `[ View all archive projects ↓ ]` opening the full project catalog table.
  4. **Open Source Heatmap:** Live GitHub contribution activity calendar with monospace summary metrics.

---

### 3.4 Section 02 // EXPERIENCE (`<ExperienceSection />`)
* **Breadcrumb Tag:** `02 // EXPERIENCE`.
* **Section Title:** `Experience & Education`.
* **Layout:** Connected vertical timeline rail with 1px border.
* **Entries:**
  1. **PT Astra Visteon Indonesia** — *IT Intern (ML & Data Science)* (June 2026 – Present). Logo: `/logos/avi.svg`.
     * 150K+ operational records analyzed for industrial air compressor monitoring.
     * Predictive maintenance system improving recall from 0% to 60%.
     * FastAPI + SQL monitoring pipeline.
  2. **HPC Universitas Gunadarma (HPC-UG)** — *AI Engineer (Part-time)* (Sept 2024 – Present). Logo: `/logos/hpc_ug.svg`.
     * AI laboratory assistant with fine-tuned Qwen3-8B + RAG.
     * Distributed model training on NVIDIA DGX A100 & DGX-1.
     * Published peer-reviewed research (89% accuracy coral bleaching detection).
  3. **Universitas Gunadarma** — *International AI Summer Course Instructor* (Feb 2025 – Aug 2025). Logo: `/logos/gunadarma.svg`.
  4. **LePKom Universitas Gunadarma** — *Data Science Instructor* (Jun 2025 – Jun 2026). Logo: `/logos/gunadarma.svg`.
  5. **Education:** Bachelor of Informatics (GPA 3.85 / Distinction) & Bangkit Academy ML Specialization.

---

### 3.5 Section 03 // SKILLS (`<SkillsSection />`)
* **Breadcrumb Tag:** `03 // SKILLS`.
* **Section Title:** `Skills & Capabilities`.
* **Components:**
  * **Interactive Tech Stack Carousel:** Infinite auto-scrolling marquee of verified tech logos (Python, PyTorch, TensorFlow, FastAPI, Qdrant, Docker, Azure, React, TypeScript).
  * **Categorized Bento Grid:**
    1. *Machine Learning & AI Core* (PyTorch, TensorFlow, Scikit-learn, LangChain, LlamaIndex, Transformers).
    2. *Data Engineering & MLOps* (MLflow, Docker, FastAPI, PostgreSQL, Qdrant, Streamlit).
    3. *Cloud & Compute Infrastructure* (NVIDIA DGX A100/DGX-1, Microsoft Azure, Hugging Face Spaces, Google Cloud).
    4. *Languages & Web* (Python, TypeScript, SQL, React, Next.js).

---

### 3.6 Section 04 // CERTIFICATIONS & RESEARCH (`<CertificationsSection />`)
* **Breadcrumb Tag:** `04 // CERTIFICATIONS & RESEARCH`.
* **Section Title:** `Certifications & Research`.
* **Layout:** Split-card grid:
  * **Left Card (Published Research):** Peer-reviewed research paper showcase on coral bleaching deep learning (CoralNet, InceptionV3, MobileNetV2) with 89% accuracy and interactive modal reader.
  * **Right Card (Professional Certifications Carousel):** BNSP Certified Data Scientist (2024–2027), DeepLearning.AI TensorFlow Developer, Stanford ML Specialization, and DeepLearning.AI Data & Deployment.

---

### 3.7 Section 05 // CONTACT (`<ContactSection />`)
* **Breadcrumb Tag:** `05 // CONTACT`.
* **Section Title:** `Get in Touch`.
* **Card Design:** Centered panel with 1px border, direct copy (*"Have an interesting project, job, or consultation requirement? Let's build something robust together."*), interactive email reveal button, and GitHub / LinkedIn links.

---

### 3.8 Landing Page (`/`) — AI Chatbot Assistant
* **Header / Hero:** Centered introduction to Felix Windriyareksa Hardyan with dual action buttons (`[ View Full Portfolio → ]` and `[ GitHub ]`).
* **Console Shell:** Card frame with status badge `● Ask my portfolio // Online`.
* **Interactive Quick Chips:** `[ Who is Felix? ]` `[ Projects ]` `[ Experience ]` `[ Skills ]`.
* **Streaming Engine:** Connects to `/api/chat` with grounded RAG context from `context/*.md`.

---

## 4. Design System Tokens & Craft Standards

| Token Category | Value | Usage |
| :--- | :--- | :--- |
| **Background Void** | `#0a0a0c` (Dark) / `#ffffff` (Light) | Base page canvas |
| **Background Panel** | `#131316` (Dark) / `#f8f9fa` (Light) | Grouped containers, telemetry band |
| **Background Card** | `#17171b` (Dark) / `#f1f3f5` (Light) | Bento cards, project panels, modals |
| **Borders (Hairline)** | `1px solid #26272b` (Dark) / `#e2e3e8` (Light) | All containers, tabs, dividers |
| **Text Primary** | `#ededed` (Dark) / `#111827` (Light) | Headings, high-priority metrics |
| **Text Secondary** | `#888888` (Dark) / `#6b7280` (Light) | Descriptions, subtitles, labels |
| **Font Display/Sans** | `Geist Sans` (Variable) | Headings, buttons, UI body |
| **Font Mono** | `Geist Mono` (`tnum` enabled) | Metrics, code, tabs, metadata, telemetry |
| **Corner Radius** | `4px` (`sm`), `8px` (`md`), `9999px` (`full`) | `4px` buttons, `8px` cards, `9999px` badges |

---

## 5. Verification & Testing Plan

1. **Mechanical Design Detector:** Run `node <impeccable>/scripts/detect.mjs --json` to ensure 0 lint/design-system violations.
2. **Next.js Production Build:** Verify `npm run build` generates all static routes with 0 errors in $< 2\text{s}$.
3. **Cross-Device Responsive Check:**
   * Desktop ($1440\text{px}$): 3-column telemetry, 2-column bento, 2-column hero.
   * Tablet ($768\text{px}$): 2-column or stacked grid, clean touch targets ($\ge 44\text{px}$).
   * Mobile ($375\text{px}$): Single-column stacked, no horizontal overflow.
4. **Media Playback:** Ensure `.webm` videos load instantly, play smoothly when clicked, stay muted by default, and display crisp `.webp` poster thumbnails.
5. **Interactive Controls:** Test tab switcher on InvenioAI (`Demo`, `Specs`, `Code`), modal dialogs, and archive project drawer.
