import techStack from "@/content/tech-stack.json";
import { TECH_ICONS } from "./techStackIcons";

const ROW_SPLIT = 9;
const ROW_ONE = techStack.slice(0, ROW_SPLIT);
const ROW_TWO = techStack.slice(ROW_SPLIT);
const ALL_NAMES = techStack.map((tech) => tech.name).join(", ");

function TechLogo({ icon }: { icon: string }) {
  const data = TECH_ICONS[icon];
  return (
    <svg className="tech-carousel-logo" viewBox={data.viewBox} fill="currentColor" aria-hidden="true">
      <path d={data.path} />
    </svg>
  );
}

const REPEAT = 4;

function TechRow({
  items,
  reverse,
  duration,
}: {
  items: typeof techStack;
  reverse?: boolean;
  duration: number;
}) {
  const repeated = Array.from({ length: REPEAT }, () => items).flat();
  return (
    <div className={`tech-carousel-row${reverse ? " reverse" : ""}`}>
      <div className="tech-carousel-track" style={{ animationDuration: `${duration}s` }}>
        {repeated.map((tech, i) => (
          <TechLogo key={`${tech.icon}-${i}`} icon={tech.icon} />
        ))}
      </div>
    </div>
  );
}

export default function TechStackCarousel() {
  return (
    <div className="tech-carousel" role="img" aria-label={`Tech stack: ${ALL_NAMES}`}>
      <TechRow items={ROW_ONE} duration={35} />
      <TechRow items={ROW_TWO} reverse duration={28} />
    </div>
  );
}
