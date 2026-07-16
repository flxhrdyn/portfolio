import { notFound } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ResearchPaperBody from "@/components/ResearchPaperBody";
import writing from "@/content/writing.json";

export function generateStaticParams() {
  return writing.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paper = writing.find((w) => w.slug === slug);
  if (!paper) return {};
  return {
    title: `${paper.title} — Felix Windriyareksa Hardyan`,
    description: paper.summary,
  };
}

export default async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paper = writing.find((w) => w.slug === slug);
  if (!paper) notFound();

  return (
    <>
      <NavBar variant="portfolio" />
      <section className="section">
        <div className="container" style={{ maxWidth: "760px" }}>
          <Link href="/portfolio#certifications" className="portfolio-text-link" style={{ textDecoration: "none", marginBottom: "1.5rem", display: "inline-flex" }}>
            <span>&larr; Back to accomplishments</span>
          </Link>

          <div className="meta-mono" style={{ marginTop: "1.5rem" }}>
            {paper.kind}
          </div>
          <h1 style={{ fontSize: "2.25rem", marginTop: "0.5rem", marginBottom: "2.5rem" }}>{paper.title}</h1>

          <ResearchPaperBody paper={paper} />
        </div>
      </section>
      <Footer />
    </>
  );
}
