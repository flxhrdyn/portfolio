import type { MetadataRoute } from "next";
import projects from "../../content/projects.json";
import writing from "../../content/writing.json";

const SITE_URL = "https://flxhrdyn.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const writingRoutes: MetadataRoute.Sitemap = writing.map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...writingRoutes];
}
