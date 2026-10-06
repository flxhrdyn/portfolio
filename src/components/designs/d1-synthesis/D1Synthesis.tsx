import Image from 'next/image';
import {
  DirectionShell, SectionHeading, ProjectImage, ProjectCopy,
  WorkExperienceContent, EducationContent,
  SkillsContent, ResearchPaperContent, CertificationsContent,
  PROFILE, PROJECTS, CERTIFICATIONS, CONTACT_LINKS,
} from '@/components/designs/DirectionShared';

const contactOrder = ['Email', 'LinkedIn', 'GitHub', 'Hugging Face'];
const prioritizedContactLinks = [...CONTACT_LINKS].sort(
  (a, b) => contactOrder.indexOf(a.label) - contactOrder.indexOf(b.label),
);

function ContactLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`d1-contact-links ${className}`}>
      {prioritizedContactLinks.map((item) => (
        <a
          href={item.href}
          key={item.label}
          target={item.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
        >
          <span>{item.label}</span>
          <span>{item.handle}</span>
          <span className="d1-contact-arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

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

        <section className="direction-section d1-synthesis-skills" id="skills">
          <SectionHeading>Technical skills</SectionHeading>
          <SkillsContent className="d5-synthesis-skill-grid" showMetadata={false} />
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

        <section className="direction-section d1-synthesis-contact" id="contact" aria-labelledby="contact-editorial-heading">
          <div className="d1-contact-editorial">
            <h2 id="contact-editorial-heading">Let’s talk about<br />AI engineering.</h2>
            <div className="d1-contact-editorial-footer">
              <p>Open to AI/ML engineering roles and practical collaborations.</p>
              <ContactLinks className="d1-contact-links-inline" />
            </div>
          </div>
        </section>
      </main>
    </DirectionShell>
  );
}
