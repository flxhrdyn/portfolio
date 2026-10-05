'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DesignSwitcherPill } from '@/components/design-switcher/DesignSwitcherPill';
import {
  PROFILE,
  PROJECTS,
  WORK_ROLES,
  EDUCATION,
  SKILL_GROUPS,
  PUBLICATIONS,
  CONTACT_LINKS,
} from '@/data/portfolio-data';

export function D4Inline() {
  const paper = PUBLICATIONS[0];

  return (
    <div className="min-h-screen bg-[#fcfcfb] text-[#1a1a1a] dark:bg-[#0d0d0f] dark:text-[#f3f3f3] font-sans transition-colors duration-200">
      {/* 1. Quiet Minimal Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 dark:border-neutral-800/80 bg-[#fcfcfb]/90 dark:bg-[#0d0d0f]/90 backdrop-blur-md px-4 sm:px-10 py-3.5 flex items-center justify-between">
        <Link href="#hero" className="text-xs font-mono tracking-tight hover:opacity-70 transition-opacity">
          [ {PROFILE.name} ]
        </Link>

        <div className="flex items-center gap-3">
          <DesignSwitcherPill />
          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden sm:inline-block text-xs font-mono hover:underline underline-offset-4 text-neutral-600 dark:text-neutral-400"
          >
            [ Contact ↗ ]
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 pt-20 sm:pt-28 pb-36">
        {/* 2. Hero with Inline Portrait Badge (Givelet / Cristiana Araujo inspired) */}
        <section id="hero" className="pb-24 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-6 uppercase tracking-wider">
            <span>[ 00 · INTRO ]</span>
            <span>•</span>
            <span>JAKARTA, ID</span>
            <span>•</span>
            <span className="text-neutral-800 dark:text-neutral-200 font-semibold">[ AVAILABLE ]</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.1] text-neutral-950 dark:text-white max-w-4xl">
            Fel
            <span className="inline-block relative w-12 sm:w-16 md:w-20 h-8 sm:h-10 md:h-12 align-middle mx-2 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 shadow-xs">
              <Image
                src={PROFILE.photo}
                alt={PROFILE.photoAlt}
                fill
                sizes="(max-width: 768px) 80px, 100px"
                className="object-cover object-center filter grayscale contrast-125"
                priority
              />
            </span>
            ix Hardyan is a designer &amp; full-stack web developer who happens to build{' '}
            <span className="font-normal italic">production AI systems</span>.
          </h1>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-12 gap-6 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
            <div className="sm:col-span-8">
              <p>
                Working at the exact intersection of visual design craft and software engineering.
                Designing interfaces that feel tactile and deliberate, powered by robust full-stack
                architectures and peer-reviewed machine learning models.
              </p>
            </div>
            <div className="sm:col-span-4 flex flex-col justify-end font-mono text-xs text-neutral-500 space-y-1">
              <div>[ FOCUS: WEB_DEV &amp; UI/UX ]</div>
              <div>[ ENGINEERING: AI/ML ]</div>
              <div>[ ZERO: SUPERFICIAL GIMMICKS ]</div>
            </div>
          </div>
        </section>

        {/* 3. Selected Work (3-Column Swiss Split: Bracket Label | Content | Link) */}
        <section id="work" className="py-24 border-b border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-3">
              <span className="text-xs font-mono text-neutral-500 sticky top-20 block">
                [ 01 · Projects({PROJECTS.length}) ]
              </span>
            </div>
            <div className="md:col-span-9">
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 dark:text-white mb-2">
                Selected Work &amp; Interactive Systems
              </h2>
              <p className="text-sm text-neutral-500 font-light max-w-xl">
                Each project represents complete craftsmanship: from visual ergonomics to backend data pipelines.
              </p>
            </div>
          </div>

          <div className="space-y-16">
            {PROJECTS.map((proj, idx) => (
              <div
                key={proj.slug}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80"
              >
                <div className="md:col-span-3 font-mono text-xs text-neutral-400">
                  <span>0{idx + 1} [•]</span>
                </div>

                <div className="md:col-span-7">
                  <h3 className="text-2xl font-light tracking-tight text-neutral-950 dark:text-white mb-3">
                    {proj.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-6">
                    {proj.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 flex md:justify-end items-start">
                  {proj.repo && (
                    <a
                      href={`https://github.com/flxhrdyn/${proj.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-neutral-900 dark:text-white hover:underline underline-offset-4 inline-flex items-center gap-1"
                    >
                      [ Repo ↗ ]
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Experience & Education Split */}
        <section id="experience" className="py-24 border-b border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-3">
              <span className="text-xs font-mono text-neutral-500 sticky top-20 block">
                [ 02 · Career ]
              </span>
            </div>
            <div className="md:col-span-9">
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 dark:text-white">
                Trajectory &amp; Milestones
              </h2>
            </div>
          </div>

          <div className="space-y-10">
            {WORK_ROLES.map((role, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80"
              >
                <div className="md:col-span-3 text-xs font-mono text-neutral-400">
                  [ {role.date} ]
                </div>
                <div className="md:col-span-4">
                  <h4 className="text-base font-medium text-neutral-900 dark:text-white">
                    {role.title}
                  </h4>
                  <p className="text-xs font-mono text-neutral-500 mt-0.5">{role.company}</p>
                </div>
                <div className="md:col-span-5 text-sm text-neutral-600 dark:text-neutral-400 font-light">
                  {role.headline || (role.description && role.description[0])}
                </div>
              </div>
            ))}

            {EDUCATION.map((edu, idx) => (
              <div
                key={`edu-${idx}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80"
              >
                <div className="md:col-span-3 text-xs font-mono text-neutral-400">
                  [ {edu.date} ]
                </div>
                <div className="md:col-span-4">
                  <h4 className="text-base font-medium text-neutral-900 dark:text-white">
                    {edu.title}
                  </h4>
                  <p className="text-xs font-mono text-neutral-500 mt-0.5">{edu.company}</p>
                </div>
                <div className="md:col-span-5 text-sm text-neutral-600 dark:text-neutral-400 font-light">
                  {edu.statLabel}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Scientific Paper & Accuracy Validation */}
        {paper && (
          <section id="research" className="py-24 border-b border-neutral-200 dark:border-neutral-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
              <div className="md:col-span-3">
                <span className="text-xs font-mono text-neutral-500 sticky top-20 block">
                  [ 03 · Proof ]
                </span>
              </div>
              <div className="md:col-span-9">
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 dark:text-white">
                  Academic Publication &amp; Proof
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80">
              <div className="md:col-span-3 text-xs font-mono text-neutral-400">
                [ 89.60% TEST ACCURACY ]
              </div>
              <div className="md:col-span-9">
                <h3 className="text-xl font-normal text-neutral-900 dark:text-white mb-2">
                  {paper.title}
                </h3>
                <p className="text-xs font-mono text-neutral-500 mb-4">
                  {paper.journal} • {paper.volume}
                </p>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-6">
                  {paper.summary}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  {paper.stats.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-neutral-100/70 dark:bg-neutral-900/50">
                      <span className="text-2xl font-light font-mono text-neutral-900 dark:text-white block">
                        {s.value}
                      </span>
                      <span className="text-xs text-neutral-500 block mt-1">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. Competencies & Skills */}
        <section id="skills" className="py-24 border-b border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
            <div className="md:col-span-3">
              <span className="text-xs font-mono text-neutral-500 sticky top-20 block">
                [ 04 · Skills ]
              </span>
            </div>
            <div className="md:col-span-9">
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 dark:text-white">
                Technical Competencies
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80">
            {SKILL_GROUPS.map((grp) => (
              <div key={grp.category}>
                <h4 className="text-xs font-mono uppercase text-neutral-400 mb-3">
                  [ {grp.category} ]
                </h4>
                <ul className="space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300 font-light">
                  {grp.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Contact Split */}
        <section id="contact" className="pt-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <span className="text-xs font-mono text-neutral-500 sticky top-20 block">
                [ 05 · Contact ]
              </span>
            </div>
            <div className="md:col-span-9">
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-neutral-950 dark:text-white mb-6">
                Let&apos;s build something meaningful.
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-400 font-light max-w-xl mb-8">
                Available for full-stack engineering roles, design systems, and AI consulting.
              </p>

              <div className="mb-10">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-xl sm:text-2xl font-mono text-neutral-900 dark:text-white hover:underline underline-offset-4"
                >
                  {PROFILE.email}
                </a>
              </div>

              <div className="flex flex-wrap gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-4 text-neutral-600 dark:text-neutral-400"
                  >
                    [ {link.label} ↗ ]
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200/80 dark:border-neutral-800/80 py-6 px-4 sm:px-10 text-xs font-mono text-neutral-400 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>[ {PROFILE.name.toUpperCase()} · 2026 EDITION ]</div>
        <a href="#hero" className="hover:text-neutral-900 dark:hover:text-white">
          [ Back to Top ↑ ]
        </a>
      </footer>
    </div>
  );
}

export default D4Inline;
