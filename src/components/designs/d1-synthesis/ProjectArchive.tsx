'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import archiveProjects from '@/content/archive-projects.json';

export function ProjectArchive() {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const originalOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])'
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

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (previousActiveElement?.isConnected) previousActiveElement.focus();
    };
  }, [isOpen]);

  return (
    <>
      <div className="d1-project-archive-trigger-wrap">
        <button
          type="button"
          className="d1-project-archive-trigger"
          aria-haspopup="dialog"
          aria-controls="d1-project-archive-dialog"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
        >
          <span>View all projects</span>
          <svg className="d1-project-archive-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {mounted && isOpen && createPortal(
        <div
          className="direction direction-modal-backdrop d1-project-archive-backdrop"
          id="d1-project-archive-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="d1-project-archive-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div className="direction-modal-panel d1-project-archive-panel" ref={panelRef}>
            <div className="direction-modal-header">
              <span className="direction-modal-meta">Projects / Index</span>
              <button ref={closeRef} type="button" className="direction-modal-close" onClick={() => setIsOpen(false)}>
                Close [Esc]
              </button>
            </div>

            <div className="direction-modal-body d1-project-archive-body">
              <div className="d1-project-archive-heading">
                <h2 id="d1-project-archive-title">All projects</h2>
                <span>{String(archiveProjects.length).padStart(2, '0')} projects</span>
              </div>

              <table className="d1-project-archive-table" aria-label="All portfolio projects">
                <thead>
                  <tr>
                    <th scope="col">Project</th>
                    <th scope="col">Focus</th>
                    <th scope="col">Primary stack</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {archiveProjects.map((project) => {
                    return (
                      <tr key={project.name}>
                        <td data-label="Project">
                          {project.repo ? (
                            <a href={`https://github.com/flxhrdyn/${project.repo}`} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} on GitHub (opens in a new tab)`}>
                              {project.name}
                              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M5 3h8v8M13 3 6 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </a>
                          ) : project.name}
                        </td>
                        <td data-label="Focus">{project.category}</td>
                        <td data-label="Primary stack">{project.stack}</td>
                        <td data-label="Status" data-status={project.statusColor}>{project.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
