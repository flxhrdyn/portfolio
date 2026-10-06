// Mirrors the live portfolio's copy and content exactly; only the mockup layouts differ.
import projectsJson from "../../../content/projects.json";
import experienceJson from "../../../content/experience.json";
import skillsJson from "../../../content/skills.json";
import writingJson from "../../../content/writing.json";
import certsJson from "../../../content/certifications.json";

export const NAME = "Felix Windriyareksa Hardyan";
export const INTRO =
  "AI/ML Engineer building production RAG systems, deep learning architectures, and industrial data pipelines.";
export const PHOTO = "/felix_dgx.webp";
export const EMAIL = "felixhardyanwork@gmail.com";

export const METRICS = [
  { value: "2+ Yrs", label: "AI/ML Experience" },
  { value: "10+", label: "AI Projects Built" },
  { value: "BNSP", label: "Certified Data Scientist" },
];

export const PAPER_PROOF = [
  { value: "89.60%", label: "MobileNetV2 test accuracy, best of three" },
  { value: "97%", label: "MobileNetV2 training accuracy" },
  { value: "3", label: "Architectures compared: CoralNet, InceptionV3, MobileNetV2" },
];

export const SECTIONS = {
  projects: { title: "Featured Projects", lede: "AI systems, intelligent agents, and full-stack machine learning applications." },
  github: { title: "GitHub", lede: "Open-source work and contributions, updated in real time." },
  experience: { title: "Experience & Education", lede: "Professional engineering roles, applied AI research, and academic milestones." },
  skills: { title: "Skills & Capabilities", lede: "Core concepts, frameworks, and infrastructure I work with across the AI engineering lifecycle." },
  research: { title: "Research & Certifications", lede: "Academic publications and certifications in AI, machine learning, and data science." },
};

export const CONTACT = {
  status: "Available for opportunities",
  title: "Let's build something together.",
  lede: "Feel free to reach out for full-time engineering roles, AI consulting, or casual technical discussions.",
  links: [
    { label: "GitHub", handle: "flxhrdyn", href: "https://github.com/flxhrdyn" },
    { label: "LinkedIn", handle: "felixhrdyn", href: "https://linkedin.com/in/felixhrdyn" },
    { label: "Hugging Face", handle: "felixhrdyn", href: "https://huggingface.co/felixhrdyn" },
  ],
};

export const FOOTER = { text: "© 2026 FLXHRDYN • AI ENGINEER", links: ["Resume", "Source", "Back to top"] };

type Project = { slug: string; title: string; image: string; tags: string[]; summary: string; featured?: boolean; showcase?: boolean };
const allProjects = projectsJson as Project[];
export const FEATURED = allProjects.find((p) => p.featured)!;
export const PROJECTS = allProjects.filter((p) => !p.featured && p.showcase !== false);

type Role = { title: string; company: string; date: string; headline: string };
export const ROLES = (experienceJson as { work: Role[] }).work;
type Edu = { title: string; company: string; date: string; statLabel: string };
export const EDUCATION = (experienceJson as { education: Edu[] }).education;
export const isCurrent = (date: string) => date.includes("Present");

type SkillGroup = { category: string; items: string[] };
const skillGroups = skillsJson as SkillGroup[];
export const SKILLS = skillGroups.filter((s) => s.category !== "Spoken Languages");
export const LANGUAGES = skillGroups.find((s) => s.category === "Spoken Languages")!.items;

type Paper = { title: string; kind: string; journal: string; volume: string; authors: string; summary: string; stats: { value: string; label: string }[] };
export const PAPER = (writingJson as Paper[])[0];
export const PAPER_ACCURACY = PAPER.stats.find((s) => s.label === "Test Accuracy")!.value;

const allCerts = certsJson as { title: string; issuer: string; date: string; badge: string }[];
// The live section paginates certifications four at a time; mockups show page one.
export const CERTS = allCerts.slice(0, 4);
export const CERT_PAGES = Math.ceil(allCerts.length / 4);

// Deterministic stand-in for the live contribution calendar (53 weeks x 7 days, levels 0-4).
export const HEATMAP = Array.from({ length: 53 * 7 }, (_, i) => {
  const wave = Math.sin(i * 0.37) + Math.sin(i * 0.11) + Math.cos(i * 0.73);
  return wave < -0.6 ? 0 : wave < 0.2 ? 1 : wave < 0.9 ? 2 : wave < 1.6 ? 3 : 4;
});
