import PortfolioShell from '@/components/PortfolioShell';
import { D1Synthesis } from '@/components/designs/d1-synthesis/D1Synthesis';
import PortfolioHero from '@/components/PortfolioHero';
import TelemetryStrip from '@/components/TelemetryStrip';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { fetchGithubContributions } from '@/lib/github-contributions';
import { ACTIVE_DESIGN } from '@/lib/design';

async function TechnicalDesign() {
  const contributions = await fetchGithubContributions();

  return (
    <>
      <main id="main-content">
        <PortfolioHero />
        <TelemetryStrip />
        <ProjectsSection contributions={contributions} />
        <ExperienceSection />
        <SkillsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default function HomePage() {
  return (
    <PortfolioShell design={ACTIVE_DESIGN}>
      {ACTIVE_DESIGN === 'technical' ? <TechnicalDesign /> : <D1Synthesis />}
    </PortfolioShell>
  );
}
