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
  const journalShortName = paper.journal.split(' (')[0];

  const paperLink = () => (
    <a href={paper.doi} target="_blank" rel="noreferrer" className="d1-research-paper-link">
      Read publication <span aria-hidden="true">↗</span>
    </a>
  );

  return (
    <article className="d1-research-study-models">
      <div className="d1-research-models-title">
        <span><abbr title={paper.journal}>{journalShortName}</abbr> · {paper.volume}</span>
        <h3><ScrollLitText text={paper.title} /></h3>
      </div>
      <div className="d1-research-model-flow">
        <div className="d1-research-model-result">
          <span>MobileNetV2 test accuracy</span>
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
        <D1HeroEntrance
          role="AI Engineer & Data Scientist · Jakarta, IDN"
          name={PROFILE.name}
          photo={PROFILE.photo}
          photoAlt={PROFILE.photoAlt}
          tagline={PROFILE.tagline}
        />

        <section className="direction-section d1-synthesis-projects" id="projects">
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

        <section className="direction-section d1-synthesis-career" id="experience">
          <div className="d1-synthesis-career-layout">
            <SectionHeading motionPreset="d1-synthesis">Experience</SectionHeading>
            <WorkExperienceContent />
          </div>
        </section>

        <section className="direction-section d1-synthesis-career" id="education">
          <div className="d1-synthesis-career-layout">
            <SectionHeading motionPreset="d1-synthesis">Education</SectionHeading>
            <EducationContent />
          </div>
        </section>

        <ExperiencePhotoInterlude />

        <section className="direction-section d1-synthesis-skills" id="skills">
          <SectionHeading motionPreset="d1-synthesis">Technical skills</SectionHeading>
          <SkillsContent className="d5-synthesis-skill-grid" showMetadata={false} />
        </section>

        <section className="direction-section d1-synthesis-research" id="research">
          <PinnedScene name="research">
          <div className="d1-synthesis-rc-grid">
            <div className="d1-synthesis-rc-research">
              <SectionHeading motionPreset="d1-synthesis">Research</SectionHeading>
              <ResearchDesignPreviews />
            </div>
            <div className="d1-synthesis-rc-certs" id="certifications">
              <SectionHeading motionPreset="d1-synthesis">Certifications</SectionHeading>
              <CertificationsContent />
            </div>
          </div>
          </PinnedScene>
        </section>

        <section className="direction-section d1-synthesis-contact" id="contact" aria-labelledby="contact-editorial-heading">
          <div className="d1-contact-editorial">
            <h2 id="contact-editorial-heading">
              <MaskLine>Let’s talk about</MaskLine>
              <MaskLine delay={0.12}>AI engineering.</MaskLine>
            </h2>
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
