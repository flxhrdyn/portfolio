import techStack from "@/content/tech-stack.json";
import { TECH_ICONS } from "./techStackIcons";

const ALL_NAMES = techStack.map((tech) => tech.name).join(", ");
const REPEAT = 4;
const REPEATED = Array.from({ length: REPEAT }, () => techStack).flat();

function TechLogo({ icon }: { icon: string }) {
  const data = TECH_ICONS[icon];
  return (
    <svg className="tech-carousel-logo" viewBox={data.viewBox} fill="currentColor" aria-hidden="true">
      <path d={data.path} />
    </svg>
  );
}

export default function TechStackCarousel() {
  return (
    <div className="tech-carousel" role="img" aria-label={`Tech stack: ${ALL_NAMES}`}>
      <div className="tech-carousel-row">
        <div className="tech-carousel-track" style={{ animationDuration: "40s" }}>
          {REPEATED.map((tech, i) => (
            <TechLogo key={`${tech.icon}-${i}`} icon={tech.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
