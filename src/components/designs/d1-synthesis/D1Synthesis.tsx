import {
  DirectionShell, SectionHeading, ProjectImage, ProjectCopy,
  WorkExperienceContent, EducationContent,
  SkillsContent, CertificationsContent, MaskLine,
} from '@/components/designs/DirectionShared';
import {
  PROFILE, ALL_PROJECTS as PROJECTS, CERTIFICATIONS, CONTACT_LINKS,
  PUBLICATIONS,
} from '@/data/portfolio-data';
import { ProjectArchive } from './ProjectArchive';
import { ExperiencePhotoInterlude } from './ExperiencePhotoInterlude';
import { D1HeroEntrance } from './D1HeroEntrance';
import { PinnedScene, ScrollLitText } from './PinnedScene';
import { Reveal } from '../Reveal';
import type { CSSProperties } from 'react';

const contactOrder = ['Email', 'LinkedIn', 'GitHub', 'Hugging Face'];
const prioritizedContactLinks = [...CONTACT_LINKS].sort(
  (a, b) => contactOrder.indexOf(a.label) - contactOrder.indexOf(b.label),
);

function ContactLinks({ className = '' }: { className?: string }) {
  return (
    <Reveal className={`d1-contact-links ${className}`}>
      {prioritizedContactLinks.map((item, index) => (
        <a
          data-r="fade"
          style={{ '--i': index } as CSSProperties}
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
    </Reveal>
  );
}

function ResearchDesignPreviews() {
  const paper = PUBLICATIONS[0];
  const testAccuracy = paper?.stats.find((stat) => stat.label === 'Test Accuracy');
  if (!paper || !testAccuracy) return null;
  const accuracyNumber = testAccuracy.value.replace('%', '');
  const journalShortName = paper.journal.split(' (')[0];

  const paperLink = () => (
    <a href={paper.doi} target="_blank" rel="noreferrer" className="d1-research-paper-link">
      Read publication <span aria-hidden="true">↗</span>
    </a>
  );

  return (
    <Reveal as="article" className="d1-research-study-models">
      <div className="d1-research-models-title">
        <span data-r="fade"><abbr title={paper.journal}>{journalShortName}</abbr> · {paper.volume}</span>
        <h3><ScrollLitText text={paper.title} /></h3>
      </div>
      <div className="d1-research-model-flow">
        <div className="d1-research-model-result">
          <span data-r="fade" style={{ '--d': '.3s' } as CSSProperties}>MobileNetV2 test accuracy</span>
          <MaskLine delay={0.15}>
            <strong aria-label={`${testAccuracy.value} test accuracy`}>
              {accuracyNumber}<span aria-hidden="true">%</span>
            </strong>
          </MaskLine>
        </div>
      </div>
      <div className="d1-research-models-footer" data-r="fade" style={{ '--d': '.6s' } as CSSProperties}>
        {paperLink()}
      </div>
    </Reveal>
  );
}

export function D1Synthesis() {
  return (
    <DirectionShell className="d1 d1-synthesis" hideNavigation>
      <main className="direction-main d1-main" data-layout="synthesis-ledger">
        <D1HeroEntrance
          role="AI Engineer & Data Scientist · Jakarta, IDN"
          name={PROFILE.name}
          photo={PROFILE.photo}
          photoAlt={PROFILE.photoAlt}
          tagline={PROFILE.tagline}
        />

        <section className="direction-section d1-synthesis-projects" id="projects" data-motion-signature="image-focus">
          <SectionHeading motionPreset="d1-synthesis">Projects</SectionHeading>
          <div className="d2-gallery">
            {PROJECTS.map((project, index) => (
              <article className="d2-gallery-item" key={project.slug}>
                <ProjectImage project={project} motionPreset="d1-synthesis" />
                <ProjectCopy project={project} index={index} presentation="case-study" motionPreset="d1-synthesis" />
              </article>
            ))}
          </div>
          <ProjectArchive />
        </section>

        <section className="direction-section d1-synthesis-career" id="experience" data-motion-signature="drawn-ledger">
          <div className="d1-synthesis-career-layout">
            <SectionHeading motionPreset="d1-synthesis">Experience</SectionHeading>
            <WorkExperienceContent />
          </div>
        </section>

        <section className="direction-section d1-synthesis-career" id="education" data-motion-signature="reverse-ledger">
          <div className="d1-synthesis-career-layout">
            <SectionHeading motionPreset="d1-synthesis">Education</SectionHeading>
            <EducationContent />
          </div>
        </section>

        <ExperiencePhotoInterlude />

        <section className="direction-section d1-synthesis-skills" id="skills" data-motion-signature="vertical-rules">
          <SectionHeading motionPreset="d1-synthesis">Technical skills</SectionHeading>
          <SkillsContent className="d5-synthesis-skill-grid" showMetadata={false} />
        </section>

        <section className="direction-section d1-synthesis-research" id="research">
          <PinnedScene name="research">
          <div className="d1-synthesis-rc-grid" data-motion-signature="measured-results">
            <div className="d1-synthesis-rc-research">
              <SectionHeading motionPreset="d1-synthesis">Research</SectionHeading>
              <ResearchDesignPreviews />
            </div>
            <div className="d1-synthesis-rc-certs" id="certifications" data-motion-signature="quiet-ledger">
              <SectionHeading motionPreset="d1-synthesis">Certifications</SectionHeading>
              <CertificationsContent motionPreset="d1-synthesis" />
            </div>
          </div>
          </PinnedScene>
        </section>

        <section className="direction-section d1-synthesis-contact" id="contact" aria-labelledby="contact-editorial-heading" data-motion-signature="type-mask">
          <div className="d1-contact-editorial">
            <h2 id="contact-editorial-heading">
              <MaskLine>Let’s talk about</MaskLine>
              <MaskLine delay={0.12}>AI engineering.</MaskLine>
            </h2>
            <Reveal className="d1-contact-editorial-footer">
              <p data-r="fade" style={{ '--d': '.35s' } as CSSProperties}>Open to AI/ML engineering roles and practical collaborations.</p>
              <ContactLinks className="d1-contact-links-inline" />
            </Reveal>
          </div>
        </section>
      </main>
    </DirectionShell>
  );
}
