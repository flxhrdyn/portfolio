'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties, ReactNode, useEffect, useId, useRef, useState, useSyncExternalStore, type Ref } from 'react';
import { AnimatePresence, m, useIsPresent, useReducedMotion } from 'motion/react';
import { Reveal } from './Reveal';
import { createPortal } from 'react-dom';
import { PortfolioAnchor } from '@/components/PortfolioAnchor';
import {
  PROFILE, ALL_PROJECTS, WORK_ROLES, EDUCATION, SKILL_GROUPS,
  PUBLICATIONS, CERTIFICATIONS, CONTACT_LINKS, ProjectItem,
} from '@/data/portfolio-data';
import { getCertificationsPage } from './certifications-utils';
import { getSkillTelemetry } from './skills-utils';
import './directions.css';

export const PROJECTS = ALL_PROJECTS;
export { PROFILE, WORK_ROLES, EDUCATION, SKILL_GROUPS, PUBLICATIONS, CERTIFICATIONS, CONTACT_LINKS };

function D1SynthesisFooter() {
  const year = new Date().getFullYear();

  return (
    <Reveal as="footer" className="d1-minimal-footer">
      <div className="d1-minimal-footer-meta" data-r="fade">
        <span>© {year}</span>
        <nav aria-label="Footer links">
          <a href="https://github.com/flxhrdyn/portfolio" target="_blank" rel="noopener noreferrer">Source</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        </nav>
      </div>
      <div className="d1-minimal-footer-signoff">
        <p className="d1-minimal-footer-name" data-r="fade" style={{ '--d': '.08s' } as CSSProperties}>{PROFILE.name}</p>
        <PortfolioAnchor className="d1-minimal-footer-top" href="#hero" data-r="fade" style={{ '--d': '.16s' } as CSSProperties}>Back to top <span aria-hidden="true">↑</span></PortfolioAnchor>
      </div>
    </Reveal>
  );
}

export function DirectionShell({
  children,
  className = '',
  framed = false,
  dock = false,
  hideNavigation = false,
}: {
  children: ReactNode;
  className?: string;
  framed?: boolean;
  dock?: boolean;
  hideNavigation?: boolean;
}) {
  return (
    <div className={`direction ${className}`} data-direction-shell>
      {!hideNavigation && (
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
        </header>
      )}
      {children}
      {!dock && (
        className.includes('d1-synthesis') ? (
          <D1SynthesisFooter />
        ) : (
          <footer className="direction-footer"><span>{PROFILE.name}</span><a href="#hero">Back to top</a></footer>
        )
      )}
      {dock && <nav className="direction-dock" aria-label="Workspace navigation">
        <a href="#projects">Work</a><a href="#experience">About</a><a href="#research">Research</a><a href={`mailto:${PROFILE.email}`}>Contact</a>
      </nav>}
    </div>
  );
}

export function SectionHeading({
  children,
  id,
  motionPreset,
}: {
  children: ReactNode;
  id?: string;
  motionPreset?: 'd1-synthesis';
}) {
  if (motionPreset !== 'd1-synthesis') {
    return <div className="direction-section-heading" id={id}><h2>{children}</h2></div>;
  }

  return (
    <div className="direction-section-heading" id={id} data-motion-signature="line-mask">
      <h2><MaskLine>{children}</MaskLine></h2>
    </div>
  );
}

/** One line of display type rising from behind its own baseline. */
export function MaskLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  // The reveal state sits on the static mask: the translated line is clipped to zero area until revealed.
  return (
    <Reveal as="span" className="d1-mask" style={{ '--d': `${delay}s` } as CSSProperties}>
      <span className="d1-mask-line" data-motion-reveal="mask">{children}</span>
    </Reveal>
  );
}

