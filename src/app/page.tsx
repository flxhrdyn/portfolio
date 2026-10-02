import PortfolioShell from "@/components/PortfolioShell";
import PortfolioHero from "@/components/PortfolioHero";
import TelemetryStrip from "@/components/TelemetryStrip";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { fetchGithubContributions } from "@/lib/github-contributions";

export default async function HomePage() {
  const contributions = await fetchGithubContributions();

  return (
    <PortfolioShell>
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
    </PortfolioShell>
  );
}
