# Design Spec: Skills & Capabilities — Interactive Synaptic Neural Network

**Date:** 2026-08-20  
**Author:** flxhrdyn / Antigravity Impeccable  
**Status:** Approved for Implementation  
**Visual Style:** Interactive Neural Network / Synapse Pipeline (Scale AI / AI-Native)  
**Content:** Exact categories and items from `content/skills.json` (100% preserved)

---

## 1. Overview & Conceptual Architecture

The **Skills & Capabilities** section is rendered as an **Interactive Synaptic Neural Network** representing the end-to-end AI engineering pipeline from infrastructure to deployed intelligence.

The section consists of **4 interconnected Neural Layers** matching the exact categories from `content/skills.json`:

```
LAYER 1: Cloud & MLOps              LAYER 2: Languages & Backend       LAYER 3: ML Frameworks & Libraries       LAYER 4: AI & Machine Learning
[ 06 Nodes ]                        [ 09 Nodes ]                       [ 09 Nodes ]                              [ 09 Nodes ]
──────────────────────────────      ─────────────────────────────      ─────────────────────────────────         ─────────────────────────────
• NVIDIA DGX Systems   ─────╲      ╱───── • Python            ─────╲  ╱───── • PyTorch                  ─────╲  ╱───── • Advanced RAG
• Docker               ──────╳─────────── • FastAPI           ──────╳─────── • Qdrant                   ──────╳─────── • AI Agents
• Google Cloud (GCP)   ─────╱      ╲───── • TypeScript        ─────╱  ╲───── • LangChain                ─────╱  ╲───── • Computer Vision
• Microsoft Azure                         • SQL                              • TensorFlow                              • Deep Learning
• MLOps Pipelines                         • Pandas                           • LlamaIndex & LlamaParse                 • LLMs & GenAI
• CI/CD                                   • NumPy                            • FAISS                                   • Natural Language Proc.
                                          • REST APIs                        • Hugging Face                            • PEFT & QLoRA
                                          • React                            • Pydantic AI                             • Prompt Engineering
                                          • Git & GitHub                     • scikit-learn                            • Anomaly Detection
```

---

## 2. Interactive Synaptic Visuals & Motion

### Dynamic Synapse Connectors (SVG Canvas)
- An SVG background plane connects nodes across adjacent layers with subtle hairline curves (`stroke-width: 1px`, `opacity: 0.15` at rest).
- **Forward-Pass Activation Pulse on Hover**:
  - When the user hovers over any node (e.g. `PyTorch`), connecting synapse lines illuminate with high contrast (`opacity: 0.8`), simulating synaptic signal transmission.
  - Connected upstream/downstream nodes pulse with a subtle highlight.

### Neuron Node Chips
- Each node is rendered as a precision interactive chip:
  - **Embedded SVG Icon** (matching official tech brand or neural symbol).
  - **Exact Item Name** from `content/skills.json`.
  - **Hover Reaction**: Smooth lift `translateY(-2px) scale(1.03)` with crisp border highlight.

### Bottom Proficiency Strip (Languages & Bio)
- A clean, horizontal strip at the base of the neural network:
  - `Bahasa Indonesia (Native)` · `English (Professional, TOEFL: 650)`

---

## 3. Responsive Adaptability

- **Desktop (>= 1024px)**: Full 4-layer horizontal neural network with dynamic SVG synapse lines.
- **Tablet & Mobile (< 1024px)**: Responsive stacked neural layers with touch-friendly node chips and vertical synaptic flow.
- **Accessibility**: Respects `prefers-reduced-motion` by disabling pulse animations while keeping crisp interactive hover states.
