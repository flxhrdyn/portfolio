'use client';

import React, { useEffect, useState } from 'react';
import { DesignSwitcherPill } from '@/components/design-switcher/DesignSwitcherPill';
import {
  PROFILE,
  PROJECTS,
  FEATURED_PROJECT,
  WORK_ROLES,
  EDUCATION,
  SKILL_GROUPS,
  PUBLICATIONS,
  CONTACT_LINKS,
} from '@/data/portfolio-data';

export function D2Architectural() {
  const [jktTime, setJktTime] = useState<string>('00:00:00 WIB');
  const [utcTime, setUtcTime] = useState<string>('00:00:00 UTC');
  const paper = PUBLICATIONS[0];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setJktTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Jakarta',
          hour12: false,
        }) + ' WIB'
      );
      setUtcTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour12: false,
        }) + ' UTC'
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const otherProjects = PROJECTS.filter((p) => p.slug !== FEATURED_PROJECT.slug);

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#111111] dark:bg-[#0a0a0a] dark:text-[#f0f0f0] p-2 sm:p-4 font-mono transition-colors duration-200">
      {/* Viewport Architectural Inset Frame (2xA Studio inspired) */}
      <div className="min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-2rem)] border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#0f0f0f] flex flex-col justify-between shadow-xs">
        {/* 1. Architectural Meta Bar */}
        <header className="border-b border-neutral-300 dark:border-neutral-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-widest uppercase">
              {'ARCH-FRAME // 02'}
            </span>
            <span className="hidden md:inline text-neutral-400 dark:text-neutral-600">|</span>
            <span className="hidden md:inline text-neutral-500">
              JKT: {jktTime}
            </span>
            <span className="hidden lg:inline text-neutral-400 dark:text-neutral-600">|</span>
            <span className="hidden lg:inline text-neutral-500">
              UTC: {utcTime}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <DesignSwitcherPill />
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-xs uppercase tracking-wider px-3 py-1 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Contact_Me [↗]
            </a>
          </div>
        </header>

        {/* 2. Main Architectural Canvas */}
        <main className="flex-1 px-4 sm:px-8 py-10 sm:py-16 max-w-7xl mx-auto w-full">
          {/* Hero Section */}
          <section className="border-b border-neutral-300 dark:border-neutral-800 pb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                  [ SPECIFICATION : PORTFOLIO_V2 ]
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tighter uppercase leading-[1.05] text-neutral-900 dark:text-white">
                  {PROFILE.name}
                </h1>
              </div>
              <div className="text-right font-mono text-xs text-neutral-500 max-w-xs md:text-right text-left">
                SYSTEM ID: FLX-2026-ENG
                <br />
                ROLE: FULL-STACK &amp; UI/UX [AI_ML]
                <br />
                STATUS: AVAILABLE_FOR_HIRE
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <div className="md:col-span-8">
                <p className="font-sans text-xl sm:text-2xl font-light leading-relaxed text-neutral-800 dark:text-neutral-200">
                  Full-stack web developer and interaction designer crafting high-polish web architectures,
                  backed by production-grade deep learning and RAG systems.
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col justify-end text-xs font-mono text-neutral-500 space-y-1">
                <div>{'// CRAFT: ZERO GIMMICKS'}</div>
                <div>{'// FRAMEWORK: NEXT.JS + FASTAPI'}</div>
                <div>{'// ACCURACY: 89.60% PEER-REVIEWED'}</div>
              </div>
            </div>
          </section>

          {/* 3. Asymmetric Project Grid (2xA + Studio Merge Style) */}
          <section className="pt-16 pb-16 border-b border-neutral-300 dark:border-neutral-800">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-xs uppercase tracking-widest text-neutral-400">
                {'// 01_SELECTED_ARCHITECTURES'} ({PROJECTS.length})
              </h2>
              <span className="text-xs text-neutral-500">
                GRID_FORMAT: ASYMMETRIC_SHOWCASE
              </span>
            </div>

            {/* Featured Showcase Tile (Full Width Hero Card) */}
            {FEATURED_PROJECT && (
              <div className="border border-neutral-300 dark:border-neutral-800 p-6 sm:p-8 mb-6 bg-neutral-50/50 dark:bg-neutral-900/30">
                <div className="flex flex-col lg:flex-row justify-between gap-6 mb-6">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
                      FLAGSHIP ARCHITECTURE
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight mt-3 text-neutral-900 dark:text-white">
                      {FEATURED_PROJECT.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {FEATURED_PROJECT.repo && (
                      <a
                        href={`https://github.com/flxhrdyn/${FEATURED_PROJECT.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase px-3 py-1.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold tracking-wider hover:opacity-80 transition-opacity"
                      >
                        Source_Code [↗]
                      </a>
                    )}
                  </div>
                </div>

                <p className="font-sans text-base text-neutral-700 dark:text-neutral-300 font-light leading-relaxed max-w-4xl mb-6">
                  {FEATURED_PROJECT.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  {FEATURED_PROJECT.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Asymmetric 2-Column Supporting Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((p, idx) => (
                <div
                  key={p.slug}
                  className="border border-neutral-300 dark:border-neutral-800 p-6 flex flex-col justify-between bg-white dark:bg-neutral-950"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] text-neutral-400">
                        MOD_0{idx + 2}
                      </span>
                      {p.repo && (
                        <a
                          href={`https://github.com/flxhrdyn/${p.repo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs hover:underline text-neutral-700 dark:text-neutral-300"
                        >
                          REPO [↗]
                        </a>
                      )}
                    </div>
                    <h4 className="text-xl font-sans font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">
                      {p.title}
                    </h4>
                    <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-4">
                      {p.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 border border-neutral-200 dark:border-neutral-800 text-neutral-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Experience & Chronology Table */}
          <section className="pt-16 pb-16 border-b border-neutral-300 dark:border-neutral-800">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-8">
              {'// 02_CAREER_TRAJECTORY'}
            </h2>

            <div className="border border-neutral-300 dark:border-neutral-800 divide-y divide-neutral-300 dark:divide-neutral-800">
              {WORK_ROLES.map((r, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline"
                >
                  <div className="sm:col-span-3 text-xs text-neutral-400">
                    [{r.date}]
                  </div>
                  <div className="sm:col-span-4">
                    <span className="font-sans font-semibold text-neutral-900 dark:text-white block">
                      {r.title}
                    </span>
                    <span className="text-xs text-neutral-500">{r.company}</span>
                  </div>
                  <div className="sm:col-span-5 font-sans text-xs text-neutral-600 dark:text-neutral-400 font-light">
                    {r.headline || (r.description && r.description[0])}
                  </div>
                </div>
              ))}

              {EDUCATION.map((edu, i) => (
                <div
                  key={`edu-${i}`}
                  className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline bg-neutral-50/50 dark:bg-neutral-900/20"
                >
                  <div className="sm:col-span-3 text-xs text-neutral-400">
                    [{edu.date}]
                  </div>
                  <div className="sm:col-span-4">
                    <span className="font-sans font-semibold text-neutral-900 dark:text-white block">
                      {edu.title}
                    </span>
                    <span className="text-xs text-neutral-500">{edu.company}</span>
                  </div>
                  <div className="sm:col-span-5 font-sans text-xs text-neutral-600 dark:text-neutral-400 font-light">
                    {edu.statLabel}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Scientific Paper Matrix */}
          {paper && (
            <section className="pt-16 pb-16 border-b border-neutral-300 dark:border-neutral-800">
              <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-6">
                {'// 03_PEER_REVIEWED_RESEARCH'}
              </h2>

              <div className="border border-neutral-300 dark:border-neutral-800 p-6 sm:p-8 bg-white dark:bg-neutral-950">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 border border-neutral-200 dark:border-neutral-800 px-2 py-0.5">
                    {paper.journal} • {paper.volume}
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    VALIDATED // 89.60% TEST ACCURACY
                  </span>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  {paper.title}
                </h3>
                <p className="text-xs text-neutral-500 mb-6">AUTHORS: {paper.authors}</p>
                <p className="font-sans text-sm text-neutral-700 dark:text-neutral-300 font-light leading-relaxed mb-6">
                  {paper.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                  {paper.stats.map((s, idx) => (
                    <div key={idx} className="border border-neutral-200 dark:border-neutral-800 p-3">
                      <span className="text-2xl font-bold block text-neutral-900 dark:text-white">
                        {s.value}
                      </span>
                      <span className="text-[11px] text-neutral-500 block mt-1">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 6. Skills Grid */}
          <section className="pt-16 pb-16 border-b border-neutral-300 dark:border-neutral-800">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-6">
              {'// 04_CORE_SYSTEM_COMPETENCIES'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SKILL_GROUPS.map((grp) => (
                <div
                  key={grp.category}
                  className="border border-neutral-300 dark:border-neutral-800 p-4"
                >
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-white uppercase mb-3 pb-1 border-b border-neutral-200 dark:border-neutral-800">
                    {grp.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.items.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] px-2 py-0.5 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Contact Transmission */}
          <section className="pt-16">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-6">
              {'// 05_ENDPOINT_TRANSMISSION'}
            </h2>

            <div className="border border-neutral-300 dark:border-neutral-800 p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white">
                  INITIATE_CONTACT
                </h3>
                <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 font-light mt-1">
                  Open for full-stack engineering roles, design systems, and AI consulting.
                </p>
                <div className="mt-4">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-base sm:text-lg font-mono font-bold hover:underline text-neutral-900 dark:text-white"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase px-3 py-2 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors"
                  >
                    {link.label} [↗]
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* 8. Bottom Inset Frame Footer */}
        <footer className="border-t border-neutral-300 dark:border-neutral-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between text-[11px] text-neutral-500 font-mono gap-2">
          <div>CANVAS: INSET_16PX // BUILD_2026 // MONOCHROME</div>
          <div>{PROFILE.name.toUpperCase()} • FULL-STACK &amp; DESIGN</div>
        </footer>
      </div>
    </div>
  );
}

export default D2Architectural;
