import Image from 'next/image';
import {
  DirectionShell, SectionHeading, ProjectImage, ProjectCopy, ExperienceContent,
  SkillsContent, ResearchContent, ContactContent, PROFILE, PROJECTS,
} from '@/components/designs/DirectionShared';

export function D1Synthesis() {
  return (
    <DirectionShell className="d1 d1-synthesis">
      <main className="direction-main d1-main" data-layout="synthesis-ledger">
        <section className="direction-hero d1-synthesis-hero" id="hero">
          <div className="d1-synthesis-col-left">
            <p className="direction-overline">AI Engineer & Data Scientist · Jakarta, Indonesia</p>
            <h1 className="d1-synthesis-title">{PROFILE.name}</h1>
          </div>
          <div className="d1-synthesis-col-right">
            <div className="direction-image d1-synthesis-portrait">
              <Image src={PROFILE.photo} alt={PROFILE.photoAlt} fill sizes="(max-width: 800px) 100vw, 270px" priority />
            </div>
            <div className="d1-synthesis-about">
              <p>{PROFILE.tagline}</p>
            </div>
          </div>
        </section>

        <section className="direction-section d1-synthesis-projects" id="projects">
          <SectionHeading>Projects</SectionHeading>
          <div className="d2-gallery">
            {PROJECTS.map((project, index) => (
              <article className="d2-gallery-item" key={project.slug}>
                <ProjectImage project={project} />
                <ProjectCopy project={project} index={index} />
              </article>
            ))}
          </div>
        </section>

        <section className="direction-section d1-section" id="experience">
          <p className="d1-label">Experience & education</p>
          <div>
            <SectionHeading>Experience</SectionHeading>
            <ExperienceContent />
          </div>
        </section>

        <section className="direction-section d1-section" id="research">
          <p className="d1-label">Research</p>
          <div className="d1-research-grid">
            <ResearchContent abstract />
          </div>
        </section>

        <section className="direction-section d1-section" id="skills">
          <p className="d1-label">Skills</p>
          <div>
            <SectionHeading>Technical skills</SectionHeading>
            <SkillsContent />
          </div>
        </section>

        <section className="direction-section d1-section" id="contact">
          <p className="d1-label">Contact</p>
          <div>
            <SectionHeading>Get in touch</SectionHeading>
            <ContactContent />
          </div>
        </section>
      </main>
    </DirectionShell>
  );
}
