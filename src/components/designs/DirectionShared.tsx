'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { DesignSwitcherPill } from '@/components/design-switcher/DesignSwitcherPill';
import {
  PROFILE, ALL_PROJECTS, WORK_ROLES, EDUCATION, SKILL_GROUPS,
  PUBLICATIONS, CERTIFICATIONS, CONTACT_LINKS, ProjectItem,
} from '@/data/portfolio-data';
import './directions.css';

export const PROJECTS = ALL_PROJECTS;
export { PROFILE, WORK_ROLES, EDUCATION, SKILL_GROUPS, PUBLICATIONS, CERTIFICATIONS, CONTACT_LINKS };

export function DirectionShell({
  children,
  className = '',
  framed = false,
  dock = false,
}: {
  children: ReactNode;
  className?: string;
  framed?: boolean;
  dock?: boolean;
}) {
  return (
    <div className={`direction ${className}`} data-direction-shell>
      <header className={`direction-nav ${framed ? 'direction-nav-framed' : ''}`}>
        <Link href="#hero" className="direction-brand" aria-label={`${PROFILE.name}, home`}>
          <span>flxhrdyn</span>
        </Link>
        <nav className="direction-links" aria-label="Page sections">
          <a href="#projects">Work</a>
          <a href="#experience">About</a>
          <a href="#research">Research</a>
          <a href="#contact">Contact</a>
        </nav>
        <DesignSwitcherPill className="direction-switcher" />
      </header>
      {children}
      {!dock && <footer className="direction-footer"><span>{PROFILE.name}</span><a href="#hero">Back to top</a></footer>}
      {dock && <nav className="direction-dock" aria-label="Workspace navigation">
        <a href="#projects">Work</a><a href="#experience">About</a><a href="#research">Research</a><a href={`mailto:${PROFILE.email}`}>Contact</a>
      </nav>}
    </div>
  );
}

export function SectionHeading({ children, id }: { children: ReactNode; id?: string }) {
  return <div className="direction-section-heading" id={id}><h2>{children}</h2></div>;
}

export function ProjectImage({ project, className = '' }: { project: ProjectItem; className?: string }) {
  return <div className={`direction-image ${className}`}><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 760px) 100vw, 70vw" /></div>;
}

export function ProjectDetailModal({
  project,
  index,
  isOpen,
  onClose,
}: {
  project: ProjectItem;
  index?: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="direction direction-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${project.slug}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="direction-modal-panel">
        <div className="direction-modal-header">
          <span className="direction-modal-meta">Case study</span>
          <button
            type="button"
            className="direction-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            Close [Esc]
          </button>
        </div>

        <div className="direction-modal-body">
          <div className="direction-modal-title-group">
            <h2 id={`modal-title-${project.slug}`} className="direction-modal-title">
              {project.title}
            </h2>
            {project.summary && (
              <p className="direction-modal-summary">{project.summary}</p>
            )}
          </div>

          {project.overview && (
            <div className="direction-modal-section">
              <h3 className="direction-modal-label">Overview</h3>
              <p className="direction-modal-text">{project.overview}</p>
            </div>
          )}

          {project.architectureText && (
            <div className="direction-modal-section">
              <h3 className="direction-modal-label">
                {project.architectureTitle ?? 'Technical approach'}
              </h3>
              <p className="direction-modal-text">{project.architectureText}</p>
            </div>
          )}

          {project.codeBlock && (
            <div className="direction-modal-section">
              <h3 className="direction-modal-label">Core implementation</h3>
              <pre className="direction-code">
                <code>{project.codeBlock}</code>
              </pre>
            </div>
          )}

          {project.results?.length ? (
            <div className="direction-modal-section">
              <h3 className="direction-modal-label">
                {project.resultsTitle ?? 'Results'}
              </h3>
              <ul className="direction-modal-list">
                {project.results.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="direction-modal-footer">
            <a
              href={`https://github.com/flxhrdyn/${project.repo}`}
              target="_blank"
              rel="noreferrer"
              className="direction-modal-link"
            >
              <span>View on GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function ProjectCopy({ project, index }: { project: ProjectItem; index?: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="direction-project-copy">
      <div className="direction-project-meta">
        <span>{index === undefined ? project.tags[0] : String(index + 1).padStart(2, '0')}</span>
        <span>{project.tags.slice(0, 2).join(' / ')}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="direction-project-links">
        <a href={`https://github.com/flxhrdyn/${project.repo}`} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <button
          type="button"
          className="direction-detail-trigger"
          onClick={() => setIsOpen(true)}
        >
          Project details
        </button>
      </div>

      <ProjectDetailModal
        project={project}
        index={index}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

export function ExperienceContent({ compact = false }: { compact?: boolean } = {}) {
  return <div className={`direction-career ${compact ? 'direction-career-compact' : ''}`}>
    {WORK_ROLES.map((role) => <article className="direction-career-row" key={`${role.company}-${role.title}`}>
      <p className="direction-overline">{role.date}</p><div><h3>{role.title}</h3><p>{role.company}</p>{role.headline && <p className="direction-muted">{role.headline}</p>}{role.highlights?.length ? <details><summary>Responsibilities</summary><ul>{role.highlights.map((item) => <li key={item}>{item}</li>)}</ul></details> : null}</div>
    </article>)}
    {EDUCATION.map((item) => <article className="direction-career-row direction-education-row" key={`${item.company}-${item.title}`}>
      <p className="direction-overline">{item.date}</p><div><h3>{item.title}</h3><p>{item.company}{item.statLabel ? ` / ${item.statLabel}` : ''}</p>{item.description && <p className="direction-muted">{item.description}</p>}</div>
    </article>)}
  </div>;
}

export function SkillsContent() {
  return <div className="direction-skills">{SKILL_GROUPS.map((group) => <article key={group.category}><h3>{group.category}</h3><p>{group.items.join(' / ')}</p></article>)}</div>;
}

export function ResearchContent({ abstract = false }: { abstract?: boolean }) {
  const paper = PUBLICATIONS[0];
  if (!paper) return null;
  return <article className="direction-research">
    <div className="direction-research-top"><span>{paper.kind}</span><span>{paper.volume}</span></div>
    <h3>{paper.title}</h3><p>{paper.journal}</p><p className="direction-muted">{paper.authors}</p>
    <p>{paper.summary}</p>
    <div className="direction-paper-stats">{paper.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
    {abstract && <details><summary>Read abstract</summary><p className="direction-detail-body">{(paper as typeof paper & { abstract?: string }).abstract}</p></details>}
    {paper.doi && <a className="direction-text-link" href={paper.doi} target="_blank" rel="noreferrer">View publication</a>}
    {CERTIFICATIONS.length > 0 && <details className="direction-certifications"><summary>Certifications ({CERTIFICATIONS.length})</summary><ul>{CERTIFICATIONS.map((cert) => <li key={cert.title}><span>{cert.title}</span><span>{cert.issuer} / {cert.date}</span></li>)}</ul></details>}
  </article>;
}

export function ContactContent() {
  return <div className="direction-contact">{CONTACT_LINKS.map((item) => <a href={item.href} key={item.label} target={item.href.startsWith('mailto:') ? undefined : '_blank'} rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}><span>{item.label}</span><span>{item.handle}</span><span aria-hidden="true">+</span></a>)}</div>;
}
