import writing from "@/content/writing.json";

type Paper = (typeof writing)[number];

export default function ResearchPaperBody({ paper }: { paper: Paper }) {
  return (
    <>
      <div className="modal-section">
        <h4>Background</h4>
        <div className="modal-section-content">
          <p>{paper.abstract}</p>
        </div>
      </div>

      <div className="modal-section">
        <h4>Methodology</h4>
        <div className="modal-section-content">
          <ul>
            {paper.methodology.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="modal-section">
        <h4>Key Findings</h4>
        <div className="modal-section-content">
          <p>{paper.keyFindings}</p>
        </div>
      </div>
    </>
  );
}
