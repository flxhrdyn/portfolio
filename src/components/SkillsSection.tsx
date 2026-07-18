import skills from "@/content/skills.json";
import TechStackCarousel from "./TechStackCarousel";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "AI & Machine Learning": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
    </svg>
  ),
  "ML Frameworks & Libraries": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    </svg>
  ),
  "Languages & Backend": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  ),
  "Cloud & MLOps": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    </svg>
  ),
};

const BRAND_ITEMS = new Set([
  "Bahasa Indonesia (Native)",
  "English (Professional, TOEFL: 650)",
]);

export default function SkillsSection() {
  const technicalGroups = skills.filter((group) => group.category !== "Languages & Bio");
  const languagesGroup = skills.find((group) => group.category === "Languages & Bio");

  return (
    <section className="section" id="skills">
      <div className="container">
        <h2>Technical Skills</h2>
        <p style={{ marginBottom: "2rem" }}>
          Systematic indexing of programming languages, machine learning pipelines, MLOps frameworks, and linguistic capabilities.
        </p>

        <TechStackCarousel />

        <div className="skills-grid">
          {technicalGroups.map((group) => (
            <div key={group.category} className="skill-category">
              <div className="skill-category-title">
                {CATEGORY_ICONS[group.category]}
                <span>{group.category}</span>
              </div>
              <div className="skill-pills">
                {group.items.map((item) => (
                  <span key={item} className="skill-pill">
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {languagesGroup && (
          <div className="languages-strip">
            <span className="languages-strip-label">Languages</span>
            {languagesGroup.items.map((item) =>
              BRAND_ITEMS.has(item) ? (
                <span key={item} className="skill-pill">
                  <strong style={{ color: "var(--accent-text)" }}>{item.split(" (")[0]}</strong> ({item.split(" (")[1]}
                </span>
              ) : (
                <span key={item} className="skill-pill">
                  <span>{item}</span>
                </span>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
