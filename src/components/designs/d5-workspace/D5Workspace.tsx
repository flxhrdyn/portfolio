'use client';

import React, { useState } from 'react';
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

export function D5Workspace() {
  const [openProject, setOpenProject] = useState<string | null>(PROJECTS[0]?.slug || null);
  const paper = PUBLICATIONS[0];

  const toggleProject = (slug: string) => {
    setOpenProject((prev) => (prev === slug ? null : slug));
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] font-sans selection:bg-white selection:text-black pb-36">
      {/* 1. Minimal Workspace Top Bar */}
      <header className="border-b border-neutral-800/90 px-4 sm:px-8 py-3.5 flex items-center justify-between text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white inline-block" />
          <span className="text-white font-medium">workspace://felix-hardyan</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-neutral-500">
            LOC: JAKARTA // AVAILABLE
          </span>
          <a
            href={`mailto:${PROFILE.email}`}
            className="hover:text-white uppercase transition-colors"
          >
            [ email ↗ ]
          </a>
        </div>
      </header>

      {/* 2. Hero Section (UNIX Path Header & Bold Typographic Intro) */}
      <section id="hero" className="max-w-6xl mx-auto px-4 sm:px-8 pt-20 sm:pt-28 pb-20">
        <div className="font-mono text-xs text-neutral-500 mb-6 flex items-center gap-2">
          <span className="text-neutral-300">~/profile</span>
          <span>•</span>
          <span>edition_2026</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase leading-[1.04] max-w-4xl text-white">
          Designer &amp; Full-Stack Web Developer.
          <span className="block text-neutral-400 font-light mt-2 text-3xl sm:text-5xl md:text-6xl normal-case">
            Who happens to engineer production AI.
          </span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
          I build high-polish digital products, design systems, and responsive web platforms
          anchored in quantitative ML engineering.
        </p>
      </section>

      {/* 3. Section Alternating Interlude: Light Workspace Desk for Selected Projects */}
      <section id="projects" className="bg-[#f5f5f4] text-[#1c1917] py-24 px-4 sm:px-8 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-neutral-300 pb-6 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-1">
                ~/projects ({PROJECTS.length})
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Interactive Project Drawers
              </h2>
            </div>
            <p className="font-mono text-xs text-neutral-500">
              [ CLICK ROW TO EXPAND WORKSPACE DRAWER ]
            </p>
          </div>

          {/* Interactive Drawer Rows (Rifqi Sakha inspired) */}
          <div className="divide-y divide-neutral-300 border-y border-neutral-300">
            {PROJECTS.map((proj, idx) => {
              const isOpen = openProject === proj.slug;

              return (
                <div key={proj.slug} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleProject(proj.slug)}
                    aria-expanded={isOpen}
                    className="w-full py-6 sm:py-8 flex items-center justify-between text-left group cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-8">
                      <span className="font-mono text-xs text-neutral-400">
                        0{idx + 1}
                      </span>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 group-hover:underline underline-offset-4">
                          {proj.title}
                        </h3>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {proj.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-neutral-300 bg-white text-neutral-600"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="font-mono text-sm text-neutral-500 group-hover:text-neutral-900 px-3">
                      {isOpen ? '[ - COLLAPSE ]' : '[ + EXPAND ]'}
                    </div>
                  </button>

                  {/* Expandable Drawer Details */}
                  {isOpen && (
                    <div className="pb-8 pt-2 px-4 sm:px-12 bg-white/70 rounded-xl mb-4 border border-neutral-200">
                      <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed mb-6 max-w-3xl">
                        {proj.summary}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-neutral-200">
                        {proj.repo && (
                          <a
                            href={`https://github.com/flxhrdyn/${proj.repo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs uppercase px-4 py-2 bg-black text-white hover:bg-neutral-800 transition-colors rounded-sm"
                          >
                            Explore Source Code [↗]
                          </a>
                        )}
                        <span className="font-mono text-xs text-neutral-500">
                          STATUS: VERIFIED &amp; PRODUCTION_READY
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Experience & Career Ledger */}
      <section id="experience" className="max-w-6xl mx-auto px-4 sm:px-8 py-24 border-b border-neutral-800">
        <div className="font-mono text-xs text-neutral-500 mb-8">
          ~/career-ledger
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-10">
          Professional Trajectory
        </h2>

        <div className="space-y-6">
          {WORK_ROLES.map((r, i) => (
            <div
              key={i}
              className="p-6 border border-neutral-800 bg-neutral-950/60 rounded-lg flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="md:w-1/3">
                <span className="font-mono text-xs text-neutral-500 block mb-1">
                  {r.date}
                </span>
                <h4 className="text-lg font-bold text-white">{r.title}</h4>
                <p className="font-mono text-xs text-neutral-400 mt-0.5">{r.company}</p>
              </div>
              <div className="md:w-2/3 text-sm text-neutral-400 font-light leading-relaxed">
                {r.headline || (r.description && r.description[0])}
              </div>
            </div>
          ))}

          {EDUCATION.map((edu, i) => (
            <div
              key={`edu-${i}`}
              className="p-6 border border-neutral-800 bg-neutral-950/60 rounded-lg flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="md:w-1/3">
                <span className="font-mono text-xs text-neutral-500 block mb-1">
                  {edu.date}
                </span>
                <h4 className="text-lg font-bold text-white">{edu.title}</h4>
                <p className="font-mono text-xs text-neutral-400 mt-0.5">{edu.company}</p>
              </div>
              <div className="md:w-2/3 text-sm text-neutral-400 font-light leading-relaxed">
                {edu.statLabel}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Research & Academic Proof Section */}
      {paper && (
        <section id="research" className="max-w-6xl mx-auto px-4 sm:px-8 py-24 border-b border-neutral-800">
          <div className="font-mono text-xs text-neutral-500 mb-6">
            ~/research-proof
          </div>
          <div className="border border-neutral-800 p-6 sm:p-10 rounded-xl bg-neutral-950/80">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">
              PEER-REVIEWED PUBLICATION • {paper.journal}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {paper.title}
            </h3>
            <p className="text-xs font-mono text-neutral-500 mb-6">AUTHORS: {paper.authors}</p>
            <p className="text-neutral-400 font-light text-base leading-relaxed mb-8 max-w-3xl">
              {paper.summary}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-800 font-mono">
              {paper.stats.map((s, idx) => (
                <div key={idx} className="p-4 border border-neutral-800/80 bg-black/60 rounded-lg">
                  <span className="text-3xl font-bold text-white block">{s.value}</span>
                  <span className="text-xs text-neutral-500 block mt-1">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Capabilities Taxonomy */}
      <section id="skills" className="max-w-6xl mx-auto px-4 sm:px-8 py-24 border-b border-neutral-800">
        <div className="font-mono text-xs text-neutral-500 mb-6">
          ~/capabilities
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((grp) => (
            <div key={grp.category} className="border border-neutral-800 p-6 rounded-lg bg-neutral-950/40">
              <h4 className="font-mono text-xs uppercase text-neutral-400 mb-4 pb-2 border-b border-neutral-800">
                {grp.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {grp.items.map((i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-2.5 py-1 rounded-sm border border-neutral-800 text-neutral-300"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Contact Endpoint */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-8 py-24">
        <div className="font-mono text-xs text-neutral-500 mb-4">~/connect</div>
        <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-6">
          Let&apos;s build next-generation software.
        </h2>
        <p className="text-lg text-neutral-400 font-light max-w-xl mb-8">
          Available for full-stack engineering, design systems, and AI architecture consulting.
        </p>
        <div className="mb-8">
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-xl sm:text-2xl font-mono text-white hover:underline underline-offset-4"
          >
            {PROFILE.email}
          </a>
        </div>
        <div className="flex flex-wrap gap-4 font-mono text-xs">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 border border-neutral-800 hover:border-neutral-500 text-neutral-300 transition-colors"
            >
              [ {link.label} ↗ ]
            </a>
          ))}
        </div>
      </section>

      {/* 8. Floating Bottom Workspace Dock (Rifqi + Avec Anni inspired) */}
      <nav
        aria-label="Workspace dock"
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-3 py-2 rounded-full border border-neutral-700 bg-neutral-900/90 backdrop-blur-lg shadow-2xl text-xs font-mono"
      >
        <div className="hidden sm:flex items-center gap-1 text-neutral-400 pr-2 border-r border-neutral-700">
          <Link href="#hero" className="hover:text-white px-2 py-1 rounded-full hover:bg-neutral-800 transition-colors">
            ~
          </Link>
          <Link href="#projects" className="hover:text-white px-2 py-1 rounded-full hover:bg-neutral-800 transition-colors">
            projects
          </Link>
          <Link href="#experience" className="hover:text-white px-2 py-1 rounded-full hover:bg-neutral-800 transition-colors">
            career
          </Link>
          <Link href="#contact" className="hover:text-white px-2 py-1 rounded-full hover:bg-neutral-800 transition-colors">
            contact
          </Link>
        </div>

        {/* Integrated Switcher Pill inside the Dock */}
        <DesignSwitcherPill />
      </nav>
    </div>
  );
}

export default D5Workspace;
