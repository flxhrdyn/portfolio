# Design Spec: Skills & Capabilities — The Synaptic AI Network

**Date:** 2026-08-20  
**Author:** flxhrdyn / Antigravity Impeccable  
**Status:** Approved for Implementation  
**Visual Style:** Interactive Multi-Layer Synaptic Neural Network (Scale AI & Groq Engineering)  
**Content:** Complete set of all skills & technologies from `content/skills.json` and `content/tech-stack.json`

---

## 1. Architectural Pipeline & Layer Mapping

The section visualizes Felix's technical depth as a full-spectrum **4-Layer Neural Network Architecture**:

### Layer 1: `L01 // COMPUTE & INGESTION`
- **Focus**: Hardware compute, cloud infrastructure, backend runtime, and data ingestion.
- **Nodes (8 items)**:
  1. NVIDIA DGX Systems
  2. Docker
  3. Google Cloud (GCP)
  4. Microsoft Azure
  5. Python
  6. FastAPI
  7. SQL
  8. Git & GitHub

### Layer 2: `L02 // TRAINING & MODELING`
- **Focus**: Deep learning architectures, model training, fine-tuning, and numerical processing.
- **Nodes (8 items)**:
  1. PyTorch
  2. TensorFlow
  3. Hugging Face
  4. scikit-learn
  5. PEFT & QLoRA
  6. Deep Learning
  7. Pandas
  8. NumPy

### Layer 3: `L03 // VECTOR & RETRIEVAL`
- **Focus**: Vector search engines, indexing, orchestration, and retrieval architectures.
- **Nodes (7 items)**:
  1. Qdrant
  2. FAISS
  3. LlamaIndex & LlamaParse
  4. LangChain
  5. Pydantic AI
  6. Advanced RAG
  7. REST APIs

### Layer 4: `L04 // INFERENCE & AGENTS`
- **Focus**: Autonomous agent systems, applied computer vision, NLP, and deployed intelligence.
- **Nodes (7 items)**:
  1. AI Agents
  2. Computer Vision
  3. Natural Language Processing
  4. LLMs & GenAI
  5. Prompt Engineering
  6. Anomaly Detection
  7. TypeScript & React

### Telemetry Baseline: `COMMUNICATION & PROFICIENCY`
- **Nodes**:
  - `Bahasa Indonesia (Native)`
  - `English (Professional · TOEFL: 650)`

---

## 2. Interactive Synaptic Visuals & Motion

### Dynamic Synaptic Forward-Pass (SVG Canvas)
- An SVG canvas connects the layers with delicate bezier curves (`stroke: var(--border-color)`, `opacity: 0.25` at rest).
- **Hover Activation Signal**:
  - Hovering a node activates its incoming and outgoing synaptic connections (`opacity: 1`, `stroke: var(--text-primary)`).
  - A subtle activation pulse flows forward across connected layers.

### Interactive Neuron Nodes
- Precision geometric pill with monochrome SVG tech icon + label.
- Hover lift: `transform: translateY(-2px) scale(1.05)` with crisp high-contrast border and background shift.

### Layer Telemetry Headers
- Monospace layer badges in Geist Mono:
  - `L01 // COMPUTE & INGESTION [ 08 NODES ]`
  - `L02 // TRAINING & MODELING [ 08 NODES ]`
  - `L03 // VECTOR & RETRIEVAL [ 07 NODES ]`
  - `L04 // INFERENCE & AGENTS [ 07 NODES ]`

---

## 3. Responsive Adaptability

- **Desktop (>= 1024px)**: 4-layer horizontal neural pipeline with dynamic SVG connecting lines.
- **Mobile (< 1024px)**: Vertical stacked neural layers with responsive touch interaction.
- Respects `prefers-reduced-motion`.
