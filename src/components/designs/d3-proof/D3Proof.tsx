'use client';

import React from 'react';
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

export function D3Proof() {
  const paper = PUBLICATIONS[0];

  // Verified benchmark data from published research
  const BENCHMARKS = [
    { model: 'MobileNetV2 (Fine-Tuned)', accuracy: 89.6, label: '89.60%', highlight: true, note: 'Best Accuracy / Low Latency' },
    { model: 'CoralNet Baseline', accuracy: 86.88, label: '86.88%', highlight: false, note: 'Domain Baseline' },
    { model: 'InceptionV3 Backbone', accuracy: 83.12, label: '83.12%', highlight: false, note: 'Standard Deep CNN' },
  ];

  const SYSTEM_METRICS = [
    { metric: '93.67%', label: 'LUCIAN Test Accuracy', detail: 'ConvNeXt-Base on LC25000 histopathology' },
    { metric: '0.90', label: 'RAG Cache Cosine Threshold', detail: 'Dual-layer semantic caching in InvenioAI' },
    { metric: '89.60%', label: 'Peer-Reviewed Accuracy', detail: 'Published IEEE/Scopus coral classification' },
    { metric: '100% CPU', label: 'Local ONNX Inference', detail: 'Zero GPU dependency for Amon Hen retrieval' },
  ];

  return (
    <div className="min-h-screen bg-[#0e0e11] text-[#e4e4e7] font-mono selection:bg-neutral-700 selection:text-white pb-32">
      {/* 1. Terminal Window Header (Typesafe / Grids inspired) */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-[#0e0e11]/95 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
          </div>
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold pl-2 border-l border-neutral-800">
            PROOF_SHEET // V3.0
          </span>
        </div>

        <div className="flex items-center gap-4">
          <DesignSwitcherPill />
          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden sm:inline-flex text-xs uppercase px-2.5 py-1 border border-neutral-700 hover:border-neutral-500 text-neutral-300 transition-colors"
          >
            PING_ENGINEER [↗]
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-12 sm:pt-16">
        {/* 2. Hero Proof Header */}
        <section className="border border-neutral-800 bg-neutral-900/40 p-6 sm:p-10 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-neutral-500 border-b border-neutral-800 pb-4">
            <div>SUBJECT: {PROFILE.name.toUpperCase()}</div>
            <div>VERIFICATION: PEER_REVIEWED_RESEARCH + PRODUCTION_SHIPPED</div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-sans font-light tracking-tight text-white mb-4">
            Designer &amp; Full-Stack Web Developer{' '}
            <span className="text-neutral-500 font-mono text-xl sm:text-3xl block sm:inline">
              [+ Applied AI/ML Engineer]
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-3xl mb-8">
            Building rigorous, agency-grade web systems and user experiences backed by verified machine
            learning architectures, empirical evaluations, and quantitative production metrics.
          </p>

          {/* Proof Metric Strips */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-neutral-800">
            {SYSTEM_METRICS.map((item, i) => (
              <div key={i} className="p-3.5 border border-neutral-800 bg-black/40">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
                  {item.metric}
                </div>
                <div className="text-xs font-semibold text-neutral-300 mt-1">
                  {item.label}
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5 leading-tight">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Empirical Research Benchmark Comparison (Typesafe Style) */}
        <section className="border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-neutral-800 pb-4">
            <div>
              <span className="text-xs text-neutral-500 uppercase tracking-widest block">
                EMPIRICAL EVALUATION MATRIX
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-sans mt-0.5">
                Backbone Accuracy Comparison (Held-Out Test Split)
              </h2>
            </div>
            {paper && (
              <div className="text-xs text-neutral-400 font-mono">
                PUBLISHED: {paper.journal}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {BENCHMARKS.map((item) => (
              <div key={item.model} className="space-y-1.5">
                <div className="flex justify-between items-baseline text-xs">
                  <span className={`font-mono ${item.highlight ? 'text-white font-bold' : 'text-neutral-400'}`}>
                    {item.model}{' '}
                    <span className="text-[10px] text-neutral-500">({item.note})</span>
                  </span>
                  <span className={`font-mono text-sm ${item.highlight ? 'text-emerald-400 font-bold' : 'text-neutral-400'}`}>
                    {item.label}
                  </span>
                </div>
                {/* Benchmark accuracy bar */}
                <div className="h-3 w-full bg-neutral-800/80 rounded-xs overflow-hidden border border-neutral-700/50">
                  <div
                    className={`h-full transition-all duration-500 ${
                      item.highlight ? 'bg-white' : 'bg-neutral-500'
                    }`}
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap justify-between items-center text-xs text-neutral-500 gap-2">
            <div>DATASET: 3,000+ LABELED HISTOPATHOLOGY / CORAL SAMPLES</div>
            <div>STATUS: PEER-REVIEWED &amp; REPRODUCIBLE</div>
          </div>
        </section>

        {/* 4. Production Architectural Systems (Code & Flow Breakdowns) */}
        <section className="border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 mb-10">
          <div className="flex items-center justify-between mb-8 border-b border-neutral-800 pb-4">
            <h2 className="text-xs uppercase tracking-widest text-neutral-400">
              {'// PRODUCTION_SYSTEMS_AND_ARCHITECTURES'} ({PROJECTS.length})
            </h2>
            <span className="text-xs text-neutral-500">STANDARD: ZERO_SLOP</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((proj, idx) => (
              <div
                key={proj.slug}
                className="border border-neutral-800 bg-black/60 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-neutral-500 font-mono">
                      SYSTEM_0{idx + 1}
                    </span>
                    {proj.repo && (
                      <a
                        href={`https://github.com/flxhrdyn/${proj.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase text-neutral-400 hover:text-white hover:underline underline-offset-4"
                      >
                        Source [↗]
                      </a>
                    )}
                  </div>
                  <h3 className="text-lg font-sans font-bold text-white mb-2">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed mb-4">
                    {proj.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex flex-wrap gap-1.5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 border border-neutral-800 bg-neutral-900 text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Chronological Experience Data Matrix */}
        <section className="border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 mb-10">
          <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-6 border-b border-neutral-800 pb-4">
            {'// CHRONOLOGICAL_EXPERIENCE_LEDGER'}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-500">
                  <th className="py-2.5 pr-4 font-normal">TIMELINE</th>
                  <th className="py-2.5 pr-4 font-normal">ROLE</th>
                  <th className="py-2.5 pr-4 font-normal">ORGANIZATION</th>
                  <th className="py-2.5 font-normal">DELIVERABLE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-light">
                {WORK_ROLES.map((r, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 pr-4 font-mono text-neutral-500 whitespace-nowrap">
                      {r.date}
                    </td>
                    <td className="py-3 pr-4 font-sans font-medium text-white">
                      {r.title}
                    </td>
                    <td className="py-3 pr-4 text-neutral-400 font-mono">
                      {r.company}
                    </td>
                    <td className="py-3 text-neutral-300 font-sans">
                      {r.headline || (r.description && r.description[0])}
                    </td>
                  </tr>
                ))}
                {EDUCATION.map((edu, idx) => (
                  <tr key={`edu-${idx}`} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 pr-4 font-mono text-neutral-500 whitespace-nowrap">
                      {edu.date}
                    </td>
                    <td className="py-3 pr-4 font-sans font-medium text-white">
                      {edu.title}
                    </td>
                    <td className="py-3 pr-4 text-neutral-400 font-mono">
                      {edu.company}
                    </td>
                    <td className="py-3 text-neutral-300 font-sans">
                      {edu.statLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Competencies & Certifications Matrix */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="border border-neutral-800 bg-neutral-900/40 p-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4 border-b border-neutral-800 pb-2">
              {'// CAPABILITIES_TAXONOMY'}
            </h3>
            <div className="space-y-4">
              {SKILL_GROUPS.map((grp) => (
                <div key={grp.category}>
                  <div className="text-[11px] text-neutral-500 uppercase font-semibold mb-1.5">
                    {grp.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.items.map((i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 border border-neutral-800 bg-black/60 text-neutral-300"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-neutral-800 bg-neutral-900/40 p-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 mb-4 border-b border-neutral-800 pb-2">
              {'// CERTIFIED_CREDENTIALS'}
            </h3>
            <div className="space-y-3">
              {CERTIFICATIONS.map((c, idx) => (
                <div key={idx} className="p-3 border border-neutral-800/80 bg-black/40">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-sans font-medium text-white">
                      {c.title}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {c.date}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                    ISSUER: {c.issuer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Transmission Footer */}
        <section className="border border-neutral-800 bg-neutral-900/40 p-6 sm:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest mb-1">
                CONTACT_PROTOCOL
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white">
                Initiate Connection
              </h3>
              <p className="font-sans text-xs text-neutral-400 mt-1 max-w-md">
                Direct channel for full-stack engineering roles, design systems, and machine learning architectures.
              </p>
              <div className="mt-4">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-base sm:text-lg text-emerald-400 hover:underline font-mono"
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
                  className="text-xs uppercase px-3 py-2 border border-neutral-700 hover:bg-neutral-800 text-neutral-200 transition-colors"
                >
                  {link.label} [↗]
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-neutral-800 flex justify-between items-center text-[10px] text-neutral-500">
            <div>EVALUATION_HASH: 0x8960 // VERIFIED</div>
            <div>FLXHRDYN // 2026</div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default D3Proof;
