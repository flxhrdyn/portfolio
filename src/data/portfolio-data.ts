import projectsJson from '../../content/projects.json';
import experienceJson from '../../content/experience.json';
import skillsJson from '../../content/skills.json';
import writingJson from '../../content/writing.json';
import certsJson from '../../content/certifications.json';

export interface ProjectItem {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  tags: string[];
  summary: string;
  repo: string;
  video?: string;
  modalTitle?: string;
  featured?: boolean;
  showcase?: boolean;
  overview?: string;
  architectureTitle?: string;
  architectureText?: string;
  codeBlock?: string;
  resultsTitle?: string;
  results?: string[];
}

export interface WorkRole {
  title: string;
  company: string;
  date: string;
  location?: string;
  headline?: string;
  description?: string[];
  highlights?: string[];
}

export interface EducationItem {
  title: string;
  company: string;
  date: string;
  statLabel?: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface PublicationItem {
  title: string;
  kind: string;
  journal: string;
  volume: string;
  authors: string;
  summary: string;
  doi?: string;
  stats: { value: string; label: string }[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  badge: string;
  description?: string;
  url?: string;
}

export const PROFILE = {
  name: 'Felix Windriyareksa Hardyan',
  shortName: 'Felix',
  role: 'AI Engineer & Data Scientist',
  tagline: 'Building production RAG systems, computer vision models, and industrial data pipelines.',
  location: 'Jakarta, Indonesia',
  email: 'felixhardyanwork@gmail.com',
  github: 'https://github.com/flxhrdyn',
  linkedin: 'https://linkedin.com/in/felixhrdyn',
  photo: '/felix_dgx.webp',
  photoAlt: 'Felix standing beside NVIDIA DGX A100 compute racks',
};

export const ALL_PROJECTS: ProjectItem[] = projectsJson as ProjectItem[];

export const PROJECTS: ProjectItem[] = ALL_PROJECTS.filter(
  (p) => p.showcase !== false
);

export const FEATURED_PROJECT = (projectsJson as ProjectItem[]).find((p) => p.featured) || PROJECTS[0];

export const WORK_ROLES: WorkRole[] = (experienceJson as { work: WorkRole[] }).work;

export const EDUCATION: EducationItem[] = (experienceJson as { education: EducationItem[] }).education;

export const SKILL_GROUPS: SkillCategory[] = (skillsJson as SkillCategory[]);

export const PUBLICATIONS: PublicationItem[] = (writingJson as PublicationItem[]);

export const CERTIFICATIONS: CertificationItem[] = (certsJson as CertificationItem[]);

export const CONTACT_LINKS = [
  { label: 'GitHub', handle: 'flxhrdyn', href: 'https://github.com/flxhrdyn' },
  { label: 'LinkedIn', handle: 'felixhrdyn', href: 'https://linkedin.com/in/felixhrdyn' },
  { label: 'Hugging Face', handle: 'felixhrdyn', href: 'https://huggingface.co/felixhrdyn' },
  { label: 'Email', handle: 'felixhardyanwork@gmail.com', href: 'mailto:felixhardyanwork@gmail.com' },
];
