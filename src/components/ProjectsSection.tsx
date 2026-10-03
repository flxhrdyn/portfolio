"use client";

import { useState } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";
import Modal from "./Modal";
import GithubHeatmap from "./GithubHeatmap";
import ProjectCaseStudyBody from "./ProjectCaseStudyBody";
import ProjectThumbnail from "./ProjectThumbnail";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import projects from "@/content/projects.json";
import archiveProjects from "@/content/archive-projects.json";
import type { ContributionDay } from "@/lib/github-contributions";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

// The image pulls into focus like a camera locking on; reduced motion keeps only the fade.
function MediaButton({
  onClick,
  ariaLabel,
  className,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  className: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      style={{ overflow: "hidden" }}
    >
      <m.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(12px)", scale: 1.02 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        viewport={VIEWPORT}
        transition={{
          duration: 0.8,
          ease: EASE_OUT,
          opacity: { duration: 0.4, ease: EASE_OUT },
        }}
      >
        {children}
      </m.div>
    </button>
  );
}

// Text stays quiet so the media curtain is the section's one standout motion.
const featureBodyVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.3 } },
};

const projectRowVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

const heatmapApertureVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

interface ProjectsSectionProps {
  contributions: ContributionDay[] | null;
}

function ProjectLinks({ project, onOpen }: { project: { repo: string }; onOpen: () => void }) {
  return (
    <div className="project-links">
      <button type="button" className="project-link" onClick={onOpen}>
        <span>Case study</span>
        <span className="link-arrow" aria-hidden="true">&rarr;</span>
      </button>
      <a
        href={`https://github.com/flxhrdyn/${project.repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="project-link project-link-muted"
      >
        <span>GitHub</span>
        <span className="link-arrow-diagonal" aria-hidden="true">&#8599;</span>
      </a>
    </div>
  );
}

export default function ProjectsSection({ contributions }: ProjectsSectionProps) {
  const reduceMotion = useReducedMotion();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const featuredProject = projects.find((project) => project.featured);
  // Projects marked `showcase: false` are listed only in the "View all projects" table.
  const gridProjects = projects.filter((project) => !project.featured && project.showcase !== false);

  return (
    <section className="section" id="projects">
      <div className="container">
        <WordReveal text="Featured Projects" />
        <Reveal delay={0.12}>
          <p style={{ marginBottom: "2.25rem", maxWidth: "60ch" }}>
            AI systems, intelligent agents, and full-stack machine learning applications.
          </p>
        </Reveal>

        {featuredProject && (
          <article className="project-feature">
            <MediaButton
              className="project-feature-media"
              onClick={() => setOpenSlug(featuredProject.slug)}
              ariaLabel={`Open ${featuredProject.title} case study`}
            >
              <ProjectThumbnail src={featuredProject.image} alt={featuredProject.imageAlt} variant="featured" priority />
            </MediaButton>
            <m.div
              className="project-feature-body"
              initial={reduceMotion ? false : "hidden"}
              whileInView="show"
              viewport={VIEWPORT}
              variants={featureBodyVariants}
            >
              <div>
                <p className="project-category">{featuredProject.tags[0]}</p>
                <h3 className="project-feature-title">{featuredProject.title}</h3>
              </div>
              <div>
                <p className="project-summary">{featuredProject.summary}</p>
                <ProjectLinks project={featuredProject} onOpen={() => setOpenSlug(featuredProject.slug)} />
              </div>
            </m.div>
          </article>
        )}

        <ul className="project-rows">
          {gridProjects.map((project) => (
            <m.li
              key={project.slug}
              className="project-row"
              initial={reduceMotion ? false : "hidden"}
              whileInView="show"
              viewport={VIEWPORT}
              variants={projectRowVariants}
            >
              <MediaButton
                className="project-row-media"
                onClick={() => setOpenSlug(project.slug)}
                ariaLabel={`Open ${project.title} case study`}
              >
                <ProjectThumbnail src={project.image} alt={project.imageAlt} />
              </MediaButton>
              <div className="project-row-text">
                <p className="project-category">{project.tags[0]}</p>
                <h3 className="project-row-title">{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <ProjectLinks project={project} onOpen={() => setOpenSlug(project.slug)} />
              </div>
            </m.li>
          ))}
        </ul>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3.5rem", marginTop: "1rem" }}>
          <button className="all-projects-btn" onClick={() => setArchiveOpen(true)}>
            <span>View all projects</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <div style={{ borderTop: "1px solid var(--border-color)", marginBottom: "2.5rem", opacity: 0.6 }} />

        <m.div
          id="activity"
          style={{ scrollMarginTop: "5rem" }}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={VIEWPORT}
          variants={heatmapApertureVariants}
        >
          <h3 className="subsection-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            Open Source Contributions
          </h3>
          <p style={{ marginBottom: "1.5rem", maxWidth: "650px" }}>
            Open-source work and contributions, updated in real time.
          </p>
          <GithubHeatmap contributions={contributions} />
        </m.div>
      </div>

      {projects.map((project) => (
        <Modal key={project.slug} id={`${project.slug}-modal`} title={project.modalTitle} eyebrow={project.tags[0]} isOpen={openSlug === project.slug} onClose={() => setOpenSlug(null)}>
          <ProjectCaseStudyBody project={project} />
          <div className="modal-section modal-section--footer">
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

      <Modal id="all-projects-modal" title="All Projects" eyebrow="PROJECTS / INDEX" isOpen={archiveOpen} onClose={() => setArchiveOpen(false)} maxWidth="840px">
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
