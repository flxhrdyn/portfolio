"use client";

import { useState } from "react";
import Modal from "./Modal";
import GithubHeatmap from "./GithubHeatmap";
import ProjectCaseStudyBody from "./ProjectCaseStudyBody";
import projects from "@/content/projects.json";
import archiveProjects from "@/content/archive-projects.json";
import type { ContributionDay } from "@/lib/github-contributions";

const STATUS_BADGE_CLASS: Record<string, string> = {
  yellow: "badge-google-yellow",
  green: "badge-google-green",
  blue: "badge-google-blue",
};

interface ProjectsSectionProps {
  contributions: ContributionDay[] | null;
}

export default function ProjectsSection({ contributions }: ProjectsSectionProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);

  return (
    <section className="section" id="projects">
      <div className="container">
        <h2>Featured Projects</h2>
        <p style={{ marginBottom: "2rem" }}>
          Selected projects demonstrating end-to-end model training, production pipelines, and empirical diagnostic metrics.
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="project-card"
              role="button"
              tabIndex={0}
              onClick={() => setOpenSlug(project.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenSlug(project.slug);
                }
              }}
            >
              <div className="project-header">
                <div className="project-tags">
                  <span className="badge badge-accent">{project.tags[0]}</span>
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
                <span className="project-link">
                  Explore Project
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  {project.tagStack}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3.5rem" }}>
          <button className="all-projects-btn" onClick={() => setArchiveOpen(true)}>
            <span>View all archive projects</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <div style={{ borderTop: "1px solid var(--border-color)", marginBottom: "2.5rem", opacity: 0.6 }} />

        <div id="activity" style={{ scrollMarginTop: "5rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-color)" }}>
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Open Source Contributions
          </h3>
          <p style={{ marginBottom: "1.5rem", fontSize: "0.92rem", color: "var(--text-secondary)", maxWidth: "650px" }}>
            A live calendar tracking open-source commits, repository updates, and active model development pipelines.
          </p>
          <GithubHeatmap contributions={contributions} />
        </div>
      </div>

      {projects.map((project) => (
        <Modal key={project.slug} id={`${project.slug}-modal`} title={project.modalTitle} isOpen={openSlug === project.slug} onClose={() => setOpenSlug(null)}>
          <ProjectCaseStudyBody project={project} />
          <div className="modal-section" style={{ paddingTop: "0.5rem", borderTop: "1px solid var(--border-color)" }}>
            <a href={`https://github.com/flxhrdyn/${project.repo}`} target="_blank" rel="noopener noreferrer" className="project-link">
              Explore Project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <span className={`badge ${STATUS_BADGE_CLASS[row.statusColor]}`}>{row.status}</span>
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
