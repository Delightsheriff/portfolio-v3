import type { MetadataRoute } from "next";
import { getProjects } from "@/sanity/sanity";

const BASE_URL = "https://www.delightsheriff.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const projects = await getProjects();
    if (projects) {
      for (const project of projects as Array<{ slug: { current: string }; _updatedAt?: string }>) {
        routes.push({
          url: `${BASE_URL}/project/${project.slug.current}`,
          lastModified: project._updatedAt ? new Date(project._updatedAt) : new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }
  } catch (error) {
    console.error("Sitemap: error fetching projects:", error);
  }

  return routes;
}
