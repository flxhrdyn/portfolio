import Image from 'next/image';
import {
  DirectionShell, SectionHeading, ProjectImage, ProjectCopy,
  WorkExperienceContent, EducationContent,
  SkillsContent, CertificationsContent,
} from '@/components/designs/DirectionShared';
import {
  PROFILE, ALL_PROJECTS as PROJECTS, CERTIFICATIONS, CONTACT_LINKS,
  PUBLICATIONS,
} from '@/data/portfolio-data';
import { ExperiencePhotoInterlude } from './ExperiencePhotoInterlude';
import { PortfolioAnchor } from '@/components/PortfolioAnchor';
import { BoundedScrollScene } from '../BoundedScrollScene';

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

function ResearchDesignPreviews() {
  const paper = PUBLICATIONS[0];
  const testAccuracy = paper?.stats.find((stat) => stat.label === 'Test Accuracy');
  if (!paper || !testAccuracy) return null;
  const accuracyNumber = testAccuracy.value.replace('%', '');
  const paperAuthors = paper.authors.split(',').map((author) => author.trim());
  const compactAuthorsLine = (
    <p className="d1-research-compact-authors">
      <strong>Felix Windriyareksa Hardyan</strong>
      <span>+ {paperAuthors.length - 1} co-authors</span>
    </p>
  );

  const paperLink = () => (
    <a href={paper.doi} target="_blank" rel="noreferrer" className="d1-research-paper-link">
      Read publication <span aria-hidden="true">↗</span>
    </a>
  );

  return (
    <article className="d1-research-study-models">
      <div className="d1-research-models-title">
        <span>{paper.journal} · {paper.volume}</span>
        <h3>{paper.title}</h3>
        {compactAuthorsLine}
      </div>
      <div className="d1-research-model-flow">
        <div className="d1-research-model-result">
          <span>MobileNetV2 · test accuracy</span>
          <strong aria-label={`${testAccuracy.value} test accuracy`}>
            {accuracyNumber}<span aria-hidden="true">%</span>
          </strong>
        </div>
      </div>
      <div className="d1-research-models-footer">
        {paperLink()}
      </div>
    </article>
  );
}

export function D1Synthesis() {
  return (
    <DirectionShell className="d1 d1-synthesis" hideNavigation>
      <main className="direction-main d1-main" data-layout="synthesis-ledger">
        <section className="direction-hero d1-synthesis-hero" id="hero">
          <div className="d1-synthesis-col-left">
            <p className="direction-overline">AI Engineer & Data Scientist · Jakarta, IDN</p>
            <h1 className="d1-synthesis-title">{PROFILE.name}</h1>
          </div>
          <div className="d1-synthesis-col-right">
            <div className="direction-image d1-synthesis-portrait">
              <Image src={PROFILE.photo} alt={PROFILE.photoAlt} fill sizes="(max-width: 909px) 200px, (max-width: 1272px) 22vw, 280px" unoptimized priority />
            </div>
            <div className="d1-synthesis-about">
              <p>{PROFILE.tagline}</p>
            </div>
          </div>
          <PortfolioAnchor className="d1-synthesis-hero-cta" href="#contact">
            <span>Get in touch</span>
          </PortfolioAnchor>
        </section>

        <section className="direction-section d1-synthesis-projects" id="projects">
          <SectionHeading>Projects</SectionHeading>
          <div className="d2-gallery">
            {PROJECTS.map((project, index) => {
              const item = (
                <article className="d2-gallery-item" key={project.slug}>
                  <ProjectImage project={project} />
                  <ProjectCopy project={project} index={index} presentation="case-study" />
                </article>
              );

              return index === 0 ? (
                <BoundedScrollScene
                  key={project.slug}
                  scene="featured-project"
                  className="d2-gallery-item d1-featured-project-scene"
                >
                  {item}
                </BoundedScrollScene>
              ) : item;
            })}
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

        <ExperiencePhotoInterlude />

        <section className="direction-section d1-synthesis-skills" id="skills">
          <SectionHeading>Technical skills</SectionHeading>
          <SkillsContent className="d5-synthesis-skill-grid" showMetadata={false} />
        </section>

        <section className="direction-section d1-synthesis-research" id="research">
          <div className="d1-synthesis-rc-grid">
            <div className="d1-synthesis-rc-research">
              <SectionHeading>Research</SectionHeading>
              <ResearchDesignPreviews />
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
