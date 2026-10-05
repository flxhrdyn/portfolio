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
  CERTIFICATIONS,
  CONTACT_LINKS,
} from '@/data/portfolio-data';

export function D1Ledger() {
  const paper = PUBLICATIONS[0];

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] dark:bg-[#0c0c0e] dark:text-[#f2f2f2] font-sans transition-colors duration-200">
      {/* 1. Header with Persistent Switcher */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-[#fafaf9]/90 dark:bg-[#0c0c0e]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="#hero" className="group flex items-baseline gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              FLX/26
            </span>
            <span className="text-sm font-medium tracking-tight group-hover:opacity-70 transition-opacity">
              {PROFILE.name}
            </span>
          </Link>
          <span className="hidden md:inline-block text-xs font-mono text-neutral-400 dark:text-neutral-600">
            / {PROFILE.location}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <DesignSwitcherPill />
          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            Say Hello ↗
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-32">
        {/* 2. Hero Section (Tactile Oversized Typography) */}
        <section id="hero" className="border-b border-neutral-200 dark:border-neutral-800 pb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            Available for Design & Full-Stack Engineering
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] max-w-4xl text-neutral-900 dark:text-white">
            Designer & full-stack web developer who happens to build{' '}
            <span className="font-normal italic">production AI/ML systems</span>.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl font-light leading-relaxed">
            Crafting tactile web interfaces, design systems, and resilient full-stack applications
            with the depth of machine learning and research-backed engineering.
          </p>

          {/* 3-Up Arrow Index (Tacto / Hans Sleutelaar inspired) */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-neutral-200 dark:border-neutral-800 pt-6">
            <a
              href="#selected-work"
              className="group p-3 -mx-3 rounded-lg hover:bg-neutral-100/70 dark:hover:bg-neutral-900/50 transition-colors"
            >
              <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 block mb-1">
                ↘ 01
              </span>
              <span className="text-sm font-medium tracking-tight group-hover:underline underline-offset-4">
                Selected Work ({PROJECTS.length})
              </span>
            </a>
            <a
              href="#experience"
              className="group p-3 -mx-3 rounded-lg hover:bg-neutral-100/70 dark:hover:bg-neutral-900/50 transition-colors"
            >
              <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 block mb-1">
                ↘ 02
              </span>
              <span className="text-sm font-medium tracking-tight group-hover:underline underline-offset-4">
                Chronological Ledger
              </span>
            </a>
            <a
              href="#research-paper"
              className="group p-3 -mx-3 rounded-lg hover:bg-neutral-100/70 dark:hover:bg-neutral-900/50 transition-colors"
            >
              <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 block mb-1">
                ↘ 03
              </span>
              <span className="text-sm font-medium tracking-tight group-hover:underline underline-offset-4">
                Research & Proof ({paper ? '89.60%' : 'Paper'})
              </span>
            </a>
          </div>
        </section>

        {/* 3. Selected Work (Hairline Ledger Rows) */}
        <section id="selected-work" className="pt-20 border-b border-neutral-200 dark:border-neutral-800 pb-20">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 gap-2">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                01 / Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight mt-1 text-neutral-900 dark:text-white">
                Selected Work & Systems
              </h2>
            </div>
            <p className="text-xs font-mono text-neutral-500 max-w-xs">
              Systems designed for real users, accurate retrieval, and measurable production impact.
            </p>
          </div>

          <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
            {PROJECTS.map((proj, idx) => (
              <article
                key={proj.slug}
                className="group py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-neutral-100/50 dark:hover:bg-neutral-900/40 -mx-4 sm:-mx-6 px-4 sm:px-6 transition-colors rounded-lg"
              >
                <div className="md:col-span-1 font-mono text-xs text-neutral-400 dark:text-neutral-500 pt-1">
                  0{idx + 1}
                </div>

                <div className="md:col-span-5">
                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-900 dark:text-white group-hover:underline underline-offset-4">
                    <a href={proj.repo ? `https://github.com/flxhrdyn/${proj.repo}` : '#'} target="_blank" rel="noopener noreferrer">
                      {proj.title}
                    </a>
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-6 flex flex-col justify-between h-full">
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                    {proj.summary}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    {proj.repo && (
                      <a
                        href={`https://github.com/flxhrdyn/${proj.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-white hover:underline underline-offset-4 inline-flex items-center gap-1"
                      >
                        Source Code ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. Experience & Education (Chronological Ledger) */}
        <section id="experience" className="pt-20 border-b border-neutral-200 dark:border-neutral-800 pb-20">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              02 / Chronology
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight mt-1 text-neutral-900 dark:text-white">
              Experience & Academic Milestones
            </h2>
          </div>

          <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
            {WORK_ROLES.map((role, i) => (
              <div
                key={i}
                className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline hover:bg-neutral-100/40 dark:hover:bg-neutral-900/30 -mx-4 sm:-mx-6 px-4 sm:px-6 transition-colors rounded-lg"
              >
                <div className="sm:col-span-3 font-mono text-xs text-neutral-400 dark:text-neutral-500">
                  {role.date}
                </div>
                <div className="sm:col-span-4">
                  <h3 className="text-base sm:text-lg font-medium tracking-tight text-neutral-900 dark:text-white">
                    {role.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-500">{role.company}</p>
                </div>
                <div className="sm:col-span-5 text-sm text-neutral-600 dark:text-neutral-400 font-light">
                  {role.headline || (role.description && role.description[0])}
                </div>
              </div>
            ))}

            {EDUCATION.map((edu, i) => (
              <div
                key={`edu-${i}`}
                className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline hover:bg-neutral-100/40 dark:hover:bg-neutral-900/30 -mx-4 sm:-mx-6 px-4 sm:px-6 transition-colors rounded-lg"
              >
                <div className="sm:col-span-3 font-mono text-xs text-neutral-400 dark:text-neutral-500">
                  {edu.date}
                </div>
                <div className="sm:col-span-4">
                  <h3 className="text-base sm:text-lg font-medium tracking-tight text-neutral-900 dark:text-white">
                    {edu.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-500">{edu.company}</p>
                </div>
                <div className="sm:col-span-5 text-sm text-neutral-600 dark:text-neutral-400 font-light">
                  {edu.statLabel}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Peer-Reviewed Research & Technical Proof */}
        {paper && (
          <section id="research-paper" className="pt-20 border-b border-neutral-200 dark:border-neutral-800 pb-20">
            <div className="mb-10">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                03 / Peer-Reviewed Research
              </span>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight mt-1 text-neutral-900 dark:text-white">
                Academic Publication & Accuracy Proof
              </h2>
            </div>

            <div className="p-6 sm:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/60 shadow-xs">
              <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-mono text-neutral-500">
                <span className="px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 uppercase">
                  {paper.kind}
                </span>
                <span>• {paper.journal} ({paper.volume})</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-900 dark:text-white mb-3">
                {paper.title}
              </h3>

              <p className="text-xs font-mono text-neutral-500 mb-6">
                Authors: {paper.authors}
              </p>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-8 max-w-3xl">
                {paper.summary}
              </p>

              {/* Real Metric Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                {paper.stats.map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-neutral-100/60 dark:bg-neutral-900/60">
                    <span className="text-2xl sm:text-3xl font-light tracking-tight font-mono text-neutral-900 dark:text-white block">
                      {stat.value}
                    </span>
                    <span className="text-xs text-neutral-500 mt-1 block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Skills & Technical Capabilities */}
        <section id="skills" className="pt-20 border-b border-neutral-200 dark:border-neutral-800 pb-20">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              04 / Technical Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight mt-1 text-neutral-900 dark:text-white">
              Competencies & Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.category}
                className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/30"
              >
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm font-light text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-neutral-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Contact & Address-Style Single-Letter Footer */}
        <section id="contact" className="pt-20">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              05 / Transmission
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight mt-2 text-neutral-900 dark:text-white">
              Say hello. Let&apos;s build together.
            </h2>
            <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400 font-light max-w-xl">
              Open for design inquiries, engineering collaborations, and full-time technical leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-neutral-200 dark:border-neutral-800">
            {/* [A] Address */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-white block">
                [ A ] LOCATION
              </span>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light">
                {PROFILE.location}
              </p>
              <p className="text-xs font-mono text-neutral-400">Timezone: UTC+7 (WIB)</p>
            </div>

            {/* [T] Transmission / Contact */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-white block">
                [ T ] DIRECT
              </span>
              <p className="text-sm font-mono">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="hover:underline underline-offset-4 text-neutral-900 dark:text-white"
                >
                  {PROFILE.email}
                </a>
              </p>
              <p className="text-xs text-neutral-500">PGP / Encrypted upon request</p>
            </div>

            {/* [S] Social Links */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-white block">
                [ S ] NETWORK
              </span>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-mono">
                {CONTACT_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:underline underline-offset-4"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-400 gap-4">
            <div>
              © 2026 {PROFILE.name.toUpperCase()} • CRAFTED WITH ZERO GIMMICKS
            </div>
            <a href="#hero" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Back to Top ↑
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default D1Ledger;
