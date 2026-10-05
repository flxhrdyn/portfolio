import Image from 'next/image';
import {
  DirectionShell, SectionHeading, ProjectImage, ProjectCopy, ExperienceContent,
  SkillsContent, ResearchContent, ContactContent, PROFILE, PROJECTS,
} from '@/components/designs/DirectionShared';

export function D4Inline() {
  return <DirectionShell className="d4">
    <main className="direction-main d4-main" data-layout="quiet-editorial">
      <section className="direction-hero d4-hero" id="hero"><div className="direction-image d4-portrait"><Image src={PROFILE.photo} alt={PROFILE.photoAlt} fill sizes="220px" priority /></div><p className="direction-overline">AI Engineer & Data Scientist · Jakarta, Indonesia</p><h1>{PROFILE.name}</h1><p>{PROFILE.tagline}</p></section>
      <section className="direction-section d4-section" id="projects"><SectionHeading>Selected projects</SectionHeading>{PROJECTS.map((project, index) => <article className="d4-project" key={project.slug}><ProjectImage project={project} /><ProjectCopy project={project} index={index} /></article>)}</section>
      <section className="direction-section d4-section" id="experience"><div className="d4-text-flow"><SectionHeading>Experience & education</SectionHeading><ExperienceContent /></div></section>
      <section className="direction-section d4-section" id="research"><div className="d4-research"><SectionHeading>Research</SectionHeading><ResearchContent /></div></section>
      <section className="direction-section d4-section" id="skills"><SectionHeading>Skills</SectionHeading><SkillsContent /></section>
      <section className="direction-section d4-section" id="contact"><SectionHeading>Contact</SectionHeading><ContactContent /></section>
    </main>
  </DirectionShell>;
}
