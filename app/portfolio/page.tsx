import NavBar from "@/components/NavBar";
import PortfolioHero from "@/components/PortfolioHero";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Felix Windriyareksa Hardyan — Portfolio",
  description: "Projects, experience, skills, and research by Felix Windriyareksa Hardyan, AI Engineer & Data Scientist.",
};

export default function PortfolioPage() {
  return (
    <>
      <NavBar variant="portfolio" />
      <PortfolioHero />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
