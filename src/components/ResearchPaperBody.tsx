import writing from "@/content/writing.json";

type Paper = (typeof writing)[number];

export default function ResearchPaperBody({ paper }: { paper: Paper }) {
  return (
    <>
      <div className="modal-section">
        <h4>Background</h4>
        <p>{paper.abstract}</p>
      </div>

      <div className="modal-section">
        <h4>Methodology</h4>
        <ul>
          {paper.methodology.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>

      <div className="modal-section">
        <h4>Key Findings</h4>
        <p>{paper.keyFindings}</p>
      </div>
    </>
  );
}
