import projects from "@/content/projects.json";
import ProjectThumbnail from "./ProjectThumbnail";

type Project = (typeof projects)[number] & { video?: string };

export default function ProjectCaseStudyBody({ project }: { project: Project }) {
  return (
    <>
      {project.video ? (
        <div style={{ marginBottom: "1.5rem", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-color)", backgroundColor: "#000" }}>
          <video
            src={project.video}
            poster={project.image}
            controls
            playsInline
            style={{ width: "100%", height: "auto", display: "block", maxHeight: "420px", objectFit: "contain" }}
          />
        </div>
      ) : (
        <ProjectThumbnail src={project.image} alt={project.imageAlt} variant="featured" />
      )}

      <div className="modal-section">
        <h4>Overview</h4>
        <p>{project.overview}</p>
      </div>

      <div className="modal-section">
        <h4>{project.architectureTitle}</h4>
        <p>{project.architectureText}</p>
        <div className="modal-code-block">
          <code>{project.codeBlock}</code>
        </div>
      </div>

      <div className="modal-section">
        <h4>{project.resultsTitle}</h4>
        <ul>
          {project.results.map((result) => {
            const [label, ...rest] = result.split(": ");
            return (
              <li key={label}>
                <strong>{label}:</strong> {rest.join(": ")}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
