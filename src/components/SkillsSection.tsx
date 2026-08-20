"use client";

import { useState } from "react";
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
    code: "L01 // LANGUAGES & RUNTIMES",
    title: "Languages & Backend",
    description: "Core programming languages, computational engines, and backend API runtimes.",
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
    code: "L02 // FRAMEWORKS & RETRIEVAL",
    title: "Frameworks & Vector DBs",
    description: "Deep learning frameworks, model optimization, vector stores, and orchestration.",
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
    code: "L03 // CLOUD & INFRASTRUCTURE",
    title: "Cloud, MLOps & Hardware",
    description: "High-performance GPU compute clusters, container orchestration, and CI/CD.",
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
    code: "L04 // APPLIED AI & AGENTS",
    title: "Applied AI & Intelligence",
    description: "Production RAG architectures, autonomous agent workflows, vision, and NLP.",
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

  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <h2>Skills &amp; Capabilities</h2>
          <p style={{ marginBottom: "2.5rem", maxWidth: "60ch" }}>
            The end-to-end AI engineering stack: from core languages and model training to
            high-performance GPU infrastructure and deployed intelligent systems.
          </p>
        </Reveal>

        {/* SYNAPTIC NEURAL PIPELINE GRID */}
        <div className="synaptic-pipeline-wrapper">
          <div className="synaptic-grid">
            {SYNAPTIC_LAYERS.map((layer, layerIdx) => (
              <m.div
                key={layer.id}
                className="synaptic-column"
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "show"}
                viewport={{ once: true, margin: "-60px" }}
                variants={revealVariants}
                transition={{
                  duration: 0.45,
                  delay: Math.min(layerIdx, 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Column Header */}
                <div className="synaptic-col-header">
                  <div className="synaptic-col-meta">
                    <span className="synaptic-col-code">{layer.code}</span>
                    <span className="synaptic-col-count">
                      [ {String(layer.nodes.length).padStart(2, "0")} ]
                    </span>
                  </div>
                  <h3 className="synaptic-col-title">{layer.title}</h3>
                  <p className="synaptic-col-desc">{layer.description}</p>
                </div>

                {/* Nodes List */}
                <div className="synaptic-nodes-list">
                  {layer.nodes.map((node) => {
                    const isHovered = activeNode === node;
                    return (
                      <div
                        key={node}
                        className={`synaptic-node-chip ${isHovered ? "active" : ""}`}
                        onMouseEnter={() => setActiveNode(node)}
                        onMouseLeave={() => setActiveNode(null)}
                      >
                        <span className="synaptic-node-icon-wrap">
                          <SkillIcon name={node} />
                        </span>
                        <span className="synaptic-node-label">{node}</span>
                        <span className="synaptic-node-pulse-dot" aria-hidden="true" />
                      </div>
                    );
                  })}
                </div>
              </m.div>
            ))}
          </div>

          {/* BASELINE COMMUNICATION & PROFICIENCY */}
          <div className="synaptic-base-strip">
            <div className="synaptic-base-label">COMMUNICATION &amp; PROFICIENCY</div>
            <div className="synaptic-base-items">
              {BIO_LANGUAGES.map((item) => (
                <div key={item.label} className="synaptic-base-item">
                  <span className="synaptic-base-dot">●</span>
                  <span className="synaptic-base-lang">{item.label}</span>
                  <span className="synaptic-base-level">({item.level})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
