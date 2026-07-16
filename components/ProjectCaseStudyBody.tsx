import projects from "@/content/projects.json";

type Project = (typeof projects)[number];

export default function ProjectCaseStudyBody({ project }: { project: Project }) {
  return (
    <>
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