export function ProjectImage({
  project,
  className = '',
  motionPreset,
}: {
  project: ProjectItem;
  className?: string;
  motionPreset?: 'd1-synthesis';
}) {
  const quality = project.slug === 'invenioai' || project.slug === 'angrist' || project.slug === 'aeroguard' ? 100 : 75;
  const image = <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 760px) 100vw, 70vw" quality={quality} />;
  if (motionPreset !== 'd1-synthesis') {
    return (
      <div className={`direction-image ${className}`} data-project-slug={project.slug}>
        <div className="direction-image-reveal" style={{ position: 'absolute', inset: 0 }}>{image}</div>
      </div>
    );
  }
  return (
    <Reveal className={`direction-image ${className}`} data-project-slug={project.slug} data-motion-preset={motionPreset}>
      <div className="direction-image-reveal" data-motion-reveal="focus" data-r="focus" style={{ position: 'absolute', inset: 0 }}>
        {image}
      </div>
    </Reveal>
  );
}

export function MotionDialogLayer({
  children,
  className,
  id,
  labelledBy,
  onBackdropClick,
  panelRef,
  panelClassName = '',
  animated = true,
}: {
  children: ReactNode;
  className: string;
  id?: string;
  labelledBy: string;
  onBackdropClick: () => void;
  panelRef?: Ref<HTMLDivElement>;
  panelClassName?: string;
  animated?: boolean;
}) {
  const isPresent = useIsPresent();
  const reduceMotion = useReducedMotion();
  const enterDuration = reduceMotion || !animated ? 0 : 0.42;
  const exitDuration = reduceMotion || !animated ? 0 : 0.18;

  return (
    <m.div
      className={className}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-hidden={!isPresent}
      inert={!isPresent}
      data-motion-state={isPresent ? 'open' : 'closing'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: exitDuration, ease: 'easeIn' } }}
      transition={{ duration: enterDuration, ease: [0.16, 1, 0.3, 1] }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onBackdropClick();
      }}
    >
      <m.div
        ref={panelRef}
        className={`direction-modal-panel ${panelClassName}`.trim()}
        initial={{ opacity: 0, y: 14, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.99, transition: { duration: exitDuration, ease: 'easeIn' } }}
        transition={{ duration: enterDuration, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.div>
    </m.div>
  );
}

