import {
  DirectionShell, SectionHeading, ProjectImage, ProjectCopy, ExperienceContent,
  SkillsContent, ResearchContent, ContactContent, PROFILE, PROJECTS,
} from '@/components/designs/DirectionShared';

export function D1Ledger() {
  return <DirectionShell className="d1">
    <main className="direction-main d1-main" data-layout="archival-ledger">
      <section className="direction-hero d1-hero" id="hero">
        <div><p className="direction-overline">AI Engineer & Data Scientist · Jakarta, Indonesia</p><h1>{PROFILE.name}</h1></div>
        <div className="d1-hero-side"><p className="direction-overline">ABOUT</p><p>{PROFILE.tagline}</p></div>
      </section>
      <section className="direction-section d1-section" id="projects"><p className="d1-label">Projects</p><div><SectionHeading>Selected projects</SectionHeading><div className="d1-project-list">{PROJECTS.map((project, index) => <article className="d1-project" key={project.slug}><ProjectImage project={project} /><ProjectCopy project={project} index={index} /></article>)}</div></div></section>
      <section className="direction-section d1-section" id="experience"><p className="d1-label">Experience & education</p><div><SectionHeading>Experience</SectionHeading><ExperienceContent /></div></section>
      <section className="direction-section d1-section" id="research"><p className="d1-label">Research</p><div className="d1-research-grid"><ResearchContent abstract /></div></section>
      <section className="direction-section d1-section" id="skills"><p className="d1-label">Skills</p><div><SectionHeading>Technical skills</SectionHeading><SkillsContent /></div></section>
      <section className="direction-section d1-section" id="contact"><p className="d1-label">Contact</p><div><SectionHeading>Get in touch</SectionHeading><ContactContent /></div></section>
    </main>
  </DirectionShell>;
}
