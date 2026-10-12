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
import { CONTACT_LINKS, PROFILE } from '@/data/portfolio-data';

const SITE_URL = 'https://flxhrdyn.vercel.app';

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  jobTitle: PROFILE.role,
  description: PROFILE.tagline,
  url: SITE_URL,
  image: `${SITE_URL}${PROFILE.photo}`,
  email: `mailto:${PROFILE.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Jakarta', addressCountry: 'ID' },
  sameAs: CONTACT_LINKS.filter((link) => link.href.startsWith('https://')).map((link) => link.href),
};

async function TechnicalDesign() {
  const contributions = await fetchGithubContributions();

  return (
    <>
      <main id="main-content" tabIndex={-1}>
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
      <script
        type="application/ld+json"
        // Escaping `<` keeps a stray "</script>" in content from closing the tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD).replace(/</g, '\\u003c') }}
      />
      {ACTIVE_DESIGN === 'technical' ? <TechnicalDesign /> : <D1Synthesis />}
    </PortfolioShell>
  );
}
