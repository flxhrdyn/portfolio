'use client';

import { useState } from 'react';
import {
  DirectionShell, SectionHeading, ProjectImage, ProjectCopy, ExperienceContent,
  SkillsContent, ResearchContent, ContactContent, PROFILE, PROJECTS,
} from '@/components/designs/DirectionShared';

export function D5Workspace() {
  const [selectedSlug, setSelectedSlug] = useState(PROJECTS[0]?.slug ?? '');
  const selected = PROJECTS.find((project) => project.slug === selectedSlug) ?? PROJECTS[0];
  return <DirectionShell className="d5" dock>
    <main className="direction-main d5-main" data-layout="interactive-workspace">
      <section className="direction-hero d5-hero" id="hero"><p className="direction-overline">AI Engineer · Machine Learning Engineer</p><h1>Felix Hardyan</h1><p>{PROFILE.tagline}</p></section>
      <section className="direction-section" id="projects"><SectionHeading>Selected projects</SectionHeading><div className="d5-inspector"><div className="d5-project-list" role="group" aria-label="Select a project">{PROJECTS.map((project, index) => <button key={project.slug} type="button" aria-pressed={project.slug === selectedSlug} onClick={() => setSelectedSlug(project.slug)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{project.title}</strong></button>)}</div>{selected && <div className="d5-inspector-content"><ProjectImage project={selected} /><ProjectCopy project={selected} /></div>}</div></section>
      <div className="d5-desk-sections"><section className="direction-section" id="experience"><SectionHeading>Experience & education</SectionHeading><ExperienceContent compact /></section><section className="direction-section" id="skills"><SectionHeading>Skills</SectionHeading><SkillsContent /></section></div>
      <section className="direction-section" id="research"><SectionHeading>Research</SectionHeading><ResearchContent /></section>
      <section className="direction-section" id="contact"><SectionHeading>Contact</SectionHeading><ContactContent /></section>
    </main>
  </DirectionShell>;
}
