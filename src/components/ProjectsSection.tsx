"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";
import Modal from "./Modal";
import GithubHeatmap from "./GithubHeatmap";
import ProjectCaseStudyBody from "./ProjectCaseStudyBody";
import ProjectThumbnail from "./ProjectThumbnail";
import Reveal from "./Reveal";
import projects from "@/content/projects.json";
import archiveProjects from "@/content/archive-projects.json";
import type { ContributionDay } from "@/lib/github-contributions";

interface ProjectsSectionProps {
  contributions: ContributionDay[] | null;
}

// Maps a project's primary tag to a category icon shown next to its label on grid cards.
function CategoryIcon({ category }: { category: string }) {
  const key = category.toLowerCase();
  if (key.includes("vision") || key.includes("healthcare")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    );
  }
  if (key.includes("agent")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="12" rx="2"></rect>
        <path d="M12 8V4"></path>
        <circle cx="12" cy="3" r="1"></circle>
        <path d="M8 14h.01M16 14h.01"></path>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  );
}

export default function ProjectsSection({ contributions }: ProjectsSectionProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "specs" | "code">("preview");

  const featuredProject = projects.find((project) => project.featured);
  const gridProjects = projects.filter((project) => !project.featured);

  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal>
          <div className="section-eyebrow">● [01] // FEATURED PROJECTS</div>
          <h2>Featured Projects</h2>
          <p style={{ marginBottom: "2rem" }}>
            Production AI pipelines, retrieval architectures, and deep learning models shipped end-to-end.
          </p>
        </Reveal>

        {featuredProject && (
          <Reveal>
            <div className="bento-featured-card">
              {/* Terminal Window Chrome Header */}
              <div className="bento-terminal-header">
                <div className="bento-terminal-dots" aria-hidden="true">
                  <span className="bento-dot" />
                  <span className="bento-dot" />
                  <span className="bento-dot" />
                  <span className="bento-terminal-filename" style={{ marginLeft: "0.5rem" }}>invenio-rag-pipeline.py</span>
                </div>

                {/* View Switcher Tabs */}
                <div className="bento-terminal-tabs" role="tablist" aria-label="Project View Options">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "preview"}
                    className={`bento-tab-btn ${activeTab === "preview" ? "active" : ""}`}
                    onClick={() => setActiveTab("preview")}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "specs"}
                    className={`bento-tab-btn ${activeTab === "specs" ? "active" : ""}`}
                    onClick={() => setActiveTab("specs")}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    <span>Specs</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "code"}
                    className={`bento-tab-btn ${activeTab === "code" ? "active" : ""}`}
                    onClick={() => setActiveTab("code")}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    <span>Code</span>
                  </button>
                </div>
              </div>

              {/* Bento Grid Interior: Media & Specs on Left, Structured Details on Right */}
              <div className="bento-featured-content">
                <div className="bento-media-pane">
                  {activeTab === "preview" && (
                    <div
                      className="bento-demo-wrapper"
                      style={{ cursor: "pointer", position: "relative" }}
                      onClick={() => setOpenSlug(featuredProject.slug)}
                    >
                      <ProjectThumbnail src={featuredProject.image} alt={featuredProject.imageAlt} variant="featured" priority />
                    </div>
                  )}

                  {activeTab === "specs" && (
                    <div className="bento-specs-pane">
                      <div className="specs-header">TECHNICAL SPECIFICATIONS</div>
                      <div className="specs-table">
                        <div className="specs-row">
                          <span className="specs-key">Architecture</span>
                          <span className="specs-val">Dense + Sparse Hybrid Search</span>
                        </div>
                        <div className="specs-row">
                          <span className="specs-key">Vector Engine</span>
                          <span className="specs-val">Qdrant (HNSW + BM42)</span>
                        </div>
                        <div className="specs-row">
                          <span className="specs-key">Reranker</span>
                          <span className="specs-val">FlashRank Cross-Encoder</span>
                        </div>
                        <div className="specs-row">
                          <span className="specs-key">Reasoning Engine</span>
                          <span className="specs-val">4-Step Chain-of-Thought (CoT)</span>
                        </div>
                        <div className="specs-row">
                          <span className="specs-key">Semantic Cache</span>
                          <span className="specs-val">Dual-Layer (&gt; 0.90 similarity)</span>
                        </div>
                        <div className="specs-row">
                          <span className="specs-key">Deployment</span>
                          <span className="specs-val">Docker • FastAPI • Azure</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "code" && (
                    <pre className="project-featured-code" style={{ margin: 0, height: "100%", borderRadius: 0, border: "none" }}>
                      <code>
                        <CodeBlock code={featuredProject.codeBlock} />
                      </code>
                    </pre>
                  )}
                </div>

                <div className="bento-details-pane">
                  <div>
                    <div className="project-category" style={{ marginBottom: "0.5rem" }}>
                      <CategoryIcon category={featuredProject.tags[0]} />
                      {featuredProject.tags[0]}
                    </div>
                    <div className="project-tags" style={{ marginBottom: "1rem" }}>
                      {featuredProject.tags.slice(1).map((tag) => (
                        <span key={tag} className="badge">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="project-featured-title">{featuredProject.title}</h3>
                    <p className="project-featured-summary">{featuredProject.summary}</p>
                  </div>

                  <div className="bento-actions">
                    <button
                      type="button"
                      className="btn-pill btn-pill-primary"
                      onClick={() => setOpenSlug(featuredProject.slug)}
                    >
                      <span>Read Case Study</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                    <a
                      href={`https://github.com/flxhrdyn/${featuredProject.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill btn-pill-secondary"
                    >
                      <span>GitHub</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        <div className="projects-grid">
          {gridProjects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i, 4) * 0.08}>
              <div className="project-card" onClick={() => setOpenSlug(project.slug)}>
                <ProjectThumbnail src={project.image} alt={project.imageAlt} />

                <div className="project-header">
                  <div className="project-category">
                    <CategoryIcon category={project.tags[0]} />
                    {project.tags[0]}
                  </div>
                  <div className="project-tags">
                    {project.tags.slice(1).map((tag) => (
                      <span key={tag} className="badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                </div>
                <div className="project-footer">
                  <button
                    type="button"
                    className="project-link"
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer", font: "inherit", color: "inherit" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenSlug(project.slug);
                    }}
                  >
                    <span>Read Case Study</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                  <a
                    href={`https://github.com/flxhrdyn/${project.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    style={{ color: "var(--text-secondary)" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>GitHub</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3.5rem", marginTop: "1rem" }}>
          <button className="all-projects-btn" onClick={() => setArchiveOpen(true)}>
            <span>View all archive projects</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <div style={{ borderTop: "1px solid var(--border-color)", marginBottom: "2.5rem", opacity: 0.6 }} />

        <Reveal>
          <div id="activity" style={{ scrollMarginTop: "5rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-color)" }}>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              Open Source Contributions
            </h3>
            <p style={{ marginBottom: "1.5rem", maxWidth: "650px" }}>
              Open-source work and contributions, updated in real time.
            </p>
            <GithubHeatmap contributions={contributions} />
          </div>
        </Reveal>
      </div>

      {projects.map((project) => (
        <Modal key={project.slug} id={`${project.slug}-modal`} title={project.modalTitle} isOpen={openSlug === project.slug} onClose={() => setOpenSlug(null)}>
          <ProjectCaseStudyBody project={project} />
          <div className="modal-section" style={{ paddingTop: "0.5rem", borderTop: "1px solid var(--border-color)" }}>
            <a
              href={`https://github.com/flxhrdyn/${project.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.27 7.77 10.77.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.16.69-3.83-1.52-3.83-1.52-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.62 0-1.24.44-2.26 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.81 1.17 3.05 0 4.37-2.66 5.33-5.19 5.61.41.35.77 1.04.77 2.1 0 1.51-.01 2.73-.01 3.1 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
              </svg>
              Explore GitHub Repo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </Modal>
      ))}

      <Modal id="all-projects-modal" title="Complete Archive & WIP Projects" isOpen={archiveOpen} onClose={() => setArchiveOpen(false)} maxWidth="840px">
        <div className="archive-table-wrapper">
          <table className="archive-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Category</th>
                <th>Primary Tech Stack</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {archiveProjects.map((row) => (
                <tr key={row.name}>
                  <td>
                    <a
                      href={`https://github.com/flxhrdyn/${row.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--text-primary)", fontWeight: 700, textDecoration: "none" }}
                    >
                      {row.name}
                    </a>
                  </td>
                  <td>{row.category}</td>
                  <td>{row.stack}</td>
                  <td>
                    <span className="badge">{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </section>
  );
}
