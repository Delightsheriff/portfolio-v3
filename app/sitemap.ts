import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.delightsheriff.com/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Add other pages here, e.g., about, contact, or project pages
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
  ];
}
