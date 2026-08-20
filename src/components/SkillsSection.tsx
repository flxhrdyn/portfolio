"use client";

import { useState, useMemo } from "react";
import { m, useReducedMotion } from "motion/react";
import { TECH_ICONS, getSkillIconKey } from "./techStackIcons";
import Reveal, { revealVariants } from "./Reveal";

interface SynapticLayer {
  id: string;
  code: string;
  title: string;
  description: string;
  nodes: string[];
}

const SYNAPTIC_LAYERS: SynapticLayer[] = [
  {
    id: "l01",
    code: "L01 // LANGUAGES",
    title: "Languages & Core",
    description: "Computational runtimes, APIs, and data query engines.",
    nodes: [
      "Python",
      "SQL",
      "TypeScript",
      "FastAPI",
      "Pandas",
      "NumPy",
      "REST APIs",
      "React",
      "Git & GitHub",
    ],
  },
  {
    id: "l02",
    code: "L02 // FRAMEWORKS",
    title: "Frameworks & Vector DBs",
    description: "Deep learning frameworks, model fine-tuning, and embeddings.",
    nodes: [
      "PyTorch",
      "TensorFlow",
      "Hugging Face",
      "scikit-learn",
      "Qdrant",
      "FAISS",
      "LangChain",
      "LlamaIndex & LlamaParse",
      "Pydantic AI",
      "PEFT & QLoRA",
    ],
  },
  {
    id: "l03",
    code: "L03 // INFRASTRUCTURE",
    title: "Cloud & MLOps",
    description: "GPU compute clusters, containerization, and automation.",
    nodes: [
      "NVIDIA DGX Systems",
      "Docker",
      "Google Cloud (GCP)",
      "Microsoft Azure",
      "MLOps Pipelines",
      "CI/CD",
    ],
  },
  {
    id: "l04",
    code: "L04 // APPLIED AI",
    title: "Intelligence & Agents",
    description: "Production RAG, autonomous workflows, vision, and NLP.",
    nodes: [
      "Advanced RAG",
      "AI Agents",
      "Computer Vision",
      "Natural Language Processing",
      "LLMs & GenAI",
      "Prompt Engineering",
      "Anomaly Detection",
    ],
  },
];

// Bidirectional synaptic connections across the neural network
const SYNAPTIC_EDGES: Record<string, string[]> = {
  // L01
  Python: ["PyTorch", "TensorFlow", "scikit-learn", "FastAPI", "Pandas", "NumPy", "LangChain", "LlamaIndex & LlamaParse", "Pydantic AI", "Advanced RAG", "AI Agents", "LLMs & GenAI"],
  SQL: ["Pandas", "Qdrant", "FastAPI", "Google Cloud (GCP)", "Advanced RAG"],
  TypeScript: ["React", "REST APIs", "FastAPI", "Docker", "AI Agents"],
  FastAPI: ["Python", "Docker", "REST APIs", "Pydantic AI", "AI Agents", "Advanced RAG", "CI/CD"],
  Pandas: ["Python", "NumPy", "SQL", "scikit-learn", "Anomaly Detection"],
  NumPy: ["Python", "Pandas", "PyTorch", "TensorFlow", "Computer Vision"],
  "REST APIs": ["FastAPI", "TypeScript", "React", "Docker", "AI Agents"],
  React: ["TypeScript", "REST APIs", "FastAPI", "AI Agents"],
  "Git & GitHub": ["CI/CD", "Docker", "MLOps Pipelines", "Python"],

  // L02
  PyTorch: ["Python", "NVIDIA DGX Systems", "Hugging Face", "PEFT & QLoRA", "Computer Vision", "LLMs & GenAI", "Anomaly Detection"],
  TensorFlow: ["Python", "Google Cloud (GCP)", "Computer Vision", "Natural Language Processing"],
  "Hugging Face": ["PyTorch", "PEFT & QLoRA", "LLMs & GenAI", "Natural Language Processing", "Advanced RAG"],
  "scikit-learn": ["Python", "Pandas", "NumPy", "Anomaly Detection", "MLOps Pipelines"],
  Qdrant: ["Python", "Docker", "Advanced RAG", "AI Agents", "LLMs & GenAI"],
  FAISS: ["Python", "PyTorch", "Advanced RAG", "Computer Vision"],
  LangChain: ["Python", "FastAPI", "Advanced RAG", "AI Agents", "Prompt Engineering", "LLMs & GenAI"],
  "LlamaIndex & LlamaParse": ["Python", "Qdrant", "FastAPI", "Advanced RAG", "AI Agents"],
  "Pydantic AI": ["Python", "FastAPI", "AI Agents", "Prompt Engineering", "LLMs & GenAI"],
  "PEFT & QLoRA": ["PyTorch", "Hugging Face", "NVIDIA DGX Systems", "LLMs & GenAI"],

  // L03
  "NVIDIA DGX Systems": ["PyTorch", "PEFT & QLoRA", "Computer Vision", "LLMs & GenAI", "MLOps Pipelines"],
  Docker: ["FastAPI", "Qdrant", "Google Cloud (GCP)", "Microsoft Azure", "CI/CD", "AI Agents"],
  "Google Cloud (GCP)": ["Docker", "MLOps Pipelines", "CI/CD", "Advanced RAG"],
  "Microsoft Azure": ["Docker", "MLOps Pipelines", "CI/CD"],
  "MLOps Pipelines": ["Docker", "CI/CD", "PyTorch", "NVIDIA DGX Systems", "Anomaly Detection"],
  "CI/CD": ["Docker", "Git & GitHub", "MLOps Pipelines", "FastAPI"],

  // L04
  "Advanced RAG": ["Python", "Qdrant", "FAISS", "LlamaIndex & LlamaParse", "LangChain", "Prompt Engineering", "LLMs & GenAI"],
  "AI Agents": ["Python", "FastAPI", "Pydantic AI", "LangChain", "Docker", "LLMs & GenAI", "Prompt Engineering"],
  "Computer Vision": ["Python", "PyTorch", "NumPy", "NVIDIA DGX Systems", "Anomaly Detection"],
  "Natural Language Processing": ["Python", "PyTorch", "Hugging Face", "LLMs & GenAI", "Prompt Engineering"],
  "LLMs & GenAI": ["Python", "PyTorch", "Hugging Face", "PEFT & QLoRA", "NVIDIA DGX Systems", "Advanced RAG", "AI Agents"],
  "Prompt Engineering": ["LangChain", "Pydantic AI", "Advanced RAG", "AI Agents", "LLMs & GenAI"],
  "Anomaly Detection": ["Python", "scikit-learn", "Pandas", "PyTorch", "Computer Vision"],
};