export function ProjectDetailModal({
  project,
  index,
  isOpen,
  onClose,
  presentation,
  motionPreset,
}: {
  project: ProjectItem;
  index?: number;
  isOpen: boolean;
  onClose: () => void;
  presentation?: 'case-study';
  motionPreset?: 'd1-synthesis';
}) {
  const isCaseStudy = presentation === 'case-study';
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousActiveElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const originalOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), video[controls], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) {
        event.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (previousActiveElement?.isConnected) previousActiveElement.focus();
    };
  }, [isOpen, onClose]);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence initial={false}>
      {isOpen && (
      <MotionDialogLayer
        key={`project-dialog-${project.slug}`}
        className={`direction direction-modal-backdrop${isCaseStudy ? ' direction-modal-backdrop--case-study' : ''}`}
        labelledBy={`modal-title-${project.slug}`}
        onBackdropClick={onClose}
        panelRef={panelRef}
        animated={motionPreset === 'd1-synthesis'}
      >
        <div className="direction-modal-header">
          <span className="direction-modal-meta">Case study</span>
          <button
            ref={closeRef}
            type="button"
            className="direction-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            Close [Esc]
          </button>
        </div>

        <div className={`direction-modal-body${isCaseStudy ? ' direction-modal-body--case-study' : ''}`}>
          <div className="direction-modal-title-group">
            <h2 id={`modal-title-${project.slug}`} className="direction-modal-title">
              {project.title}
            </h2>
            {project.summary && (
              <p className="direction-modal-summary">{project.summary}</p>
            )}
          </div>

          {isCaseStudy && (
            <figure className="direction-modal-visual">
              <div className={`direction-modal-visual-frame${project.video ? ' direction-modal-visual-frame--video' : ' direction-modal-visual-frame--image'}`}>
                {project.video ? (
                  <video
                    src={project.video}
                    poster={project.image}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={`${project.title} project demo`}
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 760px) 100vw, 900px"
                  />
                )}
              </div>
              <figcaption>{project.video ? 'Project demo' : 'Dashboard preview'}</figcaption>
            </figure>
          )}

          {project.overview && (
            <div className="direction-modal-section">
              <h3 className="direction-modal-label">{isCaseStudy ? 'Problem & intent' : 'Overview'}</h3>
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
              <h3 className="direction-modal-label">{isCaseStudy ? 'Implementation snapshot' : 'Core implementation'}</h3>
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

          {project.repo ? (
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
          ) : null}
        </div>
      </MotionDialogLayer>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function ProjectCopy({
  project,
  index,
  presentation,
  motionPreset,
}: {
  project: ProjectItem;
  index?: number;
  presentation?: 'case-study';
  motionPreset?: 'd1-synthesis';
}) {
  const [isOpen, setIsOpen] = useState(false);
  const reveal = (i: number) => motionPreset ? { 'data-r': 'fade', style: { '--i': i, '--d': '.12s' } as CSSProperties } : {};

  return (
    <Reveal className="direction-project-copy" data-motion-preset={motionPreset}>
      <div className="direction-project-meta" {...reveal(0)}>
        <span>{index === undefined ? project.tags[0] : String(index + 1).padStart(2, '0')}</span>
        <span>{project.tags.slice(0, 2).join(' / ')}</span>
      </div>
      <h3 {...reveal(1)}>{project.title}</h3>
      <p {...reveal(2)}>{project.summary}</p>
      <div className="direction-project-links" {...reveal(3)}>
        <button
          type="button"
          className="direction-detail-trigger"
          onClick={() => setIsOpen(true)}
        >
          Project details
        </button>
        {project.repo ? (
          <a href={`https://github.com/flxhrdyn/${project.repo}`} target="_blank" rel="noreferrer">
            GitHub
          </a>
        ) : null}
      </div>

      <ProjectDetailModal
        project={project}
        index={index}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        presentation={presentation}
        motionPreset={motionPreset}
      />
    </Reveal>
  );
}

function CareerRoleItem({ role, index }: { role: (typeof WORK_ROLES)[number]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const hasHighlights = Boolean(role.highlights && role.highlights.length > 0);

  return (
    <Reveal
      as="article"
      className="direction-career-row"
      data-r="row"
      style={{ '--i': Math.min(index, 4) } as CSSProperties}
    >
      <p className="direction-overline" data-r="fade" style={{ '--d': '1.32s' } as CSSProperties}>{role.date}</p>
      <div className="direction-career-body">
        <button
          type="button"
          className="direction-career-toggle-btn"
          onClick={() => hasHighlights && setIsOpen(!isOpen)}
          aria-expanded={hasHighlights ? isOpen : undefined}
          aria-controls={hasHighlights ? panelId : undefined}
          disabled={!hasHighlights}
        >
          <span className="direction-career-toggle-icon" aria-hidden="true" data-open={isOpen}>
            {hasHighlights && <>
              <span className="direction-career-toggle-stroke direction-career-toggle-stroke-horizontal" />
              <span className="direction-career-toggle-stroke direction-career-toggle-stroke-vertical" />
            </>}
          </span>
          <div className="direction-career-title-block">
            <div className="direction-career-title-mask">
              <h3 className="direction-career-title-reveal" data-r="rise" style={{ '--d': '.62s' } as CSSProperties}>{role.title}</h3>
            </div>
            <p className="direction-career-company" data-r="fade" style={{ '--d': '1.48s' } as CSSProperties}>{role.company}</p>
          </div>
        </button>

        <div className="direction-career-content">
          {role.headline && (
            <p className="direction-muted direction-career-headline" data-r="fade" style={{ '--d': '1.64s' } as CSSProperties}>{role.headline}</p>
          )}
          {hasHighlights && (
            <div
              id={panelId}
              className="direction-career-bullets-panel"
              data-open={isOpen}
              aria-hidden={!isOpen}
              inert={!isOpen}
              style={{ '--bullet-count': role.highlights?.length ?? 0 } as CSSProperties}
            >
              <div className="direction-career-bullets-panel-inner">
                <ul className="direction-career-bullets">
                  {role.highlights?.map((item, bulletIndex) => (
                    <li key={item} style={{ '--j': bulletIndex } as CSSProperties}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function ExperienceContent({
  compact = false,
  only,
}: {
  compact?: boolean;
  only?: 'all' | 'work' | 'education';
} = {}) {
  const showWork = !only || only === 'all' || only === 'work';
  const showEdu = !only || only === 'all' || only === 'education';

  return (
    <div className={`direction-career ${compact ? 'direction-career-compact' : ''}`}>
      {showWork && WORK_ROLES.map((role, index) => (
        <CareerRoleItem
          key={`${role.company}-${role.title}`}
          role={role}
          index={index}
        />
      ))}
      {showEdu && EDUCATION.map((item, index) => (
        <Reveal
          as="article"
          className="direction-career-row direction-education-row"
          data-r="row"
          style={{ '--i': Math.min(index, 4) } as CSSProperties}
          key={`${item.company}-${item.title}`}
        >
          <p className="direction-overline" data-r="fade" style={{ '--d': '1.32s' } as CSSProperties}>{item.date}</p>
          <div className="direction-career-body direction-education-body">
            <div className="direction-career-title-mask">
              <h3 className="direction-career-title-reveal" data-r="rise" style={{ '--d': '.62s' } as CSSProperties}>{item.title}</h3>
            </div>
            <p className="direction-career-company" data-r="fade" style={{ '--d': '1.48s' } as CSSProperties}>
              {item.company}{item.statLabel ? ` / ${item.statLabel}` : ''}
            </p>
            {item.description && <p className="direction-muted" data-r="fade" style={{ '--d': '1.64s' } as CSSProperties}>{item.description}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function WorkExperienceContent({ compact = false }: { compact?: boolean } = {}) {
  return <ExperienceContent compact={compact} only="work" />;
}

export function EducationContent({ compact = false }: { compact?: boolean } = {}) {
  return <ExperienceContent compact={compact} only="education" />;
}

export function SkillsContent({
  className = '',
  showMetadata = true,
}: { className?: string; showMetadata?: boolean } = {}) {
  const telemetryGroups = getSkillTelemetry(SKILL_GROUPS);

  return (
    <Reveal className={`direction-skills-matrix ${className}`}>
      {telemetryGroups.map((group, i) => (
        <article key={group.category} className="direction-skills-cell" style={{ '--i': i * 1.5 } as CSSProperties}>
          <header className="direction-skills-cell-header">
            <span className="direction-skills-index">
              {showMetadata && (
                <>
                  <span className="direction-skills-index-number">{group.indexLabel}</span>
                  {' '}
                  <span className="direction-skills-index-divider" aria-hidden="true">{'//'}</span>
                  {' '}
                </>
              )}
              <span
                className={`direction-skills-index-title direction-skills-title-reveal${showMetadata ? '' : ' direction-skills-index-title-plain'}`}
                data-r="rise"
              >
                {showMetadata ? group.title : group.category}
              </span>
            </span>
            {showMetadata && <span className="direction-skills-count">{group.countLabel}</span>}
          </header>
          <ul className="direction-skills-list">
            {group.items.map((item, j) => (
              <li key={item} className="direction-skills-item" data-r="fade" style={{ '--j': j, '--d': '.55s' } as CSSProperties}>
                <span className="direction-skills-bullet" aria-hidden="true">*</span>
                <span className="direction-skills-name">{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </Reveal>
  );
}

export function ResearchPaperContent({
  minimal = true,
  abstract = false,
}: {
  minimal?: boolean;
  abstract?: boolean;
} = {}) {
  const paper = PUBLICATIONS[0];
  if (!paper) return null;
  return (
    <article className={`direction-research ${minimal ? 'direction-research-minimal' : ''}`}>
      <div className="direction-research-top">
        <span>{paper.journal.split(' ')[0]} · {paper.volume}</span>
        <span>Peer-Reviewed Publication</span>
      </div>
      <h3 className="direction-research-title">{paper.title}</h3>
      <p className="direction-research-authors">
        Ulfa Hidayati, <strong className="direction-author-self">Felix Windriyareksa Hardyan</strong>, Faizah Rizki Auliawati, Ali Akbar Rafsanjani, Fanka Arie Reza, Mario Mora Siregar
      </p>
      {!minimal && <p className="direction-research-journal">{paper.journal}</p>}
      {!minimal && <p className="direction-muted">{paper.authors}</p>}
      {!minimal && <p>{paper.summary}</p>}
      <div className="direction-paper-stats">
        {paper.stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      {abstract && !minimal && (
        <details>
          <summary>Read abstract</summary>
          <p className="direction-detail-body">
            {(paper as typeof paper & { abstract?: string }).abstract}
          </p>
        </details>
      )}
      {paper.doi && (
        <a className="direction-text-link" href={paper.doi} target="_blank" rel="noreferrer">
          <span>Read publication on JITET</span>
          <span aria-hidden="true"> ↗</span>
        </a>
      )}
    </article>
  );
}

export function CertificationsContent({
  className = '',
  pageSize = 6,
  initialLimit,
  motionPreset,
}: {
  className?: string;
  pageSize?: number;
  initialLimit?: number;
  motionPreset?: 'd1-synthesis';
} = {}) {
  const effectivePageSize = pageSize || initialLimit || 6;
  const [page, setPage] = useState(0);
  const [hasPaged, setHasPaged] = useState(false);
  const { items, hasPrev, hasNext, pageIndicator, totalPages } = getCertificationsPage(
    CERTIFICATIONS,
    page,
    effectivePageSize
  );

  return (
    <Reveal className="direction-cert-wrapper">
      <ul
        className={`direction-cert-ledger ${className}`}
        key={page}
        data-motion-preset={motionPreset}
        data-page={motionPreset ? page : undefined}
        data-page-transition={motionPreset && hasPaged ? 'settle' : undefined}
        aria-live={motionPreset ? 'polite' : undefined}
      >
        {items.map((cert, idx) => {
          const isLastVisible = idx === items.length - 1;
          const hasGhosts = items.length < effectivePageSize;
          const issuerLabel = cert.issuer.includes('BNSP')
            ? 'BNSP'
            : cert.issuer.includes('McKinsey')
            ? 'McKinsey'
            : cert.issuer.includes('Stanford')
            ? 'Stanford Online'
            : cert.issuer.includes('DeepLearning.AI')
            ? 'DeepLearning.AI'
            : cert.issuer.includes('Gunadarma')
            ? 'UG'
            : cert.issuer.includes('Brighten')
            ? 'Brighten'
            : cert.issuer;

          return (
            <li
              key={cert.title}
              className={isLastVisible && hasGhosts ? 'direction-cert-last-visible' : undefined}
              data-r="row"
              style={{ '--i': idx } as CSSProperties}
            >
              <div className="direction-cert-line">
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="direction-cert-title-link"
                  >
                    <span>{cert.title}</span>
                    <span className="direction-cert-arrow" aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="direction-cert-title">{cert.title}</span>
                )}
                <span className="direction-cert-meta">
                  {issuerLabel} · {cert.date.slice(-4)}
                </span>
              </div>
            </li>
          );
        })}
        {Array.from({ length: Math.max(0, effectivePageSize - items.length) }).map((_, idx) => (
          <li key={`ghost-${idx}`} className="direction-cert-ghost" aria-hidden="true" data-r="row" style={{ '--i': items.length + idx } as CSSProperties}>
            <div className="direction-cert-line">
              <span className="direction-cert-title">&nbsp;</span>
              <span className="direction-cert-meta">&nbsp;</span>
            </div>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="direction-cert-pager" data-r="fade" style={{ '--i': effectivePageSize } as CSSProperties}>
          <div className="direction-cert-pager-controls">
            <button
              type="button"
              className="direction-cert-pager-btn"
              onClick={() => {
                setHasPaged(true);
                setPage((p) => Math.max(0, p - 1));
              }}
              disabled={!hasPrev}
              aria-label="Previous accreditations page"
            >
              ←
            </button>
            <span className="direction-cert-pager-indicator">{pageIndicator}</span>
            <button
              type="button"
              className="direction-cert-pager-btn"
              onClick={() => {
                setHasPaged(true);
                setPage((p) => Math.min(totalPages - 1, p + 1));
              }}
              disabled={!hasNext}
              aria-label="Next accreditations page"
            >
              →
            </button>
          </div>
        </div>
      )}
    </Reveal>
  );
}

export function ResearchContent({ abstract = false }: { abstract?: boolean } = {}) {
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
