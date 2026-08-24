import NavBar from "@/components/NavBar";
import PortfolioHero from "@/components/PortfolioHero";
import TelemetryStrip from "@/components/TelemetryStrip";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { fetchGithubContributions } from "@/lib/github-contributions";

export const metadata = {
  title: {
    absolute: "flxhrdyn | AI Engineer & Data Scientist",
  },
  description: "Projects, experience, skills, and research by flxhrdyn, AI Engineer & Data Scientist.",
};

export default async function PortfolioPage() {
  const contributions = await fetchGithubContributions();

  return (
    <>
      <NavBar variant="portfolio" />
      <PortfolioHero />
      <TelemetryStrip />
      <ProjectsSection contributions={contributions} />
      <ExperienceSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
