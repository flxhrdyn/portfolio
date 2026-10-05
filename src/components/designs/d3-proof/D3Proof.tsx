import {
  DirectionShell, SectionHeading, ExperienceContent, SkillsContent,
  ResearchContent, ContactContent, PROFILE, PROJECTS, PUBLICATIONS,
} from '@/components/designs/DirectionShared';

export function D3Proof() {
  const paper = PUBLICATIONS[0];
  return <DirectionShell className="d3-matrix">
    <main className="direction-main d3-main" data-layout="precision-matrix">
      <section className="d3-hero" id="hero"><div><p className="direction-overline">AI Engineer & Data Scientist</p><h1>{PROFILE.name}</h1></div><p>{PROFILE.tagline}</p></section>
      <section className="direction-section" id="projects"><SectionHeading>Projects</SectionHeading><div className="d3-table-head"><span>Project</span><span>Area</span><span>Technology</span></div>{PROJECTS.map((project, index) => <article className="d3-project-row" key={project.slug}><span>{String(index + 1).padStart(2, '0')}</span><h3>{project.title}</h3><p>{project.tags[0]}</p><p>{project.tags.slice(1, 3).join(', ')}</p></article>)}</section>
      <section className="direction-section"><SectionHeading>Model results</SectionHeading><div className="d3-table-head"><span>Model / project</span><span>Task</span><span>Result</span></div><div className="d3-table-row"><strong>MobileNetV2</strong><span>Coral condition classification</span><strong>{paper?.stats.find((stat) => stat.label === 'Test Accuracy')?.value ?? '89%'}</strong></div><div className="d3-table-row"><strong>MobileNetV2</strong><span>Training accuracy</span><strong>{paper?.stats.find((stat) => stat.label === 'Training Accuracy')?.value ?? '97%'}</strong></div><div className="d3-table-row"><strong>LUCIAN · ConvNeXt-Base</strong><span>Lung histopathology classification</span><strong>93.67%</strong></div></section>
      <section className="direction-section" id="experience"><SectionHeading>Experience & education</SectionHeading><ExperienceContent /></section>
      <section className="direction-section" id="research"><SectionHeading>Research</SectionHeading><ResearchContent abstract /></section>
      <section className="direction-section" id="skills"><SectionHeading>Skills</SectionHeading><SkillsContent /></section>
      <section className="direction-section" id="contact"><SectionHeading>Contact</SectionHeading><ContactContent /></section>
    </main>
  </DirectionShell>;
}
