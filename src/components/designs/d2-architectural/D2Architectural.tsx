import Image from 'next/image';
import {
  DirectionShell, SectionHeading, ProjectImage, ProjectCopy, ExperienceContent,
  SkillsContent, ResearchContent, ContactContent, PROFILE, PROJECTS,
} from '@/components/designs/DirectionShared';

export function D2Architectural() {
  return <DirectionShell className="d2-frame" framed>
    <main className="direction-main" data-layout="architectural">
      <section className="direction-hero d2-hero" id="hero">
        <div className="d2-hero-copy"><p className="direction-overline">AI Engineer · Machine Learning Engineer</p><h1>Felix<br />Hardyan</h1><p>{PROFILE.tagline}</p><p><a className="direction-text-link" href="#projects">View selected projects ↓</a></p></div>
        <div className="direction-image"><Image src={PROFILE.photo} alt={PROFILE.photoAlt} fill sizes="(max-width: 760px) 100vw, 42vw" priority /></div>
      </section>
      <section className="direction-section" id="projects"><SectionHeading>Projects</SectionHeading><div className="d2-gallery">{PROJECTS.map((project, index) => <article className="d2-gallery-item" key={project.slug}><ProjectImage project={project} /><ProjectCopy project={project} index={index} /></article>)}</div></section>
      <section className="direction-section" id="experience"><div className="d2-career-layout"><SectionHeading>Experience & education</SectionHeading><ExperienceContent /></div></section>
      <section className="direction-section" id="research"><SectionHeading>Research</SectionHeading><ResearchContent /></section>
      <section className="direction-section" id="skills"><SectionHeading>Skills</SectionHeading><SkillsContent /></section>
      <section className="direction-section" id="contact"><SectionHeading>Contact</SectionHeading><ContactContent /></section>
    </main>
  </DirectionShell>;
}
