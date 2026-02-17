import { MetadataRoute } from "next";
import { getBlogPosts, getProjects } from "@/sanity/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: "https://www.delightsheriff.com/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.delightsheriff.com/projects",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.delightsheriff.com/resume",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.delightsheriff.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const projects = await getProjects();
    if (projects) {
      projects.forEach((project: { slug: { current: string } }) => {
        routes.push({
          url: `https://www.delightsheriff.com/project/${project.slug.current}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      });
    }
  } catch (error) {
    console.error("Error fetching projects for sitemap:", error);
  }

  try {
    const posts = await getBlogPosts();
    if (posts) {
      posts.forEach((post: { slug: { current: string } }) => {
        routes.push({
          url: `https://www.delightsheriff.com/blog/${post.slug.current}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      });
    }
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
  }

  return routes;
}
