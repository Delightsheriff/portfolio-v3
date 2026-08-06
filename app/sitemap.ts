import type { MetadataRoute } from "next";
import { getProjects, getProjectGroups, getAllBlogs } from "@/sanity/sanity";

const BASE_URL = "https://delightsheriff.com";

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
      url: `${BASE_URL}/uses`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
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

  try {
    const groups = await getProjectGroups();
    if (groups) {
      for (const group of groups as Array<{ slug: { current: string }; _updatedAt?: string }>) {
        routes.push({
          url: `${BASE_URL}/project-group/${group.slug.current}`,
          lastModified: group._updatedAt ? new Date(group._updatedAt) : new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }
  } catch (error) {
    console.error("Sitemap: error fetching project groups:", error);
  }

  try {
    const posts = await getAllBlogs();
    if (posts) {
      for (const post of posts as Array<{ slug: string; publishedAt?: string }>) {
        routes.push({
          url: `${BASE_URL}/blog/${post.slug}`,
          lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  } catch (error) {
    console.error("Sitemap: error fetching blog posts:", error);
  }

  return routes;
}
