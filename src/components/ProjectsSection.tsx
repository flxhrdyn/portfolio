"use client";

import { useState } from "react";
import { m } from "motion/react";
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

  const featuredProject = projects.find((project) => project.featured);
  const gridProjects = projects.filter((project) => !project.featured);

  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal>
          <h2>Featured Projects</h2>
          <p style={{ marginBottom: "2rem" }}>
            Projects spanning model development, pipelines, and deployment.
          </p>
        </Reveal>

        {featuredProject && (
          <Reveal>
            <m.button
              type="button"
              className="project-featured"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setOpenSlug(featuredProject.slug)}
            >
              <div className="project-featured-media">
                {featuredProject.image ? (
                  <ProjectThumbnail src={featuredProject.image} alt={featuredProject.imageAlt} variant="featured" priority />
                ) : (
                  <pre className="project-featured-code">
                    <code>
                      <CodeBlock code={featuredProject.codeBlock} />
                    </code>
                  </pre>
                )}
              </div>
              <div className="project-featured-body">
                <div className="project-category">
                  <CategoryIcon category={featuredProject.tags[0]} />
                  {featuredProject.tags[0]}
                </div>
                <div className="project-tags">
                  {featuredProject.tags.slice(1).map((tag) => (
                    <span key={tag} className="badge">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="project-featured-title">{featuredProject.title}</h3>
                <p className="project-featured-summary">{featuredProject.summary}</p>
                <span className="project-link">
                  Explore Project
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </div>
            </m.button>
          </Reveal>
        )}

        <div className="projects-grid">
          {gridProjects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i, 4) * 0.08}>
              <m.button
                type="button"
                className="project-card"
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setOpenSlug(project.slug)}
              >
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
                  <span className="project-link">
                    Explore Project
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>

                </div>
              </m.button>
            </Reveal>
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

        <Reveal>
          <div id="activity" style={{ scrollMarginTop: "5rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-color)" }}>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              Open Source Contributions
            </h3>
            <p style={{ marginBottom: "1.5rem", fontSize: "0.92rem", color: "var(--text-secondary)", maxWidth: "650px" }}>
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