const BIO_LANGUAGES = [
  { label: "Bahasa Indonesia", level: "Native Proficiency" },
  { label: "English", level: "Professional Working (TOEFL: 650)" },
];

function SkillIcon({ name }: { name: string }) {
  const iconKey = getSkillIconKey(name);
  const iconData = TECH_ICONS[iconKey] || TECH_ICONS.neural;

  return (
    <svg
      className="synaptic-icon"
      viewBox={iconData.viewBox}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={iconData.path} />
    </svg>
  );
}

export default function SkillsSection() {
  const reduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Set of connected nodes for the active hover state
  const connectedNodes = useMemo(() => {
    if (!activeNode) return new Set<string>();
    const direct = SYNAPTIC_EDGES[activeNode] || [];
    return new Set<string>([activeNode, ...direct]);
  }, [activeNode]);

  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <div className="synaptic-header-row">
            <div>
              <h2>Skills &amp; Capabilities</h2>
              <p style={{ marginBottom: "1.25rem", maxWidth: "60ch" }}>
                The end-to-end AI engineering stack: from core languages and model training to
                high-performance GPU infrastructure and deployed intelligent systems.
              </p>
            </div>
            <div className="synaptic-telemetry-badge" aria-label="Neural Network Telemetry">
              <span className="synaptic-live-indicator" />
              <span className="synaptic-telemetry-text">
                {activeNode ? (
                  <>
                    ACTIVE: <strong className="synaptic-active-target">{activeNode}</strong> ({connectedNodes.size - 1} LINKED)
                  </>
                ) : (
                  <>32 NODES // 4-LAYER PIPELINE</>
                )}
              </span>
            </div>
          </div>
        </Reveal>

        {/* MINIMALIST SYMMETRIC SYNAPTIC MATRIX */}
        <div className="synaptic-matrix-frame">
          <div className="synaptic-matrix-grid">
            {SYNAPTIC_LAYERS.map((layer, layerIdx) => (
              <m.div
                key={layer.id}
                className="synaptic-matrix-col"
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "show"}
                viewport={{ once: true, margin: "-60px" }}
                variants={revealVariants}
                transition={{
                  duration: 0.4,
                  delay: Math.min(layerIdx, 3) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Column Header */}
                <div className="synaptic-matrix-col-header">
                  <div className="synaptic-matrix-meta">
                    <span className="synaptic-matrix-code">{layer.code}</span>
                    <span className="synaptic-matrix-count">
                      [ {String(layer.nodes.length).padStart(2, "0")} ]
                    </span>
                  </div>
                  <h3 className="synaptic-matrix-title">{layer.title}</h3>
                  <p className="synaptic-matrix-desc">{layer.description}</p>
                </div>

                {/* Clean Un-nested Skill List */}
                <div className="synaptic-matrix-list">
                  {layer.nodes.map((node) => {
                    const isHovered = activeNode === node;
                    const isConnected = !isHovered && connectedNodes.has(node);
                    const isDimmed = activeNode !== null && !isHovered && !isConnected;

                    return (
                      <div
                        key={node}
                        className={`synaptic-matrix-item ${isHovered ? "active" : ""} ${
                          isConnected ? "connected" : ""
                        } ${isDimmed ? "dimmed" : ""}`}
                        onMouseEnter={() => setActiveNode(node)}
                        onMouseLeave={() => setActiveNode(null)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Skill node: ${node}`}
                        onFocus={() => setActiveNode(node)}
                        onBlur={() => setActiveNode(null)}
                      >
                        <span className="synaptic-matrix-icon">
                          <SkillIcon name={node} />
                        </span>
                        <span className="synaptic-matrix-name">{node}</span>
                        <span className="synaptic-matrix-dot" aria-hidden="true" />
                      </div>
                    );
                  })}
                </div>
              </m.div>
            ))}
          </div>

          {/* BASELINE COMMUNICATION & PROFICIENCY */}
          <div className="synaptic-matrix-footer">
            <span className="synaptic-matrix-footer-label">COMMUNICATION &amp; PROFICIENCY</span>
            <div className="synaptic-matrix-footer-items">
              {BIO_LANGUAGES.map((item) => (
                <div key={item.label} className="synaptic-matrix-footer-item">
                  <span className="synaptic-matrix-footer-dot">●</span>
                  <span className="synaptic-matrix-footer-lang">{item.label}</span>
                  <span className="synaptic-matrix-footer-level">({item.level})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
