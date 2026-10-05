import Image from 'next/image';
import {
  DirectionShell, SectionHeading, ProjectImage, ProjectCopy,
  WorkExperienceContent, EducationContent,
  SkillsContent, ResearchPaperContent, CertificationsContent,
  ContactContent, PROFILE, PROJECTS, CERTIFICATIONS,
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

        <section className="direction-section d1-synthesis-career" id="experience">
          <div className="d1-synthesis-career-layout">
            <SectionHeading>Experience</SectionHeading>
            <WorkExperienceContent />
          </div>
        </section>

        <section className="direction-section d1-synthesis-career" id="education">
          <div className="d1-synthesis-career-layout">
            <SectionHeading>Education</SectionHeading>
            <EducationContent />
          </div>
        </section>

        <section className="direction-section d1-synthesis-research" id="research">
          <div className="d1-synthesis-rc-grid">
            <div className="d1-synthesis-rc-research">
              <SectionHeading>Research</SectionHeading>
              <ResearchPaperContent minimal={true} />
            </div>
            <div className="d1-synthesis-rc-certs" id="certifications">
              <SectionHeading>Certifications</SectionHeading>
              <CertificationsContent />
            </div>
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
