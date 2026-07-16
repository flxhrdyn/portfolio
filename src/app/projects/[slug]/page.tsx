import { notFound } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProjectCaseStudyBody from "@/components/ProjectCaseStudyBody";
import projects from "@/content/projects.json";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Felix Windriyareksa Hardyan`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <NavBar variant="portfolio" />
      <section className="section">
        <div className="container" style={{ maxWidth: "760px" }}>
          <Link href="/portfolio#projects" className="portfolio-text-link" style={{ textDecoration: "none", marginBottom: "1.5rem", display: "inline-flex" }}>
            <span>&larr; Back to all projects</span>
          </Link>

          <div className="project-tags" style={{ marginTop: "1.5rem" }}>
            <span className="badge badge-accent">{project.tags[0]}</span>
            {project.tags.slice(1).map((tag) => (
              <span key={tag} className="badge">
                {tag}
              </span>
            ))}
          </div>
          <h1 style={{ fontSize: "2.25rem", marginTop: "0.75rem" }}>{project.title}</h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", marginBottom: "2.5rem" }}>{project.summary}</p>

          <ProjectCaseStudyBody project={project} />
        </div>
      </section>
      <Footer />
    </>
  );
}
