import type { MetadataRoute } from "next";
import writing from "../../content/writing.json";

const SITE_URL = "https://flxhrdyn.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const writingRoutes: MetadataRoute.Sitemap = writing.map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...writingRoutes];
}
